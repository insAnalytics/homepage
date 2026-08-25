// Mirrors the .team__card in src/app/components/team/team.html.
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import {Avatar} from './Avatar'
import {useAssetUrl} from './hooks'
import type {PreviewViewProps} from './types'
import {colors, fonts, text} from './tokens'

export function TeamMemberPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const name = doc.name as string | undefined
  const title = doc.title as string | undefined
  const initials = doc.initials as string | undefined
  const credentials = doc.credentials as string[] | undefined
  const linkedin = doc.linkedin as string | undefined
  const photo = doc.photo as {asset?: {_ref: string}} | undefined
  const photoUrl = useAssetUrl(photo?.asset)

  return (
    <PreviewFrame label="Team card (About page)">
      <div style={{maxWidth: 320}}>
        <div
          style={{
            border: `1px solid ${colors.lightGrey}`,
            boxShadow: '0 2px 16px rgba(43, 45, 126, 0.06)',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Avatar photoUrl={photoUrl} initials={initials || '—'} />
          <div>
            <h3 style={{fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: colors.dark, margin: '0 0 4px'}}>
              {name || 'Untitled'}
            </h3>
            <p style={{...text.subhead, margin: '0 0 14px', lineHeight: 1.4}}>{title}</p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5}}>
              {(credentials || []).map((c, i) => (
                <li key={i} style={{fontFamily: fonts.heading, fontSize: 12, color: colors.midGrey, lineHeight: 1.5, paddingLeft: 10, position: 'relative'}}>
                  <span style={{position: 'absolute', left: 0, color: colors.accent, fontSize: 10}}>—</span>
                  {c}
                </li>
              ))}
            </ul>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', marginTop: 14, fontFamily: fonts.heading, fontSize: 12, color: colors.midGrey}}>
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </PreviewFrame>
  )
}
