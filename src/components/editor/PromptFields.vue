<template>
  <div class="promptfields">
    <div class="minicard" :class="{ collapsed: !store.state.ui.summaryOpen }" title="high_level_description — a one or two sentence summary">
      <button class="mchead" :title="store.state.ui.summaryOpen ? 'Collapse' : 'Expand'" @click="store.state.ui.summaryOpen = !store.state.ui.summaryOpen">
        <i class="mdi fc" :class="store.state.ui.summaryOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"></i>
        <i class="mdi mdi-card-text-outline"></i><span>summary</span>
      </button>
      <textarea v-if="store.state.ui.summaryOpen" v-model="store.state.high_level_description" v-autogrow rows="2" placeholder="one or two sentences summarizing the whole image"></textarea>
    </div>
    <div class="minicard" :class="{ collapsed: !store.state.ui.backgroundOpen }" title="compositional_deconstruction.background">
      <button class="mchead" :title="store.state.ui.backgroundOpen ? 'Collapse' : 'Expand'" @click="store.state.ui.backgroundOpen = !store.state.ui.backgroundOpen">
        <i class="mdi fc" :class="store.state.ui.backgroundOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"></i>
        <i class="mdi mdi-image-filter-hdr"></i><span>background</span>
      </button>
      <textarea v-if="store.state.ui.backgroundOpen" v-model="store.state.background" v-autogrow rows="2" placeholder="describe the background / environment"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useStudioStore } from '@/lib/store'

const store = useStudioStore()

// auto-size a textarea to its content
const vAutogrow = {
  mounted(el: HTMLTextAreaElement) {
    const grow = () => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
    ;(el as any)._grow = grow
    el.addEventListener('input', grow)
    nextTick(grow)
  },
  updated(el: HTMLTextAreaElement) {
    ;(el as any)._grow?.()
  },
  unmounted(el: HTMLTextAreaElement) {
    el.removeEventListener('input', (el as any)._grow)
  },
}
</script>

<style scoped>
.promptfields { display: flex; flex-direction: column; gap: 8px; }
.minicard { display: flex; flex-direction: column; gap: 4px; background: var(--st-input); border: 1px solid var(--st-border); border-radius: var(--st-radius, 6px); padding: 6px 8px 8px; transition: border-color .12s; }
/* collapsed = header only: even out the bottom padding so the title sits centred */
.minicard.collapsed { padding-bottom: 6px; }
.minicard:focus-within { border-color: var(--st-accent); }
.mchead { display: flex; align-items: center; gap: 4px; width: 100%; text-align: left; background: none; border: none; cursor: pointer; font-size: 9px; text-transform: uppercase; letter-spacing: .5px; color: var(--st-muted); padding: 0; }
.mchead:hover { color: var(--st-text); }
.mchead .fc { font-size: 15px; line-height: 1; margin-left: -3px; }
.mchead .mdi { font-size: 14px; line-height: 1; }
.mchead span { margin-left: 1px; }
.minicard textarea {
  background: transparent; border: none; color: var(--st-text);
  padding: 0; font-size: 12px; resize: none; overflow-y: auto; box-sizing: border-box;
  max-height: 140px; font-family: inherit; line-height: 1.4;
}
.minicard textarea:focus { outline: none; }
</style>
