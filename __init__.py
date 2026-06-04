import os

import nodes

from .nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

# Register the built Vue frontend (js/) as this extension's web dir.
js_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "js")
try:
    from comfy_config import config_parser

    custom_node_dir = os.path.dirname(os.path.realpath(__file__))
    project_config = config_parser.extract_node_configuration(custom_node_dir)
    nodes.EXTENSION_WEB_DIRS[project_config.project.name] = js_dir
except Exception:
    # Older ComfyUI without comfy_config: fall back to WEB_DIRECTORY.
    pass

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
