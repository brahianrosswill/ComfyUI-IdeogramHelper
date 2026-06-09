<template>
  <UiCard v-if="el">
    <template #header>
      <div class="ehead">
        <!-- index chip doubles as the color picker -->
        <label class="idchip" :title="'Element ' + (index + 1) + (linked ? ' · linked ×' + groupSize : '') + ' — click to recolour'">
          <span class="n" :style="{ background: el.boxColor }">{{ index + 1 }}</span>
          <input type="color" :value="el.boxColor" @input="setShared('boxColor', ($event.target as HTMLInputElement).value)" />
        </label>
        <div class="seg">
          <UiButton icon :active="el.type === 'obj'" title="Object" @click="setShared('type', 'obj')"><i class="mdi mdi-shape-outline"></i></UiButton>
          <UiButton icon :active="el.type === 'text'" title="Text" @click="setShared('type', 'text')"><i class="mdi mdi-format-text"></i></UiButton>
        </div>
        <UiButton
          icon
          :active="!!el.bbox"
          :title="el.bbox ? 'Has a box — position it by dragging on the canvas. Click to let the model auto-place instead.' : 'Auto-placed by the model. Click to add a box you can position.'"
          @click="toggleBbox"
        >
          <i class="mdi" :class="el.bbox ? 'mdi-vector-square' : 'mdi-map-marker-question-outline'"></i>
        </UiButton>
        <span class="grow"></span>
        <UiButton icon title="Linked copy — shares prompt, keeps its own position" @click="store.duplicateLinked(el.id)"><i class="mdi mdi-link-variant-plus"></i></UiButton>
        <UiButton v-if="linked" icon :title="'Unlink from group (×' + groupSize + ')'" @click="store.unlink(el.id)"><i class="mdi mdi-link-variant-off"></i></UiButton>
        <button class="mute" :class="{ off: el.enabled === false }" :title="el.enabled === false ? 'Muted — excluded from output. Click to enable.' : 'Mute (keep but exclude from output)'" @click="store.toggleEnabled(el.id)">
          <i class="mdi" :class="el.enabled === false ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"></i>
        </button>
      </div>
    </template>

    <label v-if="el.type === 'text'" class="filine">
      <span>text</span>
      <input :value="el.text" type="text" placeholder="literal text the model should draw"
        @input="setShared('text', ($event.target as HTMLInputElement).value)" />
    </label>
    <label class="filine">
      <span>desc</span>
      <textarea :value="el.desc" rows="2" :placeholder="el.type === 'text' ? 'how the text looks (font, colour, placement)' : 'detailed description of this object'"
        @input="setShared('desc', ($event.target as HTMLTextAreaElement).value)"></textarea>
    </label>
    <!-- div, not label: a label would route clicks to the first color input -->
    <div class="filine">
      <span>colours</span>
      <PaletteEditor :modelValue="el.color_palette" :max="5" label="element colours"
        @update:modelValue="setShared('color_palette', $event)" />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudioStore, SHARED_KEYS } from '@/lib/store'
import UiCard from '../ui/UiCard.vue'
import UiButton from '../ui/UiButton.vue'
import PaletteEditor from './PaletteEditor.vue'

const store = useStudioStore()
const el = computed(() => store.getElement(store.selectedId))
const index = computed(() => store.state.elements.findIndex((e) => e.id === store.selectedId))
const linked = computed(() => !!el.value?.linkId)
const groupSize = computed(() => (el.value ? store.linkGroupSize(el.value.id) : 1))

function setShared(key: (typeof SHARED_KEYS)[number], value: unknown) {
  if (el.value) store.setShared(el.value.id, key, value)
}
// toggles "has a box" vs model auto-place; position is set by dragging on the canvas
function toggleBbox() {
  if (!el.value) return
  el.value.bbox = el.value.bbox ? null : [300, 300, 700, 700]
}
</script>

<style scoped>
.ehead { display: flex; align-items: center; gap: 6px; width: 100%; flex-wrap: wrap; }
.grow { flex: 1 1 auto; }
/* overflow:hidden clips the absolute color input to the chip so it can't overlap the type buttons */
.idchip { position: relative; display: inline-flex; flex: none; cursor: pointer; overflow: hidden; border-radius: 5px; }
.idchip .n {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 22px; padding: 0 6px; box-sizing: border-box;
  border-radius: 5px; color: #fff; font-size: 11px; font-weight: 700;
  font-variant-numeric: tabular-nums; text-shadow: 0 1px 1px rgba(0, 0, 0, .35);
  border: 1px solid rgba(0, 0, 0, .25);
}
.idchip input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.seg { display: flex; gap: 2px; }
/* icon-sized to match UiButton.icon, with green/red mute state */
.mute {
  display: inline-flex; align-items: center; justify-content: center; flex: none;
  min-width: 26px; height: 24px; padding: 0 6px; box-sizing: border-box;
  background: var(--st-btn); color: #34d399; border: 1px solid var(--st-border);
  border-radius: 5px; font-size: 12px; cursor: pointer;
}
.mute:hover { border-color: var(--st-accent); }
.mute.off { color: #f87171; }
.mute .mdi { font-size: 15px; line-height: 1; }

.filine { display: flex; gap: 8px; align-items: flex-start; font-size: 11px; color: var(--st-muted); }
.filine > span { width: 44px; flex: none; padding-top: 5px; text-align: right; }
.filine input[type='text'], .filine textarea {
  flex: 1; background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text);
  border-radius: 5px; padding: 6px; font-size: 12px; resize: vertical; font-family: inherit;
}
.filine :deep(.palette) { flex: 1; }
</style>
