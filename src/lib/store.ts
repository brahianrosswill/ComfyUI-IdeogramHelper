import { reactive, inject, provide, type InjectionKey } from 'vue'
import { emptyState, emptyUi, newElement, newId, syncSeq, serialize, captionToState, parseCaptionLoose, aspectToWH, type CaptionElement, type CaptionState, type ElementType } from './caption'

// Bump the id sequence past existing ids so fresh ids can't collide after a load.
function _syncSeq(elements: CaptionElement[]) {
  syncSeq(elements.flatMap((e) => [e.id, e.linkId, e.groupId]))
}

// Fields linked elements share; bbox excluded so each copy keeps its position.
export const SHARED_KEYS = ['type', 'desc', 'text', 'color_palette', 'boxColor'] as const

// Clear linkId on a now-lone link member.
function _pruneLink(elements: CaptionElement[], groupId: string | null) {
  if (!groupId) return
  const members = elements.filter((e) => e.linkId === groupId)
  if (members.length === 1) members[0].linkId = null
}

// Clear groupId on a now-lone group member.
function _pruneGroup(elements: CaptionElement[], groupId: string | null) {
  if (!groupId) return
  const members = elements.filter((e) => e.groupId === groupId)
  if (members.length === 1) members[0].groupId = null
}

// Expand ids to include every co-member of any group they touch (deduped, ordered).
function _expandGroups(elements: CaptionElement[], ids: string[]): string[] {
  const gids = new Set<string>()
  for (const id of ids) {
    const g = elements.find((e) => e.id === id)?.groupId
    if (g) gids.add(g)
  }
  if (!gids.size) return ids
  const out: string[] = []
  const seen = new Set<string>()
  const push = (id: string) => {
    if (!seen.has(id)) { seen.add(id); out.push(id) }
  }
  for (const id of ids) {
    push(id)
    const g = elements.find((e) => e.id === id)?.groupId
    if (g) for (const e of elements) if (e.groupId === g) push(e.id)
  }
  return out
}

function _flipBbox(el: CaptionElement, axis: 'h' | 'v') {
  if (!el.bbox) return
  const [y0, x0, y1, x1] = el.bbox
  el.bbox = axis === 'h' ? [y0, 1000 - x1, y1, 1000 - x0] : [1000 - y1, x0, 1000 - y0, x1]
}

// Clipboard entry; transient, not serialized.
export interface ClipItem {
  type: ElementType
  bbox: [number, number, number, number] | null
  desc: string
  text: string
  color_palette: string[]
  boxColor: string
  grouped: boolean
}

export interface StudioStore {
  state: CaptionState
  selectedIds: string[]
  selectedId: string | null // primary (last-selected); what the editor edits
  isSelected(id: string): boolean
  select(id: string | null, additive?: boolean): void
  setSelection(ids: string[], additive?: boolean): void
  addElement(type: ElementType, bbox?: CaptionElement['bbox']): CaptionElement
  removeElement(id: string): void
  duplicateElement(id: string): void
  toggleEnabled(id: string): void
  flipAll(axis: 'h' | 'v'): void
  duplicateLinked(id: string): void
  unlink(id: string): void
  linkGroupSize(id: string): number
  group(ids: string[]): void
  ungroup(id: string): void
  groupMembers(id: string): CaptionElement[]
  groupSize(id: string): number
  duplicateMany(ids: string[]): void
  copySelection(): void
  pasteAt(x: number, y: number): void
  clipboard: ClipItem[]
  setShared(id: string, key: (typeof SHARED_KEYS)[number], value: unknown): void
  moveElement(id: string, dir: -1 | 1): void
  moveElementTo(id: string, index: number): void
  getElement(id: string | null): CaptionElement | undefined
  load(s: Partial<CaptionState>): void
  // JSON editor scratch (transient); open/collapsed state lives in state.ui.jsonOpen
  json: { editing: boolean; draft: string; syncError: string; wasOpen: boolean }
  jsonStartEdit(): void
  jsonCancel(): void
  jsonTidy(): void
  jsonApply(): void
  importCaptionJson(text: string, applyAspect?: boolean): { ok: boolean; error?: string }
  // current reference/backdrop image (transient, not serialized)
  refImage: string
  ctxMenu: { x: number; y: number; id: string } | null
  openContextMenu(x: number, y: number, id: string): void
  closeContextMenu(): void
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
    selectedIds: [] as string[],
    get selectedId(): string | null {
      return store.selectedIds.length ? store.selectedIds[store.selectedIds.length - 1] : null
    },
    isSelected(id: string) {
      return store.selectedIds.includes(id)
    },

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
      _syncSeq(store.state.elements)
      store.selectedIds = store.selectedIds.filter((id) => store.getElement(id))
      // let the deep watcher flush before re-arming snapshots
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

