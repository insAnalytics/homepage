import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'trainingTestimonial',
  title: 'Training Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'googleReview',
      title: 'From a Google review',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'visible',
      title: 'Visible on site',
      description: 'Turn off to hide this testimonial from the site without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'title'},
  },
})
