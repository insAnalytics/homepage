// Circular avatar — photo if set, initials-on-navy fallback otherwise.
// Mirrors .team__avatar in src/app/components/team/team.scss.
import React from 'react'
import {colors, fonts} from './tokens'

export function Avatar({
  photoUrl,
  initials,
  size = 52,
}: {
  photoUrl?: string
  initials: string
  size?: number
}) {
  const base: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
  }

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        style={{...base, objectFit: 'cover', objectPosition: 'top'}}
      />
    )
  }

  return (
    <div
      style={{
        ...base,
        background: colors.primary,
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: size * 0.34,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {initials}
    </div>
  )
}
