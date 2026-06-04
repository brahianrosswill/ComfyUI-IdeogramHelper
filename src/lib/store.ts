import { reactive, inject, provide, type InjectionKey } from 'vue'
import { emptyState, newElement, newId, type CaptionElement, type CaptionState, type ElementType } from './caption'

// Fields that linked elements share. `bbox` is deliberately excluded so each
// linked copy keeps its own position.
export const SHARED_KEYS = ['type', 'desc', 'text', 'color_palette', 'boxColor'] as const

export interface StudioStore {
  state: CaptionState
  selectedId: string | null
  select(id: string | null): void
  addElement(type: ElementType, bbox?: CaptionElement['bbox']): CaptionElement
  removeElement(id: string): void
  duplicateElement(id: string): void
  toggleEnabled(id: string): void
  duplicateLinked(id: string): void
  unlink(id: string): void
  linkGroupSize(id: string): number
  setShared(id: string, key: (typeof SHARED_KEYS)[number], value: unknown): void
  moveElement(id: string, dir: -1 | 1): void
  getElement(id: string | null): CaptionElement | undefined
  load(s: Partial<CaptionState>): void
  // history
  _hist: string[]
  _hi: number
  restoring: boolean
  canUndo: boolean
  canRedo: boolean
  snapshot(): void
  _restore(snap: string): void
  undo(): void
  redo(): void
  resetHistory(): void
}

const KEY: InjectionKey<StudioStore> = Symbol('ideogram-studio')

export function createStudioStore(): StudioStore {
  const store = reactive({
    state: emptyState(),
    selectedId: null as string | null,

    // history (snapshots of JSON state)
    _hist: [] as string[],
    _hi: -1,
    restoring: false,
    get canUndo() {
      return store._hi > 0
    },
    get canRedo() {
      return store._hi >= 0 && store._hi < store._hist.length - 1
    },
    snapshot() {
      if (store.restoring) return
      const snap = JSON.stringify(store.state)
      if (store._hist[store._hi] === snap) return
      store._hist = store._hist.slice(0, store._hi + 1)
      store._hist.push(snap)
      if (store._hist.length > 80) store._hist.shift()
      store._hi = store._hist.length - 1
    },
    _restore(snap: string) {
      store.restoring = true
      const parsed = JSON.parse(snap) as CaptionState
      Object.assign(store.state, emptyState(), parsed)
      if (store.selectedId && !store.getElement(store.selectedId)) store.selectedId = null
      // allow the deep watcher to flush before re-arming snapshots
      setTimeout(() => {
        store.restoring = false
      }, 0)
    },
    undo() {
      if (!store.canUndo) return
      store._hi -= 1
      store._restore(store._hist[store._hi])
    },
    redo() {
      if (!store.canRedo) return
      store._hi += 1
      store._restore(store._hist[store._hi])
    },
    resetHistory() {
      store._hist = [JSON.stringify(store.state)]
      store._hi = 0
    },

    select(id: string | null) {
      store.selectedId = id
    },
    addElement(type: ElementType, bbox: CaptionElement['bbox'] = null) {
      const el = newElement(type, bbox)
      store.state.elements.push(el)
      store.selectedId = el.id
      return el
    },
    removeElement(id: string) {
      const i = store.state.elements.findIndex((e) => e.id === id)
      if (i >= 0) store.state.elements.splice(i, 1)
      if (store.selectedId === id) store.selectedId = null
    },
    duplicateElement(id: string) {
      const src = store.getElement(id)
      if (!src) return
      const copy = newElement(src.type, src.bbox ? ([...src.bbox] as any) : null)
      copy.desc = src.desc
      copy.text = src.text
      copy.color_palette = [...src.color_palette]
      if (copy.bbox) {
        // nudge so the duplicate is visible
        copy.bbox = copy.bbox.map((v, idx) => Math.max(0, Math.min(1000, v + (idx < 2 ? 20 : 20)))) as any
      }
      store.state.elements.push(copy)
      store.selectedId = copy.id
    },
    toggleEnabled(id: string) {
      const el = store.getElement(id)
      if (el) el.enabled = el.enabled === false
    },
    duplicateLinked(id: string) {
      const src = store.getElement(id)
      if (!src) return
      // Ensure the source belongs to a link group.
      if (!src.linkId) src.linkId = newId()
      const copy = newElement(src.type, src.bbox ? ([...src.bbox] as any) : null)
      copy.desc = src.desc
      copy.text = src.text
      copy.color_palette = [...src.color_palette]
      copy.boxColor = src.boxColor // linked copies share color
      copy.linkId = src.linkId
      if (copy.bbox) {
        copy.bbox = copy.bbox.map((v, idx) => Math.max(0, Math.min(1000, v + (idx < 2 ? 30 : 30)))) as any
      }
      store.state.elements.push(copy)
      store.selectedId = copy.id
    },
    unlink(id: string) {
      const el = store.getElement(id)
      if (el) el.linkId = null
    },
    linkGroupSize(id: string) {
      const el = store.getElement(id)
      if (!el?.linkId) return 1
      return store.state.elements.filter((e) => e.linkId === el.linkId).length
    },
    setShared(id: string, key: (typeof SHARED_KEYS)[number], value: unknown) {
      const el = store.getElement(id)
      if (!el) return
      const members = el.linkId
        ? store.state.elements.filter((e) => e.linkId === el.linkId)
        : [el]
      for (const m of members) (m as any)[key] = value
    },
    moveElement(id: string, dir: -1 | 1) {
      const i = store.state.elements.findIndex((e) => e.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= store.state.elements.length) return
      const arr = store.state.elements
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    },
    getElement(id: string | null) {
      return store.state.elements.find((e) => e.id === id)
    },
    load(s: Partial<CaptionState>) {
      Object.assign(store.state, emptyState(), s)
    },
  }) as StudioStore
  return store
}

export function provideStudioStore(store: StudioStore) {
  provide(KEY, store)
}

export function useStudioStore(): StudioStore {
  const s = inject(KEY)
  if (!s) throw new Error('StudioStore not provided')
  return s
}
