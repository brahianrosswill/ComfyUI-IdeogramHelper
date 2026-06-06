<template>
  <div class="studio">
    <div class="main">
      <div class="left">
        <BBoxCanvas />
      </div>
      <div class="right">
        <UiCard>
          <template #header>
            <button class="acc" :title="promptOpen ? 'Collapse' : 'Expand'" @click="promptOpen = !promptOpen">
              <span>prompt</span>
              <span class="chev">{{ promptOpen ? '▾' : '▸' }}</span>
            </button>
          </template>
          <template v-if="promptOpen">
            <label class="pfield" title="high_level_description — a one or two sentence summary"><span>summary</span>
              <textarea v-model="store.state.high_level_description" rows="2" placeholder="one or two sentences summarizing the whole image"></textarea>
            </label>
            <label class="pfield" title="compositional_deconstruction.background"><span>background</span>
              <textarea v-model="store.state.background" rows="2" placeholder="describe the background / environment"></textarea>
            </label>
          </template>
        </UiCard>
        <StylePanel />
        <ElementList />
      </div>
    </div>

    <ElementEditor />

    <!-- Bottom bar: JSON caption + all global controls, merged into one row. -->
    <JsonPreview>
      <template #controls>
        <UiButton icon :disabled="!store.canUndo" title="Undo" @click="store.undo()">↶</UiButton>
        <UiButton icon :disabled="!store.canRedo" title="Redo" @click="store.redo()">↷</UiButton>

        <UiPopover align="left" up>
          <template #trigger><UiButton title="Resolution — aspect ratio × megapixels">{{ store.state.width }}×{{ store.state.height }} ▾</UiButton></template>
          <div class="resmenu">
            <label class="rrow"><span>aspect ratio</span>
              <select v-model="aspect" @change="applyRes">
                <option v-for="a in CORE_ASPECTS" :key="a.label" :value="a.label">{{ a.label }} · {{ a.name }}</option>
              </select>
            </label>
            <label class="rrow"><span>megapixels</span>
              <input type="number" min="0.1" max="16" step="0.1" v-model.number="mp" @input="applyRes" />
            </label>
            <div class="rdiv"></div>
            <label class="rrow"><span>width</span>
              <input type="number" min="16" max="8192" step="16" v-model.number="store.state.width" @change="store.state.width = snapRes(store.state.width)" />
            </label>
            <label class="rrow"><span>height</span>
              <input type="number" min="16" max="8192" step="16" v-model.number="store.state.height" @change="store.state.height = snapRes(store.state.height)" />
            </label>
          </div>
        </UiPopover>

        <UiPopover align="left" up>
          <template #trigger><UiButton icon title="Overlay settings">⚙</UiButton></template>
          <div class="adv">
            <span class="gh">overlay</span>
            <label class="orow">line <input type="number" min="1" max="40" v-model.number="store.state.overlay.lineWidth" /></label>
            <label class="orow">fill <input type="range" min="0" max="1" step="0.02" v-model.number="store.state.overlay.fillAlpha" /></label>
            <label class="orow">label <input type="number" min="6" max="96" v-model.number="store.state.overlay.labelSize" /></label>
            <div class="ochecks">
              <label class="ck"><input type="checkbox" v-model="store.state.overlay.showIndex" /> index</label>
              <label class="ck"><input type="checkbox" v-model="store.state.overlay.showText" /> text</label>
            </div>
          </div>
        </UiPopover>

        <UiPopover align="left" up>
          <template #trigger><UiButton icon title="Help">?</UiButton></template>
          <div class="help">
            <p class="h">Canvas</p>
            <dl>
              <dt>drag empty space</dt><dd>add a box</dd>
              <dt>drag a box</dt><dd>move it</dd>
              <dt>drag a handle</dt><dd>resize</dd>
              <dt>obj / text</dt><dd>what new boxes become (text boxes carry literal text)</dd>
            </dl>
            <p class="h">Boxes</p>
            <dl>
              <dt>👁 / 🚫</dt><dd>mute — keep a box but exclude it from the output</dd>
              <dt>🔗 linked copy</dt><dd>shares the prompt across copies; each keeps its own position</dd>
              <dt>color chip</dt><dd>recolor a box (editor only — not in the caption)</dd>
            </dl>
            <p class="h">Reference</p>
            <dl>
              <dt>🖼</dt><dd>load an image to trace over (or drop one on the canvas)</dd>
              <dt>⟳ sync</dt><dd>auto-update the reference from an <b>Ideogram Studio Ref Sync</b> node</dd>
            </dl>
            <p class="h">Outputs</p>
            <dl>
              <dt>caption</dt><dd>JSON prompt → your Ideogram sampler</dd>
              <dt>extras</dt><dd>→ <b>Studio Extras</b> node for overlay / alpha / width / height</dd>
            </dl>
            <p class="tip">Tip: paste JSON in the preview to import an existing caption.</p>
            <p class="credit">
              made by <b>nynxz</b> · ideas &amp; inspiration from the community<br />
              <a href="https://github.com/nynxz/ComfyUI-IdeogramHelper/issues" target="_blank" rel="noopener noreferrer">report a bug / suggest a feature ↗</a>
            </p>
          </div>
        </UiPopover>

        <UiButton title="Clear everything" @click="resetAll">reset</UiButton>
      </template>
    </JsonPreview>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { createStudioStore, provideStudioStore } from '@/lib/store'
