/**
 * Mount a standalone Vue app inside a `node.addDOMWidget` container.
 *
 * Mirrors the ComfyUI-ETK pattern (the canonical approach for Frontend
 * 1.33.9+). `addDOMWidget` rewrites `widget.value` into a getter/setter that
 * delegates to `options.getValue()` / `options.setValue(v)`. Without those,
 * every `widget.value = X` from a Vue component is a silent no-op and reads
 * return `''`. So we back the widget with closure-local storage and expose it
 * through the option accessors, and override `serializeValue` so the host
 * pulls the current value at prompt-queue time.
 */

import { createApp, type Component, type App as VueApp } from 'vue'

export interface DOMWidget {
  name: string
  type: string
  value: unknown
  options?: Record<string, unknown>
  callback?: (value: unknown) => void
  onRemove?: () => void
  serializeValue?: () => unknown
}

interface NodeLike {
  id: number | string
  addDOMWidget: (
    name: string,
    type: string,
    el: HTMLElement,
    options?: Record<string, unknown>,
  ) => DOMWidget
}

export interface MountOptions {
  widgetName: string
  widgetType: string
  component: Component
  minHeight?: number
  serialize?: boolean
  defaultValue?: unknown
}

const liveApps = new WeakMap<DOMWidget, VueApp>()

export function mountWidget(node: NodeLike, opts: MountOptions): { widget: DOMWidget } {
  const container = document.createElement('div')
  container.dataset['ideogram'] = opts.widgetType
  Object.assign(container.style, {
    width: '100%',
    height: '100%',
    minHeight: `${opts.minHeight ?? 80}px`,
    overflow: 'hidden',
    pointerEvents: 'auto',
  })

  // Closure storage — addDOMWidget routes widget.value through these.
  let storedValue: unknown = opts.defaultValue

  const widget = node.addDOMWidget(opts.widgetName, opts.widgetType, container, {
    getMinHeight: () => opts.minHeight ?? 80,
    hideOnZoom: false,
    serialize: opts.serialize ?? true,
    getValue: () => storedValue,
    setValue: (v: unknown) => {
      storedValue = v
    },
  })

  widget.serializeValue = () => storedValue

  // Defer mount one microtask so the host inserts the container first.
  Promise.resolve().then(() => {
    try {
      const vueApp = createApp(opts.component, { widget, node })
      vueApp.mount(container)
      liveApps.set(widget, vueApp)
    } catch (err) {
      console.error('[IdeogramStudio] failed to mount Vue widget', opts.widgetType, err)
    }
  })

  const previousOnRemove = widget.onRemove
  widget.onRemove = () => {
    try {
      const live = liveApps.get(widget)
      if (live) {
        live.unmount()
        liveApps.delete(widget)
      }
    } catch (err) {
      console.error('[IdeogramStudio] error during widget unmount', err)
    }
    // Call bound to the widget — the base onRemove does
    // `unregisterWidget(this.id)`, so an unbound call throws on this.id.
    try {
      previousOnRemove?.call(widget)
    } catch (err) {
      console.error('[IdeogramStudio] error in chained onRemove', err)
    }
  }

  return { widget }
}
