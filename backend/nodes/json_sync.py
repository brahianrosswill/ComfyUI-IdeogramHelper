"""Ideogram Studio Sync — force-push a JSON caption (+ optional resolution) to open studios; passes JSON through."""

from __future__ import annotations

from comfy_api.latest import io


class IdeogramJsonSync(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramJsonSync",
            display_name="Ideogram Studio Sync",
            category="Ideogram",
            description="Force-push a JSON caption (and optionally a width/height) to Ideogram Studios with sync on. Passes the JSON string through.",
            is_output_node=True,
            inputs=[
                io.String.Input("json", multiline=True, default="", tooltip="An Ideogram JSON caption (paste, or wire one in)"),
                io.Int.Input("width", default=0, min=0, max=8192, tooltip="Push a resolution too (0 = leave the studio's width as-is)"),
                io.Int.Input("height", default=0, min=0, max=8192, tooltip="Push a resolution too (0 = leave the studio's height as-is)"),
                io.Boolean.Input("enable", default=True),
            ],
            outputs=[io.String.Output(display_name="json")],
        )

    @classmethod
    def fingerprint_inputs(cls, **kwargs):
        return float("nan")  # always re-broadcast

    @classmethod
    def execute(cls, json="", width=0, height=0, enable=True) -> io.NodeOutput:
        if enable:
            has_json = bool(isinstance(json, str) and json.strip())
            if has_json:
                import json as _json
                try:
                    _json.loads(json)  # validate before broadcast
                except _json.JSONDecodeError as e:
                    raise ValueError(f"Ideogram Studio Sync: input is not valid JSON — {e}") from e
            if has_json or int(width) > 0 or int(height) > 0:
                try:
                    from server import PromptServer
                    PromptServer.instance.send_sync("ideogram-studio.json-sync", {
                        "json": json if has_json else "",
                        "width": int(width), "height": int(height),
                    })
                except Exception as e:
                    print(f"[IdeogramStudioSync] sync failed: {e}")
        return io.NodeOutput(json)