import { buildCaption, emptyState, type CaptionState } from '@/lib/caption'
import UiButton from './ui/UiButton.vue'
import UiPopover from './ui/UiPopover.vue'
import BBoxCanvas from './BBoxCanvas.vue'
import StylePanel from './StylePanel.vue'
import ElementList from './ElementList.vue'
import ElementEditor from './ElementEditor.vue'
import JsonPreview from './JsonPreview.vue'

const props = defineProps<{ widget: any; node?: any }>()

const store = createStudioStore()
provideStudioStore(store)

const promptOpen = ref(true)

// Resolution: aspect ratio × megapixels, matching ComfyUI core's
// ResolutionSelector exactly (total = MP × 1024², exact-ratio scale, /8 round).
const CORE_ASPECTS = [
  { label: '1:1', name: 'square', w: 1, h: 1 },
  { label: '3:2', name: 'photo', w: 3, h: 2 },
  { label: '4:3', name: 'standard', w: 4, h: 3 },
  { label: '16:9', name: 'widescreen', w: 16, h: 9 },
  { label: '21:9', name: 'ultrawide', w: 21, h: 9 },
  { label: '2:3', name: 'portrait', w: 2, h: 3 },
  { label: '3:4', name: 'portrait', w: 3, h: 4 },
  { label: '9:16', name: 'portrait', w: 9, h: 16 },
]
const aspect = ref('1:1')
const mp = ref(1)
// Snap to /16 (not /8) so dimensions match what the generation actually
// produces — many models/VAEs round to a multiple of 16, which left an 8px
// aspect mismatch (e.g. 840 vs 848) between the studio canvas and the output.
const snapRes = (v: number) => Math.max(16, Math.round(v / 16) * 16)
function applyRes() {
  const a = CORE_ASPECTS.find((x) => x.label === aspect.value) || CORE_ASPECTS[0]
  const total = Math.max(0.1, mp.value || 1) * 1024 * 1024
  const scale = Math.sqrt(total / (a.w * a.h))
  store.state.width = snapRes(a.w * scale)
  store.state.height = snapRes(a.h * scale)
}
function seedRes() {
  // reflect the loaded dimensions in the aspect/MP controls (no resize)
  const w = store.state.width
  const h = store.state.height
  mp.value = Math.max(0.1, Number((((w * h) / (1024 * 1024))).toFixed(2)))
  const r = w / h
  aspect.value = CORE_ASPECTS.reduce(
    (best, x) => (Math.abs(x.w / x.h - r) < Math.abs(best.w / best.h - r) ? x : best),
    CORE_ASPECTS[0],
  ).label
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
  seedRes()
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
/* Theme tokens — map ComfyUI's theme-aware CSS vars to our semantic names,
   with the old dark values as fallbacks. They inherit into child components. */
.studio {
  --st-bg: var(--comfy-menu-bg, #1a1a1f);
  --st-panel: var(--comfy-menu-secondary-bg, #202026);
  --st-input: var(--comfy-input-bg, #15151a);
  --st-btn: var(--comfy-input-bg, #2a2a30);
  --st-text: var(--input-text, #e5e5ea);
  --st-muted: var(--descrip-text, #9aa0aa);
  --st-border: var(--border-color, #3a3a44);
  --st-accent: var(--p-primary-color, #3b82f6);
  --st-on-accent: #fff;

  display: flex; flex-direction: column; gap: 9px; padding: 10px;
  font-family: var(--p-font-family, -apple-system, system-ui, sans-serif); color: var(--st-text);
  /* transparent so the node's own body colour shows through the gaps between
     cards (cards keep their --st-panel bg); feels more integrated with the node */
  background: transparent; box-sizing: border-box;
  /* definite height so inner flex areas (list/JSON) scroll instead of
     overflowing; overflow-y:auto is the safety net so when the node is too
     small to fit everything, the whole studio scrolls and nothing (incl. the
     background resize grip) gets clipped. */
  width: 100%; height: 100%; overflow-y: auto;
}
.help .h { margin: 8px 0 3px; font-size: 10px; text-transform: uppercase; letter-spacing: .5px; color: var(--st-accent); font-weight: 700; }
.help .h:first-child { margin-top: 0; }
.help dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 2px 8px; }
.help dt { color: var(--st-text); font-weight: 600; white-space: nowrap; }
.help dd { margin: 0; color: var(--st-muted); }
.help .tip { margin: 9px 0 0; color: var(--st-muted); border-top: 1px solid var(--st-border); padding-top: 7px; }
.help .credit { margin: 9px 0 0; font-size: 10px; color: var(--st-muted); line-height: 1.6; }
.help .credit a { color: var(--st-accent); text-decoration: none; }
.help .credit a:hover { text-decoration: underline; }
/* resolution picker (aspect × megapixels — matches core ResolutionSelector) */
.resmenu { display: flex; flex-direction: column; gap: 7px; width: 230px; }
.resmenu .rrow { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; color: var(--st-muted); }
.resmenu select, .resmenu input { background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text); border-radius: 4px; padding: 4px; font-size: 11px; }
.resmenu input { width: 64px; }
.resmenu .rdiv { border-top: 1px solid var(--st-border); margin: 1px 0; }
/* overlay settings (⚙) */
.adv { display: flex; flex-direction: column; gap: 7px; font-size: 11px; color: var(--st-muted); width: 200px; }
.adv .gh { font-size: 10px; text-transform: uppercase; letter-spacing: .4px; color: var(--st-muted); }
.adv .orow { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.adv .ochecks { display: flex; gap: 12px; }
.adv input[type='number'] { width: 60px; background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text); border-radius: 4px; padding: 3px; font-size: 11px; }
.adv input[type='range'] { width: 100px; accent-color: var(--st-accent); }
.adv .ck { display: flex; align-items: center; gap: 4px; }
/* collapsible "prompt" card holding summary + background */
.acc { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; cursor: pointer; color: var(--st-muted); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; padding: 0; }
.acc:hover { color: var(--st-text); }
.acc .chev { font-size: 12px; }
.pfield { display: flex; flex-direction: column; gap: 3px; font-size: 10px; color: var(--st-muted); }
.pfield textarea {
  background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text); border-radius: 6px;
  padding: 7px; font-size: 12px; resize: vertical; font-family: inherit; line-height: 1.4;
}
/* grow to fill a tall node, but never shrink below content (shrink:0) — on a
   small node the studio scrolls rather than squeezing/clipping the canvas. */
.main { display: grid; grid-template-columns: minmax(280px, 1.4fr) minmax(220px, 1fr); gap: 12px; align-items: stretch; flex: 1 0 auto; }
/* center the canvas vertically so spare height splits above/below it instead
   of pooling under it when the elements list makes the right column taller */
.left { display: flex; flex-direction: column; gap: 8px; min-width: 0; align-self: center; }
.right { display: flex; flex-direction: column; gap: 8px; min-width: 0; min-height: 0; }
@media (max-width: 520px) { .main { grid-template-columns: 1fr; } }
</style>
