// Mirrors .testimonials-train__card in
// src/app/components/testimonials-training/testimonials-training.html.
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import type {PreviewViewProps} from './types'
import {colors, fonts} from './tokens'

export function TrainingTestimonialPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const name = doc.name as string | undefined
  const title = doc.title as string | undefined
  const quote = doc.quote as string | undefined
  const googleReview = doc.googleReview as boolean | undefined

  return (
    <PreviewFrame label="Learning Outcomes card (About page)">
      <div style={{maxWidth: 360}}>
        <div
          style={{
            background: colors.offWhite,
            border: `1px solid ${colors.lightGrey}`,
            padding: '40px 32px 32px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 80,
              color: colors.primary,
              opacity: 0.12,
              lineHeight: 0.6,
              position: 'absolute',
              top: 20,
              left: 28,
            }}
          >
            "
          </span>
          {googleReview && <div style={{fontSize: 16, letterSpacing: 2, paddingTop: 8}}>⭐⭐⭐⭐⭐</div>}
          <blockquote style={{fontFamily: fonts.body, fontSize: 15, color: colors.midGrey, lineHeight: 1.75, margin: 0, position: 'relative'}}>
            {quote}
          </blockquote>
          <div style={{borderTop: `1px solid ${colors.lightGrey}`, paddingTop: 16}}>
            <div style={{fontFamily: fonts.heading, fontSize: 14, fontWeight: 600, color: colors.dark}}>{name || 'Untitled'}</div>
            <div style={{fontFamily: fonts.heading, fontSize: 12, color: colors.midGrey}}>{title}</div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  )
}
