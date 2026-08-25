import {defineField, defineType} from 'sanity'

// Nested inside a Pillar's `solutions` array — mirrors Solution in models.ts.
export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deliveryMode',
      title: 'Delivery mode',
      type: 'string',
      options: {
        list: ['Consulting', 'R&D', 'Product Development', 'Training', 'Consulting + R&D'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'functionTags',
      title: 'Function tags',
      description: 'Business functions this solution applies to — used by the Capabilities page filter.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'businessFunction'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'deliveryMode'},
  },
})
