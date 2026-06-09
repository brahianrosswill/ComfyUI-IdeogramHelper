"""Ideogram Studio node: turns the Vue editor's caption payload into the canonical wire string + an overlay IMAGE/MASK."""

from __future__ import annotations

import json

from comfy_api.latest import io

from ..utils.caption import serialize_caption
from ..io_types import IdeogramExtrasType, IdeogramOverrideType, IdeogramStudioType
from ..utils.overlay import render_overlay, hex_to_rgb, bboxes_from_items, OBJ_COLOR, TEXT_COLOR
from ..utils.overrides import apply_override


def _draw_items(studio_state, caption_data):
    """Build colored draw-items: geometry/color from studio state, text/desc/palette from the (overridden) caption. Enabled boxes walk in lock-step with the caption's output-order elements."""
    comp = (caption_data or {}).get("compositional_deconstruction", {}) or {}
    cap_els = comp.get("elements") or []

    if isinstance(studio_state, dict) and isinstance(studio_state.get("elements"), list):
        items = []
        ci = 0  # index into the override-applied caption elements
        for el in studio_state["elements"]:
            if el.get("enabled", True) is False:
                continue  # muted: in the editor, excluded from the overlay
            cap = cap_els[ci] if ci < len(cap_els) else {}
            ci += 1
            etype = cap.get("type") or el.get("type", "obj")
            default = TEXT_COLOR if etype == "text" else OBJ_COLOR
            items.append({
                "bbox": el.get("bbox"),
                "type": etype,
                "text": cap.get("text", el.get("text", "")),
                "desc": cap.get("desc", el.get("desc", "")),
                "color": hex_to_rgb(el.get("boxColor"), default),
                "palette": cap.get("color_palette") or el.get("color_palette") or [],
            })
        # appended-via-override elements: in the caption but with no studio box —
        # draw them straight from the caption (own bbox + default colour)
        for cap in cap_els[ci:]:
            if not isinstance(cap, dict) or not cap.get("bbox"):
                continue
            etype = cap.get("type", "obj")
            items.append({
                "bbox": cap.get("bbox"),
                "type": etype,
                "text": cap.get("text", ""),
                "desc": cap.get("desc", ""),
                "color": TEXT_COLOR if etype == "text" else OBJ_COLOR,
                "palette": cap.get("color_palette") or [],
            })
        return items
    comp = (caption_data or {}).get("compositional_deconstruction", {}) or {}
    return [
        {"bbox": el.get("bbox"), "type": el.get("type", "obj"),
         "text": el.get("text", ""), "desc": el.get("desc", ""),
         "color": TEXT_COLOR if el.get("type") == "text" else OBJ_COLOR,
         "palette": el.get("color_palette") or []}
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


class IdeogramStudio(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramStudio",
            display_name="Ideogram Studio",
            category="Ideogram",
            description="Visually compose an Ideogram 4 JSON caption. The 'extras' output breaks out (via Ideogram Studio Extras) into overlay / alpha / width / height — keeps the node compact.",
            inputs=[
                IdeogramStudioType.Input("studio"),
                IdeogramOverrideType.Input("overrides", optional=True),
            ],
            outputs=[
                io.String.Output(display_name="caption"),
                IdeogramExtrasType.Output(display_name="extras"),
            ],
        )

    @classmethod
    def execute(cls, studio, overrides=None) -> io.NodeOutput:
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

        ovr = overrides if isinstance(overrides, dict) else {}
        if ovr:
            data = apply_override(data, ovr)

        caption_str, warnings = serialize_caption(data)
        for w in warnings:
            print(f"[IdeogramStudio] warning: {w}")

        width = _int(studio_state.get("width"), 1024, 16, 8192)
        height = _int(studio_state.get("height"), 1024, 16, 8192)
        if ovr.get("width"):
            width = _int(ovr.get("width"), width, 16, 8192)
        if ovr.get("height"):
            height = _int(ovr.get("height"), height, 16, 8192)
        ov = studio_state.get("overlay") if isinstance(studio_state.get("overlay"), dict) else {}

        # Image-wide palette: drawn in the overlay's bottom-left corner.
        sd = data.get("style_description")
        global_palette = sd.get("color_palette") if isinstance(sd, dict) and isinstance(sd.get("color_palette"), list) else []

        items = _draw_items(studio_state, data)
        overlay, alpha = render_overlay(
            items, width, height,
            line_width=_int(ov.get("lineWidth"), 3, 1, 40),
            fill_alpha=_float(ov.get("fillAlpha"), 0.18, 0.0, 1.0),
            label_size=_int(ov.get("labelSize"), 16, 6, 96),
            show_index=bool(ov.get("showIndex", True)),
            show_text=bool(ov.get("showText", True)),
            global_palette=global_palette,
        )

        extras = {
            "overlay": overlay, "alpha": alpha, "width": width, "height": height,
            "bboxes": bboxes_from_items(items, width, height),
        }
        return io.NodeOutput(caption_str, extras)
