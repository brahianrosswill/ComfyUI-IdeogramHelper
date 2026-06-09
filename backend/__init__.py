"""V3 node registry."""

from __future__ import annotations

from comfy_api.latest import ComfyExtension, io

# import before any node schema references the custom IO types
from . import io_types  # noqa: F401

try:
    from .server import api  # noqa: F401
except Exception as _api_err:  # pragma: no cover
    print(f"[IdeogramHelper] API routes failed to load: {_api_err}")

from .nodes.bbox_select import IdeogramBBoxSelect
from .nodes.caption_preview import IdeogramCaptionPreview
from .nodes.element_append import IdeogramElementAppend
from .nodes.element_override import IdeogramElementOverride
from .nodes.extras import IdeogramExtras
from .nodes.json_sync import IdeogramJsonSync
from .nodes.override import IdeogramOverride
from .nodes.override_list import IdeogramOverrideList
from .nodes.palette import IdeogramPalette
from .nodes.ref_sync import IdeogramRefSync
from .nodes.studio import IdeogramStudio


class IdeogramHelperExtension(ComfyExtension):
    async def get_node_list(self) -> list[type[io.ComfyNode]]:
        return [
            IdeogramStudio,
            IdeogramCaptionPreview,
            IdeogramRefSync,
            IdeogramJsonSync,
            IdeogramOverride,
            IdeogramElementOverride,
            IdeogramElementAppend,
            IdeogramOverrideList,
            IdeogramPalette,
            IdeogramExtras,
            IdeogramBBoxSelect,
        ]


async def comfy_entrypoint() -> IdeogramHelperExtension:
    return IdeogramHelperExtension()


__all__ = ["IdeogramHelperExtension", "comfy_entrypoint"]
