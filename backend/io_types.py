"""Custom IO types for the V3 nodes. io_type strings match the legacy V1 names so saved workflows keep resolving."""

from __future__ import annotations

from typing import Any

from comfy_api.latest import io


def _make_widget_input(socketless: bool = True):
    """Build a WidgetInput subclass that renders as an on-node widget (no socket)."""

    class _WidgetInput(io.WidgetInput):
        def __init__(
            self,
            id: str,
            display_name: str | None = None,
            optional: bool = False,
            tooltip: str | None = None,
            advanced: bool | None = None,
            default: Any = None,
        ):
            super().__init__(
                id,
                display_name,
                optional,
                tooltip,
                None,        # lazy
                default,     # default
                socketless,  # socketless
                None,        # widget_type
                None,        # force_input
                None,        # extra_dict
                None,        # raw_link
                advanced,
            )

    return _WidgetInput


@io.comfytype(io_type="IDEOGRAM_STUDIO")
class IdeogramStudioType:
    """Studio editor widget value (serialized caption payload)."""

    Type = dict
    Input = _make_widget_input()


@io.comfytype(io_type="IDEOGRAM_PALETTE")
class IdeogramPaletteType:
    """Palette widget value (list of #RRGGBB swatches)."""

    Type = list
    Input = _make_widget_input()


IdeogramOverrideType = io.Custom("IDEOGRAM_OVERRIDE")
IdeogramExtrasType = io.Custom("IDEOGRAM_EXTRAS")
