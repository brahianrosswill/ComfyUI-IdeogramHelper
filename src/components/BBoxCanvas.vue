<template>
  <div class="canvas-wrap">
    <div class="toolbar" @pointerdown.stop>
      <span class="lbl">new box:</span>
      <div class="seg">
        <button :class="{ on: newType === 'obj' }" title="New boxes are objects" @click="newType = 'obj'">obj</button>
        <button :class="{ on: newType === 'text' }" title="New boxes are text" @click="newType = 'text'">text</button>
      </div>
      <span class="dims">{{ store.state.width }}×{{ store.state.height }}</span>
      <button class="ghost" :class="{ on: showLabels }" title="Toggle labels" @click="showLabels = !showLabels">⌗ labels</button>
    </div>

    <div
      ref="stage"
      class="stage"
      :class="{ dragging: !!drag }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @lostpointercapture="onPointerUp"
      :style="stageStyle"
    >
      <div class="grid"></div>

      <div
        v-for="(el, i) in boxed"
        :key="el.id"
        class="box"
        :class="{ sel: el.id === store.selectedId, muted: el.enabled === false }"
        :style="boxStyle(el)"
        :data-box="el.id"
      >
        <span v-if="showLabels" class="tag" :style="tagStyle(el)">
          {{ el.linkId ? '🔗' : (el.type === 'text' ? 'T' : '▣') }} {{ i + 1 }} · {{ el.type === 'text' ? (el.text || 'text') : (el.desc || 'obj') }}
        </span>
        <template v-if="el.id === store.selectedId">
          <i v-for="hdl in HANDLES" :key="hdl" :class="['h', 'h-' + hdl]" :data-handle="hdl"></i>
        </template>
      </div>

      <div v-if="draft" class="box draft" :style="boxStyle({ bbox: draft, boxColor: '#9ca3af' })"></div>
    </div>
    <div class="coordhint">{{ hint }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStudioStore } from '@/lib/store'
import type { CaptionElement } from '@/lib/caption'

const store = useStudioStore()

const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const
type Handle = (typeof HANDLES)[number]
type Bbox = [number, number, number, number]

const newType = ref<'obj' | 'text'>('obj')
const showLabels = ref(true)
const stage = ref<HTMLElement | null>(null)
const draft = ref<Bbox | null>(null)
const hint = ref('drag on empty space to add a box · drag a box to move · drag a handle to resize')

const boxed = computed(() => store.state.elements.filter((e) => e.bbox))

const stageStyle = computed(() => ({ aspectRatio: `${store.state.width} / ${store.state.height}` }))

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) || 0
  const g = parseInt(h.slice(2, 4), 16) || 0
  const b = parseInt(h.slice(4, 6), 16) || 0
  return `rgba(${r},${g},${b},${a})`
}

// bbox = [y0, x0, y1, x1] in 0..1000
function boxStyle(el: { bbox: Bbox; boxColor?: string }) {
  const [y0, x0, y1, x1] = el.bbox
  const color = el.boxColor || '#3b82f6'
  return {
    left: `${x0 / 10}%`,
    top: `${y0 / 10}%`,
    width: `${(x1 - x0) / 10}%`,
    height: `${(y1 - y0) / 10}%`,
    borderColor: color,
    // outline-first: no fill by default so overlapping boxes stay readable;
    // a faint tint appears on hover/selection (see CSS using --c).
    '--c': color,
    '--fill': hexToRgba(color, 0.16),
  }
}
function tagStyle(el: { boxColor?: string }) {
  return { background: hexToRgba(el.boxColor || '#3b82f6', 0.88), color: '#fff' }
}

const clamp = (v: number) => Math.max(0, Math.min(1000, Math.round(v)))
function pointToCoords(ev: PointerEvent): { x: number; y: number } {
  const r = stage.value!.getBoundingClientRect()
  return {
    x: clamp(((ev.clientX - r.left) / r.width) * 1000),
    y: clamp(((ev.clientY - r.top) / r.height) * 1000),
  }
}

// ---- one unified pointer session (mirrors ETK's capture pattern) -------
interface DragSession {
  kind: 'draw' | 'move' | 'resize'
  el?: CaptionElement
  handle?: Handle
  startBbox?: Bbox
  start: { x: number; y: number }
  moved: boolean
}
let drag: DragSession | null = null

function onPointerDown(ev: PointerEvent) {
  // Keep LiteGraph from also dragging the node / panning the canvas.
  ev.preventDefault()
  ev.stopPropagation()
  try {
    stage.value!.setPointerCapture(ev.pointerId)
  } catch {
    /* best effort */
  }

  const target = ev.target as HTMLElement
  const handle = target.dataset.handle as Handle | undefined
  const boxId = target.closest('[data-box]')?.getAttribute('data-box') ?? undefined
  const start = pointToCoords(ev)

  if (handle && store.selectedId) {
    const el = store.getElement(store.selectedId)
    if (el?.bbox) {
      drag = { kind: 'resize', el, handle, start, moved: false }
      return
    }
  }
  if (boxId) {
    const el = store.getElement(boxId)
    store.select(boxId)
    if (el?.bbox) {
      drag = { kind: 'move', el, start, startBbox: [...el.bbox] as Bbox, moved: false }
      return
    }
  }
  // empty space → start drawing a new box
  draft.value = [start.y, start.x, start.y, start.x]
  drag = { kind: 'draw', start, moved: false }
}

