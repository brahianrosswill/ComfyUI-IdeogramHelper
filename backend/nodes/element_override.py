"""Ideogram Studio Element Override — overwrite one element by index (non-empty fields win)."""

from __future__ import annotations

from comfy_api.latest import io

from ..io_types import IdeogramOverrideType
from ..utils.overrides import parse_colors


class IdeogramElementOverride(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        def S(name, **k):
            return io.String.Input(name, default="", **k)
        return io.Schema(
            node_id="IdeogramElementOverride",
            display_name="Ideogram Studio Element Override",
            category="Ideogram",
            description="Overwrite a specific Ideogram Studio element by index. Combine several with an Override List, then wire into the studio's 'overrides' input.",
            inputs=[
                io.Int.Input("id", default=1, min=1, max=999, tooltip="Element number as shown in the studio (starts at 1)"),
                S("desc", multiline=True, tooltip="New description for this element"),
                S("text", tooltip="New literal text (text elements only)"),
                S("colors", tooltip="Comma-separated hex colours, e.g. #FF0000, #0a0, FFAA00 (max 5)"),
            ],
            outputs=[IdeogramOverrideType.Output(display_name="overrides")],
        )

    @classmethod
    def execute(cls, id=1, desc="", text="", colors="") -> io.NodeOutput:
        patch = {}
        if desc.strip():
            patch["desc"] = desc.strip()
        if text.strip():
            patch["text"] = text.strip()
        pal = parse_colors(colors, 5)  # per-element palette capped at 5
        if pal:
            patch["color_palette"] = pal

        bundle = {}
        if patch:
            bundle["elements"] = {int(id): patch}
        return io.NodeOutput(bundle)
