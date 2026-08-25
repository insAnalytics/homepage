import type {ComponentType} from 'react'
import type {StructureResolver} from 'sanity/structure'
import type {PreviewViewProps} from './components/preview/types'
import {TeamMemberPreview} from './components/preview/TeamMemberPreview'
import {PillarPreview} from './components/preview/PillarPreview'
import {CaseStudyPreview} from './components/preview/CaseStudyPreview'
import {NewsItemPreview} from './components/preview/NewsItemPreview'
import {CorporateTestimonialPreview} from './components/preview/CorporateTestimonialPreview'
import {TrainingTestimonialPreview} from './components/preview/TrainingTestimonialPreview'

const SINGLETONS = ['displayOrder', 'featuredContent']

// These types get a second "Preview" tab (alongside the normal Form tab) —
// a React re-implementation of how the document renders on the live site,
// reading the in-progress edit via useFormValue so it updates as you type.
// See components/preview/.
const PREVIEWABLE: {type: string; title: string; component: ComponentType<PreviewViewProps>}[] = [
  {type: 'teamMember', title: 'Team Member', component: TeamMemberPreview},
  {type: 'pillar', title: 'Capability Pillar', component: PillarPreview},
  {type: 'caseStudy', title: 'Case Study', component: CaseStudyPreview},
  {type: 'newsItem', title: 'News Item', component: NewsItemPreview},
  {type: 'corporateTestimonial', title: 'Corporate Testimonial', component: CorporateTestimonialPreview},
  {type: 'trainingTestimonial', title: 'Training Testimonial', component: TrainingTestimonialPreview},
]

// Display Order and Featured Content are singletons — always the same
// document ID, no "create new" option — everything else lists normally.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Display Order')
        .id('displayOrder')
        .child(S.document().schemaType('displayOrder').documentId('displayOrder')),
      S.listItem()
        .title('Featured Content')
        .id('featuredContent')
        .child(S.document().schemaType('featuredContent').documentId('featuredContent')),
      S.divider(),
      ...PREVIEWABLE.map(({type, title, component}) =>
        S.listItem()
          .title(title)
          .schemaType(type)
          .child(
            S.documentTypeList(type)
              .title(title)
              .child((documentId) =>
                S.document()
                  .documentId(documentId)
                  .schemaType(type)
                  .views([S.view.form(), S.view.component(component).title('Preview')])
              )
          )
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? '') && !PREVIEWABLE.some((p) => p.type === item.getId())
      ),
    ])
