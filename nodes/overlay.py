"""Render an Ideogram caption's bounding boxes + text into an overlay image.

Produces an RGBA layer (boxes, fills, labels, and literal text drawn where the
caption places them) that downstream nodes can composite over a generation to
compare intended layout vs. result. Returned as a ComfyUI ``IMAGE`` (RGB) plus a
``MASK`` (the alpha channel) so any image-combine / composite-by-mask node can
overlay it.
"""

from __future__ import annotations

import numpy as np
import torch
from PIL import Image, ImageDraw, ImageFont

# Defaults used when an element carries no explicit color.
OBJ_COLOR = (59, 130, 246)   # blue
TEXT_COLOR = (245, 158, 11)  # amber

_FONT_CANDIDATES = [
    "/usr/share/fonts/TTF/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "DejaVuSans.ttf",
    "arial.ttf",
]
_FONT_BOLD_CANDIDATES = [
    "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "DejaVuSans-Bold.ttf",
]


def hex_to_rgb(value, fallback):
    """Parse '#RRGGBB' (or '#RGB') into an (r, g, b) tuple."""
    if not isinstance(value, str):
        return fallback
    h = value.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        return fallback
    try:
        return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
    except ValueError:
        return fallback


def _luminance(rgb):
    r, g, b = rgb
    return 0.299 * r + 0.587 * g + 0.114 * b


def _load_font(size: int, bold: bool = False):
    for path in (_FONT_BOLD_CANDIDATES if bold else []) + _FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    try:
        return ImageFont.load_default(size)  # Pillow >= 10
    except TypeError:
        return ImageFont.load_default()


def _fit_font(text: str, max_w: int, max_h: int, bold: bool, start: int):
    size = max(8, start)
    while size > 8:
        font = _load_font(size, bold=bold)
        box = font.getbbox(text)
        if (box[2] - box[0]) <= max_w and (box[3] - box[1]) <= max_h:
            return font
        size -= 2
    return _load_font(8, bold=bold)


def _wrap(draw, text, font, max_w):
    """Greedy word-wrap to a pixel width; breaks over-long words by character."""
    lines = []
    for word in text.split():
        if lines and draw.textlength(lines[-1] + " " + word, font=font) <= max_w:
            lines[-1] += " " + word
        elif draw.textlength(word, font=font) <= max_w:
            lines.append(word)
        else:
            cur = ""
            for ch in word:
                if draw.textlength(cur + ch, font=font) <= max_w:
                    cur += ch
                else:
                    if cur:
                        lines.append(cur)
                    cur = ch
            if cur:
                lines.append(cur)
    return lines


