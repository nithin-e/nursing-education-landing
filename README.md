# nursing-education-landing

## Image credits

All photography in `public/images/*.jpg` comes from Pexels and is used under the
[Pexels License](https://www.pexels.com/license/) — free for commercial use, no
attribution required.

| Asset | Source |
| --- | --- |
| `hero-patient-care.jpg` / `-md.jpg` / `-sm.jpg` | [Pexels photo 18459202](https://www.pexels.com/photo/18459202/) — "Nurse and patients sitting in hallway of hospital", contributor *A2* |
| `nurse-about-ward.jpg` / `-sm.jpg` | Pexels — hospital ward |
| `nurse-careers.jpg` / `-sm.jpg` | Pexels — nursing career |
| `nurse-training.jpg` / `-sm.jpg` | Pexels — clinical simulation lab |

The `-sm` / `-md` variants are narrower re-encodes wired up through `srcSet`/`sizes` on
the `SmartImage` component, so phones never download the desktop asset.

If an asset fails to load, `SmartImage` falls back to `/images/fallback.svg` and then
to a text tile, so the layout never breaks.

## Hero background art direction

The hero photo is a full-bleed background rather than a side-by-side panel, so two
values are tuned to the photograph rather than guessed:

- **Scrim: `bg-black/70`.** Measured luminance for this photo runs p50 = 82,
  p90 = 156, p99 = 232, peak = 255. Because of those specular highlights, a 55–65%
  scrim drops `#A3A3A3` body text below WCAG AA. At 70% the worst-case region still
  measures 5.3:1 for `text-paper/80` and 8.5:1 for white, so the picture stays visible
  without losing legibility. Body copy over the photo therefore uses `text-paper/80`
  rather than `text-grey`.
- **`object-position: 56% 35%`.** Skin-tone analysis locates the nurse and patients in
  the centre-right of the frame with a clear gap at the left. On phones the horizontal
  axis is the cropping axis (portrait box vs 3:2 image), so 56% keeps the subjects
  framed; on desktop the full width is visible and only the vertical 35% applies,
  biasing slightly above centre so heads stay in frame.
