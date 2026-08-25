// Design tokens mirrored from src/styles/scss/_variables.scss (CLAUDE.md
// Design System) — kept in sync manually since the Studio is a separate app
// from the Angular site and can't import its SCSS.
import type {CSSProperties} from 'react'

export const colors = {
  primary: '#2B2D7E',
  accent: '#3DB84B',
  white: '#FFFFFF',
  offWhite: '#F7F8FC',
  lightGrey: '#EAECF4',
  midGrey: '#6B7280',
  dark: '#1A1A2E',
}

export const fonts = {
  display: `'Playfair Display', Georgia, serif`,
  heading: `'DM Sans', -apple-system, Helvetica, Arial, sans-serif`,
  body: `'Source Serif 4', Georgia, serif`,
}

export const googleFontsHref =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&family=Source+Serif+4:wght@400;600&display=swap'

// Shared text styles, following CLAUDE.md's type scale (scaled down slightly
// since this renders inside a Studio panel, not a full-width page).
export const text = {
  label: {
    fontFamily: fonts.heading,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: colors.accent,
  } satisfies CSSProperties,
  h1: {
    fontFamily: fonts.display,
    fontSize: 36,
    fontWeight: 700,
    color: colors.dark,
    lineHeight: 1.15,
    margin: '8px 0 0',
  } satisfies CSSProperties,
  h2: {
    fontFamily: fonts.heading,
    fontSize: 26,
    fontWeight: 600,
    color: colors.primary,
    lineHeight: 1.2,
    margin: '8px 0 0',
  } satisfies CSSProperties,
  h3: {
    fontFamily: fonts.heading,
    fontSize: 18,
    fontWeight: 600,
    color: colors.dark,
    margin: 0,
  } satisfies CSSProperties,
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.midGrey,
    lineHeight: 1.7,
    margin: 0,
  } satisfies CSSProperties,
  subhead: {
    fontFamily: fonts.heading,
    fontSize: 12,
    fontWeight: 500,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  } satisfies CSSProperties,
}

export const accentRule: CSSProperties = {
  width: 40,
  height: 2,
  background: colors.accent,
  border: 'none',
  margin: '0 0 12px',
}

export const tagPill: CSSProperties = {
  display: 'inline-block',
  fontFamily: fonts.heading,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.04em',
  color: colors.primary,
  background: colors.offWhite,
  border: `1px solid ${colors.lightGrey}`,
  borderRadius: 3,
  padding: '4px 10px',
  marginRight: 6,
  marginBottom: 6,
}

export const card: CSSProperties = {
  border: `1px solid ${colors.lightGrey}`,
  boxShadow: '0 2px 16px rgba(43, 45, 126, 0.06)',
  background: colors.white,
  padding: 24,
  boxSizing: 'border-box',
}
