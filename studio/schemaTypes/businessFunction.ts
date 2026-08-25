import {defineField, defineType} from 'sanity'

// The single canonical list of business functions — referenced by both
// Solution.functionTags (so tagging a solution is a picker, not free text
// that can typo its way out of matching the Capabilities filter) and Site
// Settings' Business Functions pill list, rather than each maintaining its
// own separate copy.
export default defineType({
  name: 'businessFunction',
  title: 'Business Function',
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
