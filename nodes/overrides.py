"""Breakout nodes for Ideogram Studio.

Symmetric breakouts so you get native graph control without a huge stack of
ports on the studio itself:

    [Override] --IDEOGRAM_OVERRIDE--> [Studio] --IDEOGRAM_SETTINGS--> [Settings] --> width, height

* **Ideogram Override** (input breakout) — text/style fields as native inputs;
  emits a partial ``IDEOGRAM_OVERRIDE`` bundle that plugs into the studio's
  optional ``overrides`` input. Only non-empty fields override the studio.
* **Ideogram Settings** (output breakout) — takes the studio's
  ``IDEOGRAM_SETTINGS`` output and breaks it out into plain values
  (``width``/``height`` for empty-latent, samplers…). More can be added later.
"""

from __future__ import annotations


def apply_override(data: dict, ov: dict | None) -> dict:
    """Apply an override bundle onto a (canonical) caption dict.

    Returns patched data; the studio re-runs build/serialize so key order and
    normalization are reapplied. width/height are handled by the studio (they're
    not part of the caption)."""
    if not isinstance(ov, dict) or not ov:
        return data
    data = dict(data) if isinstance(data, dict) else {}

    if ov.get("high_level_description"):
        data["high_level_description"] = ov["high_level_description"]

    if ov.get("background"):
        comp = dict(data.get("compositional_deconstruction") or {})
        comp["background"] = ov["background"]
        data["compositional_deconstruction"] = comp

    style = ov.get("style")
    if isinstance(style, dict) and style:
        sd = dict(data.get("style_description") or {})
        for k, v in style.items():
            if v not in (None, "", []):
                sd[k] = v
        data["style_description"] = sd

    return data


# Combo options for the Override node. "(keep)" = don't override.
# (Palettes are intentionally NOT here — they're hand-picked in the studio's
# swatch editor, which is the natural place for visual colour work.)
MEDIA = [
    "(keep)", "photograph", "illustration", "3d_render", "painting",
    "graphic_design", "digital_art", "watercolor", "sketch", "anime",
]


class IdeogramOverride:
    """Input breakout: drive studio fields natively. Non-empty fields win."""

    @classmethod
    def INPUT_TYPES(cls):
        S = lambda **k: ("STRING", {"default": "", **k})
        return {
            "optional": {
                "high_level_description": S(multiline=True),
                "background": S(multiline=True),
                "aesthetics": S(),
                "lighting": S(),
                "medium": (MEDIA, {"default": "(keep)"}),
                "photo": S(tooltip="camera/lens — sets photo mode"),
                "art_style": S(tooltip="art style — sets art mode"),
            }
        }

    RETURN_TYPES = ("IDEOGRAM_OVERRIDE",)
    RETURN_NAMES = ("overrides",)
    FUNCTION = "run"
    CATEGORY = "Ideogram"
    DESCRIPTION = "Override Ideogram Studio fields natively (only non-empty fields override). Wire into the studio's 'overrides' input."

    def run(self, high_level_description="", background="", aesthetics="",
            lighting="", medium="(keep)", photo="", art_style="", **kwargs):
        style = {}
        for k, v in (("aesthetics", aesthetics), ("lighting", lighting),
                     ("photo", photo), ("art_style", art_style)):
            if v.strip():
                style[k] = v.strip()
        if medium and medium != "(keep)":
            style["medium"] = medium

        bundle = {}
        if high_level_description.strip():
            bundle["high_level_description"] = high_level_description.strip()
        if background.strip():
            bundle["background"] = background.strip()
        if style:
            bundle["style"] = style

        return (bundle,)


class IdeogramExtras:
    """Output breakout: take the studio's 'extras' bundle and expose its parts —
    the box/text overlay, its alpha mask, and the chosen width/height."""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"extras": ("IDEOGRAM_EXTRAS",)}}

    RETURN_TYPES = ("IMAGE", "MASK", "INT", "INT")
    RETURN_NAMES = ("overlay", "alpha", "width", "height")
    FUNCTION = "run"
    CATEGORY = "Ideogram"
    DESCRIPTION = "Break out the Ideogram Studio 'extras' output into overlay (IMAGE), alpha (MASK), width and height."

    def run(self, extras=None, **kwargs):
        e = extras if isinstance(extras, dict) else {}
        return (e.get("overlay"), e.get("alpha"), int(e.get("width") or 1024), int(e.get("height") or 1024))


NODE_CLASS_MAPPINGS = {
    "IdeogramOverride": IdeogramOverride,
    "IdeogramExtras": IdeogramExtras,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "IdeogramOverride": "Ideogram Studio Override",
    "IdeogramExtras": "Ideogram Studio Extras",
}
