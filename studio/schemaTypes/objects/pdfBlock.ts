import {defineField, defineType} from 'sanity'

// An embedded PDF (slide deck, one-pager, full write-up), insertable inline
// inside a Portable Text body — mirrors the old PdfBlock from models.ts.
export default defineType({
  name: 'pdfBlock',
  title: 'PDF',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional caption shown above the embedded PDF.',
    }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      options: {accept: 'application/pdf'},
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'file.asset.originalFilename'},
    prepare({title, subtitle}) {
      return {title: title || 'PDF', subtitle}
    },
  },
})
