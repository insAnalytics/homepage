// Renders a caseStudy/newsItem `body` field the same way the Angular site's
// case-study-detail / news-detail pages do (see src/app/shared/portable-text.ts
// and the *ngSwitch in their .html templates) — native block styles (h2/h3/
// normal) plus the three custom inline object types.
import React from 'react'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import {colors, fonts} from './tokens'
import {useAssetUrl} from './hooks'

function CalloutBlock({value}: {value: {heading: string; text: string}}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${colors.accent}`,
        background: colors.offWhite,
        padding: '16px 20px',
        margin: '20px 0',
      }}
    >
      <h4 style={{fontFamily: fonts.heading, fontSize: 15, fontWeight: 600, color: colors.primary, margin: '0 0 6px'}}>
        {value.heading}
      </h4>
      <p style={{fontFamily: fonts.body, fontSize: 15, color: colors.midGrey, lineHeight: 1.7, margin: 0}}>
        {value.text}
      </p>
    </div>
  )
}

function ImageBlock({value}: {value: {asset: {_ref: string}; caption?: string}}) {
  const url = useAssetUrl(value.asset)
  if (!url) return null
  return (
    <figure style={{margin: '20px 0'}}>
      <img src={url} alt="" style={{width: '100%', display: 'block'}} />
      {value.caption && (
        <figcaption style={{fontFamily: fonts.body, fontSize: 13, color: colors.midGrey, marginTop: 6}}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

function PdfBlock({value}: {value: {label?: string; file: {asset: {_ref: string}}}}) {
  const url = useAssetUrl(value.file?.asset)
  return (
    <div
      style={{
        border: `1px solid ${colors.lightGrey}`,
        background: colors.offWhite,
        padding: '14px 18px',
        margin: '20px 0',
        fontFamily: fonts.heading,
        fontSize: 13,
        color: colors.primary,
      }}
    >
      📄 {value.label || 'PDF'} {url ? '' : '(uploading…)'}
    </div>
  )
}

const components: PortableTextComponents = {
  block: {
    h2: ({children}) => <h2 style={{fontFamily: fonts.heading, fontSize: 22, fontWeight: 600, color: colors.dark, margin: '28px 0 10px'}}>{children}</h2>,
    h3: ({children}) => <h3 style={{fontFamily: fonts.heading, fontSize: 17, fontWeight: 600, color: colors.dark, margin: '22px 0 8px'}}>{children}</h3>,
    normal: ({children}) => <p style={{fontFamily: fonts.body, fontSize: 16, color: colors.midGrey, lineHeight: 1.7, margin: '0 0 14px'}}>{children}</p>,
  },
  marks: {
    strong: ({children}) => <strong>{children}</strong>,
    em: ({children}) => <em>{children}</em>,
  },
  types: {
    calloutBlock: CalloutBlock,
    image: ImageBlock,
    pdfBlock: PdfBlock,
  },
}

export function PortableBody({value}: {value: unknown[] | undefined}) {
  if (!value?.length) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />
}
