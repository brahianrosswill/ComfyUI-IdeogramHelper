"""ComfyUI node: Ideogram Caption Preview — JSON caption → an 'extras' bundle."""

from __future__ import annotations

import json

from comfy_api.latest import io

from ..io_types import IdeogramExtrasType, IdeogramOverrideType
from ..utils.overlay import render_overlay, items_from_caption, global_palette, bboxes_from_items
from ..utils.overrides import apply_override


class IdeogramCaptionPreview(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramCaptionPreview",
            display_name="Ideogram Caption Preview",
            category="Ideogram",
            description="Render an Ideogram JSON caption into an 'extras' bundle (overlay IMAGE, alpha MASK, width, height, BOUNDING_BOX). Wire into Ideogram Studio Extras to break it out.",
            inputs=[
                io.String.Input("caption", multiline=True, default="", tooltip="An Ideogram JSON caption (wire one in, or paste)."),
                IdeogramOverrideType.Input("overrides", optional=True),
                io.Int.Input("width", default=1024, min=16, max=8192),
                io.Int.Input("height", default=1024, min=16, max=8192),
                io.Int.Input("line_width", default=3, min=1, max=40),
                io.Float.Input("fill_alpha", default=0.18, min=0.0, max=1.0, step=0.01),
                io.Int.Input("label_size", default=16, min=6, max=96),
                io.Boolean.Input("show_index", default=True),
                io.Boolean.Input("show_text", default=True),
            ],
            outputs=[IdeogramExtrasType.Output(display_name="extras")],
        )

    @classmethod
    def execute(cls, caption, width, height, line_width=3, fill_alpha=0.18,
                label_size=16, show_index=True, show_text=True, overrides=None) -> io.NodeOutput:
        data = {}
        if isinstance(caption, str) and caption.strip():
            try:
                parsed = json.loads(caption)
                if isinstance(parsed, dict):
                    data = parsed
            except json.JSONDecodeError as e:
                # Raise so ComfyUI flags the node rather than rendering empty.
                raise ValueError(f"Ideogram Caption Preview: input is not valid JSON — {e}") from e

        if isinstance(overrides, dict) and overrides:
            data = apply_override(data, overrides)

        w, h = int(width), int(height)
        items = items_from_caption(data)
        overlay, alpha = render_overlay(
            items, w, h,
            line_width=int(line_width), fill_alpha=float(fill_alpha),
            label_size=int(label_size), show_index=bool(show_index),
            show_text=bool(show_text), global_palette=global_palette(data),
        )
        extras = {
            "overlay": overlay, "alpha": alpha, "width": w, "height": h,
            "bboxes": bboxes_from_items(items, w, h),
        }
        return io.NodeOutput(extras)
