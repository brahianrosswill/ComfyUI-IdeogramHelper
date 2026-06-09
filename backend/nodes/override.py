"""Ideogram Studio Override — drive studio fields natively (non-empty fields win)."""

from __future__ import annotations

from comfy_api.latest import io

from ..io_types import IdeogramOverrideType
from ..utils.overrides import parse_colors


class IdeogramOverride(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        def S(name, **k):
            # empty-default text widgets, not optional sockets (optional=True would
            # render unfilled input sockets instead of editable text boxes)
            return io.String.Input(name, default="", **k)
        return io.Schema(
            node_id="IdeogramOverride",
            display_name="Ideogram Studio Override",
            category="Ideogram",
            description="Override Ideogram Studio fields natively (only non-empty fields override). Wire into the studio's 'overrides' input.",
            inputs=[
                S("high_level_description", multiline=True),
                S("background", multiline=True),
                S("aesthetics"),
                S("lighting"),
                S("medium", tooltip="Medium (free-form), e.g. photograph, illustration, 3d_render, painting, graphic_design"),
                S("photo", tooltip="camera/lens — sets photo mode"),
                S("art_style", tooltip="art style — sets art mode"),
                S("colors", tooltip="Comma-separated hex for the image palette (raw, or from an Ideogram Studio Palette node). Max 16"),
            ],
            outputs=[IdeogramOverrideType.Output(display_name="overrides")],
        )

    @classmethod
    def execute(cls, high_level_description="", background="", aesthetics="",
                lighting="", medium="", photo="", art_style="", colors="") -> io.NodeOutput:
        style = {}
        for k, v in (("aesthetics", aesthetics), ("lighting", lighting),
                     ("photo", photo), ("art_style", art_style), ("medium", medium)):
            if v.strip():
                style[k] = v.strip()
        pal = parse_colors(colors, 16)
        if pal:
            style["color_palette"] = pal

        bundle = {}
        if high_level_description.strip():
            bundle["high_level_description"] = high_level_description.strip()
        if background.strip():
            bundle["background"] = background.strip()
        if style:
            bundle["style"] = style

        return io.NodeOutput(bundle)
