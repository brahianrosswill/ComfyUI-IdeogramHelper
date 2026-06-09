"""Override-bundle helpers shared by the Override nodes and the Studio node."""

from __future__ import annotations

import re

_HEX = re.compile(r"^#[0-9A-F]{6}$")


def parse_colors(s: str, limit: int = 16) -> list[str]:
    """Comma-separated hex to normalized #RRGGBB; invalid dropped, capped at limit."""
    out: list[str] = []
    for raw in (s or "").split(","):
        h = raw.strip().upper()
        if not h:
            continue
        if not h.startswith("#"):
            h = "#" + h
        if len(h) == 4:  # #RGB to #RRGGBB
            h = "#" + "".join(c * 2 for c in h[1:])
        if _HEX.match(h):
            out.append(h)
    return out[:limit]


def apply_override(data: dict, ov: dict | None) -> dict:
    """Apply an override bundle onto a caption dict. width/height are handled by the studio."""
    if not isinstance(ov, dict) or not ov:
        return data
    data = dict(data) if isinstance(data, dict) else {}

    if ov.get("high_level_description"):
        data["high_level_description"] = ov["high_level_description"]

    comp = dict(data.get("compositional_deconstruction") or {})
    comp_changed = False

    if ov.get("background"):
        comp["background"] = ov["background"]
        comp_changed = True

    # per-element overrides {1-based index: {field: value}}; indices count
    # elements as they appear in the output (muted ones aren't in the caption)
    elements_ov = ov.get("elements")
    if isinstance(elements_ov, dict) and elements_ov:
        els = list(comp.get("elements") or [])
        for idx, patch in elements_ov.items():
            try:
                i = int(idx) - 1
            except (TypeError, ValueError):
                continue
            if 0 <= i < len(els) and isinstance(patch, dict):
                el = dict(els[i])
                for k, v in patch.items():
                    if v in (None, ""):
                        continue
                    if k == "text" and el.get("type") != "text":
                        continue  # no text on a non-text element
                    el[k] = v
                els[i] = el
        comp["elements"] = els
        comp_changed = True

    # append: brand-new elements (each with its own bbox), added to the output
    appended = ov.get("append")
    if isinstance(appended, list) and appended:
        els = list(comp.get("elements") or [])
        for el in appended:
            if isinstance(el, dict) and isinstance(el.get("bbox"), (list, tuple)):
                els.append(dict(el))
        comp["elements"] = els
        comp_changed = True

    if comp_changed:
        data["compositional_deconstruction"] = comp

    style = ov.get("style")
    if isinstance(style, dict) and style:
        sd = dict(data.get("style_description") or {})
        for k, v in style.items():
            if v not in (None, "", []):
                sd[k] = v
        data["style_description"] = sd

    return data


def merge_overrides(bundles) -> dict:
    """Deep-merge override bundles: scalars take the last value; style and per-index element patches merge."""
    out: dict = {}
    for b in bundles:
        if not isinstance(b, dict):
            continue
        for k, v in b.items():
            if k == "elements" and isinstance(v, dict):
                els = out.setdefault("elements", {})
                for idx, patch in v.items():
                    if isinstance(patch, dict):
                        els.setdefault(idx, {}).update(patch)
            elif k == "append" and isinstance(v, list):
                out.setdefault("append", []).extend(v)
            elif k == "style" and isinstance(v, dict):
                out.setdefault("style", {}).update(v)
            else:
                out[k] = v
    return out
