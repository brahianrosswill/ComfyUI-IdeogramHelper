"""HTTP routes (under /ideogramhelper/) backing the Browser frontend."""

from __future__ import annotations

import base64
import io as _io
import json
import os
import re

from aiohttp import web
from PIL import Image as PILImage

try:
    from server import PromptServer
    _routes = PromptServer.instance.routes
except Exception as e:  # pragma: no cover
    PromptServer = None
    _routes = None
    print(f"[IdeogramHelper] studio routes unavailable: {e}")

from ..utils.caption import validate_caption
from ..utils.overlay import global_palette, items_from_caption, render_overlay_rgba

_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".tif", ".avif"}
_PREVIEW_SIZE = 384


def _safe_path(dirpath: str, name: str) -> str:
    """Resolve name within dirpath, rejecting path traversal."""
    base = os.path.realpath(dirpath)
    full = os.path.realpath(os.path.join(base, name))
    if full != base and not full.startswith(base + os.sep):
        raise ValueError("path escapes directory")
    return full


def _list_images(dirpath: str) -> list[str]:
    if not dirpath or not os.path.isdir(dirpath):
        return []
    names = [
        f for f in os.listdir(dirpath)
        if os.path.splitext(f)[1].lower() in _IMAGE_EXTS
        and os.path.isfile(os.path.join(dirpath, f))
    ]
    return sorted(names)


def _composite_preview(path: str, data: dict, size: int = _PREVIEW_SIZE) -> str:
    """Render bboxes over a resized copy of the image as a JPEG data-uri."""
    img = PILImage.open(path).convert("RGBA")
    w, h = img.size
    longest = max(w, h)
    if size > 0 and longest > size:
        scale = size / longest
        img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), PILImage.LANCZOS)
    W, H = img.size
    overlay = render_overlay_rgba(items_from_caption(data), W, H, global_palette=global_palette(data))
    comp = PILImage.alpha_composite(img, overlay).convert("RGB")
    buf = _io.BytesIO()
    comp.save(buf, format="JPEG", quality=85)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


def _preview_from_json(data: dict, width: int = 768, height: int = 768) -> str:
    """Render bboxes over a dark backdrop (no source image) as a data-uri."""
    width, height = max(1, int(width)), max(1, int(height))
    bg = PILImage.new("RGBA", (width, height), (18, 18, 22, 255))
    overlay = render_overlay_rgba(items_from_caption(data), width, height, global_palette=global_palette(data))
    comp = PILImage.alpha_composite(bg, overlay).convert("RGB")
    buf = _io.BytesIO()
    comp.save(buf, format="JPEG", quality=85)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


def _library_dir() -> str:
    """Managed library folder for saved bbox templates; created on use."""
    base = None
    try:
        import folder_paths
        for getter in ("get_user_directory", "get_output_directory"):
            fn = getattr(folder_paths, getter, None)
            if callable(fn):
                base = fn()
                break
        if base is None:
            base = getattr(folder_paths, "base_path", None)
    except Exception:
        base = None
    if not base:
        base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    d = os.path.join(base, "ideogram_library")
    os.makedirs(d, exist_ok=True)
    return d


def _list_json(dirpath: str) -> list[str]:
    """Standalone .json files with no matching image (bbox templates)."""
    if not dirpath or not os.path.isdir(dirpath):
        return []
    img_stems = {os.path.splitext(f)[0] for f in _list_images(dirpath)}
    out = []
    for f in os.listdir(dirpath):
        if f.lower().endswith(".json") and os.path.isfile(os.path.join(dirpath, f)):
            if os.path.splitext(f)[0] not in img_stems:
                out.append(f)
    return sorted(out)


