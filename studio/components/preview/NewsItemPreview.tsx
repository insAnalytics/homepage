// Mirrors src/app/pages/news-detail/news-detail.html.
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import {PortableBody} from './PortableBody'
import {useAssetUrl} from './hooks'
import type {PreviewViewProps} from './types'
import {text} from './tokens'

export function NewsItemPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const title = doc.title as string | undefined
  const category = doc.category as string | undefined
  const date = doc.date as string | undefined
  const image = doc.image as {asset?: {_ref: string}} | undefined
  const body = doc.body as unknown[] | undefined
  const imageUrl = useAssetUrl(image?.asset)

  return (
    <PreviewFrame label="News / insights detail page">
      <span style={text.subhead}>
        {category}
        {category && date ? ' · ' : ''}
        {date}
      </span>
      <h1 style={text.h1}>{title || 'Untitled update'}</h1>
      {imageUrl && <img src={imageUrl} alt="" style={{width: '100%', marginTop: 24}} />}
      <div style={{marginTop: 24}}>
        <PortableBody value={body} />
      </div>
    </PreviewFrame>
  )
}
