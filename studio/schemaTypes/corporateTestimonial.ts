import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'corporateTestimonial',
  title: 'Corporate Testimonial',
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
      name: 'logo',
      title: 'Client logo',
      type: 'image',
    }),
    defineField({
      name: 'letterUrl',
      title: 'Testimonial letter',
      type: 'file',
      description: 'Scanned letter, if available.',
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
    select: {title: 'name', subtitle: 'title', media: 'logo'},
  },
})
