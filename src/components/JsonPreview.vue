<template>
  <UiCard>
    <template #header>
      <div class="jbar">
        <slot name="controls" />
        <span class="jgrow"></span>
        <span class="jlabel">json</span>
        <span v-if="!editing" class="warns" :class="{ ok: !warnings.length }" :title="warnings.join('\n')">
          {{ warnings.length ? `⚠ ${warnings.length}` : '✓ valid' }}
        </span>
        <span v-else class="warns" :class="{ ok: !parseError }">{{ parseError ? '✗ invalid JSON' : '✓ parses' }}</span>
        <UiButton v-if="!editing" @click="copy">{{ copied ? 'copied ✓' : 'copy' }}</UiButton>
        <UiButton v-if="!editing" @click="startEdit">edit / paste</UiButton>
        <template v-else>
          <UiButton title="Re-indent the JSON" @click="tidy">tidy</UiButton>
          <UiButton variant="primary" :disabled="!!parseError" @click="apply">apply →</UiButton>
          <UiButton @click="cancel">cancel</UiButton>
        </template>
        <UiButton v-if="!editing" @click="open = !open">{{ open ? 'hide' : 'show' }}</UiButton>
      </div>
    </template>

    <textarea
      v-if="editing"
      v-model="draft"
      class="json edit"
      spellcheck="false"
      placeholder="Paste an Ideogram JSON caption here, then Apply to load it into the studio."
    ></textarea>
    <pre v-else-if="open" class="json">{{ pretty }}</pre>

    <div v-if="editing && parseError" class="parseerr">{{ parseError }}</div>
    <ul v-if="!editing && open && warnings.length" class="warnlist">
      <li v-for="(w, i) in warnings" :key="i">{{ w }}</li>
    </ul>
  </UiCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStudioStore } from '@/lib/store'
import { serialize, captionToState } from '@/lib/caption'
import UiCard from './ui/UiCard.vue'
import UiButton from './ui/UiButton.vue'

const store = useStudioStore()
const open = ref(true)
const copied = ref(false)
const editing = ref(false)
const draft = ref('')

const result = computed(() => serialize(store.state))
const pretty = computed(() => result.value.pretty)
const warnings = computed(() => result.value.warnings)

// Validity of the draft while editing (empty draft is treated as valid/no-op).
const parseError = computed(() => {
  if (!editing.value || !draft.value.trim()) return ''
  try {
    JSON.parse(draft.value)
    return ''
  } catch (e: any) {
    return String(e?.message || e)
  }
})

async function copy() {
  try {
    await navigator.clipboard.writeText(result.value.pretty)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    /* clipboard unavailable */
  }
}

function startEdit() {
  draft.value = result.value.pretty
  editing.value = true
}
function cancel() {
  editing.value = false
}
function tidy() {
  try {
    draft.value = JSON.stringify(JSON.parse(draft.value), null, 2)
  } catch {
    /* leave as-is if it doesn't parse */
  }
}
function apply() {
  let obj: any
  try {
    obj = JSON.parse(draft.value)
  } catch {
    return // parseError already shown
  }
  const parts = captionToState(obj)
  store.state.high_level_description = parts.high_level_description
  store.state.style = parts.style
  store.state.background = parts.background
  store.state.elements = parts.elements
  store.select(null)
  store.snapshot()
  editing.value = false
}
</script>

<style scoped>
.jbar { display: flex; align-items: center; gap: 5px; width: 100%; flex-wrap: wrap; }
.jgrow { flex: 1 1 auto; }
.jlabel { font-size: 10px; text-transform: uppercase; letter-spacing: .5px; color: var(--st-muted); }
.warns { font-size: 11px; color: #f59e0b; cursor: help; }
.warns.ok { color: #34d399; }
.json {
  margin: 0; background: var(--st-input); border: 1px solid var(--st-border); border-radius: 6px; padding: 8px;
  font-size: 11px; line-height: 1.4; max-height: 220px; overflow: auto; color: var(--st-text);
  white-space: pre; font-family: ui-monospace, monospace;
}
.json.edit { width: 100%; box-sizing: border-box; min-height: 160px; resize: vertical; white-space: pre; }
.parseerr { font-size: 10px; color: #f87171; font-family: ui-monospace, monospace; }
.warnlist { margin: 0; padding-left: 16px; font-size: 10px; color: #f59e0b; max-height: 90px; overflow: auto; }
</style>
