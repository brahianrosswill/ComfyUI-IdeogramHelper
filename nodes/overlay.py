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


def render_overlay(
    items,
    width: int,
    height: int,
    line_width: int = 3,
    fill_alpha: float = 0.18,
    label_size: int = 16,
    show_index: bool = True,
    show_text: bool = True,
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

    # Pass 3 — literal text + labels on top.
    for s in specs:
        el, etype, color = s["el"], s["etype"], s["color"]
        px0, py0, px1, py1 = s["rect"]
        bw, bh = s["bw"], s["bh"]
        label_fg = (26, 26, 26, 255) if _luminance(color) > 150 else (255, 255, 255, 255)

        if show_text and etype == "text":
            literal = (el.get("text") or "").strip()
            if literal and bw > 12 and bh > 12:
                font = _fit_font(literal.replace("\n", " "), int(bw * 0.92), int(bh * 0.7), True, int(bh * 0.6))
                tb = draw.multiline_textbbox((0, 0), literal, font=font, align="center")
                tw = tb[2] - tb[0]
                th = tb[3] - tb[1]
                tx = px0 + (bw - tw) / 2 - tb[0]
                ty = py0 + (bh - th) / 2 - tb[1]
                draw.multiline_text((tx, ty), literal, font=font, fill=(255, 255, 255, 255),
                                    align="center", stroke_width=max(1, line_width - 1), stroke_fill=(0, 0, 0, 200))

        if show_index:
            snippet = el.get("text") if etype == "text" else el.get("desc")
            snippet = (snippet or etype).strip().replace("\n", " ")
            if len(snippet) > 28:
                snippet = snippet[:27] + "…"
            label = f"{s['i'] + 1} {snippet}" if snippet else str(s["i"] + 1)
            lb = label_font.getbbox(label)
            lw = lb[2] - lb[0]
            lh = lb[3] - lb[1]
            pad = 3
            bar_h = lh + pad * 2
            by = py0 - bar_h if py0 - bar_h >= 0 else py0
            # translucent bar so overlapping boxes still peek through under labels
            draw.rectangle([px0, by, px0 + lw + pad * 2, by + bar_h], fill=color + (210,))
            draw.text((px0 + pad, by + pad - lb[1]), label, font=label_font, fill=label_fg)

    arr = np.asarray(img).astype(np.float32) / 255.0  # H, W, 4
    rgb = np.ascontiguousarray(arr[..., :3])
    alpha = np.ascontiguousarray(arr[..., 3])
    image = torch.from_numpy(rgb)[None, ...]   # [1, H, W, 3]
    mask = torch.from_numpy(alpha)[None, ...]  # [1, H, W]
    return image, mask
