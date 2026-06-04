# ComfyUI-IdeogramHelper

A visual **studio** for composing [Ideogram 4](https://developer.ideogram.ai)
structured-JSON box prompts inside ComfyUI — drag boxes on a canvas, write into
them, and get the exact wire-format caption plus an overlay you can composite
over your result.

![Ideogram Studio — bbox canvas, style panel, live JSON, and the overlay composited over the generation](.github/assets/example.jpg)

Ideogram 4 is trained on structured JSON captions: a `high_level_description`, a
`style_description`, and a `compositional_deconstruction` of bounding-boxed
`elements`. Writing that by hand is tedious — this studio makes it visual.

## Install

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/nynxz/ComfyUI-IdeogramHelper
```

The frontend ships pre-built in `js/`. Restart ComfyUI, then add
**Ideogram → Ideogram Studio**.

## Quick start

1. Drop an **Ideogram Studio** node.
2. Pick a **format** (1:1, 16:9, …) — the canvas and overlay use it.
3. **Drag on empty canvas** to add a box; drag a box to move it, drag a handle to
   resize. Toggle each box between **object** and **text**.
4. Fill in the **high-level description**, **background**, per-box **descriptions**
   (and literal **text** for text boxes), and the **style panel**.
5. Wire **`caption`** into your Ideogram sampler's prompt.
6. (Optional) Composite **`overlay`** over the generated image with
   **ImageCompositeMasked** (using **`alpha`** as the mask) to check whether the
   model placed things where your boxes were — that's the right-hand side of the
   screenshot above.

## The node — `Ideogram Studio`

It has **no widget inputs** — everything (format/resolution and overlay style) is
set inside the studio UI, so nothing is configured in two places.

| Port | Type | Notes |
| :--- | :--- | :--- |
| `studio` (widget) | — | The in-node Vue editor; all settings live here. |
| `caption` (out) | `STRING` | Minified canonical JSON caption — wire into any Ideogram sampler. |
| `overlay` (out) | `IMAGE` | Boxes + labels + literal text rasterized at the chosen resolution. |
| `alpha` (out) | `MASK` | Alpha of the overlay — use as the mask when compositing. |

## Features

- **Modeless bbox canvas** on 0–1000 normalized coords (origin top-left,
  `bbox = [y_min, x_min, y_max, x_max]`, exactly per the spec): drag empty space
  to add, drag a box to move, drag a handle to resize.
- **Object** and **text** elements — text boxes carry the literal `text` to
  render plus a `desc`.
- **Per-element colors** (auto-assigned, overridable) so overlapping boxes stay
  readable; the rendered overlay draws outlines in passes so nothing is hidden.
- **Mute** any element (👁) to keep it in the editor but exclude it from the
  caption and overlay — no need to delete.
- **Linked boxes** — share a prompt across copies while keeping their own
  position; edit one and the group updates.
- **Style panel** — photo vs. art mode with the correct required fields and
  **strict key ordering**, plus image- and per-element **color palettes** (hex,
  normalized to uppercase `#RRGGBB`).
- **Live JSON preview** with **CaptionVerifier-style warnings**, **undo/redo**,
  and a **format/resolution** picker (+ ⚙ Advanced: line width, fill, label size).

The Python side (`nodes/caption.py`) is the **authoritative serializer**: it
re-emits the caption with strict key order, normalized hex, and
`separators=(",", ":")` / `ensure_ascii=False`, matching the schema in
`reference/ideogram4/docs/prompting.md`. Muted/editor-only fields (box color,
links) never enter the caption.

## Development (frontend)

```bash
npm install        # or reuse a sibling node's node_modules
npm run build      # -> js/main.js   (vite lib build)
npm run dev        # watch mode
```

Hard-refresh the browser after a frontend build; restart ComfyUI after Python
changes (node definitions load at startup).
