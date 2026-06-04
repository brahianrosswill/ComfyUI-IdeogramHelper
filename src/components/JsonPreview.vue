<template>
  <div class="preview">
    <div class="head">
      <span>JSON caption</span>
      <div class="actions">
        <span class="warns" :class="{ ok: !warnings.length }" :title="warnings.join('\n')">
          {{ warnings.length ? `⚠ ${warnings.length}` : '✓ valid' }}
        </span>
        <button @click="copy">{{ copied ? 'copied ✓' : 'copy' }}</button>
        <button @click="open = !open">{{ open ? 'hide' : 'show' }}</button>
      </div>
    </div>
    <pre v-if="open" class="json">{{ pretty }}</pre>
    <ul v-if="open && warnings.length" class="warnlist">
      <li v-for="(w, i) in warnings" :key="i">{{ w }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStudioStore } from '@/lib/store'
import { serialize } from '@/lib/caption'

const store = useStudioStore()
const open = ref(true)
const copied = ref(false)

const result = computed(() => serialize(store.state))
const pretty = computed(() => result.value.pretty)
const warnings = computed(() => result.value.warnings)

async function copy() {
  try {
    await navigator.clipboard.writeText(result.value.json)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<style scoped>
.preview { display: flex; flex-direction: column; gap: 5px; }
.head { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #ccc; }
.actions { display: flex; gap: 6px; align-items: center; }
.actions button { background: #2a2a30; color: #ccc; border: 1px solid #3a3a44; border-radius: 4px; padding: 2px 8px; font-size: 11px; cursor: pointer; }
.warns { font-size: 11px; color: #f59e0b; cursor: help; }
.warns.ok { color: #34d399; }
.json {
  margin: 0; background: #121216; border: 1px solid #2c2c34; border-radius: 6px; padding: 8px;
  font-size: 11px; line-height: 1.4; max-height: 200px; overflow: auto; color: #cdd6f4;
  white-space: pre; font-family: ui-monospace, monospace;
}
.warnlist { margin: 0; padding-left: 16px; font-size: 10px; color: #f59e0b; max-height: 90px; overflow: auto; }
</style>
