import {defineField, defineType} from 'sanity'

// A singleton — see structure.ts. A single-reference field can only ever
// point at one document, so "which case study/news item is featured" is
// enforced by the schema itself rather than by everyone remembering to
// uncheck the previous one — the bug a plain boolean on each document had.
export default defineType({
  name: 'featuredContent',
  title: 'Featured Content',
  type: 'document',
  fields: [
    defineField({
      name: 'caseStudy',
      title: 'Featured Case Study',
      description: 'Shown as the highlighted case study on the Home page.',
      type: 'reference',
      to: [{type: 'caseStudy'}],
    }),
    defineField({
      name: 'newsItem',
      title: 'Featured News Item',
      description: 'Shown as the highlighted update on the Insights & News page.',
      type: 'reference',
      to: [{type: 'newsItem'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Featured Content'}
    },
  },
})
