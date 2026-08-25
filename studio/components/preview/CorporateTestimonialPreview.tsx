// Mirrors .tc__card in src/app/components/testimonials-corporate/testimonials-corporate.html.
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import {useAssetUrl} from './hooks'
import type {PreviewViewProps} from './types'
import {colors, fonts} from './tokens'

export function CorporateTestimonialPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const name = doc.name as string | undefined
  const title = doc.title as string | undefined
  const quote = doc.quote as string | undefined
  const logo = doc.logo as {asset?: {_ref: string}} | undefined
  const letterUrlField = doc.letterUrl as {asset?: {_ref: string}} | undefined
  const logoUrl = useAssetUrl(logo?.asset)
  const letterUrl = useAssetUrl(letterUrlField?.asset)

  return (
    <PreviewFrame label="Client Voices card (Case Studies page)">
      <div style={{maxWidth: 360}}>
        <div
          style={{
            background: colors.white,
            borderLeft: `3px solid ${colors.accent}`,
            boxShadow: '0 2px 16px rgba(43, 45, 126, 0.06)',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {logoUrl && (
            <div style={{height: 60, width: 180}}>
              <img src={logoUrl} alt="" style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'left center'}} />
            </div>
          )}
          <div style={{height: 1, background: colors.lightGrey}} />
          <blockquote style={{fontFamily: fonts.body, fontStyle: 'italic', fontSize: 15, color: colors.dark, lineHeight: 1.75, margin: 0}}>
            {quote}
          </blockquote>
          <div>
            <div style={{fontFamily: fonts.heading, fontSize: 14, fontWeight: 600, color: colors.primary}}>{name || 'Untitled'}</div>
            <div style={{fontFamily: fonts.heading, fontSize: 12, color: colors.midGrey}}>{title}</div>
          </div>
          {letterUrl && (
            <a href={letterUrl} target="_blank" rel="noopener noreferrer" style={{fontFamily: fonts.heading, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.midGrey}}>
              View Testimonial Letter ↗
            </a>
          )}
        </div>
      </div>
    </PreviewFrame>
  )
}
