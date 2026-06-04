<template>
  <div class="ellist">
    <div class="head">
      <span>Elements ({{ store.state.elements.length }})</span>
      <div class="adds">
        <button class="obj" title="Add object" @click="store.addElement('obj')">＋ obj</button>
        <button class="text" title="Add text" @click="store.addElement('text')">＋ text</button>
      </div>
    </div>
    <ul>
      <li
        v-for="(el, i) in store.state.elements"
        :key="el.id"
        :class="{ sel: el.id === store.selectedId, muted: el.enabled === false }"
        @click="store.select(el.id)"
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
          <button title="Delete" @click.stop="store.removeElement(el.id)">✕</button>
        </span>
      </li>
    </ul>
    <p v-if="!store.state.elements.length" class="empty">No elements yet — draw a box on the canvas or use ＋ obj / ＋ text.</p>
  </div>
</template>

<script setup lang="ts">
import { useStudioStore } from '@/lib/store'
const store = useStudioStore()
</script>

<style scoped>
.ellist { display: flex; flex-direction: column; gap: 6px; }
.head { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #ccc; }
.adds { display: flex; gap: 4px; }
.adds button { border: none; border-radius: 4px; padding: 3px 8px; font-size: 11px; cursor: pointer; color: #fff; }
.adds .obj { background: #3b82f6; }
.adds .text { background: #f59e0b; color: #1a1a1a; }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; max-height: 180px; overflow-y: auto; }
li {
  display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 5px;
  background: #232329; border: 1px solid transparent; cursor: pointer; font-size: 12px; color: #ddd;
}
li:hover { background: #2b2b33; }
li.sel { border-color: #fff; background: #2e2e38; }
li.muted .snip { opacity: .45; text-decoration: line-through; }
.eye { background: none; border: none; cursor: pointer; padding: 0; font-size: 11px; flex: none; line-height: 1; filter: grayscale(.3); }
.dot { width: 9px; height: 9px; border-radius: 2px; flex: none; }
.idx { color: #888; width: 14px; flex: none; }
.link { flex: none; font-size: 10px; }
.snip { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bb { color: #777; flex: none; }
.ops { display: flex; gap: 1px; opacity: 0; transition: opacity .12s; }
li:hover .ops, li.sel .ops { opacity: 1; }
.ops button { background: #34343c; border: none; color: #bbb; border-radius: 3px; width: 18px; height: 18px; font-size: 11px; cursor: pointer; padding: 0; }
.ops button:hover { background: #44444e; color: #fff; }
.empty { font-size: 11px; color: #777; margin: 2px 0; }
</style>
