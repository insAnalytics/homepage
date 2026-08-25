// Mirrors the expanded pillar panel in src/app/pages/capabilities/capabilities.html
// (.capabilities__pillar-intro + .capabilities__solution-card).
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import {useAssetUrl, useReferencedDocs} from './hooks'
import type {PreviewViewProps} from './types'
import {accentRule, colors, fonts, tagPill, text} from './tokens'

interface Solution {
  _key: string
  title: string
  body: string
  deliveryMode: string
  functionTags?: {_ref: string}[]
}

function SolutionCard({solution}: {solution: Solution}) {
  const tags = useReferencedDocs<{_id: string; name: string}>(solution.functionTags, 'name')
  return (
    <div
      style={{
        border: `1px solid ${colors.lightGrey}`,
        boxShadow: '0 2px 16px rgba(43, 45, 126, 0.06)',
        padding: 20,
        marginBottom: 16,
      }}
    >
      <h4 style={{...text.h3, marginBottom: 8}}>{solution.title}</h4>
      <p style={{...text.body, fontSize: 14, marginBottom: 12}}>{solution.body}</p>
      <div>
        <span style={{...tagPill, background: colors.primary, color: colors.white, borderColor: colors.primary}}>
          {solution.deliveryMode}
        </span>
        {tags.map((t) => (
          <span key={t._id} style={tagPill}>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PillarPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const title = doc.title as string | undefined
  const summary = doc.summary as string | undefined
  const image = doc.image as {asset?: {_ref: string}} | undefined
  const solutions = (doc.solutions as Solution[] | undefined) || []
  const imageUrl = useAssetUrl(image?.asset)

  return (
    <PreviewFrame label="Capability pillar (Capabilities page)">
      <hr style={accentRule} />
      <h2 style={text.h2}>{title || 'Untitled pillar'}</h2>
      <p style={{...text.body, marginTop: 12, marginBottom: 24}}>{summary}</p>
      {imageUrl && <img src={imageUrl} alt="" style={{width: '100%', marginBottom: 28}} />}
      <h3 style={{...text.subhead, marginBottom: 12}}>Solutions</h3>
      {solutions.map((s) => (
        <SolutionCard key={s._key} solution={s} />
      ))}
    </PreviewFrame>
  )
}
