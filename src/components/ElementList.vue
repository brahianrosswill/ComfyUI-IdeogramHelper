<template>
  <UiCard :title="`Elements (${store.state.elements.length})`" style="flex: 1 1 auto; min-height: 0;">
    <template #header>
      <div class="adds">
        <UiButton title="Add an object box" @click="store.addElement('obj')">＋ obj</UiButton>
        <UiButton title="Add a text box" @click="store.addElement('text')">＋ text</UiButton>
      </div>
    </template>

    <ul v-if="store.state.elements.length">
      <li
        v-for="(el, i) in store.state.elements"
        :key="el.id"
        :class="{ sel: store.isSelected(el.id), primary: el.id === store.selectedId, muted: el.enabled === false }"
        @click="rowClick($event, el.id)"
      >
        <button class="eye" :title="el.enabled === false ? 'Muted — click to enable' : 'Mute (keep, exclude from output)'" @click.stop="store.toggleEnabled(el.id)">
          {{ el.enabled === false ? '🚫' : '👁' }}
        </button>
        <span class="dot" :style="{ background: el.boxColor }"></span>
        <span class="idx">{{ i + 1 }}</span>
        <span v-if="el.linkId" class="link" :title="'Linked ×' + store.linkGroupSize(el.id)">🔗</span>
        <span class="snip">{{ el.type === 'text' ? '“' + (el.text || '…') + '”' : (el.desc || 'object…') }}</span>
        <span class="bb" :title="el.bbox ? 'has bbox' : 'no bbox (model auto-places)'">{{ el.bbox ? '▣' : '◌' }}</span>
        <span class="ops">
          <button title="Move up" @click.stop="store.moveElement(el.id, -1)">↑</button>
          <button title="Move down" @click.stop="store.moveElement(el.id, 1)">↓</button>
          <button title="Linked copy (shares prompt, own position)" @click.stop="store.duplicateLinked(el.id)">🔗</button>
          <button title="Duplicate" @click.stop="store.duplicateElement(el.id)">⧉</button>
          <button class="del" title="Delete" @click.stop="store.removeElement(el.id)">🗑</button>
        </span>
      </li>
    </ul>
    <p v-else class="empty">No elements yet — draw a box on the canvas, or use ＋ obj / ＋ text.</p>
  </UiCard>
</template>

<script setup lang="ts">
import { useStudioStore } from '@/lib/store'
import UiCard from './ui/UiCard.vue'
import UiButton from './ui/UiButton.vue'
const store = useStudioStore()

function rowClick(e: MouseEvent, id: string) {
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    store.select(id, true) // additive toggle
    return
  }
  // plain click: deselect if it's the only selected row, else select just it
  if (store.selectedIds.length === 1 && store.isSelected(id)) store.select(null)
  else store.select(id)
}
</script>

<style scoped>
.adds { display: flex; gap: 4px; }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; flex: 1 1 auto; min-height: 80px; overflow-y: auto; }
li {
  display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 5px;
  background: var(--st-input); border: 1px solid transparent; cursor: pointer; font-size: 12px; color: var(--st-text);
}
li:hover { border-color: var(--st-border); }
li.sel { border-color: var(--st-accent); }
li.muted .snip { opacity: .45; text-decoration: line-through; }
.eye { background: none; border: none; cursor: pointer; padding: 0; font-size: 11px; flex: none; line-height: 1; filter: grayscale(.3); }
.dot { width: 9px; height: 9px; border-radius: 2px; flex: none; }
.idx { color: var(--st-muted); width: 14px; flex: none; }
.link { flex: none; font-size: 10px; }
.snip { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bb { color: var(--st-muted); flex: none; }
.ops { display: flex; gap: 1px; opacity: 0; transition: opacity .12s; }
li:hover .ops, li.sel .ops { opacity: 1; }
.ops button { background: var(--st-btn); border: 1px solid var(--st-border); color: var(--st-muted); border-radius: 3px; width: 18px; height: 18px; font-size: 11px; cursor: pointer; padding: 0; }
.ops button:hover { color: var(--st-text); border-color: var(--st-accent); }
.ops button.del:hover { color: #fff; background: #b91c1c; border-color: #b91c1c; }
.empty { font-size: 11px; color: var(--st-muted); margin: 2px 0; }
</style>
