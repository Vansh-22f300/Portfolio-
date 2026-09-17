# Portfolio — Vansh Mittal

Engineering portfolio for **Vansh Mittal**, Associate Software Engineer at Compro Technologies.

Static HTML, CSS and JavaScript. No framework, no build step, no dependencies — clone it and open
`index.html`.

**Live:** https://vansh-22f300.github.io/Portfolio-Sept26/

---

## What's here

| Page | Path |
| --- | --- |
| Home | `index.html` |
| ParkEase — Smart Parking (flagship) | `projects/parkease/` |
| Quiz-v2 — Exam Platform | `projects/quiz-v2/` |
| Spotify Clone — Music Player | `projects/spotify-clone/` |
| Aura — Product Landing Page | `projects/aura-landing/` |

Home reads Hero → Selected Work → Engineering Snapshot → Experience → Approach → Contact. Each case
study opens with a fast-scan block (what it is, my role, stack, links, metrics) and then goes deep:
problem, solution, architecture, key decisions with file-level evidence, challenges, trade-offs,
security, limitations, testing, deployment, lessons and next steps.

---

## Repository layout

```
index.html                  Home
styles.css                  Complete design system — tokens, layout, components, responsive, print
script.js                   Progressive enhancement (nav, reveals, scroll-spy, copy, lightbox)
projects/<slug>/index.html  One case study per project
data/content.js             Source of truth for every fact on the site (see below)
assets/parkease/            20 real ParkEase screenshots, WebP, ~748 KB total
assets/diagrams/            Hand-authored architecture SVGs with <title>/<desc>
assets/og-card.png          1200×630 social card
assets/favicon.svg          329-byte inline favicon
docs/EVIDENCE.md            Where each claim on the site was verified in source
tools/build-assets.sh       Regenerates the optimised ParkEase image set
robots.txt, sitemap.xml     Crawl directives, 5 URLs
```

### `data/content.js`

Every factual claim on the site — profile, experience, skills, all four projects, their decisions,
limitations and evidence lines — is recorded here as structured data with the source file or
commit that supports it.

Pages **do not** fetch it at runtime. Content is inlined into the HTML so the site renders fully
with JavaScript disabled. Treat `data/content.js` as the reference copy: change it and the page
together.

---

## Content rules

The site is written to be checkable by an engineer reading the linked repositories.

- **No invented numbers.** No user counts, uptime figures, performance gains or team sizes.
  Quantities that appear (line counts, API resource counts, bundle sizes) were measured from source
  or from a build re-run while writing.
- **Limitations are published.** Every case study has a "what's wrong with this project" section,
  ranked by what I'd fix first. ParkEase leads with plaintext password comparison at
  `controllers.py:907`, contradicting its own README.
- **Dead links are labelled, not hidden.** The Spotify demo is marked *Demo offline* because the
  recorded Vercel URL 404s and the latest deployment sits behind SSO.
- **Fictional content is declared.** Aura's testimonials, logos and stats are invented marketing
  copy for a fictional product; the case study says so above the fold.
- **Screenshots are real or absent.** Only ParkEase ships screenshots, captured from the running
  application. Nothing is mocked up.

---

## Running locally

```bash
python3 -m http.server 4173
# http://localhost:4173
```

Any static server works. Use one rather than `file://` so root-relative asset paths resolve.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, no skipped heading levels (verified by script).
- Skip link, visible focus rings, keyboard-operable nav, lightbox and copy button.
- Lightbox traps focus, closes on Escape and backdrop click, and restores scroll.
- Descriptive `alt` on every image; diagrams carry long-form alt plus SVG `<title>`/`<desc>`.
- `prefers-reduced-motion` disables all transitions and reveals; content stays visible.
- Works with JavaScript disabled — JS only adds enhancements.
- Screenshots served as WebP with `loading="lazy"` and explicit dimensions; separate thumbnails for
  grids. No web fonts, no external requests, no tracking.

---

## Deployment

GitHub Pages, via `.github/workflows/deploy-pages.yml` — it uploads the repository root as a static
artifact on push to `main`.

Pages for this repository is currently configured as **legacy build from `main`, path `/`**.
Merging into `main` publishes the site.

---

## Missing inputs

Three things weren't available when this was built, and were **omitted rather than guessed**:

| Item | Current state | To add it |
| --- | --- | --- |
| LinkedIn URL | `PROFILE.linkedin` is `''`; no link rendered | Set it in `data/content.js`, then add a `.clink` to `#contact` in `index.html` |
| Résumé PDF | `PROFILE.resume` is `''`; no button rendered | Drop the PDF in `assets/`, set the value, add the link |
| Compro dates & responsibilities | Role and company only | Extend the `#experience` entry in `index.html` and `EXPERIENCE` in `data/content.js` |

There are no `Lorem ipsum`, `Coming soon` or bracketed placeholder strings anywhere in the site —
absent facts are absent, not faked.

---

## Licence

[MIT](LICENSE)
