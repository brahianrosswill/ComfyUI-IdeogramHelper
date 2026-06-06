<template>
  <UiCard>
    <template #header>
      <label class="en"><input type="checkbox" v-model="st.enabled" /> style</label>
      <div v-if="st.enabled" class="seg">
        <UiButton :active="st.mode === 'photo'" @click="st.mode = 'photo'">photo</UiButton>
        <UiButton :active="st.mode === 'art'" @click="st.mode = 'art'">art</UiButton>
      </div>
    </template>

    <template v-if="st.enabled">
      <label class="field"><span>aesthetics</span>
        <input v-model="st.aesthetics" placeholder="moody, cinematic, desaturated" />
      </label>
      <label class="field"><span>lighting</span>
        <input v-model="st.lighting" placeholder="golden hour, rim light, soft shadows" />
      </label>
      <label v-if="st.mode === 'photo'" class="field"><span>photo (camera/lens)</span>
        <input v-model="st.photo" placeholder="35mm, f/1.4, shallow depth of field" />
      </label>
      <label class="field"><span>medium</span>
        <input v-model="st.medium" :placeholder="st.mode === 'photo' ? 'photograph' : 'illustration / 3d_render / painting…'" list="media" />
        <datalist id="media">
          <option>photograph</option><option>illustration</option><option>3d_render</option>
          <option>painting</option><option>graphic_design</option>
        </datalist>
      </label>
      <label v-if="st.mode === 'art'" class="field"><span>art_style</span>
        <input v-model="st.art_style" placeholder="flat vector illustration, bold outlines" />
      </label>
      <div class="field"><span>color palette (max 16)</span>
        <PaletteEditor v-model="st.color_palette" :max="16" label="image colors" />
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudioStore } from '@/lib/store'
import UiCard from './ui/UiCard.vue'
import UiButton from './ui/UiButton.vue'
import PaletteEditor from './PaletteEditor.vue'

const store = useStudioStore()
// computed (template auto-unwraps) so it survives store.load() replacing style
const st = computed(() => store.state.style)
</script>

<style scoped>
.en { font-size: 12px; color: var(--st-text); display: flex; gap: 5px; align-items: center; font-weight: 600; }
.seg { display: flex; gap: 2px; }
.field { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: var(--st-muted); }
.field input { background: var(--st-input); border: 1px solid var(--st-border); color: var(--st-text); border-radius: 5px; padding: 6px; font-size: 12px; }
</style>
