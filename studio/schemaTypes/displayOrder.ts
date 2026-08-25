import {defineField, defineType} from 'sanity'

// A singleton — see structure.ts, which locks the Studio to a single
// instance of this document. Sanity's array fields already support
// drag-and-drop reordering natively, so rather than a plugin or a manual
// "order" number tracked on every individual document, the display order
// for Team Members and Pillars lives here as one ordered list of
// references each — drag an item, done, nothing to renumber.
export default defineType({
  name: 'displayOrder',
  title: 'Display Order',
  type: 'document',
  fields: [
    defineField({
      name: 'teamOrder',
      title: 'Team Members',
      description: 'Drag to set the order team members appear in (About page grid, Home page teaser).',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    }),
    defineField({
      name: 'pillarOrder',
      title: 'Capability Pillars',
      description: 'Drag to set the order pillars appear in (Home page carousel, Capabilities grid).',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'pillar'}]}],
    }),
    defineField({
      name: 'corporateTestimonialOrder',
      title: 'Corporate Testimonials',
      description: 'Drag to set the order client testimonials appear in — put your highest-value clients first.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'corporateTestimonial'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Display Order'}
    },
  },
})
