import {defineField, defineType} from 'sanity'

// An accent-highlighted pull-out, insertable inline inside a Portable Text
// body — mirrors the old CalloutBlock from the Angular app's models.ts.
export default defineType({
  name: 'calloutBlock',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'text'},
  },
})
