import { Fragment, useState } from 'react'

import { TEAM } from '@/data/team'
import type { TeamMember } from '@/data/team'
import { FacebookIcon, InstagramIcon } from './ui/BrandIcons'
import Section from './ui/Section'
import { SectionLabel } from './ui/SectionHeading'

/**
 * Intrinsic size for the `width`/`height` attributes. All three files are
 * 640x640, so one pair reserves the exact ratio before load and the frames never
 * reflow when a photo arrives. `PHOTO_RATIO` mirrors it in CSS.
 */
const PHOTO_WIDTH = 640
const PHOTO_HEIGHT = 640

/** Titles are dropped so the mark reads "MH", not "DMH". */
const TITLES = new Set(['dr', 'mr', 'mrs', 'ms', 'prof', 'sir'])

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => part.length > 0 && !TITLES.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** Only the links that exist, so a member without them shows no icons at all. */
function socialLinksOf(member: TeamMember) {
  return [
    { key: 'facebook', href: member.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: member.instagram, Icon: InstagramIcon },
  ].filter((link): link is { key: string; href: string; Icon: typeof FacebookIcon } =>
    Boolean(link.href),
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false)
  const socials = socialLinksOf(member)

  return (
    <li data-fade="" className="w-[82%] shrink-0 snap-start min-w-0 min-[769px]:w-auto">
      {/* 1:1, matching the 640x640 sources exactly, so `cover` crops nothing
          and `center top` keeps every face clear of the top edge. */}
      <div className="aspect-square overflow-hidden rounded-card border border-[rgb(255_255_255/0.08)] bg-slate-deep">
        {failed ? (
          /* Reached only when a file 404s. Keeps the frame at full size, so the
             initials never cause a reflow either. */
          <span className="font-display grid size-full place-items-center text-[56px] font-bold text-amber">
            {initialsOf(member.name)}
          </span>
        ) : (
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            style={{ objectPosition: 'center top' }}
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-display text-[22px] font-bold text-white">{member.name}</h3>
        <p className="mt-1 text-[16px] font-semibold text-amber">{member.role}</p>
        <p className="mt-3 line-clamp-5 text-[15px] leading-[1.7] text-muted">{member.bio}</p>

        {socials.length > 0 ? (
          <div className="mt-4 flex items-center">
            {socials.map((social, index) => {
              const { Icon } = social
              const network = social.key === 'facebook' ? 'Facebook' : 'Instagram'

              return (
                <Fragment key={social.key}>
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="mx-2 h-[18px] w-px bg-[rgb(255_255_255/0.25)]"
                    />
                  ) : null}

                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${network} - ${member.name}`}
                    className="grid size-11 place-items-center text-white transition-colors duration-200 hover:text-amber"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </Fragment>
              )
            })}
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default function Visionaries() {
  return (
    <Section id="visionaries">
      <div data-fade="" className="flex flex-col items-center text-center">
        <SectionLabel>Meet the team</SectionLabel>

        <h2 className="mt-4 max-w-[900px] text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.15] font-light text-white">
          The <span className="font-extrabold">Visionaries</span> - Meet the Leaders Behind Dr.
          Expert Edulinks
        </h2>
      </div>

      {/* Mobile is a swipe row, not a stack: `People` already established this
          82% scroll-snap pattern, and three stacked 1:1 frames is a lot of
          scrolling before the first bio. From 769px it becomes a 3-up grid. */}
      <ul
        tabIndex={0}
        aria-label="Leadership team"
        className="-mx-5 mt-14 flex snap-x snap-mandatory gap-10 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[769px]:mx-0 min-[769px]:grid min-[769px]:grid-cols-3 min-[769px]:gap-8 min-[769px]:overflow-visible min-[769px]:px-0 min-[769px]:pb-0"
      >
        {TEAM.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </ul>
    </Section>
  )
}