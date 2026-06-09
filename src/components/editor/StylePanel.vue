<template>
  <UiCard>
    <template #header>
      <div class="chead">
        <button class="fold" :title="store.state.ui.styleOpen ? 'Collapse' : 'Expand'" @click="store.state.ui.styleOpen = !store.state.ui.styleOpen">
          <i class="mdi" :class="store.state.ui.styleOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"></i>
        </button>
        <UiPopover align="left">
          <template #trigger>
            <button class="lhead" title="Style options">style<i class="mdi mdi-menu-down"></i></button>
          </template>
          <div class="lmenu">
            <label class="litem"><input type="checkbox" v-model="st.enabled" /> style enabled</label>
            <template v-if="st.enabled">
              <div class="ldiv"></div>
              <div class="lgroup">mode</div>
              <button class="litem" :class="{ on: st.mode === 'photo' }" @click="st.mode = 'photo'"><i class="mdi mdi-camera-outline"></i> photo</button>
              <button class="litem" :class="{ on: st.mode === 'art' }" @click="st.mode = 'art'"><i class="mdi mdi-palette-outline"></i> art</button>
              <div class="ldiv"></div>
              <label class="litem"><input type="checkbox" v-model="store.state.ui.showPresets" /> show presets</label>
            </template>
          </div>
        </UiPopover>
      </div>
      <button v-if="st.enabled" class="modebtn" :title="st.mode === 'photo' ? 'Photo mode — click to switch to art' : 'Art mode — click to switch to photo'" @click="st.mode = st.mode === 'photo' ? 'art' : 'photo'">
        <i class="mdi" :class="st.mode === 'photo' ? 'mdi-camera-outline' : 'mdi-palette-outline'"></i>
      </button>
    </template>

    <template v-if="st.enabled && store.state.ui.styleOpen">
      <div class="field"><span>aesthetics</span>
        <ComboInput v-model="st.aesthetics" :options="opts(PRESETS.aesthetics)" placeholder="moody, cinematic, desaturated" />
      </div>
      <div class="field"><span>lighting</span>
        <ComboInput v-model="st.lighting" :options="opts(PRESETS.lighting)" placeholder="golden hour, rim light, soft shadows" />
      </div>
      <div v-if="st.mode === 'photo'" class="field"><span>photo (camera / lens)</span>
        <ComboInput v-model="st.photo" :options="opts(PRESETS.camera)" placeholder="35mm, f/1.4, shallow depth of field" />
      </div>
      <div class="field"><span>medium</span>
        <ComboInput v-model="st.medium" :options="opts(PRESETS.medium)" :placeholder="st.mode === 'photo' ? 'photograph' : 'illustration / 3d_render / painting…'" />
      </div>
      <div v-if="st.mode === 'art'" class="field"><span>art_style</span>
        <ComboInput v-model="st.art_style" :options="opts(PRESETS.artStyle)" placeholder="flat vector illustration, bold outlines" />
      </div>
      <div class="field"><span>color palette (max 16)</span>
        <PaletteEditor v-model="st.color_palette" :max="16" label="image colors" />
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudioStore } from '@/lib/store'
import UiCard from '../ui/UiCard.vue'
import UiPopover from '../ui/UiPopover.vue'
import PaletteEditor from './PaletteEditor.vue'
import ComboInput from './ComboInput.vue'
import { PRESETS } from '@/lib/presets'

const store = useStudioStore()
// computed so it survives store.load() replacing style
const st = computed(() => store.state.style)
const showPresets = computed(() => store.state.ui.showPresets)
// empty options hides the picker
const opts = (list: string[]) => (showPresets.value ? list : [])
</script>

<style scoped>
.chead { display: flex; align-items: center; gap: 4px; }
.fold { display: inline-flex; align-items: center; background: none; border: none; cursor: pointer; color: var(--st-muted); padding: 0; margin-left: -3px; }
.fold:hover { color: var(--st-text); }
.fold .mdi { font-size: 16px; line-height: 1; }
.lhgroup { display: flex; align-items: center; gap: 5px; line-height: 1; }
.modebtn { display: inline-flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; color: var(--st-muted); padding: 0; line-height: 1; }
.modebtn:hover { color: var(--st-accent); }
.modebtn .mdi { font-size: 15px; line-height: 1; display: block; }
.lhead { display: inline-flex; align-items: center; gap: 1px; background: none; border: none; cursor: pointer; font-size: 10px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--st-muted); padding: 0; }
.lhead:hover { color: var(--st-text); }
.lhead .mdi { font-size: 15px; line-height: 1; }
.lmenu { display: flex; flex-direction: column; gap: 1px; min-width: 160px; }
.litem { display: flex; align-items: center; gap: 8px; text-align: left; background: none; border: none; color: var(--st-text); padding: 6px 8px; border-radius: 5px; font-size: 11px; cursor: pointer; }
.litem:hover { background: var(--st-btn); }
.litem.on { color: var(--st-accent); }
.litem .mdi { font-size: 15px; color: var(--st-muted); }
.litem.on .mdi { color: var(--st-accent); }
.ldiv { border-top: 1px solid var(--st-border); margin: 3px 0; }
.lgroup { font-size: 9px; text-transform: uppercase; letter-spacing: .5px; color: var(--st-muted); padding: 2px 8px 0; }
.field { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: var(--st-muted); }
.field input { background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text); border-radius: 5px; padding: 6px; font-size: 12px; }
</style>
