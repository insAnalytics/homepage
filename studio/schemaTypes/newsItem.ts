import {defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export default defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Project', 'Partnership', 'Speaking']},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short teaser shown on card previews — the full story lives in Body below.',
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
      name: 'visible',
      title: 'Visible on site',
      description: 'Turn off to hide this update from the site without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
