// Ideogram 4 caption model + client-side serializer. Mirrors nodes/caption.py
// (key order, hex normalization, minified separators); Python is authoritative.

export type ElementType = 'obj' | 'text'

export interface CaptionElement {
  id: string
  type: ElementType
  bbox: [number, number, number, number] | null // [y_min, x_min, y_max, x_max] 0..1000
  desc: string
  text: string
  color_palette: string[]
  // Editor-only metadata (not serialized):
  boxColor: string // box display color
  linkId: string | null // shared linkId = shared content, own bbox
  groupId: string | null // shared groupId = select/move/hide together
  enabled: boolean // false = kept but excluded from output
}

// Colors auto-assigned to new boxes.
export const BOX_PALETTE = [
  '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#84CC16', '#06B6D4',
]
let _colorSeq = 0
export function nextBoxColor(): string {
  const c = BOX_PALETTE[_colorSeq % BOX_PALETTE.length]
  _colorSeq += 1
  return c
}

// Stable display color derived from the group id. Not persisted.
export function groupColor(groupId: string): string {
  let h = 0
  for (let i = 0; i < groupId.length; i++) h = (h * 31 + groupId.charCodeAt(i)) >>> 0
  return `hsl(${h % 360} 75% 62%)`
}

export interface StyleDescription {
  enabled: boolean
  mode: 'photo' | 'art'
  aesthetics: string
  lighting: string
  medium: string
  photo: string
  art_style: string
  color_palette: string[]
}

export interface OverlaySettings {
  lineWidth: number
  fillAlpha: number
  labelSize: number
  showIndex: boolean
  showText: boolean
}

// Editor UI preferences; persisted with state, not part of the caption.
export interface UiPrefs {
  sync: boolean
  showLabels: boolean
  backdropOpacity: number
  newType: ElementType
  jsonOpen: boolean
  promptOpen: boolean
  summaryOpen: boolean
  backgroundOpen: boolean
  styleOpen: boolean
  elementsOpen: boolean
  showPresets: boolean
  jsonSync: boolean
  livePreview: boolean
}

export interface CaptionState {
  high_level_description: string
  width: number
  height: number
  style: StyleDescription
  background: string
  elements: CaptionElement[]
  overlay: OverlaySettings
  ui: UiPrefs
}

export function emptyUi(): UiPrefs {
  return { sync: true, showLabels: true, backdropOpacity: 0.5, newType: 'obj', jsonOpen: false, promptOpen: true, summaryOpen: true, backgroundOpen: true, styleOpen: true, elementsOpen: true, showPresets: false, jsonSync: false, livePreview: false }
}

// Common Ideogram output formats.
export const FORMATS: { label: string; w: number; h: number }[] = [
  { label: '1:1 · 1024×1024', w: 1024, h: 1024 },
  { label: '3:2 · 1248×832', w: 1248, h: 832 },
  { label: '2:3 · 832×1248', w: 832, h: 1248 },
  { label: '16:9 · 1344×768', w: 1344, h: 768 },
  { label: '9:16 · 768×1344', w: 768, h: 1344 },
  { label: '4:3 · 1152×896', w: 1152, h: 896 },
  { label: '3:4 · 896×1152', w: 896, h: 1152 },
  { label: '16:10 · 1280×800', w: 1280, h: 800 },
]

export function emptyOverlay(): OverlaySettings {
  return { lineWidth: 3, fillAlpha: 0.18, labelSize: 16, showIndex: true, showText: true }
}

export function emptyStyle(): StyleDescription {
  return {
    enabled: true,
    mode: 'photo',
    aesthetics: '',
    lighting: '',
    medium: 'photograph',
    photo: '',
    art_style: '',
    color_palette: [],
  }
}

let _seq = 0
export function newId(): string {
  _seq += 1
  return `el_${_seq}_${(_seq * 2654435761) % 100000}`
}

// Advance the id sequence past ids already in use so fresh ids can't collide.
export function syncSeq(ids: Array<string | null | undefined>) {
  for (const id of ids) {
    const m = id ? /^el_(\d+)_/.exec(id) : null
    if (m) _seq = Math.max(_seq, parseInt(m[1], 10))
  }
}

export function newElement(type: ElementType, bbox: CaptionElement['bbox'] = null): CaptionElement {
  return { id: newId(), type, bbox, desc: '', text: '', color_palette: [], boxColor: nextBoxColor(), linkId: null, groupId: null, enabled: true }
}

