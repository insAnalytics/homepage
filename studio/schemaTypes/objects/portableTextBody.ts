// Shared `body` field definition — used by both caseStudy and newsItem.
// Native `block` type covers headings/subheadings/paragraphs as different
// block styles within one continuous editable flow (pick a heading level
// from the toolbar, like Google Docs), with images, PDFs, and callouts
// insertable inline as custom object types.
export const portableTextBody = [
  {
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'Heading', value: 'h2'},
      {title: 'Subheading', value: 'h3'},
    ],
    lists: [],
    marks: {
      decorators: [
        {title: 'Bold', value: 'strong'},
        {title: 'Italic', value: 'em'},
      ],
      annotations: [],
    },
  },
  {
    type: 'image',
    fields: [{name: 'caption', title: 'Caption', type: 'string'}],
  },
  {type: 'calloutBlock'},
  {type: 'pdfBlock'},
]