function onPointerMove(ev: PointerEvent) {
  if (!drag) return
  ev.preventDefault()
  const p = pointToCoords(ev)
  if (Math.abs(p.x - drag.start.x) > 2 || Math.abs(p.y - drag.start.y) > 2) drag.moved = true

  if (drag.kind === 'draw') {
    draft.value = [Math.min(drag.start.y, p.y), Math.min(drag.start.x, p.x), Math.max(drag.start.y, p.y), Math.max(drag.start.x, p.x)]
    hint.value = bboxLabel(draft.value)
  } else if (drag.kind === 'move' && drag.el && drag.startBbox) {
    const dy = p.y - drag.start.y
    const dx = p.x - drag.start.x
    let [y0, x0, y1, x1] = drag.startBbox
    const h = y1 - y0
    const w = x1 - x0
    y0 = clamp(y0 + dy); x0 = clamp(x0 + dx)
    if (y0 + h > 1000) y0 = 1000 - h
    if (x0 + w > 1000) x0 = 1000 - w
    drag.el.bbox = [y0, x0, y0 + h, x0 + w]
    hint.value = bboxLabel(drag.el.bbox)
  } else if (drag.kind === 'resize' && drag.el?.bbox && drag.handle) {
    let [y0, x0, y1, x1] = drag.el.bbox
    if (drag.handle.includes('n')) y0 = Math.min(p.y, y1 - 2)
    if (drag.handle.includes('s')) y1 = Math.max(p.y, y0 + 2)
    if (drag.handle.includes('w')) x0 = Math.min(p.x, x1 - 2)
    if (drag.handle.includes('e')) x1 = Math.max(p.x, x0 + 2)
    drag.el.bbox = [y0, x0, y1, x1]
    hint.value = bboxLabel(drag.el.bbox)
  }
}

function onPointerUp(ev: PointerEvent) {
  if (!drag) return
  try {
    stage.value!.releasePointerCapture(ev.pointerId)
  } catch {
    /* fine */
  }
  if (drag.kind === 'draw') {
    const b = draft.value
    draft.value = null
    if (b && b[2] - b[0] >= 8 && b[3] - b[1] >= 8) {
      store.addElement(newType.value, b)
    } else if (!drag.moved) {
      store.select(null) // a plain click on empty canvas deselects
    }
  }
  drag = null
}

function bboxLabel(b: Bbox) {
  return `bbox [y${b[0]} x${b[1]} y${b[2]} x${b[3]}]  ·  ${b[3] - b[1]}×${b[2] - b[0]}`
}
</script>

<style scoped>
.canvas-wrap { display: flex; flex-direction: column; gap: 6px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.lbl { font-size: 11px; color: #999; }
.seg { display: flex; gap: 2px; }
.seg button, .ghost {
  background: #2a2a30; color: #ddd; border: 1px solid #3a3a44; border-radius: 5px;
  padding: 3px 8px; font-size: 11px; cursor: pointer;
}
.seg button.on { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.seg button.on.text, .seg button.text.on { background: #f59e0b; border-color: #f59e0b; color: #1a1a1a; }
.ghost.on { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.dims { font-size: 11px; color: #888; font-family: monospace; }

.stage {
  position: relative; width: 100%; background: #15151a;
  border: 1px solid #3a3a44; border-radius: 6px; overflow: hidden;
  background-image: linear-gradient(45deg, #1d1d22 25%, transparent 25%),
    linear-gradient(-45deg, #1d1d22 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #1d1d22 75%),
    linear-gradient(-45deg, transparent 75%, #1d1d22 75%);
  background-size: 18px 18px;
  background-position: 0 0, 0 9px, 9px -9px, -9px 0;
  touch-action: none; user-select: none; cursor: crosshair;
}
.stage.dragging { cursor: grabbing; }
.grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 10% 10%;
}
.box { position: absolute; border: 2px solid; box-sizing: border-box; cursor: move; background: transparent; transition: background .1s; }
.box:hover { background: var(--fill); }
.box.sel { background: var(--fill); box-shadow: 0 0 0 1px #fff, 0 0 10px rgba(0,0,0,.6); z-index: 5; }
.box.muted { opacity: 0.32; border-style: dashed; background: transparent !important; }
.box.muted .tag { opacity: 0.6; }
.box.draft { border-style: dashed; opacity: 0.8; pointer-events: none; background: rgba(156,163,175,.12); }
.tag {
  position: absolute; top: 0; left: 0; transform: translateY(-100%);
  font-size: 10px; line-height: 1.4; padding: 1px 5px; white-space: nowrap;
  max-width: 220px; overflow: hidden; text-overflow: ellipsis;
  border-radius: 3px 3px 0 0; pointer-events: none;
}
.h { position: absolute; width: 11px; height: 11px; background: #fff; border: 1px solid #333; border-radius: 2px; }
.h-nw { top: -6px; left: -6px; cursor: nwse-resize; }
.h-n  { top: -6px; left: 50%; margin-left: -5px; cursor: ns-resize; }
.h-ne { top: -6px; right: -6px; cursor: nesw-resize; }
.h-e  { top: 50%; right: -6px; margin-top: -5px; cursor: ew-resize; }
.h-se { bottom: -6px; right: -6px; cursor: nwse-resize; }
.h-s  { bottom: -6px; left: 50%; margin-left: -5px; cursor: ns-resize; }
.h-sw { bottom: -6px; left: -6px; cursor: nesw-resize; }
.h-w  { top: 50%; left: -6px; margin-top: -5px; cursor: ew-resize; }
.coordhint { font-size: 10px; color: rgba(255,255,255,.45); font-family: monospace; }
</style>
