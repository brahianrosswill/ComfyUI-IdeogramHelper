"""Ideogram Studio Element Append — add a NEW element (with its own bbox) to the caption."""

from __future__ import annotations

from comfy_api.latest import io

from ..io_types import IdeogramOverrideType
from ..utils.overrides import parse_colors


class IdeogramElementAppend(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramElementAppend",
            display_name="Ideogram Studio Element Append",
            category="Ideogram",
            description="Add a NEW element (not overwrite an existing one): a bounding box + description (+ optional text/colours). Combine with an Override List, then wire into a studio's or caption preview's 'overrides' input.",
            inputs=[
                io.Int.Input("y0", default=300, min=0, max=1000, tooltip="Top edge, 0..1000 (top-left origin)"),
                io.Int.Input("x0", default=300, min=0, max=1000, tooltip="Left edge, 0..1000"),
                io.Int.Input("y1", default=700, min=0, max=1000, tooltip="Bottom edge, 0..1000"),
                io.Int.Input("x1", default=700, min=0, max=1000, tooltip="Right edge, 0..1000"),
                io.String.Input("desc", multiline=True, default="", tooltip="Description of the new element"),
                io.String.Input("text", default="", tooltip="Literal text — if set, the element is a text element"),
                io.String.Input("colors", default="", tooltip="Comma-separated hex colours (max 5)"),
            ],
            outputs=[IdeogramOverrideType.Output(display_name="overrides")],
        )

    @classmethod
    def execute(cls, y0=300, x0=300, y1=700, x1=700, desc="", text="", colors="") -> io.NodeOutput:
        is_text = bool(text.strip())
        el = {"type": "text" if is_text else "obj", "bbox": [int(y0), int(x0), int(y1), int(x1)]}
        if desc.strip():
            el["desc"] = desc.strip()
        if is_text:
            el["text"] = text.strip()
        pal = parse_colors(colors, 5)
        if pal:
            el["color_palette"] = pal
        return io.NodeOutput({"append": [el]})
