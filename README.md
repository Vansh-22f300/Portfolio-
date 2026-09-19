# Portfolio — Vansh Mittal

Engineering portfolio for **Vansh Mittal**, Associate Software Engineer at Compro Technologies.

Static HTML, CSS and JavaScript. No framework, no build step, no dependencies — clone it and open
`index.html`.

**Live:** https://vansh-mittal-portfolio.vercel.app/

---

## What's here

| Page | Path | Role |
| --- | --- | --- |
| Home | `index.html` | — |
| **Status Tracker** | `projects/status-tracker/` | **Featured project** |
| ParkEase — Smart Parking | `projects/parkease/` | Case study 01 (flagship) |
| Quiz-v2 — Exam Platform | `projects/quiz-v2/` | Case study 02 |
| Spotify Clone — Music Player | `projects/spotify-clone/` | Case study 03 |
| Aura — Product Landing Page | `projects/aura-landing/` | Case study 04 |

Home reads Hero → **Featured Project** → Selected Work → Engineering Snapshot → Experience →
Approach → Contact.

Status Tracker sits in its own full-bleed dark band above the numbered list. The separation is
structural — a different section with an inverted palette — so it reads as "start here" rather than
as a fifth, louder card. The four case studies keep their original order and numbering.

Each case study opens with a fast-scan block (what it is, my role, stack, links, metrics) and then
goes deep: problem, solution, architecture, key decisions with file-level evidence, challenges,
trade-offs, security, limitations, testing, deployment, lessons and next steps.

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
                            (parkease, quiz-v2, status-tracker)
assets/og-card.png          1200×630 social card
assets/favicon.svg          329-byte inline favicon
docs/EVIDENCE.md            Where each claim on the site was verified in source
tools/build-assets.sh       Regenerates the optimised ParkEase image set
robots.txt, sitemap.xml     Crawl directives, 6 URLs
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
- **Every link is re-checked, including the ones supplied to me.** Status Tracker's
  `team-status-tracker.vercel.app` was dead in an earlier pass and is live again after the repo
  transfer, so it is linked; its GitHub URL was updated to the new `Vansh-22f300` owner.
- **Fictional content is declared.** Aura's testimonials, logos and stats are invented marketing
  copy for a fictional product; the case study says so above the fold.
- **Screenshots are real or absent.** Only ParkEase ships screenshots, captured from the running
  application. Status Tracker has none — it is behind authentication and its repo holds no UI
  imagery, so its case study relies on the live demo instead of mocking one up.

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

Still **omitted rather than guessed**:

| Item | Current state | To add it |
| --- | --- | --- |
| Résumé PDF | `PROFILE.resume` is `''`; no button rendered | Drop the PDF in `assets/`, set the value, add the link |
| Compro dates & responsibilities | Role and company only | Extend the `#experience` entry in `index.html` and `EXPERIENCE` in `data/content.js` |

LinkedIn is now live at `https://www.linkedin.com/in/vansh-mittal-vm/` — in the hero, the contact
section and the `Person` structured data.

There are no `Lorem ipsum`, `Coming soon` or bracketed placeholder strings anywhere in the site —
absent facts are absent, not faked.

---

## Licence

[MIT](LICENSE)
