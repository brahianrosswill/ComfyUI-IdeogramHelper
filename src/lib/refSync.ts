// Bridge for the Ref Sync node: turns its broadcast temp-image descriptor into a
// /view URL exposed as a reactive ref.

import { api } from '@comfy/api'
import { ref } from 'vue'

export const refSyncImage = ref<string | null>(null)
// Caption JSON (+ optional resolution) from a Studio Sync node; counter forces watchers on identical payloads.
export const jsonSyncCaption = ref<{ json: string; width: number; height: number; n: number }>({ json: '', width: 0, height: 0, n: 0 })

let inited = false
export function initRefSync() {
  if (inited) return
  inited = true
  try {
    ;(api as any).addEventListener('ideogram-studio.ref-sync', (e: any) => {
      const d = (e && e.detail) || {}
      if (!d.filename) return
      const p = new URLSearchParams({
        filename: d.filename,
        subfolder: d.subfolder || '',
        type: d.type || 'temp',
      })
      // cache-bust so the same filename still triggers watchers + reloads
      refSyncImage.value = `/view?${p.toString()}&r=${Date.now()}`
    })
    ;(api as any).addEventListener('ideogram-studio.json-sync', (e: any) => {
      const d = (e && e.detail) || {}
      if (typeof d.json !== 'string') return
      jsonSyncCaption.value = {
        json: d.json,
        width: Number(d.width) || 0,
        height: Number(d.height) || 0,
        n: jsonSyncCaption.value.n + 1,
      }
    })
  } catch (err) {
    console.warn('[IdeogramStudio] sync listener failed to register', err)
  }
}
