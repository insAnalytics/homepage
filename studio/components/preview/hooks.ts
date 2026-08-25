// Preview components read the document's live (unsaved) field values via
// useFormValue, but references and image/file assets only carry a `_ref` in
// that raw form state — these hooks resolve them against the dataset so the
// preview shows names/URLs instead of ids, updating as the user edits.
import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

const API_VERSION = '2024-01-01'

export function useAssetUrl(ref: {_ref: string} | undefined): string | undefined {
  const client = useClient({apiVersion: API_VERSION})
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!ref?._ref) {
      setUrl(undefined)
      return
    }
    let cancelled = false
    client.fetch<string | null>(`*[_id==$id][0].url`, {id: ref._ref}).then((result) => {
      if (!cancelled) setUrl(result ?? undefined)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?._ref])

  return url
}

export function useReferencedDocs<T extends {_id: string}>(
  refs: {_ref: string}[] | undefined,
  projection: string
): T[] {
  const client = useClient({apiVersion: API_VERSION})
  const [docs, setDocs] = useState<T[]>([])
  const key = (refs ?? []).map((r) => r._ref).join(',')

  useEffect(() => {
    if (!refs || refs.length === 0) {
      setDocs([])
      return
    }
    let cancelled = false
    client
      .fetch<T[]>(`*[_id in $ids]{_id, ${projection}}`, {ids: refs.map((r) => r._ref)})
      .then((result) => {
        if (cancelled) return
        const byId = new Map(result.map((d) => [d._id, d]))
        setDocs(refs.map((r) => byId.get(r._ref)).filter((d): d is T => Boolean(d)))
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, projection])

  return docs
}
