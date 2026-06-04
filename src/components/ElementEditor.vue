<template>
  <div class="editor" v-if="el">
    <div class="row type-row">
      <label class="color" :title="'Box color' + (linked ? ' (shared with link group)' : '')">
        <span class="chip" :style="{ background: el.boxColor }"></span>
        <input type="color" :value="el.boxColor" @input="setShared('boxColor', ($event.target as HTMLInputElement).value)" />
      </label>
      <span class="lbl">#{{ index + 1 }}</span>
      <div class="seg">
        <button :class="{ on: el.type === 'obj' }" @click="setShared('type', 'obj')">object</button>
        <button :class="{ on: el.type === 'text' }" @click="setShared('type', 'text')">text</button>
      </div>
      <button class="mute" :class="{ off: el.enabled === false }" :title="el.enabled === false ? 'Muted — excluded from output. Click to enable.' : 'Mute (keep but exclude from output)'" @click="store.toggleEnabled(el.id)">
        {{ el.enabled === false ? '🚫 muted' : '👁 active' }}
      </button>
      <label class="bbtoggle" :title="el.bbox ? 'Remove bbox (let model auto-place)' : 'Add a default bbox'">
        <input type="checkbox" :checked="!!el.bbox" @change="toggleBbox" /> bbox
      </label>
    </div>

    <div class="row link-row">
      <span v-if="linked" class="linkbadge" :style="{ borderColor: el.boxColor }">🔗 linked ×{{ groupSize }}</span>
      <span v-else class="unlinked">not linked</span>
      <button class="mini" title="Make a linked copy (shares prompt, own position)" @click="store.duplicateLinked(el.id)">＋ linked copy</button>
      <button v-if="linked" class="mini" title="Detach this box from its link group" @click="store.unlink(el.id)">unlink</button>
      <span v-if="linked" class="hint">editing prompt/text/color updates all {{ groupSize }}; bbox stays per-box</span>
    </div>

    <div v-if="el.bbox" class="row bbox-row">
      <label v-for="(k, i) in ['y₀', 'x₀', 'y₁', 'x₁']" :key="k">
        {{ k }}
        <input type="number" min="0" max="1000" :value="el.bbox[i]" @input="setBbox(i, ($event.target as HTMLInputElement).value)" />
      </label>
    </div>

    <label v-if="el.type === 'text'" class="field">
      <span>Text to render</span>
      <input :value="el.text" type="text" placeholder="literal text the model should draw"
        @input="setShared('text', ($event.target as HTMLInputElement).value)" />
    </label>

    <label class="field">
      <span>Description</span>
      <textarea :value="el.desc" rows="2" :placeholder="el.type === 'text' ? 'how the text looks (font, color, placement)' : 'detailed description of this object'"
        @input="setShared('desc', ($event.target as HTMLTextAreaElement).value)"></textarea>
    </label>

    <div class="field">
      <span>Per-element palette (max 5)</span>
      <PaletteEditor :modelValue="el.color_palette" :max="5" label="element colors"
        @update:modelValue="setShared('color_palette', $event)" />
    </div>
  </div>
  <div v-else class="editor empty">Select an element to edit it, or draw a box on the canvas.</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudioStore, SHARED_KEYS } from '@/lib/store'
import PaletteEditor from './PaletteEditor.vue'

const store = useStudioStore()
const el = computed(() => store.getElement(store.selectedId))
const index = computed(() => store.state.elements.findIndex((e) => e.id === store.selectedId))
const linked = computed(() => !!el.value?.linkId)
const groupSize = computed(() => (el.value ? store.linkGroupSize(el.value.id) : 1))

function setShared(key: (typeof SHARED_KEYS)[number], value: unknown) {
  if (el.value) store.setShared(el.value.id, key, value)
}
function toggleBbox(e: Event) {
  if (!el.value) return
  el.value.bbox = (e.target as HTMLInputElement).checked ? [300, 300, 700, 700] : null
}
function setBbox(i: number, raw: string) {
  if (!el.value?.bbox) return
  el.value.bbox[i] = Math.max(0, Math.min(1000, Math.round(Number(raw) || 0)))
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 8px; padding: 8px; background: #202026; border-radius: 6px; border: 1px solid #32323c; }
.editor.empty { color: #777; font-size: 12px; align-items: center; }
.row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.color { position: relative; width: 22px; height: 22px; cursor: pointer; }
.color .chip { display: block; width: 22px; height: 22px; border-radius: 5px; border: 1px solid rgba(255,255,255,.3); }
.color input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.lbl { font-size: 12px; color: #ccc; font-weight: 600; }
.seg { display: flex; gap: 2px; }
.seg button { background: #2a2a30; color: #ccc; border: 1px solid #3a3a44; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; }
.seg button.on { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.mute { margin-left: auto; background: #2a2a30; color: #9ae6b4; border: 1px solid #3a3a44; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; }
.mute.off { color: #f87171; }
.bbtoggle { font-size: 11px; color: #aaa; display: flex; gap: 4px; align-items: center; }
.link-row { font-size: 11px; }
.linkbadge { border: 1px solid; border-radius: 4px; padding: 1px 6px; color: #ddd; }
.unlinked { color: #666; }
.mini { background: #2a2a30; color: #ccc; border: 1px solid #3a3a44; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; }
.mini:hover { background: #34343c; color: #fff; }
.hint { color: #777; }
.bbox-row { gap: 6px; }
.bbox-row label { display: flex; flex-direction: column; font-size: 10px; color: #999; gap: 2px; }
.bbox-row input { width: 52px; background: #15151a; border: 1px solid #3a3a44; color: #eee; border-radius: 4px; padding: 3px; font-size: 11px; }
.field { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: #aaa; }
.field input[type='text'], .field textarea {
  background: #15151a; border: 1px solid #3a3a44; color: #eee; border-radius: 5px; padding: 6px; font-size: 12px; resize: vertical; font-family: inherit;
}
</style>
