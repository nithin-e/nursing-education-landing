/**
 * The single source of truth for every photograph on the page.
 *
 * The brief's `nursing-1.jpg` … `nursing-6.jpg` files do not exist, so the six
 * real photographs already in `public/images/` are used instead. The seven
 * non-hero layout slots share the pool and reuse files, with each reuse given a
 * different `object-position` and aspect ratio so it does not read as a
 * duplicate.
 *
 * The six `peopleCard` slots are the exception: they need one distinct file per
 * card, so each gets its own rather than sharing.
 *
 * Adjacency is satisfied by construction: `examsMain`/`examsSecondary` get
 * different files, and `researchCard1..3` three different ones.
 *
 * The hero band slots and the resources banner are the exception: they point at
 * the `DEDICATED_SOURCES` photos rather than at the rotation pool. Keeping them
 * separate is deliberate. Folding them into `SOURCES` would append them to every
 * other section's `onError` fallback chain, so a failed About or Exams photo
 * could silently swap in a hero shot or the low-resolution banner collage.
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
  | 'peopleCard1'
  | 'peopleCard2'
  | 'peopleCard3'
  | 'peopleCard4'
  | 'peopleCard5'
  | 'peopleCard6'

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
    src: '/images/8.webp',
    width: 1080,
    height: 720,
    alt: 'Nursing team in a clinical setting',
  },
{
    src: '/images/7.webp',
    width: 1080,
    height: 720,
    alt: 'Nursing students in a training session',
  },
  {
    src: '/images/nurse-careers.jpg',
    width: 2048,
    height: 1365,
    alt: 'Nurses at work in a hospital corridor',
  },
  {
    src: '/images/nurse-training.jpg',
    width: 576,
    height: 432,
    alt: 'Nursing students in a training session',
  },
]

/**
 * One-off photographs kept deliberately outside the rotation pool, because each
 * is pinned to a single named slot.
 *
 * The hero band trio are all 1080x720 (3:2). The band frames them at 4:3, which
 * is *narrower* than the source, so `object-fit: cover` matches the height and
 * crops only the sides — about 6% off each edge, versus the 27%–48% it was
 * discarding when the frames were portrait.
 *
 * That has a useful consequence: because only the sides are ever cropped, the
 * vertical component of `object-position` has no effect at 4:3. It is still set
 * per photo, and becomes live the moment one frame is widened to 3:2.
 *
 * `6.webp` is the odd one out: a 16:9 collage at only 384x216, so it is framed
 * well under the container width. See the note on its slot below.
 */
const DEDICATED_SOURCES: Source[] = [
  {
    src: '/images/1.webp',
    width: 1080,
    height: 720,
    alt: 'Dr Expert Edulinks event',
  },
  {
    src: '/images/2.webp',
    width: 1080,
    height: 720,
    alt: 'Dr Expert Edulinks event',
  },
  {
    src: '/images/3.webp',
    width: 1080,
    height: 720,
    alt: 'Dr Expert Edulinks group portrait at an event',
  },
  {
    src: '/images/2 (1).webp',
    width: 384,
    height: 216,
    alt: 'Dr Expert Edulinks events and students',
  },
  {
    src: '/images/events-collage.webp',
    width: 828,
    height: 828,
    alt: 'Dr Expert Edulinks events and students',
  },
  {
    src: '/images/4.webp',
    width: 1080,
    height: 720,
    alt: 'Nursing research',
  },
  {
    src: '/images/5.webp',
    width: 1080,
    height: 720,
    alt: 'Evidence-based practice',
  },
  {
    src: '/images/6.webp',
    width: 1080,
    height: 720,
    alt: 'Healthcare innovation',
  },
]

/**
 * Every real photograph on disk, for path lookups only. This is NOT a fallback
 * pool — `getImageFallbacks` deliberately cycles `SOURCES` alone so a one-off
 * photo can never appear in another section's `onError` chain.
 */
const ALL_SOURCES: Source[] = [...SOURCES, ...DEDICATED_SOURCES]

