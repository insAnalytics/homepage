import {defineField, defineType} from 'sanity'

// The canonical list of industries — referenced by CaseStudy.industries, so
// the Case Studies page industry filter is always a real, typo-proof match.
export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
