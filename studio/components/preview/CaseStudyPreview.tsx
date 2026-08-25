// Mirrors src/app/pages/case-study-detail/case-study-detail.html.
import React from 'react'
import {PreviewFrame} from './PreviewFrame'
import {PortableBody} from './PortableBody'
import {Avatar} from './Avatar'
import {useAssetUrl, useReferencedDocs} from './hooks'
import type {PreviewViewProps} from './types'
import {colors, fonts, tagPill, text} from './tokens'

interface TeamMemberDoc {
  _id: string
  name: string
  title: string
  initials: string
  photo?: {asset?: {_ref: string}}
}

function TeamCard({member}: {member: TeamMemberDoc}) {
  const photoUrl = useAssetUrl(member.photo?.asset)
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
      <Avatar photoUrl={photoUrl} initials={member.initials} size={40} />
      <div>
        <div style={{fontFamily: fonts.heading, fontSize: 14, fontWeight: 600, color: colors.dark}}>{member.name}</div>
        <div style={{fontFamily: fonts.heading, fontSize: 12, color: colors.midGrey}}>{member.title}</div>
      </div>
    </div>
  )
}

export function CaseStudyPreview({document}: PreviewViewProps) {
  const doc = document.displayed || {}
  const headline = doc.headline as string | undefined
  const geography = doc.geography as string | undefined
  const industryRefs = doc.industries as {_ref: string}[] | undefined
  const technologyRefs = doc.technologies as {_ref: string}[] | undefined
  const teamRefs = doc.team as {_ref: string}[] | undefined
  const image = doc.image as {asset?: {_ref: string}} | undefined
  const body = doc.body as unknown[] | undefined

  const industries = useReferencedDocs<{_id: string; name: string}>(industryRefs, 'name')
  const technologies = useReferencedDocs<{_id: string; name: string}>(technologyRefs, 'name')
  const team = useReferencedDocs<TeamMemberDoc>(teamRefs, 'name, title, initials, photo')
  const imageUrl = useAssetUrl(image?.asset)

  return (
    <PreviewFrame label="Case study detail page">
      <span style={{...text.subhead}}>
        {industries.map((i) => i.name).join(', ')}
        {industries.length && geography ? ' · ' : ''}
        {geography}
      </span>
      <h1 style={text.h1}>{headline || 'Untitled case study'}</h1>

      {technologies.length > 0 && (
        <div style={{marginTop: 16}}>
          {technologies.map((t) => (
            <span key={t._id} style={tagPill}>
              {t.name}
            </span>
          ))}
        </div>
      )}

      {imageUrl && <img src={imageUrl} alt="" style={{width: '100%', marginTop: 24}} />}

      <div style={{marginTop: 24}}>
        <PortableBody value={body} />
      </div>

      {team.length > 0 && (
        <div style={{marginTop: 32, borderTop: `1px solid ${colors.lightGrey}`, paddingTop: 20}}>
          <h2 style={{...text.h3, marginBottom: 16}}>Project Team</h2>
          {team.map((m) => (
            <TeamCard key={m._id} member={m} />
          ))}
        </div>
      )}
    </PreviewFrame>
  )
}