export function emptyState(): CaptionState {
  return {
    high_level_description: '',
    width: 1024,
    height: 1024,
    style: emptyStyle(),
    background: '',
    elements: [],
    overlay: emptyOverlay(),
    ui: emptyUi(),
  }
}

const HEX_RE = /^#[0-9A-F]{6}$/

export function normalizeHex(raw: string): string | null {
  let h = (raw || '').trim().toUpperCase()
  if (!h.startsWith('#')) h = '#' + h
  if (h.length === 4) h = '#' + h.slice(1).split('').map((c) => c + c).join('') // #RGB -> #RRGGBB
  return HEX_RE.test(h) ? h : null
}

function cleanHexList(values: string[], limit: number, where: string, warnings: string[]): string[] | null {
  const out: string[] = []
  for (const raw of values || []) {
    const h = normalizeHex(raw)
    if (!h) {
      if (raw && raw.trim()) warnings.push(`${where}: dropped invalid hex ${raw}`)
      continue
    }
    out.push(h)
  }
  if (out.length > limit) {
    warnings.push(`${where}: ${out.length} colors exceeds max ${limit}; truncated`)
    out.length = limit
  }
  return out.length ? out : null
}

function clampBbox(b: [number, number, number, number]): [number, number, number, number] {
  const c = (v: number) => Math.max(0, Math.min(1000, Math.round(v)))
  let [y0, x0, y1, x1] = b.map(c) as [number, number, number, number]
  if (y0 > y1) [y0, y1] = [y1, y0]
  if (x0 > x1) [x0, x1] = [x1, x0]
  return [y0, x0, y1, x1]
}

// Build the canonical, key-ordered caption object.
export function buildCaption(state: CaptionState): { caption: any; warnings: string[] } {
  const warnings: string[] = []
  const out: any = {}

  const hld = state.high_level_description.trim()
  if (hld) out.high_level_description = hld
  else warnings.push('high_level_description is empty (strongly recommended)')

  if (state.style.enabled) {
    const st = state.style
    const isPhoto = st.mode === 'photo'
    const s: any = {}
    for (const k of ['aesthetics', 'lighting', 'medium'] as const) {
      const v = st[k].trim()
      if (v) s[k] = v
      else warnings.push(`style_description.${k} is required`)
    }
    if (isPhoto) {
      const v = st.photo.trim()
      if (v) s.photo = v
      else warnings.push('style_description.photo is required in photo mode')
    } else {
      const v = st.art_style.trim()
      if (v) s.art_style = v
      else warnings.push('style_description.art_style is required in art mode')
    }
    const palette = cleanHexList(st.color_palette, 16, 'style_description.color_palette', warnings)
    // strict key order
    const ordered: any = {}
    const order = isPhoto
      ? ['aesthetics', 'lighting', 'photo', 'medium', 'color_palette']
      : ['aesthetics', 'lighting', 'medium', 'art_style', 'color_palette']
    for (const k of order) if (s[k] !== undefined) ordered[k] = s[k]
    if (palette) ordered.color_palette = palette
    out.style_description = ordered
  }

  const background = state.background.trim()
  if (!background) warnings.push('compositional_deconstruction.background is required')

  const elements: any[] = []
  state.elements.forEach((el, i) => {
    if (el.enabled === false) return // omitted from output
    const e: any = { type: el.type }
    if (el.bbox) e.bbox = clampBbox(el.bbox)
    if (el.type === 'text') {
      const t = el.text.trim()
      if (!t) warnings.push(`elements[${i}]: text element has no text to render`)
      e.text = t
    }
    const desc = el.desc.trim()
    if (!desc) warnings.push(`elements[${i}]: desc is empty`)
    e.desc = desc
    const palette = cleanHexList(el.color_palette, 5, `elements[${i}].color_palette`, warnings)
    if (palette) e.color_palette = palette

    // strict key order per type
    const order = el.type === 'text'
      ? ['type', 'bbox', 'text', 'desc', 'color_palette']
      : ['type', 'bbox', 'desc', 'color_palette']
    const ordered: any = {}
    for (const k of order) if (e[k] !== undefined) ordered[k] = e[k]
    elements.push(ordered)
  })

  out.compositional_deconstruction = { background, elements }
  return { caption: out, warnings }
}

export function serialize(state: CaptionState): { json: string; pretty: string; warnings: string[] } {
  const { caption, warnings } = buildCaption(state)
  return {
    json: JSON.stringify(caption), // minified
    pretty: JSON.stringify(caption, null, 2),
    warnings,
  }
}

