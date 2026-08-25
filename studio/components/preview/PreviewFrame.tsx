// Shared chrome around every preview: loads the site's Google Fonts once
// (Studio doesn't otherwise have them) and gives every preview the same
// white canvas + max-width reading column the real site uses.
import React, {useEffect} from 'react'
import {colors, fonts, googleFontsHref} from './tokens'

const FONT_LINK_ID = 'insa-preview-fonts'

export function PreviewFrame({children, label}: {children: React.ReactNode; label: string}) {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return
    const link = document.createElement('link')
    link.id = FONT_LINK_ID
    link.rel = 'stylesheet'
    link.href = googleFontsHref
    document.head.appendChild(link)
  }, [])

  return (
    <div style={{background: colors.white, minHeight: '100%'}}>
      <div
        style={{
          padding: '10px 16px',
          background: colors.offWhite,
          borderBottom: `1px solid ${colors.lightGrey}`,
          fontFamily: fonts.heading,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.midGrey,
        }}
      >
        Site preview — {label}
      </div>
      <div style={{maxWidth: 860, margin: '0 auto', padding: '48px 32px'}}>{children}</div>
    </div>
  )
}
