import teamMember from './teamMember'
import pillar from './pillar'
import caseStudy from './caseStudy'
import newsItem from './newsItem'
import corporateTestimonial from './corporateTestimonial'
import trainingTestimonial from './trainingTestimonial'
import office from './office'
import displayOrder from './displayOrder'
import featuredContent from './featuredContent'
import businessFunction from './businessFunction'
import industry from './industry'
import technology from './technology'

import solution from './objects/solution'
import calloutBlock from './objects/calloutBlock'
import pdfBlock from './objects/pdfBlock'

export const schemaTypes = [
  // Documents
  teamMember,
  pillar,
  caseStudy,
  newsItem,
  corporateTestimonial,
  trainingTestimonial,
  office,
  displayOrder,
  featuredContent,
  businessFunction,
  industry,
  technology,
  // Objects (nested/inline types)
  solution,
  calloutBlock,
  pdfBlock,
]
