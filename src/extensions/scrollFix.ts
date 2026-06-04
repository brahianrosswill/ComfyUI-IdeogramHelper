/**
 * Scroll fix for the Ideogram Studio widget (adapted from ComfyUI-ETK).
 *
 * LiteGraph attaches a capture-phase wheel listener for graph zoom/pan, so
 * scrolling inside our DOM widget (the elements list, the JSON preview, a
 * textarea) just zooms the canvas behind it. We:
 *
 *  1. Patch `canvas._mousewheel_callback` to early-return when the wheel
 *     target is inside our widget (marked `data-ideogram` by mountWidget).
 *  2. Install a capture-phase document wheel listener that manually scrolls
 *     the nearest scrollable ancestor inside the widget and stops the event.
 */

import { app } from '@comfy/app'

const SEL = '[data-ideogram]'

function inWidget(e: Event): boolean {
  const t = e.target as Element | null
  return !!(t && typeof t.closest === 'function' && t.closest(SEL))
}

function findScrollable(start: Element): HTMLElement | null {
  const root = start.closest(SEL)
  if (!root) return null
  let el: Element | null = start
  while (el && el !== root.parentElement) {
    if (el instanceof HTMLElement) {
      if (el.tagName === 'TEXTAREA') return el
      const s = getComputedStyle(el)
      const vy = (s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight
      const vx = (s.overflowX === 'auto' || s.overflowX === 'scroll') && el.scrollWidth > el.clientWidth
      if (vy || vx) return el
    }
    el = el.parentElement
  }
  return null
}

document.addEventListener(
  'wheel',
  (e: WheelEvent) => {
    if (!inWidget(e)) return
    const start = e.target as Element | null
    if (!start) return
    const el = findScrollable(start)
    if (!el) return
    if (el.tagName === 'TEXTAREA') {
      e.stopPropagation()
      e.stopImmediatePropagation()
      return
    }
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    el.scrollTop += e.deltaY
    el.scrollLeft += e.deltaX
  },
  { capture: true, passive: false },
)

interface PatchableCanvas {
  _mousewheel_callback?: (e: WheelEvent) => void
  canvas?: HTMLCanvasElement
}

function patchCanvasWheel(): boolean {
  const canvas = (app as { canvas?: PatchableCanvas }).canvas
  if (!canvas) return false
  const oldCb = canvas._mousewheel_callback
  const targetEl = canvas.canvas
  if (!oldCb || !targetEl || typeof targetEl.addEventListener !== 'function') return false
  try {
    targetEl.removeEventListener('wheel', oldCb)
  } catch {
    /* ignore */
  }
  const wrapped = (e: WheelEvent) => {
    if (inWidget(e)) return
    oldCb.call(canvas, e)
  }
  canvas._mousewheel_callback = wrapped
  targetEl.addEventListener('wheel', wrapped, { passive: false })
  return true
}

app.registerExtension({
  name: 'nynxz.ideogram-studio.scrollFix',
  async setup() {
    for (let i = 0; i < 8; i++) {
      if (patchCanvasWheel()) return
      await new Promise((r) => setTimeout(r, 250))
    }
    console.warn('[IdeogramStudio] could not patch canvas wheel; relying on document capture listener')
  },
})