// Recover a caption object from text that may be wrapped in code fences, prose,
// an aspect-ratio echo, or several objects. Returns the last balanced top-level
// {...} that parses to an object.
export function parseCaptionLoose(
  text: string,
): { ok: true; obj: any } | { ok: false; error: string } {
  const raw = (text ?? '').trim()
  if (!raw) return { ok: false, error: 'empty input' }

  // Fast path: already-clean JSON object.
  try {
    const obj = JSON.parse(raw)
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) return { ok: true, obj }
  } catch {
    /* fall through to extraction */
  }

  // Balanced top-level { ... } blocks, ignoring braces inside strings.
  const blocks: string[] = []
  let depth = 0
  let start = -1
  let inStr = false
  let esc = false
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') inStr = true
    else if (c === '{') {
      if (depth === 0) start = i
      depth++
    } else if (c === '}' && depth > 0) {
      depth--
      if (depth === 0 && start >= 0) {
        blocks.push(raw.slice(start, i + 1))
        start = -1
      }
    }
  }

  if (!blocks.length) {
    return {
      ok: false,
      error: depth > 0 ? 'JSON object was never closed (truncated output?)' : 'no JSON object found',
    }
  }

  let lastErr = ''
  for (let i = blocks.length - 1; i >= 0; i--) {
    try {
      const obj = JSON.parse(blocks[i])
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) return { ok: true, obj }
    } catch (e: any) {
      lastErr = String(e?.message || e)
    }
  }
  return { ok: false, error: lastErr || 'no parseable JSON object found' }
}

// Parse a caption object into editor-shaped content fields; editor-only metadata
// is regenerated. width/height/overlay left to the caller.
export function captionToState(
  obj: any,
): Pick<CaptionState, 'high_level_description' | 'style' | 'background' | 'elements'> {
  const hld = typeof obj?.high_level_description === 'string' ? obj.high_level_description : ''

  const style = emptyStyle()
  const sd = obj?.style_description
  if (sd && typeof sd === 'object') {
    style.enabled = true
    style.aesthetics = typeof sd.aesthetics === 'string' ? sd.aesthetics : ''
    style.lighting = typeof sd.lighting === 'string' ? sd.lighting : ''
    style.medium = typeof sd.medium === 'string' ? sd.medium : ''
    if (typeof sd.photo === 'string' && sd.photo.trim()) {
      style.mode = 'photo'
      style.photo = sd.photo
    } else if (typeof sd.art_style === 'string' && sd.art_style.trim()) {
      style.mode = 'art'
      style.art_style = sd.art_style
    }
    if (Array.isArray(sd.color_palette)) style.color_palette = sd.color_palette.map(String)
  } else {
    style.enabled = false
  }

  const comp = obj?.compositional_deconstruction ?? {}
  const background = typeof comp.background === 'string' ? comp.background : ''
  const clamp = (v: number) => Math.max(0, Math.min(1000, Math.round(Number(v) || 0)))
  const rawElements = Array.isArray(comp.elements) ? comp.elements : []
  const elements: CaptionElement[] = rawElements.map((el: any) => {
    const type: ElementType = el?.type === 'text' ? 'text' : 'obj'
    const bbox =
      Array.isArray(el?.bbox) && el.bbox.length === 4
        ? (el.bbox.map(clamp) as [number, number, number, number])
        : null
    const e = newElement(type, bbox)
    e.desc = typeof el?.desc === 'string' ? el.desc : ''
    e.text = typeof el?.text === 'string' ? el.text : ''
    if (Array.isArray(el?.color_palette)) e.color_palette = el.color_palette.map(String)
    return e
  })

  return { high_level_description: hld, style, background, elements }
}

// Parse an aspect-ratio string ("16:9", "16x9", "16/9") into width/height
// preserving the current megapixel count (snapped to /16). Null if not a ratio.
export function aspectToWH(ar: string, refW = 1024, refH = 1024): { w: number; h: number } | null {
  const m = /^\s*(\d+(?:\.\d+)?)\s*[:x/]\s*(\d+(?:\.\d+)?)\s*$/.exec(ar || '')
  if (!m) return null
  const rw = parseFloat(m[1])
  const rh = parseFloat(m[2])
  if (!(rw > 0 && rh > 0)) return null
  const total = Math.max(1, refW * refH)
  const scale = Math.sqrt(total / (rw * rh))
  const snap = (v: number) => Math.max(16, Math.round(v / 16) * 16)
  return { w: snap(rw * scale), h: snap(rh * scale) }
}