const SLOTS: Record<ImageSlot, { source: string; crop: Crop }> = {
  /* The hero band: the three dedicated event photographs, left to right.
     `aspect` matches the 4:3 frame the band renders them in; `position` is the
     horizontal anchor that matters — at 4:3 against a 3:2 source, `cover` crops
     only the sides, so the vertical value here is a safety net rather than an
     active adjustment. */
  heroBandLeft: {
    source: '/images/1.webp',
    crop: { position: '50% 30%', aspect: '4 / 3', zoom: 1 },
  },
  heroBandCenter: {
    source: '/images/2.webp',
    crop: { position: '50% 50%', aspect: '4 / 3', zoom: 1 },
  },
  heroBandRight: {
    source: '/images/3.webp',
    crop: { position: '50% 25%', aspect: '4 / 3', zoom: 1 },
  },
  aboutMain: {
    source: '/images/events-collage.webp',
    /* Low resolution; replace with a larger file and raise max-width.
       828x828 square into a 1:1 frame matches exactly, so `cover` crops nothing
       and `zoom` stays at 1 — no transform enlarging the collage. */
    crop: { position: 'center', aspect: '1 / 1', zoom: 1 },
  },
  resourcesBanner: {
    source: '/images/1.webp',
    /* 1080x720 (3:2) into a 3:2 frame is an exact match, so `cover` crops
       nothing and `zoom` stays at 1 — no transform enlarging the photo. */
    crop: { position: '50% 30%', aspect: '3 / 2', zoom: 1 },
  },
  examsMain: {
    source: '/images/7.webp',
    /* 1080x720 (3:2) into a 4:3 frame is narrower than the source, so `cover`
       matches the height and drops only ~6% per side. The old square frame took
       ~16% per side plus the zoom below, which cut the outermost two people and
       the backdrop. `zoom` is 1 so no transform scales the photo. */
    crop: { position: '50% 30%', aspect: '4 / 3', zoom: 1 },
  },
  examsSecondary: {
    source: '/images/8.webp',
    /* 1080x720 (3:2) in a 3:2 frame is an exact match, so `cover` crops nothing
       and `zoom` stays at 1 — no transform scaling the photo. */
    crop: { position: '50% 40%', aspect: '3 / 2', zoom: 1 },
  },
  careersStrip: {
    source: '/images/hero-patient-care.jpg',
    crop: { position: '50% 45%', aspect: '3 / 1', zoom: 1.14 },
  },
  researchCard1: {
    source: '/images/4.webp',
    crop: { position: '50% 35%', aspect: '3 / 2', zoom: 1 },
  },
  researchCard2: {
    source: '/images/5.webp',
    crop: { position: '50% 35%', aspect: '3 / 2', zoom: 1 },
  },
  researchCard3: {
    source: '/images/6.webp',
    crop: { position: '50% 35%', aspect: '3 / 2', zoom: 1 },
  },

  /* One slot per people card, so each of the six cards gets its own file and no
     two cards ever repeat a face. These deliberately do not borrow the research
     or exams slots: those sections can change their crop or their file, and the
     cards used to change silently when they did.
     All six files are landscape or square, so the circular 1:1 avatar crops the
     sides only and never the top or bottom - `position` is a horizontal anchor.
     `zoom` stays 1 so no transform scales a face. */
  peopleCard1: {
    source: '/images/hero-patient-care.jpg',
    crop: { position: '50% 25%', aspect: '1 / 1', zoom: 1 },
  },
  peopleCard2: {
    source: '/images/8.webp',
    crop: { position: '30% 30%', aspect: '1 / 1', zoom: 1 },
  },
  peopleCard3: {
    source: '/images/nurse-careers.jpg',
    crop: { position: '70% 20%', aspect: '1 / 1', zoom: 1 },
  },
  peopleCard4: {
    source: '/images/nurse-about-ward.jpg',
    crop: { position: '40% 30%', aspect: '1 / 1', zoom: 1 },
  },
  peopleCard5: {
    source: '/images/nurse-training.jpg',
    crop: { position: '60% 35%', aspect: '1 / 1', zoom: 1 },
  },
  peopleCard6: {
    source: '/images/7.webp',
    crop: { position: '20% 25%', aspect: '1 / 1', zoom: 1 },
  },
}

export function getImage(slot: ImageSlot): { source: Source; crop: Crop } | null {
  const entry = SLOTS[slot]
  if (!entry) return null

  const source = ALL_SOURCES.find((item) => item.src === entry.source)
  if (!source) return null

  return { source, crop: entry.crop }
}

/**
 * The other photos in the rotation pool, in pool order, starting immediately
 * after `src`. `Photo` walks this list on each `onError` before giving up and
 * hiding itself.
 *
 * Cycles `SOURCES` only, never `DEDICATED_SOURCES`, so a failed About or Exams photo
 * can never swap in a hero event shot. A hero path is not in the pool, so it
 * returns an empty chain — the hero band handles its own `onError` by collapsing
 * the frame instead.
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
  return ALL_SOURCES.find((item) => item.src === src) ?? null
}

/**
 * Every shape a photo value can arrive in. A slot carries a crop, a pooled file
 * carries only intrinsic size, and the people cards store nothing but a path —
 * so anything reading one has to cope with all three.
 */
export type PhotoInput =
  | string
  | Source
  | { source: Source; crop: Crop }
  | null
  | undefined

export type ResolvedPhoto = {
  /** The path, always present even when nothing else could be resolved. */
  src: string
  /** Null only when the path is not a pooled file, so no size or alt exists. */
  source: Source | null
  /** Null when neither the input nor the caller supplied one. */
  crop: Crop | null
}

/**
 * The one place a photo value is turned into something with a fixed shape.
 *
 * Callers hand over whatever they hold — a slot result, a pooled `Source`, or a
 * bare path — and read `src`, `source` and `crop` back without narrowing. `crop`
 * is the fallback for inputs that carry none, so a slot's framing survives when
 * the chain swaps to another file.
 */
export function resolvePhoto(input: PhotoInput, crop: Crop | null = null): ResolvedPhoto {
  if (typeof input === 'string') {
    const source = getSourceByPath(input)
    return { src: input, source, crop }
  }

  if (!input) return { src: '', source: null, crop }

  /* A slot result: the crop is part of the value. */
  if ('source' in input) {
    return { src: input.source.src, source: input.source, crop: input.crop ?? crop }
  }

  /* A bare pooled file: intrinsic size only, so the crop comes from the caller. */
  return { src: input.src, source: input, crop }
}

export const IMAGE_SLOT_NAMES = Object.keys(SLOTS) as ImageSlot[]
