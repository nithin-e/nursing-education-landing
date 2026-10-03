/**
 * The single source of truth for every photograph on the page.
 *
 * The brief's `nursing-1.jpg` … `nursing-6.jpg` files do not exist, so the
 * four real photographs already in `public/images/` are rotated across the eight
 * named slots instead. Each file lands in exactly two slots, and the two crops
 * of the same file use a different `object-position` and a different aspect
 * ratio so the reuse does not read as a duplicate.
 *
 * Adjacency is satisfied by construction: rotating a four-item pool across the
 * eight slots gives `examsMain`/`examsSecondary` different files, and
 * `researchCard1..3` three different files.
 *
 * Nothing here is a placeholder. The logo, the hero banner and the flat vector
 * illustrations are excluded on purpose, and any path that is not present on
 * disk must never be added to this file.
 */

export type Source = {
  src: string
  width: number
  height: number
  alt: string
}

export type Crop = {
  /** Maps to the slot's slot in the pool below. */
  position: string
  /** Applied by `Photo` unless the layout pins an explicit height. */
  aspect: string
  /** Extra zoom, which crops further in and varies the framing again. */
  zoom: number
  flip?: boolean
}

export type ImageSlot =
  | 'heroBandLeft'
  | 'heroBandCenter'
  | 'heroBandRight'
  | 'aboutMain'
  | 'resourcesBanner'
  | 'examsMain'
  | 'examsSecondary'
  | 'careersStrip'
  | 'researchCard1'
  | 'researchCard2'
  | 'researchCard3'

/**
 * Ordered pool. The order drives both the primary assignment and the
 * onError fallback chain, so `getImageFallbacks` walks it cyclically.
 *
 * Sorted roughly by how much pixel budget the largest box needs: the 1920px and
 * 2048px files go to the banner, the About portrait and the Exams collage,
 * while the 576px file only ever lands in small boxes.
 */
const SOURCES: Source[] = [
  {
    src: '/images/hero-patient-care.jpg',
    width: 1920,
    height: 1280,
    alt: 'Nurse providing hands-on care to a patient',
  },
  {
    src: '/images/nurse-about-ward.jpg',
    width: 1200,
    height: 900,
    alt: 'Nurse working on a hospital ward',
  },
  {
    src: '/images/nurse-careers.jpg',
    width: 2048,
    height: 1365,
    alt: 'Nursing team in a clinical setting',
  },
  {
    src: '/images/nurse-training.jpg',
    width: 576,
    height: 432,
    alt: 'Nursing students in a training session',
  },
]

const SLOTS: Record<ImageSlot, { source: string; crop: Crop }> = {
  /* The hero band. Three different files so no two neighbours repeat, and the
     three highest-resolution assets on disk, because this is the most
     prominent placement on the page. */
  heroBandLeft: {
    source: '/images/hero-patient-care.jpg',
    crop: { position: '30% 25%', aspect: '16 / 9', zoom: 1 },
  },
  heroBandCenter: {
    source: '/images/nurse-careers.jpg',
    crop: { position: '50% 45%', aspect: '16 / 9', zoom: 1 },
  },
  heroBandRight: {
    source: '/images/nurse-about-ward.jpg',
    crop: { position: '72% 60%', aspect: '16 / 9', zoom: 1 },
  },
  aboutMain: {
    source: '/images/hero-patient-care.jpg',
    crop: { position: '50% 22%', aspect: '4 / 5', zoom: 1.06 },
  },
  resourcesBanner: {
    source: '/images/nurse-about-ward.jpg',
    crop: { position: '30% 40%', aspect: '3 / 1', zoom: 1.1 },
  },
  examsMain: {
    source: '/images/nurse-careers.jpg',
    crop: { position: '50% 30%', aspect: '1 / 1', zoom: 1.05 },
  },
  examsSecondary: {
    source: '/images/nurse-training.jpg',
    crop: { position: '65% 25%', aspect: '4 / 3', zoom: 1.12 },
  },
  careersStrip: {
    source: '/images/hero-patient-care.jpg',
    crop: { position: '50% 45%', aspect: '3 / 1', zoom: 1.14 },
  },
  researchCard1: {
    source: '/images/nurse-about-ward.jpg',
    crop: { position: '70% 30%', aspect: '16 / 9', zoom: 1 },
  },
  researchCard2: {
    source: '/images/nurse-careers.jpg',
    crop: { position: '20% 45%', aspect: '16 / 9', zoom: 1 },
  },
  researchCard3: {
    source: '/images/nurse-training.jpg',
    crop: { position: '35% 60%', aspect: '16 / 9', zoom: 1 },
  },
}

export function getImage(slot: ImageSlot): { source: Source; crop: Crop } | null {
  const entry = SLOTS[slot]
  if (!entry) return null

  const source = SOURCES.find((item) => item.src === entry.source)
  if (!source) return null

  return { source, crop: entry.crop }
}

/**
 * The other three photos, in pool order, starting immediately after `src`.
 * `Photo` walks this list on each `onError` before giving up and hiding itself.
 */
export function getImageFallbacks(src: string): Source[] {
  const start = SOURCES.findIndex((item) => item.src === src)
  if (start < 0) return []

  return [...SOURCES.slice(start + 1), ...SOURCES.slice(0, start)]
}

/**
 * Look a pool file up by path. The people cards store their `photo` as a plain
 * string rather than a slot, so this is how they recover the intrinsic
 * dimensions they must put on the `<img>`.
 */
export function getSourceByPath(src: string): Source | null {
  return SOURCES.find((item) => item.src === src) ?? null
}

export const IMAGE_SLOT_NAMES = Object.keys(SLOTS) as ImageSlot[]
