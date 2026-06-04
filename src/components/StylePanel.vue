<template>
  <div class="style">
    <div class="head">
      <label class="en"><input type="checkbox" v-model="store.state.style.enabled" /> style_description</label>
      <div class="seg" v-if="store.state.style.enabled">
        <button :class="{ on: store.state.style.mode === 'photo' }" @click="store.state.style.mode = 'photo'">photo</button>
        <button :class="{ on: store.state.style.mode === 'art' }" @click="store.state.style.mode = 'art'">art</button>
      </div>
    </div>

    <template v-if="store.state.style.enabled">
      <label class="field"><span>aesthetics</span>
        <input v-model="store.state.style.aesthetics" placeholder="moody, cinematic, desaturated" />
      </label>
      <label class="field"><span>lighting</span>
        <input v-model="store.state.style.lighting" placeholder="golden hour, rim light, soft shadows" />
      </label>

      <label class="field" v-if="store.state.style.mode === 'photo'"><span>photo (camera/lens)</span>
        <input v-model="store.state.style.photo" placeholder="35mm, f/1.4, shallow depth of field" />
      </label>
      <label class="field"><span>medium</span>
        <input v-model="store.state.style.medium" :placeholder="store.state.style.mode === 'photo' ? 'photograph' : 'illustration / 3d_render / painting…'" list="media" />
        <datalist id="media">
          <option>photograph</option><option>illustration</option><option>3d_render</option>
          <option>painting</option><option>graphic_design</option>
        </datalist>
      </label>
      <label class="field" v-if="store.state.style.mode === 'art'"><span>art_style</span>
        <input v-model="store.state.style.art_style" placeholder="flat vector illustration, bold outlines" />
      </label>

      <div class="field"><span>color_palette (max 16)</span>
        <PaletteEditor v-model="store.state.style.color_palette" :max="16" label="image colors" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStudioStore } from '@/lib/store'
import PaletteEditor from './PaletteEditor.vue'
const store = useStudioStore()
</script>

<style scoped>
.style { display: flex; flex-direction: column; gap: 7px; }
.head { display: flex; justify-content: space-between; align-items: center; }
.en { font-size: 12px; color: #ccc; display: flex; gap: 5px; align-items: center; font-weight: 600; }
.seg { display: flex; gap: 2px; }
.seg button { background: #2a2a30; color: #ccc; border: 1px solid #3a3a44; border-radius: 4px; padding: 2px 9px; font-size: 11px; cursor: pointer; }
.seg button.on { background: #8b5cf6; border-color: #8b5cf6; color: #fff; }
.field { display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: #aaa; }
.field input { background: #15151a; border: 1px solid #3a3a44; color: #eee; border-radius: 5px; padding: 6px; font-size: 12px; }
</style>