if _routes is not None:

    @_routes.get("/ideogramhelper/thumb")
    async def idg_thumb(request):
        d = request.rel_url.query.get("dir", "").strip()
        name = request.rel_url.query.get("name", "").strip()
        try:
            size = int(request.rel_url.query.get("size", "256"))
        except ValueError:
            size = 256
        try:
            path = _safe_path(d, name)
        except ValueError:
            return web.Response(status=400, text="bad path")
        if not os.path.isfile(path):
            return web.Response(status=404, text="not found")
        try:
            img = PILImage.open(path).convert("RGB")
            w, h = img.size
            longest = max(w, h)
            if longest > size:
                scale = size / longest
                img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), PILImage.LANCZOS)
            buf = _io.BytesIO()
            img.save(buf, format="JPEG", quality=85)
            return web.Response(body=buf.getvalue(), content_type="image/jpeg",
                                headers={"Cache-Control": "no-cache"})
        except Exception as e:
            return web.Response(status=500, text=str(e))

    @_routes.post("/ideogramhelper/preview")
    async def idg_preview(request):
        """Render bbox preview for a JSON caption plus validity."""
        try:
            body = await request.json()
        except json.JSONDecodeError:
            return web.json_response({"error": "invalid json"}, status=400)
        text = body.get("json") or ""
        width = int(body.get("width") or 768)
        height = int(body.get("height") or 768)
        d = (body.get("dir") or "").strip()
        name = (body.get("name") or "").strip()
        try:
            data = json.loads(text) if text.strip() else {}
        except json.JSONDecodeError as e:
            return web.json_response({"error": f"caption is not valid JSON — {e}"}, status=400)
        errors, warnings = validate_caption(data) if isinstance(data, dict) else (["not a JSON object"], [])
        safe = isinstance(data, dict)
        preview = ""
        try:
            # Composite over the source image when known, else a dark backdrop.
            img_path = None
            if d and name:
                try:
                    p = _safe_path(d, name)
                    if os.path.isfile(p):
                        img_path = p
                except ValueError:
                    img_path = None
            preview = _composite_preview(img_path, data if safe else {}) if img_path else _preview_from_json(data if safe else {}, width, height)
        except Exception as e:
            print(f"[IdeogramHelper] preview failed: {e}")
        return web.json_response({"preview": preview, "valid": not errors, "errors": errors, "warnings": warnings})

    @_routes.post("/ideogramhelper/save_template")
    async def idg_save_template(request):
        """Write a single caption to {out_dir}/{name}.json."""
        try:
            body = await request.json()
        except json.JSONDecodeError:
            return web.json_response({"error": "invalid json"}, status=400)
        out_dir = (body.get("out_dir") or "").strip()
        name = (body.get("name") or "").strip()
        text = body.get("json") or ""
        if not name:
            return web.json_response({"error": "name is required"}, status=400)
        if not out_dir:
            out_dir = _library_dir()
        try:
            data = json.loads(text)
        except json.JSONDecodeError as e:
            return web.json_response({"error": f"caption is not valid JSON — {e}"}, status=400)
        stem = os.path.splitext(name)[0]
        if os.path.basename(stem) != stem:
            return web.json_response({"error": "name must not contain path separators"}, status=400)
        overwrite = bool(body.get("overwrite", False))
        try:
            os.makedirs(out_dir, exist_ok=True)
            path = os.path.join(out_dir, stem + ".json")
            # On name collision, roll to the next free numbered variant.
            if not overwrite and os.path.exists(path):
                m = re.match(r"^(.*?)(\d+)$", stem)
                if m:
                    base, num, width = m.group(1), int(m.group(2)), len(m.group(2))
                else:
                    base, num, width = stem + "_", 0, 3
                while os.path.exists(path):
                    num += 1
                    stem = f"{base}{str(num).zfill(width)}"
                    path = os.path.join(out_dir, stem + ".json")
            with open(path, "w", encoding="utf-8") as f:
                f.write(json.dumps(data, ensure_ascii=False, indent=2))
            # optional reference thumbnail sidecar ({stem}.thumb.jpg)
            thumb = body.get("thumb") or ""
            if isinstance(thumb, str) and thumb.startswith("data:"):
                try:
                    raw = base64.b64decode(thumb.split(",", 1)[1])
                    with open(os.path.join(out_dir, stem + ".thumb.jpg"), "wb") as tf:
                        tf.write(raw)
                except Exception:
                    pass
        except Exception as e:
            return web.json_response({"error": str(e)}, status=500)
        return web.json_response({"ok": True, "path": path, "name": stem})

    @_routes.post("/ideogramhelper/delete_template")
    async def idg_delete_template(request):
        """Delete a library template ({stem}.json + optional {stem}.thumb.jpg)."""
        try:
            body = await request.json()
        except json.JSONDecodeError:
            return web.json_response({"error": "invalid json"}, status=400)
        stem = os.path.splitext((body.get("name") or "").strip())[0]
        if not stem or os.path.basename(stem) != stem:
            return web.json_response({"error": "bad name"}, status=400)
        d = _library_dir()
        removed = []
        for suffix in (".json", ".thumb.jpg"):
            p = os.path.join(d, stem + suffix)
            if os.path.isfile(p):
                try:
                    os.remove(p)
                    removed.append(os.path.basename(p))
                except Exception as e:
                    return web.json_response({"error": str(e)}, status=500)
        if not removed:
            return web.json_response({"error": "not found"}, status=404)
        return web.json_response({"ok": True, "removed": removed})

    @_routes.get("/ideogramhelper/library")
    async def idg_library(request):
        """List saved bbox templates from the default managed library folder."""
        d = _library_dir()
        templates = []
        for name in _list_json(d):
            stem = os.path.splitext(name)[0]
            caption = ""
            try:
                with open(os.path.join(d, name), encoding="utf-8") as f:
                    caption = f.read()
            except Exception:
                caption = ""
            has_thumb = os.path.isfile(os.path.join(d, stem + ".thumb.jpg"))
            templates.append({"name": name, "stem": stem, "caption": caption, "thumb": has_thumb})
        return web.json_response({"dir": d, "templates": templates})

    print("[IdeogramHelper] studio routes registered under /ideogramhelper/")