def render_overlay(
    items,
    width: int,
    height: int,
    line_width: int = 3,
    fill_alpha: float = 0.18,
    label_size: int = 16,
    show_index: bool = True,
    show_text: bool = True,
    global_palette=None,
):
    """Render draw-items into (IMAGE [1,H,W,3], MASK [1,H,W]), both float 0..1.

    Each item: {"bbox": [y0,x0,y1,x1] (0..1000), "type": "obj"|"text",
                "text": str, "desc": str, "color": (r,g,b)}.
    """
    width = max(1, int(width))
    height = max(1, int(height))
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    label_font = _load_font(label_size, bold=True)

    # Precompute pixel rects so we can render in passes — drawing ALL fills
    # first, then ALL outlines, keeps every box's outline visible even where
    # boxes overlap (otherwise a later box's fill paints over an earlier outline).
    specs = []
    for i, el in enumerate(items):
        bbox = el.get("bbox")
        if not bbox or len(bbox) != 4:
            continue
        y0, x0, y1, x1 = bbox
        px0 = x0 / 1000.0 * width
        py0 = y0 / 1000.0 * height
        px1 = x1 / 1000.0 * width
        py1 = y1 / 1000.0 * height
        if px1 < px0:
            px0, px1 = px1, px0
        if py1 < py0:
            py0, py1 = py1, py0
        etype = el.get("type", "obj")
        color = el.get("color") or (TEXT_COLOR if etype == "text" else OBJ_COLOR)
        specs.append({"i": i, "el": el, "etype": etype, "color": tuple(color),
                      "rect": [px0, py0, px1, py1], "bw": px1 - px0, "bh": py1 - py0})

    # Pass 1 — translucent fills (drawn on a separate layer so overlapping fills
    # blend rather than darken to opaque, letting all boxes show through).
    if fill_alpha > 0:
        fills = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        fdraw = ImageDraw.Draw(fills)
        a = int(fill_alpha * 255)
        for s in specs:
            fdraw.rectangle(s["rect"], fill=s["color"] + (a,))
        img = Image.alpha_composite(img, fills)
        draw = ImageDraw.Draw(img)

    # Pass 2 — outlines on top of every fill.
    for s in specs:
        draw.rectangle(s["rect"], outline=s["color"] + (255,), width=line_width)

    # Pass 3 — index badge, wrapped description, and palette swatches, inside each box.
    body_font = _load_font(max(9, label_size - 1))
    body_lh = (body_font.getbbox("Ay")[3] - body_font.getbbox("Ay")[1]) + 3
    for s in specs:
        el, etype, color = s["el"], s["etype"], s["color"]
        px0, py0, px1, py1 = s["rect"]
        bw, bh = s["bw"], s["bh"]
        label_fg = (26, 26, 26, 255) if _luminance(color) > 150 else (255, 255, 255, 255)
        pad = max(3, int(line_width) + 1)
        inner_w = bw - 2 * pad

        # palette swatches reserved at the bottom
        palette = [hex_to_rgb(h, (128, 128, 128)) for h in (el.get("palette") or [])][:8]
        sw_size = 0
        if palette and inner_w > 10:
            sw_size = max(6, min(16, int(inner_w / len(palette)) - 2))

        # index badge (top-left, inside the box)
        header_h = 0
        if show_index:
            num = str(s["i"] + 1)
            nb = label_font.getbbox(num)
            nw, nh = nb[2] - nb[0], nb[3] - nb[1]
            draw.rectangle([px0, py0, px0 + nw + 7, py0 + nh + 5], fill=color + (225,))
            draw.text((px0 + 4, py0 + 3 - nb[1]), num, font=label_font, fill=label_fg)
            header_h = nh + 5

        # wrapped description body (literal text first for text-elements)
        if show_text and inner_w > 12:
            parts = []
            if etype == "text":
                lit = (el.get("text") or "").strip()
                if lit:
                    parts.append("“" + lit + "”")
            desc = (el.get("desc") or "").strip()
            if desc:
                parts.append(desc)
            lines = []
            for para in "\n".join(parts).split("\n"):
                if para:
                    lines += _wrap(draw, para, body_font, inner_w)
            top = py0 + header_h + 2
            bottom = py1 - pad - (sw_size + pad if sw_size else 0)
            y = top
            for ln in lines:
                if y + body_lh > bottom:
                    break
                draw.text((px0 + pad, y), ln, font=body_font, fill=(255, 255, 255, 255),
                          stroke_width=2, stroke_fill=(0, 0, 0, 210))
                y += body_lh

        # palette swatches along the bottom
        if sw_size:
            sx = px0 + pad
            sy = py1 - pad - sw_size
            for col in palette:
                if sx + sw_size > px1 - pad:
                    break
                draw.rectangle([sx, sy, sx + sw_size, sy + sw_size], fill=col + (255,), outline=(255, 255, 255, 220))
                sx += sw_size + 2

    # Global (image-wide) palette in the bottom-left corner.
    gcols = [hex_to_rgb(h, None) for h in (global_palette or [])]
    gcols = [c for c in gcols if c][:16]
    if gcols:
        gsw = max(12, min(30, width // 36))
        ggap = max(2, gsw // 6)
        gpad = max(8, line_width * 2)
        gx = gpad
        gy = height - gpad - gsw
        for c in gcols:
            if gx + gsw > width - gpad:
                break
            draw.rectangle([gx, gy, gx + gsw, gy + gsw], fill=c + (255,), outline=(255, 255, 255, 235), width=2)
            gx += gsw + ggap

    arr = np.asarray(img).astype(np.float32) / 255.0  # H, W, 4
    rgb = np.ascontiguousarray(arr[..., :3])
    alpha = np.ascontiguousarray(arr[..., 3])
    image = torch.from_numpy(rgb)[None, ...]   # [1, H, W, 3]
    mask = torch.from_numpy(alpha)[None, ...]  # [1, H, W]
    return image, mask
