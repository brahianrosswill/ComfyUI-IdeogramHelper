"""Ideogram Studio BBox Select — pick boxes from the studio's bboxes by 1-based element number."""

from __future__ import annotations

import re

from comfy_api.latest import io


def _parse_ids(spec: str) -> list[int]:
    """Parse a 1-based selection like "1, 3, 5-7" to [1, 3, 5, 6, 7] (ranges either order, de-duped)."""
    out: list[int] = []
    seen: set[int] = set()
    for tok in (spec or "").replace(";", ",").split(","):
        tok = tok.strip()
        if not tok:
            continue
        m = re.match(r"^(\d+)\s*-\s*(\d+)$", tok)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            rng = range(a, b + 1) if a <= b else range(a, b - 1, -1)
        elif tok.isdigit():
            rng = (int(tok),)
        else:
            continue
        for i in rng:
            if i >= 1 and i not in seen:
                seen.add(i)
                out.append(i)
    return out


class IdeogramBBoxSelect(io.ComfyNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return io.Schema(
            node_id="IdeogramBBoxSelect",
            display_name="Ideogram Studio BBox Select",
            category="Ideogram",
            description="Select bounding boxes from the studio's 'bboxes' output by the element number shown in the studio (1-based). e.g. '1, 3, 5-7'. Blank = all.",
            inputs=[
                io.BoundingBox.Input("bboxes", force_input=True),
                io.String.Input("ids", default="", tooltip="Element numbers as shown in the studio (1-based), e.g. '1, 3, 5-7'. Blank = all."),
            ],
            outputs=[io.BoundingBox.Output(display_name="bboxes")],
        )

    @classmethod
    def execute(cls, bboxes, ids="") -> io.NodeOutput:
        # normalise to list[list[dict]] (per-frame), tolerating a single box or flat list
        if isinstance(bboxes, dict):
            frames = [[bboxes]]
        elif not isinstance(bboxes, list) or not bboxes:
            frames = []
        elif isinstance(bboxes[0], dict):
            frames = [bboxes]
        else:
            frames = bboxes

        wanted = _parse_ids(ids)
        if not wanted:
            return io.NodeOutput(frames)  # blank passes everything through

        out = [[f[i - 1] for i in wanted if 1 <= i <= len(f)] for f in frames]
        return io.NodeOutput(out)
