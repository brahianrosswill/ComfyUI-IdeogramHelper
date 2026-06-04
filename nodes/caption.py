"""Canonical Ideogram 4 caption serialization + validation.

Mirrors the schema in ``reference/ideogram4/docs/prompting.md``:

* ``high_level_description`` (optional str)
* ``style_description`` (optional object, strict key order, exactly one of
  ``photo`` / ``art_style``)
* ``compositional_deconstruction`` (required object with ``background`` then
  ``elements``)

The Vue studio sends a structured dict; this module is the single source of
truth that emits the exact wire format the model was trained on (strict key
order, uppercase ``#RRGGBB`` hex, ``separators=(",", ":")``,
``ensure_ascii=False``) and produces human-readable warnings, the same way
``CaptionVerifier`` does in the reference repo.
"""

from __future__ import annotations

import json
import re
from typing import Any

HEX_RE = re.compile(r"^#[0-9A-F]{6}$")

# Strict key orders straight from the prompting guide.
STYLE_ORDER_PHOTO = ["aesthetics", "lighting", "photo", "medium", "color_palette"]
STYLE_ORDER_ART = ["aesthetics", "lighting", "medium", "art_style", "color_palette"]
ELEMENT_ORDER_OBJ = ["type", "bbox", "desc", "color_palette"]
ELEMENT_ORDER_TEXT = ["type", "bbox", "text", "desc", "color_palette"]


def _clean_hex_list(values: Any, limit: int, warnings: list[str], where: str) -> list[str] | None:
    if not values:
        return None
    out: list[str] = []
    for raw in values:
        if not isinstance(raw, str):
            continue
        h = raw.strip().upper()
        if h.startswith("#") and len(h) == 4:  # #RGB shorthand -> #RRGGBB
            h = "#" + "".join(c * 2 for c in h[1:])
        if not HEX_RE.match(h):
            warnings.append(f"{where}: dropped invalid hex color {raw!r} (need uppercase #RRGGBB)")
            continue
        out.append(h)
    if len(out) > limit:
        warnings.append(f"{where}: {len(out)} colors exceeds max {limit}; truncated")
        out = out[:limit]
    return out or None


def _ordered(src: dict, order: list[str]) -> dict:
    """Return a new dict with keys from ``order`` that are present in ``src``,
    in canonical order, followed by any unexpected keys (so nothing is lost)."""
    out: dict[str, Any] = {}
    for k in order:
        if k in src and src[k] not in (None, "", []):
            out[k] = src[k]
    return out


def build_caption(data: dict, warnings: list[str] | None = None) -> dict:
    """Normalize a loose studio dict into a canonical, key-ordered caption dict."""
    warnings = warnings if warnings is not None else []
    out: dict[str, Any] = {}

    hld = (data.get("high_level_description") or "").strip()
    if hld:
        out["high_level_description"] = hld
    else:
        warnings.append("high_level_description is empty (strongly recommended)")

    # --- style_description -------------------------------------------------
    style = data.get("style_description") or {}
    if style:
        has_photo = bool((style.get("photo") or "").strip())
        has_art = bool((style.get("art_style") or "").strip())
        if has_photo and has_art:
            warnings.append("style_description has both 'photo' and 'art_style'; keeping 'photo' only")
            has_art = False
        if not has_photo and not has_art:
            warnings.append("style_description present but missing one of 'photo' / 'art_style'")

        order = STYLE_ORDER_PHOTO if has_photo else STYLE_ORDER_ART
        s: dict[str, Any] = {}
        for k in ("aesthetics", "lighting", "medium"):
            v = (style.get(k) or "").strip()
            if v:
                s[k] = v
            else:
                warnings.append(f"style_description.{k} is required when style_description is present")
        if has_photo:
            s["photo"] = style["photo"].strip()
        elif has_art:
            s["art_style"] = style["art_style"].strip()
        palette = _clean_hex_list(style.get("color_palette"), 16, warnings, "style_description.color_palette")
        if palette:
            s["color_palette"] = palette
        out["style_description"] = _ordered(s, order)

    # --- compositional_deconstruction (required) ---------------------------
    comp = data.get("compositional_deconstruction") or {}
    background = (comp.get("background") or "").strip()
    if not background:
        warnings.append("compositional_deconstruction.background is required")
    raw_elements = comp.get("elements") or []

    elements: list[dict] = []
    for i, el in enumerate(raw_elements):
        etype = el.get("type", "obj")
        if etype not in ("obj", "text"):
            warnings.append(f"elements[{i}]: unknown type {etype!r}; treating as 'obj'")
            etype = "obj"
        e: dict[str, Any] = {"type": etype}

        bbox = el.get("bbox")
        if bbox:
            e["bbox"] = _clean_bbox(bbox, i, warnings)

        if etype == "text":
            text = (el.get("text") or "").strip()
            if not text:
                warnings.append(f"elements[{i}]: type 'text' has no 'text' to render")
            e["text"] = text
        desc = (el.get("desc") or "").strip()
        if not desc:
            warnings.append(f"elements[{i}]: 'desc' is empty")
        e["desc"] = desc

        palette = _clean_hex_list(el.get("color_palette"), 5, warnings, f"elements[{i}].color_palette")
        if palette:
            e["color_palette"] = palette

        order = ELEMENT_ORDER_TEXT if etype == "text" else ELEMENT_ORDER_OBJ
        elements.append(_ordered(e, order))

    out["compositional_deconstruction"] = {"background": background, "elements": elements}
    return out


def _clean_bbox(bbox: Any, idx: int, warnings: list[str]) -> list[int]:
    try:
        y0, x0, y1, x1 = (int(round(float(v))) for v in bbox)
    except (TypeError, ValueError):
        warnings.append(f"elements[{idx}]: malformed bbox {bbox!r}; dropping")
        return []
    y0, y1 = sorted((max(0, min(1000, y0)), max(0, min(1000, y1))))
    x0, x1 = sorted((max(0, min(1000, x0)), max(0, min(1000, x1))))
    return [y0, x0, y1, x1]


def serialize_caption(data: dict) -> tuple[str, list[str]]:
    """Return (minified JSON string, warnings) in the model's wire format."""
    warnings: list[str] = []
    caption = build_caption(data, warnings)
    text = json.dumps(caption, separators=(",", ":"), ensure_ascii=False)
    return text, warnings
