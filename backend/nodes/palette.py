"""Ideogram Studio Palette — visually build a colour palette; outputs comma-separated hex."""

from __future__ import annotations

from comfy_api.latest import io

from ..io_types import IdeogramPaletteType
from ..utils.overrides import parse_colors


class IdeogramPalette(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramPalette",
            display_name="Ideogram Studio Palette",
            category="Ideogram",
            description="Pick a colour palette visually; outputs comma-separated hex for an Override's 'colors' input.",
            inputs=[IdeogramPaletteType.Input("palette")],
            outputs=[io.String.Output(display_name="colors")],
        )

    @classmethod
    def execute(cls, palette=None) -> io.NodeOutput:
        cols = palette if isinstance(palette, list) else []
        cleaned = parse_colors(",".join(str(c) for c in cols), 16)
        return io.NodeOutput(",".join(cleaned))
