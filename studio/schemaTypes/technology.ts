import {defineField, defineType} from 'sanity'

// The canonical list of technologies — referenced by CaseStudy.technologies,
// so the Case Studies page technology filter is always a real, typo-proof match.
export default defineType({
  name: 'technology',
  title: 'Technology',
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