    select(id: string | null, additive = false) {
      if (id == null) {
        store.selectedIds = []
        return
      }
      // Selecting any group member selects the whole group; the clicked id stays primary.
      const members = _expandGroups(store.state.elements, [id])
      if (additive) {
        const allSel = members.every((m) => store.selectedIds.includes(m))
        if (allSel) store.selectedIds = store.selectedIds.filter((x) => !members.includes(x))
        else for (const m of members) if (!store.selectedIds.includes(m)) store.selectedIds.push(m)
      } else {
        store.selectedIds = [...members.filter((m) => m !== id), id] // id last = primary
      }
    },
    setSelection(ids: string[], additive = false) {
      const valid = _expandGroups(store.state.elements, ids.filter((id) => store.getElement(id)))
      if (additive) {
        for (const id of valid) if (!store.selectedIds.includes(id)) store.selectedIds.push(id)
      } else {
        store.selectedIds = valid
      }
    },
    addElement(type: ElementType, bbox: CaptionElement['bbox'] = null) {
      // Default to a centered box, staggered so repeats don't stack.
      if (!bbox) {
        const o = (store.state.elements.length % 6) * 30
        bbox = [220 + o, 220 + o, 520 + o, 520 + o]
      }
      const el = newElement(type, bbox)
      store.state.elements.push(el)
      store.select(el.id)
      return el
    },
    removeElement(id: string) {
      const src = store.getElement(id)
      const lid = src?.linkId ?? null
      const grp = src?.groupId ?? null
      const i = store.state.elements.findIndex((e) => e.id === id)
      if (i >= 0) store.state.elements.splice(i, 1)
      store.selectedIds = store.selectedIds.filter((x) => x !== id)
      _pruneLink(store.state.elements, lid)
      _pruneGroup(store.state.elements, grp)
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
      store.select(copy.id)
    },
    // Copies of a single group form a new group.
    duplicateMany(ids: string[]) {
      const srcs = ids.map((id) => store.getElement(id)).filter((e): e is CaptionElement => !!e)
      if (!srcs.length) return
      const wasGroup = srcs.length > 1 && !!srcs[0].groupId && srcs.every((e) => e.groupId === srcs[0].groupId)
      const gid = wasGroup ? newId() : null
      const copyIds: string[] = []
      for (const src of srcs) {
        const copy = newElement(src.type, src.bbox ? ([...src.bbox] as any) : null)
        copy.desc = src.desc
        copy.text = src.text
        copy.color_palette = [...src.color_palette]
        copy.boxColor = src.boxColor
        copy.groupId = gid
        if (copy.bbox) copy.bbox = copy.bbox.map((v) => Math.max(0, Math.min(1000, v + 20))) as any
        store.state.elements.push(copy)
        copyIds.push(copy.id)
      }
      store.setSelection(copyIds)
    },
    toggleEnabled(id: string) {
      const el = store.getElement(id)
      if (!el) return
      const value = el.enabled === false
      // Grouped elements hide/show together.
      const members = el.groupId ? store.state.elements.filter((e) => e.groupId === el.groupId) : [el]
      for (const m of members) m.enabled = value
    },
    flipAll(axis: 'h' | 'v') {
      for (const el of store.state.elements) if (el.bbox) _flipBbox(el, axis)
    },
    duplicateLinked(id: string) {
      const src = store.getElement(id)
      if (!src) return
      if (!src.linkId) src.linkId = newId()
      const copy = newElement(src.type, src.bbox ? ([...src.bbox] as any) : null)
      copy.desc = src.desc
      copy.text = src.text
      copy.color_palette = [...src.color_palette]
      copy.boxColor = src.boxColor
      copy.linkId = src.linkId
      if (copy.bbox) {
        copy.bbox = copy.bbox.map((v, idx) => Math.max(0, Math.min(1000, v + (idx < 2 ? 30 : 30)))) as any
      }
      store.state.elements.push(copy)
      store.select(copy.id)
    },
    unlink(id: string) {
      const el = store.getElement(id)
      if (!el?.linkId) return
      const gid = el.linkId
      el.linkId = null
      _pruneLink(store.state.elements, gid)
    },
    linkGroupSize(id: string) {
      const el = store.getElement(id)
      if (!el?.linkId) return 1
      return store.state.elements.filter((e) => e.linkId === el.linkId).length
    },
    group(ids: string[]) {
      const valid = ids.filter((id) => store.getElement(id))
      if (valid.length < 2) return
      const gid = newId()
      for (const id of valid) {
        const e = store.getElement(id)
        if (e) e.groupId = gid
      }
      store.selectedIds = _expandGroups(store.state.elements, valid)
    },
    ungroup(id: string) {
      const el = store.getElement(id)
      if (!el?.groupId) return
      const gid = el.groupId
      for (const e of store.state.elements) if (e.groupId === gid) e.groupId = null
    },
    groupMembers(id: string) {
      const el = store.getElement(id)
      if (!el?.groupId) return el ? [el] : []
      return store.state.elements.filter((e) => e.groupId === el.groupId)
    },
    groupSize(id: string) {
      const el = store.getElement(id)
      if (!el?.groupId) return 1
      return store.state.elements.filter((e) => e.groupId === el.groupId).length
    },
    copySelection() {
      const els = store.selectedIds.map((id) => store.getElement(id)).filter((e): e is CaptionElement => !!e)
      if (!els.length) return
      const grouped = els.length > 1 && !!els[0].groupId && els.every((e) => e.groupId === els[0].groupId)
      store.clipboard = els.map((e) => ({
        type: e.type,
        bbox: e.bbox ? ([...e.bbox] as [number, number, number, number]) : null,
        desc: e.desc,
        text: e.text,
        color_palette: [...e.color_palette],
        boxColor: e.boxColor,
        grouped,
      }))
    },
    // Paste centered on (x,y) in 0..1000 coords, preserving relative layout; a copied
    // group pastes as a new group. Falls back to stored positions if x/y are invalid.
    pasteAt(x: number, y: number) {
      const clip = store.clipboard
      if (!clip.length) return
      // rigid offset landing the bbox center at the cursor, clamped on-canvas.
      const boxed = clip.filter((c) => c.bbox) as Array<{ bbox: [number, number, number, number] }>
      let dx = 0
      let dy = 0
      if (boxed.length && Number.isFinite(x) && Number.isFinite(y)) {
        let y0 = Infinity, x0 = Infinity, y1 = -Infinity, x1 = -Infinity
        for (const c of boxed) {
          y0 = Math.min(y0, c.bbox[0]); x0 = Math.min(x0, c.bbox[1]); y1 = Math.max(y1, c.bbox[2]); x1 = Math.max(x1, c.bbox[3])
        }
        dx = Math.max(-x0, Math.min(1000 - x1, Math.round(x - (x0 + x1) / 2)))
        dy = Math.max(-y0, Math.min(1000 - y1, Math.round(y - (y0 + y1) / 2)))
      }
      const grouped = clip.length > 1 && clip.every((c) => c.grouped)
      const gid = grouped ? newId() : null
      const ids: string[] = []
      for (const c of clip) {
        const el = newElement(c.type, c.bbox ? ([...c.bbox] as any) : null)
        el.desc = c.desc
        el.text = c.text
        el.color_palette = [...c.color_palette]
        el.boxColor = c.boxColor
        el.groupId = gid
        if (el.bbox && (dx || dy)) el.bbox = [el.bbox[0] + dy, el.bbox[1] + dx, el.bbox[2] + dy, el.bbox[3] + dx]
        store.state.elements.push(el)
        ids.push(el.id)
      }
      store.setSelection(ids)
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
    moveElementTo(id: string, index: number) {
      const arr = store.state.elements
      const from = arr.findIndex((e) => e.id === id)
      if (from < 0) return
      const to = Math.max(0, Math.min(arr.length - 1, index))
      if (from === to) return
      const [el] = arr.splice(from, 1)
      arr.splice(to, 0, el)
    },
    getElement(id: string | null) {
      return store.state.elements.find((e) => e.id === id)
    },
    load(s: Partial<CaptionState>) {
      Object.assign(store.state, emptyState(), s)
      // deep-merge ui so older saves (missing newer keys) get defaults
      store.state.ui = { ...emptyUi(), ...(s.ui || {}) }
      _syncSeq(store.state.elements)
    },

    json: { editing: false, draft: '', syncError: '', wasOpen: false },

    refImage: '',
    clipboard: [] as ClipItem[],
    ctxMenu: null as { x: number; y: number; id: string } | null,
    openContextMenu(x: number, y: number, id: string) {
      store.ctxMenu = { x, y, id }
    },
    closeContextMenu() {
      store.ctxMenu = null
    },
    jsonStartEdit() {
      store.json.draft = serialize(store.state).pretty
      store.json.wasOpen = store.state.ui.jsonOpen
      store.json.editing = true
      store.state.ui.jsonOpen = true
    },
    jsonCancel() {
      store.json.editing = false
      store.state.ui.jsonOpen = store.json.wasOpen
    },
    jsonTidy() {
      // Tolerant: unwraps code fences / strips preamble while pretty-printing.
      const res = parseCaptionLoose(store.json.draft)
      if (res.ok) store.json.draft = JSON.stringify(res.obj, null, 2)
    },
    jsonApply() {
      if (store.importCaptionJson(store.json.draft).ok) {
        store.json.editing = false
        store.state.ui.jsonOpen = store.json.wasOpen
      }
    },
    importCaptionJson(text: string, applyAspect = true) {
      // Tolerant of code fences, prose/preamble, and a leading aspect-ratio echo.
      const res = parseCaptionLoose(text)
      if (!res.ok) return { ok: false, error: res.error }
      const obj = res.obj
      const parts = captionToState(obj)
      store.state.high_level_description = parts.high_level_description
      store.state.style = parts.style
      store.state.background = parts.background
      store.state.elements = parts.elements
      _syncSeq(store.state.elements)
      // If the caption carries an aspect_ratio, match the canvas to it (keeping
      // megapixels). Skipped for sync so it can't clobber the current resolution.
      const ar = applyAspect && typeof obj?.aspect_ratio === 'string' ? obj.aspect_ratio : ''
      if (ar) {
        const wh = aspectToWH(ar, store.state.width, store.state.height)
        if (wh) {
          store.state.width = wh.w
          store.state.height = wh.h
        }
      }
      store.select(null)
      store.snapshot()
      return { ok: true }
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
