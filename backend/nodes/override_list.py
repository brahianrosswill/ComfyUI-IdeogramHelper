"""Ideogram Studio Override List — merge several override bundles into one (autogrowing inputs)."""

from __future__ import annotations

import re

from comfy_api.latest import io

from ..io_types import IdeogramOverrideType
from ..utils.overrides import merge_overrides


class IdeogramOverrideList(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        # optional=True so autogrown slots are never required; empty is a 0-bundle merge
        template = io.Autogrow.TemplatePrefix(
            input=IdeogramOverrideType.Input("overrides", optional=True),
            prefix="overrides_",
            min=1,
            max=16,
        )
        return io.Schema(
            node_id="IdeogramOverrideList",
            display_name="Ideogram Studio Override List",
            category="Ideogram",
            description="Combine multiple override bundles into one (autogrowing inputs). Wire into the studio's 'overrides' input.",
            inputs=[io.Autogrow.Input("overrides", template=template, optional=True)],
            outputs=[IdeogramOverrideType.Output(display_name="overrides")],
        )

    @classmethod
    def execute(cls, overrides=None) -> io.NodeOutput:
        # Autogrow hands overrides as a {name: bundle} dict; merge in slot order.
        slots = overrides if isinstance(overrides, dict) else {}
        items = [(k, v) for k, v in slots.items() if isinstance(v, dict)]
        items.sort(key=lambda kv: int(re.search(r"(\d+)$", kv[0]).group(1)) if re.search(r"(\d+)$", kv[0]) else 0)
        return io.NodeOutput(merge_overrides([v for _, v in items]))
