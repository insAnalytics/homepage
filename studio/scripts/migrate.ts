// One-time migration: public/data/*.json (+ referenced public/ images) -> Sanity.
// Run from studio/: npx sanity exec scripts/migrate.ts --with-user-token
//
// Uses createOrReplace with deterministic IDs throughout, so it's safe to
// re-run (documents get overwritten in place). Asset uploads are de-duped
// within a single run, and reuse an existing Sanity asset with the same
// originalFilename on a re-run instead of uploading a duplicate.

import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const repoRoot = path.resolve(__dirname, '../..')
const publicDir = path.join(repoRoot, 'public')
const dataDir = path.join(publicDir, 'data')

function readJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf-8')) as T
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

let keyCounter = 0
function key(): string {
  keyCounter += 1
  return `k${keyCounter}`
}

const assetCache = new Map<string, string>()

async function uploadAsset(
  assetType: 'image' | 'file',
  relativePath: string
): Promise<{asset: {_type: 'reference'; _ref: string}} | undefined> {
  if (assetCache.has(relativePath)) {
    return {asset: {_type: 'reference', _ref: assetCache.get(relativePath)!}}
  }
  const fullPath = path.join(publicDir, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  [skip] missing asset on disk: ${relativePath}`)
    return undefined
  }
  const filename = path.basename(fullPath)
  const docType = assetType === 'image' ? 'sanity.imageAsset' : 'sanity.fileAsset'
  const existingId = await client.fetch<string | null>(
    `*[_type == $docType && originalFilename == $filename][0]._id`,
    {docType, filename}
  )
  const assetId =
    existingId ??
    (await client.assets.upload(assetType, fs.createReadStream(fullPath), {filename}))._id
  assetCache.set(relativePath, assetId)
  return {asset: {_type: 'reference', _ref: assetId}}
}

function textBlock(style: 'normal' | 'h2' | 'h3', text: string) {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }
}

interface OldBodyBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'callout'
  text?: string
  heading?: string
}

function convertBody(blocks: OldBodyBlock[]) {
  return blocks.map((b) => {
    switch (b.type) {
      case 'heading':
        return textBlock('h2', b.text!)
      case 'subheading':
        return textBlock('h3', b.text!)
      case 'paragraph':
        return textBlock('normal', b.text!)
      case 'callout':
        return {_type: 'calloutBlock', _key: key(), heading: b.heading!, text: b.text!}
      default:
        throw new Error(`Unknown body block type: ${(b as OldBodyBlock).type}`)
    }
  })
}

interface TeamMemberJson {
  slug: string
  name: string
  title: string
  initials: string
  photo?: string
  linkedin?: string
  featuredOnHome?: boolean
  credentials: string[]
}

interface SolutionJson {
  title: string
  body: string
  deliveryMode: string
  functionTags: string[]
}

interface PillarJson {
  slug: string
  title: string
  summary: string
  solutions: SolutionJson[]
}

interface CaseStudyJson {
  slug: string
  industries: string[]
  technologies: string[]
  geography: string
  headline: string
  summary: string
  featured?: boolean
  team?: string[]
  body: OldBodyBlock[]
}

interface NewsItemJson {
  slug: string
  category: string
  title: string
  date: string
  summary: string
  featured?: boolean
  body: OldBodyBlock[]
}

interface CorporateTestimonialJson {
  logo?: string
  quote: string
  name: string
  title: string
  letterUrl?: string
}

interface TrainingTestimonialJson {
  quote: string
  name: string
  title: string
  googleReview?: boolean
}

interface OfficeJson {
  name: string
  addressLines: string[]
  hours?: string
}

// Canonical taxonomy lists carried over from the old site-settings.json,
// unioned with whatever pillars.json / case-studies.json actually tag today.
// Since these lists are shown on the About page unconditionally (not just
// "if referenced by something"), exact-string near-duplicates from the old
// placeholder data (e.g. "Automotive" vs "Automobiles") are collapsed onto
// one canonical name via the alias maps below, rather than left standing —
// pillars.json/case-studies.json still use the old names, so every lookup
// of an industry/business-function name runs through the alias map first.
const INDUSTRIES = [
  'Banking & Financial Services',
  'Insurance',
  'Energy & Utilities',
  'Manufacturing',
  'Retail & Consumer Products',
  'Telecommunications',
  'Media & Entertainment',
  'Automobiles',
  'Healthcare',
  'Travel & Hospitality',
  'Government & Public Sector',
  'AI Hardware', // no canonical equivalent — a genuinely distinct industry, not an alias
]

const INDUSTRY_ALIASES: Record<string, string> = {
  Automotive: 'Automobiles',
  Retail: 'Retail & Consumer Products',
  BFSI: 'Banking & Financial Services',
}

const BUSINESS_FUNCTIONS = [
  'Finance & Accounting',
  'Marketing & Sales',
  'Supply Chain & Logistics',
  'Operations & Process Excellence',
  'Human Resources',
  'Risk Management',
]

const FUNCTION_ALIASES: Record<string, string> = {
  'Corp. Finance & Risk': 'Risk Management',
  Sales: 'Marketing & Sales',
  'Strategy & Marketing': 'Marketing & Sales',
}

function resolveName(name: string, aliases: Record<string, string>): string {
  return aliases[name] ?? name
}

function dedupeRefs(ids: string[]): string[] {
  return [...new Set(ids)]
}

const TECHNOLOGIES = [
  'Survival Modeling',
  'Statistical Modeling',
  'Computer Vision',
  'Machine Learning',
  'Demand Forecasting',
  'Operations Research',
  'Time Series Forecasting',
  'GPU Architecture',
  'Hardware Optimization',
  'Credit Risk Modeling',
]

async function createTaxonomy(type: string, names: string[]): Promise<Map<string, string>> {
  console.log(`\nCreating ${type} documents (${names.length})...`)
  const idByName = new Map<string, string>()
  for (const name of names) {
    const id = `${type}-${slugify(name)}`
    await client.createOrReplace({_id: id, _type: type, name})
    idByName.set(name, id)
  }
  return idByName
}

async function migrateTeam(): Promise<Map<string, string>> {
  const members = readJson<TeamMemberJson[]>('team.json')
  console.log(`\nCreating teamMember documents (${members.length})...`)
  const idBySlug = new Map<string, string>()
  for (const m of members) {
    const id = `teamMember-${m.slug}`
    const photo = m.photo ? await uploadAsset('image', m.photo) : undefined
    await client.createOrReplace({
      _id: id,
      _type: 'teamMember',
      name: m.name,
      slug: {_type: 'slug', current: m.slug},
      title: m.title,
      credentials: m.credentials,
      initials: m.initials,
      ...(m.linkedin ? {linkedin: m.linkedin} : {}),
      ...(photo ? {photo: {_type: 'image', ...photo}} : {}),
      visible: true,
      featuredOnHome: m.featuredOnHome ?? false,
    })
    idBySlug.set(m.slug, id)
  }
  return idBySlug
}

async function migratePillars(functionIdByName: Map<string, string>): Promise<Map<string, string>> {
  const pillars = readJson<PillarJson[]>('pillars.json')
  console.log(`\nCreating pillar documents (${pillars.length})...`)
  const idBySlug = new Map<string, string>()
  for (const p of pillars) {
    const id = `pillar-${p.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'pillar',
      title: p.title,
      slug: {_type: 'slug', current: p.slug},
      summary: p.summary,
      solutions: p.solutions.map((s) => ({
        _type: 'solution',
        _key: key(),
        title: s.title,
        body: s.body,
        deliveryMode: s.deliveryMode,
        functionTags: dedupeRefs(
          s.functionTags.map((name) => {
            const resolved = resolveName(name, FUNCTION_ALIASES)
            const ref = functionIdByName.get(resolved)
            if (!ref) throw new Error(`Unknown business function tag: ${name}`)
            return ref
          })
        ).map((ref) => ({_type: 'reference' as const, _key: key(), _ref: ref})),
      })),
    })
    idBySlug.set(p.slug, id)
  }
  return idBySlug
}

