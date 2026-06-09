// Live-preview bridge. ComfyUI streams in-progress sampler previews over the
// websocket as `b_preview` (JPEG Blob), the producing node identified by the
// preceding `executing` event. We accept only frames from a sampler that
// (transitively) feeds an enabled Ref Sync node, so unrelated KSamplers don't
// fight over the backdrop.

import { api } from '@comfy/api'
import { app } from '@comfy/app'
import { ref } from 'vue'

// Current in-progress preview as an object URL (null = no live frame).
export const previewSyncImage = ref<string | null>(null)

let watched = new Set<string>() // node ids whose previews we accept
let lastUrl: string | null = null
let currentNode: string | null = null // node from the latest `executing` event

function clearPreview() {
  if (lastUrl) {
    URL.revokeObjectURL(lastUrl)
    lastUrl = null
  }
  previewSyncImage.value = null
}

function getNodes(graph: any): any[] {
  if (!graph) return []
  return Array.isArray(graph._nodes) ? graph._nodes : Array.isArray(graph.nodes) ? graph.nodes : []
}
// `graph.links` is a plain object in old LiteGraph, a Map in the newer fork.
function getLink(graph: any, id: any): any {
  const links = graph?.links
  if (!links) return null
  return typeof links.get === 'function' ? links.get(id) : links[id]
}

// Collect ancestor node ids by walking input wires upstream from `start`.
function collectAncestors(graph: any, start: any, out: Set<string>) {
  const stack = [start]
  const visited = new Set<unknown>()
  while (stack.length) {
    const n = stack.pop()
    if (!n || visited.has(n.id)) continue
    visited.add(n.id)
    for (const inp of n.inputs ?? []) {
      if (inp?.link == null) continue
      const link = getLink(graph, inp.link)
      const srcId = link?.origin_id ?? link?.[1] // object form / serialized array form
      if (srcId == null) continue
      out.add(String(srcId))
      const src = graph.getNodeById?.(srcId)
      if (src && !visited.has(src.id)) stack.push(src)
    }
  }
}

// Rebuild the watched set: ancestors of enabled Ref Sync nodes.
function rebuildWatched() {
  const set = new Set<string>()
  const graph: any = (app as any)?.graph
  for (const n of getNodes(graph)) {
    const cls = n?.type ?? n?.comfyClass ?? n?.constructor?.comfyClass
    if (cls !== 'IdeogramRefSync') continue
    const en = n.widgets?.find((w: any) => w?.name === 'enable')
    if (en && en.value === false) continue
    collectAncestors(graph, n, set)
  }
  watched = set
}

let inited = false
export function initPreviewSync() {
  if (inited) return
  inited = true
  try {
    const A = api as any

    A.addEventListener('execution_start', rebuildWatched)

    A.addEventListener('executing', (e: any) => {
      const d = e?.detail
      currentNode = d == null ? null : typeof d === 'string' ? d : (d.display_node ?? d.node ?? null)
    })

    A.addEventListener('b_preview', (e: any) => {
      const blob = e?.detail
      if (!(blob instanceof Blob)) return
      if (!watched.size) rebuildWatched() // first frame / graph wasn't ready yet
      if (currentNode == null || !watched.has(String(currentNode))) return
      const url = URL.createObjectURL(blob)
      if (lastUrl) URL.revokeObjectURL(lastUrl)
      lastUrl = url
      previewSyncImage.value = url
    })

    // Drop the live frame once Ref Sync broadcasts the final image.
    A.addEventListener('ideogram-studio.ref-sync', clearPreview)
  } catch (err) {
    console.warn('[IdeogramStudio] live-preview listener failed to register', err)
  }
}
