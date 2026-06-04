"""ComfyUI node: Ideogram Studio.

A visual editor (Vue, mounted as a custom node widget) for composing Ideogram 4
structured JSON captions by dragging bounding boxes and filling in prompt
panels. The frontend serializes a structured caption object into the widget
value; this node turns it into the canonical wire string (the ``caption`` STRING
output) and rasterizes the boxes + text into an ``overlay`` IMAGE (with an
``alpha`` MASK) you can composite over a generation to compare intended layout
vs. result.

The overlay is rendered at the resolution chosen inside the studio UI (so it
matches the format you drew on); there are no node widget inputs.
"""

from __future__ import annotations

import json

from .caption import serialize_caption
from .overlay import render_overlay, hex_to_rgb, OBJ_COLOR, TEXT_COLOR


def _draw_items(studio_state, caption_data):
    """Build colored draw-items. Prefer the studio state (carries per-box color
    + link info); fall back to the canonical caption elements."""
    if isinstance(studio_state, dict) and isinstance(studio_state.get("elements"), list):
        items = []
        for el in studio_state["elements"]:
            if el.get("enabled", True) is False:
                continue  # muted — kept in the editor, excluded from the overlay
            etype = el.get("type", "obj")
            default = TEXT_COLOR if etype == "text" else OBJ_COLOR
            items.append({
                "bbox": el.get("bbox"),
                "type": etype,
                "text": el.get("text", ""),
                "desc": el.get("desc", ""),
                "color": hex_to_rgb(el.get("boxColor"), default),
            })
        return items
    comp = (caption_data or {}).get("compositional_deconstruction", {}) or {}
    return [
        {"bbox": el.get("bbox"), "type": el.get("type", "obj"),
         "text": el.get("text", ""), "desc": el.get("desc", ""),
         "color": TEXT_COLOR if el.get("type") == "text" else OBJ_COLOR}
        for el in (comp.get("elements") or [])
    ]


def _int(v, default, lo, hi):
    try:
        return max(lo, min(hi, int(round(float(v)))))
    except (TypeError, ValueError):
        return default


def _float(v, default, lo, hi):
    try:
        return max(lo, min(hi, float(v)))
    except (TypeError, ValueError):
        return default


class IdeogramStudio:
    @classmethod
    def INPUT_TYPES(cls):
        # No widget inputs: everything (format/resolution + overlay style) is set
        # inside the studio UI so nothing is configured in two places.
        return {
            "required": {
                "studio": ("IDEOGRAM_STUDIO", {}),
            },
        }

    RETURN_TYPES = ("STRING", "IMAGE", "MASK")
    RETURN_NAMES = ("caption", "overlay", "alpha")
    OUTPUT_NODE = False
    FUNCTION = "run"
    CATEGORY = "Ideogram"
    DESCRIPTION = "Visually compose an Ideogram 4 JSON caption; also outputs a box+text overlay (at the studio's chosen resolution) to composite over the result."

    def run(self, studio, **kwargs):
        payload = studio
        if isinstance(payload, str):
            try:
                payload = json.loads(payload)
            except json.JSONDecodeError:
                payload = {}
        if not isinstance(payload, dict):
            payload = {}

        data = payload.get("caption", payload)
        if not isinstance(data, dict):
            data = {}
        studio_state = payload.get("studio") if isinstance(payload.get("studio"), dict) else {}

        caption_str, warnings = serialize_caption(data)
        for w in warnings:
            print(f"[IdeogramStudio] warning: {w}")

        # Resolution + overlay style come entirely from the studio UI.
        width = _int(studio_state.get("width"), 1024, 16, 8192)
        height = _int(studio_state.get("height"), 1024, 16, 8192)
        ov = studio_state.get("overlay") if isinstance(studio_state.get("overlay"), dict) else {}

        items = _draw_items(studio_state, data)
        overlay, alpha = render_overlay(
            items, width, height,
            line_width=_int(ov.get("lineWidth"), 3, 1, 40),
            fill_alpha=_float(ov.get("fillAlpha"), 0.18, 0.0, 1.0),
            label_size=_int(ov.get("labelSize"), 16, 6, 96),
            show_index=bool(ov.get("showIndex", True)),
            show_text=bool(ov.get("showText", True)),
        )

        return (caption_str, overlay, alpha)


NODE_CLASS_MAPPINGS = {
    "IdeogramStudio": IdeogramStudio,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "IdeogramStudio": "Ideogram Studio",
}
