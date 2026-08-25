import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'office',
  title: 'Office',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressLines',
      title: 'Address lines',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g. "Mon–Fri" — optional.',
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
