<template>
  <div class="studio">
    <div class="topbar">
      <div class="title">🎨 Ideogram Studio</div>
      <div class="tools">
        <button class="ic" :disabled="!store.canUndo" title="Undo" @click="store.undo()">↶</button>
        <button class="ic" :disabled="!store.canRedo" title="Redo" @click="store.redo()">↷</button>
        <select class="fmt" :value="formatValue" @change="setFormat(($event.target as HTMLSelectElement).value)" title="Output format / resolution">
          <option v-for="f in FORMATS" :key="f.label" :value="f.label">{{ f.label }}</option>
          <option v-if="formatValue === 'custom'" value="custom">custom {{ store.state.width }}×{{ store.state.height }}</option>
        </select>
        <button class="ic" :class="{ on: showAdvanced }" title="Advanced overlay settings" @click="showAdvanced = !showAdvanced">⚙</button>
        <button class="reset" title="Clear everything" @click="resetAll">reset</button>
      </div>
    </div>

    <div v-if="showAdvanced" class="advanced">
      <label>W <input type="number" min="16" max="8192" step="8" v-model.number="store.state.width" /></label>
      <label>H <input type="number" min="16" max="8192" step="8" v-model.number="store.state.height" /></label>
      <label>line <input type="number" min="1" max="40" v-model.number="store.state.overlay.lineWidth" /></label>
      <label>fill <input type="range" min="0" max="1" step="0.02" v-model.number="store.state.overlay.fillAlpha" /></label>
      <label>label <input type="number" min="6" max="96" v-model.number="store.state.overlay.labelSize" /></label>
      <label class="ck"><input type="checkbox" v-model="store.state.overlay.showIndex" /> idx</label>
      <label class="ck"><input type="checkbox" v-model="store.state.overlay.showText" /> text</label>
    </div>

    <label class="hld">
      <span>high_level_description</span>
      <textarea v-model="store.state.high_level_description" rows="2"
        placeholder="One or two sentences summarizing the whole image (strongly recommended)."></textarea>
    </label>

    <div class="main">
      <div class="left">
        <BBoxCanvas />
        <label class="bg">
          <span>background</span>
          <textarea v-model="store.state.background" rows="2"
            placeholder="Describe the background / environment (required)."></textarea>
        </label>
      </div>
      <div class="right">
        <StylePanel />
        <hr />
        <ElementList />
      </div>
    </div>

    <ElementEditor />
    <JsonPreview />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { createStudioStore, provideStudioStore } from '@/lib/store'
import { buildCaption, emptyState, FORMATS, type CaptionState } from '@/lib/caption'
import BBoxCanvas from './BBoxCanvas.vue'
import StylePanel from './StylePanel.vue'
import ElementList from './ElementList.vue'
import ElementEditor from './ElementEditor.vue'
import JsonPreview from './JsonPreview.vue'

const props = defineProps<{ widget: any; node?: any }>()

const store = createStudioStore()
provideStudioStore(store)

const showAdvanced = ref(false)

const formatValue = computed(() => {
  const f = FORMATS.find((f) => f.w === store.state.width && f.h === store.state.height)
  return f ? f.label : 'custom'
})
function setFormat(label: string) {
  const f = FORMATS.find((f) => f.label === label)
  if (f) {
    store.state.width = f.w
    store.state.height = f.h
  }
}

function plainState(): CaptionState {
  return JSON.parse(JSON.stringify(store.state))
}
function resetAll() {
  store.load(emptyState())
  store.select(null)
  store.resetHistory()
}

let snapTimer: ReturnType<typeof setTimeout> | undefined
function scheduleSnapshot() {
  clearTimeout(snapTimer)
  snapTimer = setTimeout(() => store.snapshot(), 350)
}

onMounted(() => {
  const v = props.widget?.value
  if (v && typeof v === 'object' && v.studio) {
    store.load(v.studio)
  }
  store.resetHistory()

  props.widget.serializeValue = async () => {
    const { caption } = buildCaption(store.state)
    return { caption, studio: plainState() }
  }

  watch(
    () => store.state,
    () => {
      const { caption } = buildCaption(store.state)
      props.widget.value = { caption, studio: plainState() }
      if (!store.restoring) scheduleSnapshot()
    },
    { deep: true, immediate: true },
  )
})
</script>

<style scoped>
.studio {
  display: flex; flex-direction: column; gap: 9px; padding: 10px;
  font-family: -apple-system, system-ui, sans-serif; color: #e5e5ea;
  background: #1a1a1f; border-radius: 8px; box-sizing: border-box;
  width: 100%; min-height: 100%; /* fill the node so the layout grows to fit */
}
.topbar { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.title { font-size: 14px; font-weight: 700; letter-spacing: .3px; white-space: nowrap; }
.tools { display: flex; gap: 5px; align-items: center; }
.ic { background: #2a2a30; color: #ccc; border: 1px solid #3a3a44; border-radius: 5px; padding: 3px 8px; font-size: 12px; cursor: pointer; }
.ic:disabled { opacity: .35; cursor: default; }
.ic.on { background: #3b82f6; border-color: #3b82f6; color: #fff; }
.fmt { background: #2a2a30; color: #ddd; border: 1px solid #3a3a44; border-radius: 5px; font-size: 11px; padding: 3px; max-width: 150px; }
.reset { background: #2a2a30; color: #bbb; border: 1px solid #3a3a44; border-radius: 5px; padding: 3px 10px; font-size: 11px; cursor: pointer; }
.advanced {
  display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 7px 8px;
  background: #202026; border: 1px solid #32323c; border-radius: 6px; font-size: 11px; color: #aaa;
}
.advanced label { display: flex; align-items: center; gap: 4px; }
.advanced input[type='number'] { width: 56px; background: #15151a; border: 1px solid #3a3a44; color: #eee; border-radius: 4px; padding: 3px; font-size: 11px; }
.advanced input[type='range'] { width: 70px; }
.advanced .ck { gap: 3px; }
.hld, .bg { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: #aaa; }
.hld textarea, .bg textarea {
  background: #15151a; border: 1px solid #3a3a44; color: #eee; border-radius: 6px;
  padding: 7px; font-size: 12px; resize: vertical; font-family: inherit; line-height: 1.4;
}
/* flex:1 → the canvas/list area soaks up spare node height; align-items:stretch
   makes both columns equal height so the right column no longer floats. */
.main { display: grid; grid-template-columns: minmax(280px, 1.4fr) minmax(220px, 1fr); gap: 12px; align-items: stretch; flex: 1 1 auto; min-height: 0; }
/* left keeps its natural height (canvas + a normal, resizable background);
   only the right column stretches, so the elements LIST is what grows to fill
   the node — the background stays a normal, drag-to-resize textarea. */
.left { display: flex; flex-direction: column; gap: 8px; min-width: 0; align-self: start; }
.right { display: flex; flex-direction: column; gap: 8px; min-width: 0; min-height: 0; }
hr { border: none; border-top: 1px solid #2e2e36; width: 100%; margin: 2px 0; }
@media (max-width: 520px) { .main { grid-template-columns: 1fr; } }
</style>
