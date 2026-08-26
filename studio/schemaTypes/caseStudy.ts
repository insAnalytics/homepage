import {defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'headline'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      description: 'As many as apply. The case-studies list filters by a single selected industry at a time (AND’d with a technology, if also selected).',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'industry'}]}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      description: 'As many as apply — filtered the same way as industries.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'technology'}]}],
    }),
    defineField({
      name: 'geography',
      title: 'Geography',
      type: 'string',
      options: {
        list: [
          'North America',
          'Europe',
          'India',
          'Asia Pacific',
          'Middle East & Africa',
          'Latin America',
          'Global / Multi-region',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short teaser shown on card previews (grid, home featured card) — the full story lives in Body below.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: portableTextBody,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Falls back to the logo on the site until a real image is set.',
    }),
    defineField({
      name: 'team',
      title: 'Project Team',
      description: 'Whoever worked on this engagement — shown on the case study page.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    }),
    defineField({
      name: 'visible',
      title: 'Visible on site',
      description: 'Turn off to hide this case study from the site without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'headline', subtitle: 'geography', media: 'image'},
  },
})