async function migrateCaseStudies(
  industryIdByName: Map<string, string>,
  technologyIdByName: Map<string, string>,
  teamIdBySlug: Map<string, string>
): Promise<Map<string, string>> {
  const caseStudies = readJson<CaseStudyJson[]>('case-studies.json')
  console.log(`\nCreating caseStudy documents (${caseStudies.length})...`)
  const idBySlug = new Map<string, string>()
  for (const c of caseStudies) {
    const id = `caseStudy-${c.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'caseStudy',
      headline: c.headline,
      slug: {_type: 'slug', current: c.slug},
      industries: dedupeRefs(
        c.industries.map((name) => {
          const resolved = resolveName(name, INDUSTRY_ALIASES)
          const ref = industryIdByName.get(resolved)
          if (!ref) throw new Error(`Unknown industry: ${name}`)
          return ref
        })
      ).map((ref) => ({_type: 'reference' as const, _key: key(), _ref: ref})),
      technologies: (c.technologies ?? []).map((name) => {
        const ref = technologyIdByName.get(name)
        if (!ref) throw new Error(`Unknown technology: ${name}`)
        return {_type: 'reference', _key: key(), _ref: ref}
      }),
      geography: c.geography,
      summary: c.summary,
      body: convertBody(c.body),
      ...(c.team?.length
        ? {
            team: c.team.map((slug) => {
              const ref = teamIdBySlug.get(slug)
              if (!ref) throw new Error(`Unknown team member slug: ${slug}`)
              return {_type: 'reference', _key: key(), _ref: ref}
            }),
          }
        : {}),
    })
    idBySlug.set(c.slug, id)
  }
  return idBySlug
}

async function migrateNews(): Promise<Map<string, string>> {
  const news = readJson<NewsItemJson[]>('news.json')
  console.log(`\nCreating newsItem documents (${news.length})...`)
  const idBySlug = new Map<string, string>()
  for (const n of news) {
    const id = `newsItem-${n.slug}`
    await client.createOrReplace({
      _id: id,
      _type: 'newsItem',
      title: n.title,
      slug: {_type: 'slug', current: n.slug},
      category: n.category,
      date: `${n.date}-01`,
      summary: n.summary,
      body: convertBody(n.body),
    })
    idBySlug.set(n.slug, id)
  }
  return idBySlug
}

async function migrateCorporateTestimonials(): Promise<string[]> {
  const testimonials = readJson<CorporateTestimonialJson[]>('testimonials-corporate.json')
  console.log(`\nCreating corporateTestimonial documents (${testimonials.length})...`)
  const ids: string[] = []
  let i = 0
  for (const t of testimonials) {
    i += 1
    const id = `corporateTestimonial-${slugify(t.name)}-${i}`
    const logo = t.logo ? await uploadAsset('image', t.logo) : undefined
    const letter = t.letterUrl ? await uploadAsset('file', t.letterUrl) : undefined
    await client.createOrReplace({
      _id: id,
      _type: 'corporateTestimonial',
      name: t.name,
      title: t.title,
      quote: t.quote,
      ...(logo ? {logo: {_type: 'image', ...logo}} : {}),
      ...(letter ? {letterUrl: {_type: 'file', ...letter}} : {}),
    })
    ids.push(id)
  }
  return ids
}

async function migrateTrainingTestimonials() {
  const testimonials = readJson<TrainingTestimonialJson[]>('testimonials-training.json')
  console.log(`\nCreating trainingTestimonial documents (${testimonials.length})...`)
  let i = 0
  for (const t of testimonials) {
    i += 1
    const id = `trainingTestimonial-${slugify(t.name)}-${i}`
    await client.createOrReplace({
      _id: id,
      _type: 'trainingTestimonial',
      name: t.name,
      title: t.title,
      quote: t.quote,
      googleReview: t.googleReview ?? false,
    })
  }
}

async function migrateOffices() {
  const offices = readJson<OfficeJson[]>('offices.json')
  console.log(`\nCreating office documents (${offices.length})...`)
  for (const o of offices) {
    const id = `office-${slugify(o.name)}`
    await client.createOrReplace({
      _id: id,
      _type: 'office',
      name: o.name,
      addressLines: o.addressLines,
      ...(o.hours ? {hours: o.hours} : {}),
    })
  }
}

async function migrateDisplayOrder(
  teamIdBySlug: Map<string, string>,
  pillarIdBySlug: Map<string, string>,
  corporateTestimonialIds: string[]
) {
  console.log('\nCreating displayOrder singleton...')
  const team = readJson<TeamMemberJson[]>('team.json')
  const pillars = readJson<PillarJson[]>('pillars.json')
  await client.createOrReplace({
    _id: 'displayOrder',
    _type: 'displayOrder',
    teamOrder: team.map((m) => ({
      _type: 'reference',
      _key: key(),
      _ref: teamIdBySlug.get(m.slug)!,
    })),
    pillarOrder: pillars.map((p) => ({
      _type: 'reference',
      _key: key(),
      _ref: pillarIdBySlug.get(p.slug)!,
    })),
    corporateTestimonialOrder: corporateTestimonialIds.map((id) => ({
      _type: 'reference',
      _key: key(),
      _ref: id,
    })),
  })
}

async function migrateFeaturedContent(
  caseStudyIdBySlug: Map<string, string>,
  newsItemIdBySlug: Map<string, string>
) {
  console.log('\nCreating featuredContent singleton...')
  const caseStudies = readJson<CaseStudyJson[]>('case-studies.json')
  const news = readJson<NewsItemJson[]>('news.json')
  const featuredCaseStudy = caseStudies.find((c) => c.featured)
  const featuredNews = news.find((n) => n.featured)
  await client.createOrReplace({
    _id: 'featuredContent',
    _type: 'featuredContent',
    ...(featuredCaseStudy
      ? {caseStudy: {_type: 'reference', _ref: caseStudyIdBySlug.get(featuredCaseStudy.slug)!}}
      : {}),
    ...(featuredNews
      ? {newsItem: {_type: 'reference', _ref: newsItemIdBySlug.get(featuredNews.slug)!}}
      : {}),
  })
}

async function main() {
  console.log(`Migrating into project ${client.config().projectId} / dataset ${client.config().dataset}`)

  const industryIdByName = await createTaxonomy('industry', INDUSTRIES)
  const functionIdByName = await createTaxonomy('businessFunction', BUSINESS_FUNCTIONS)
  const technologyIdByName = await createTaxonomy('technology', TECHNOLOGIES)

  const teamIdBySlug = await migrateTeam()
  const pillarIdBySlug = await migratePillars(functionIdByName)
  const caseStudyIdBySlug = await migrateCaseStudies(industryIdByName, technologyIdByName, teamIdBySlug)
  const newsItemIdBySlug = await migrateNews()

  const corporateTestimonialIds = await migrateCorporateTestimonials()
  await migrateTrainingTestimonials()
  await migrateOffices()

  await migrateDisplayOrder(teamIdBySlug, pillarIdBySlug, corporateTestimonialIds)
  await migrateFeaturedContent(caseStudyIdBySlug, newsItemIdBySlug)

  console.log('\nMigration complete.')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
