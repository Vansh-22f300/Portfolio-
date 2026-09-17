# Evidence Log

Every claim on this site traces back to a line of code, a repository file, or a live URL that was
checked on **17 September 2026**. This file is the audit trail. If something is not in here, it is
not stated on the site.

Method: each repository was cloned and read (not skimmed from its README). Where a README claimed
something the code did not support, the code won.

---

## Live URL checks (17 Sep 2026)

| URL | Result | Used on site as |
| --- | --- | --- |
| `https://parkease-mad2.vercel.app` | **200** — ParkEase landing + `/login` render | Verified live demo |
| `https://vansh-22f300.github.io/aura-landing/` | **200** — full page renders | Verified live demo |
| `https://team-status-tracker.vercel.app` | **200** — redirects to `/login`, app renders | **Featured project live demo** |
| `https://status-tracker-eight.vercel.app` | **200** — same app, second Vercel alias | Alternate alias (not linked) |
| `https://test-clone-eta.vercel.app` | **404 `DEPLOYMENT_NOT_FOUND`** | **Not linked.** Marked "demo offline" |
| `https://github.com/Vansh-22f300/status-tracker` | **200** — repo transferred to this account | Featured project source |
| `https://github.com/vansh-22f/status-tracker` | **200** — redirects to `Vansh-22f300` | Superseded by the line above |
| `https://www.linkedin.com/in/vansh-mittal-vm/` | Supplied by the owner | Hero, contact, Person JSON-LD |

### Re-checks after the Status Tracker transfer (17 Sep 2026)

The repository moved to `Vansh-22f300/status-tracker`, which changed three earlier findings:

- **The repo is now under the portfolio account.** `github.com/vansh-22f/status-tracker` still
  resolves via GitHub's transfer redirect, but the site links the canonical
  `github.com/Vansh-22f300/status-tracker`.
- **`team-status-tracker.vercel.app` is live again.** It returned 502 before the transfer; it now
  serves the app and is used as the live demo, as requested. `status-tracker-eight.vercel.app` is a
  second alias of the same project and also responds 200.
- **Vercel is still connected and auto-deploying.** `GET /repos/.../deployments` shows a Preview
  build on 2026-09-07 matching the latest push, and the most recent **Production** deployment
  (`id 5679849211`) is `state: success` on `fe149bc` — the current `master` HEAD.

Unchanged: the Spotify demo recorded in that repo is still **dead** (404), and its newest Vercel
deployment is behind SSO, so the card still says "demo offline" and links source only.

---

## ParkEase-Smart-Parking

Flagship. Flask + Vue 3. `Vue 527 KB / Python 143 KB` (GitHub language API).

| Claim | Evidence |
| --- | --- |
| Vue 3 + Vite SPA, 12 route-level components | `frontend/src/router/index.js` — 11 lazy `() => import()` routes |
| ~3.5k lines Python, ~22k lines Vue (incl. scoped CSS) | `wc -l` on `backend/*.py`, `frontend/src/components/*.vue` |
| Flask-RESTful resource API, 14 resources | `backend/app.py` `api.add_resource(...)` ×14 |
| JWT auth, 12-hour expiry | `app.py` `JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)` |
| Role checks on admin routes | `controllers.py` — `current_user.role != 'admin'` at 20+ call sites |
| Redis cache-aside w/ explicit TTLs | `controllers.py` `cache_set/get/delete`; 10 s on lots+users, 43200 s session |
| Cache invalidated on write | `_book_spot` calls `cache_delete('parking_lots:all')` + `cache_delete(f'parking_lot:{id}')` |
| Graceful degradation w/o Redis | `app.py` try/except sets `redis_client = None`; helpers null-check |
| Celery + Redis beat schedule | `celery_app.py` `beat_schedule`: daily 18:00, monthly 1st 09:00, `timezone='Asia/Kolkata'` |
| Celery tasks defined | `tasks.py` — `send_daily_reminders`, `send_monthly_reports`, `export_user_data_csv`, `send_booking_confirmation_email`, `send_parking_release_email` |
| Ceiling-hour billing on release | `controllers.py` ~1254-1268 — `math.ceil(duration_hours) * lot.price`, min 1 h |
| Transaction id + method persisted | `models.py` `ReserveSpot.transaction_id`, `.payment_method` |
| 4 tables, FK-linked | `models.py` — `User`, `ParkingLot`, `ParkingSpot`, `ReserveSpot` |
| ER diagram is accurate | `imagess/ER.jpg` field-by-field matches `models.py` |
| OpenAPI 3.0 spec written by hand | `file.yaml` |
| Rate-limit helper, Redis fixed-window | `controllers.py` `rate_limit_check(...)` |
| Chart.js analytics | `AdminReports.vue`, `UserReports.vue` |

### Known limitations — stated openly on the case-study page

| Issue | Evidence |
| --- | --- |
| **Passwords stored and compared in plaintext** | `controllers.py:907` `if not user or user.password != password:`; no hashing import anywhere in backend. README's "Password Hashing" claim is **false** and is not repeated. |
| Rate-limit helper wired to one endpoint only | `rate_limit_check(` called once (`get_users`) |
| Booking email sent synchronously, bypassing the queue | `_book_spot` — `send_booking_confirmation_email(reservation.id)` called directly, with the comment "Call directly instead of using .delay()" |
| Spot allocation has no row-level lock | `_book_spot` — `filter_by(status='available').first()` then commit; no `SELECT … FOR UPDATE` |
| Pinia is a dependency but unused | `package.json` lists `pinia`; zero `defineStore`/`useStore` in `src/` |
| No automated tests | no test files; README's test section is aspirational |

### Assets used (all authentic, from `imagess/`)

`landing-page.png`, `login-page.png`, `user-dashboard.png`, `user-find-parking.png`,
`user-my-bookings.png`, `admin-dashboard.png`, `parking-lot.png`, `manage-user.png`,
`user-reports.png`, `ER.jpg`, `DFD.jpg` — plus three email captures
(`booking-cnf.png`, `booking-end.png`, `monthly-report.png`) cropped to the message body to remove
personal mailbox chrome.

Not used: `archi.JPG` (a folder-tree screenshot, not an architecture diagram),
`activity.jpg` (low-resolution), `daily-reminder.png` (**byte-identical duplicate** of
`booking-end.png` — md5 `dc7e550f…` — so no genuine daily-reminder capture exists and none is claimed).

---

## Quiz-v2-MAD2_PROJECT

Full-stack systems project. MAD-2 coursework.

| Claim | Evidence |
| --- | --- |
| Flask application factory + env-split config | `app.py` `create_app()`; `config.py` `LocalConfig` / `ProductionConfig` |
| PostgreSQL in production, SQLite locally | `config.py` rewrites `postgres://` → `postgresql://` (Render-style URL) |
| **bcrypt password hashing** | `api.py` `bcrypt.hash(...)` on signup, `bcrypt.verify(...)` on login (passlib) |
| JWT with custom claim | `api.py` `create_access_token(identity=…, additional_claims={'user_id': …})` |
| 6 models, cascade deletes, bidirectional rels | `models.py` — `User`, `Subject`, `Chapter`, `Quiz`, `Question`, `Score`; `cascade='all,delete'` |
| Answer key withheld from quiz-delivery payload | `api.py` `Start_Quiz.get` omits `correct_answer` (in-code comment: "For security, correct_answer is not included here") |
| Server-side scoring + grading | `Start_Quiz.post` — compares server-side, computes `percentage`, `grade` |
| Celery beat: daily 09:00, monthly 1st 09:00 IST | `worker.py` `CeleryConfig.beat_schedule`, `timezone="Asia/Kolkata"` |
| CSV export emailed as MIME attachment | `task.py` `export_scores` + `mail_config(..., attachments)`; real output in `reports/*.csv` |
| Flask serves the built Vue SPA | `app.py` catch-all `serve_vue` → `frontend/dist` |
| Vue 3 + Vue Router + Chart.js | `frontend/package.json`, `router/index.js` (13 routes) |

### Known limitations — stated openly

| Issue | Evidence |
| --- | --- |
| Flask-Caching configured but never applied | `config.py` builds `Cache()`; `api.py` only imports it — zero `@cache.cached` decorators |
| `single_attempt` modelled but not enforced | `models.py` has the column; `Start_Quiz.post` never checks it |
| Redundant/duplicated import of `bcrypt` in `app.py` | `app.py` imports `passlib.hash.bcrypt` then re-imports `from app import bcrypt` |
| Dev-time secrets in `LocalConfig` | `JWT_SECRET_KEY = 'secret'` — local default; production reads env |

---

## Spotify-clone-arena

Frontend/interaction project. React 18 + Vite 5 + Tailwind 3.

| Claim | Evidence |
| --- | --- |
| Single context owns all playback state | `context/PlayerContext.jsx`, 277 lines |
| One `HTMLAudioElement` held in a ref | `useRef` + imperative `new Audio()`; React never re-creates it |
| Shuffle + 3-state repeat | `repeat` state `'off' | 'all' | 'one'`; handled in `next()` and the `ended` listener |
| Seek, volume, mute | `PlayerBar.jsx` + context handlers |
| localStorage persistence | `useEffect` → `save()` for queue, likes, user playlists |
| Covers are generated, not fetched | `Cover.jsx` — deterministic gradient from a string hash; zero image requests |
| Error boundary around routes | `ErrorBoundary.jsx` wrapping `<Routes>` in `App.jsx` |
| Mobile bottom-tab nav, safe-area aware | `MobileNav.jsx` — `pb-[env(safe-area-inset-bottom)] md:hidden` |
| 14 components, 1,478 LOC | `wc -l src/**` |
| Royalty-free demo audio | `data/catalog.js` — SoundHelix URLs, documented in README |
| **Measured build** (run here, 17 Sep 2026) | `npm run build` → 50 modules, **208.54 kB JS / 64.23 kB gzip**, **19.16 kB CSS / 4.53 kB gzip**, 1.61 s |

Limitation stated: static catalogue, no backend/auth; public demo offline.

---

## aura-landing

Visual/frontend delivery. React 19 + TypeScript + Tailwind v4 + Vite 7.

| Claim | Evidence |
| --- | --- |
| React 19.2 + TypeScript 5.9 + Vite 7.3 | `package.json` |
| Tailwind **v4** via the Vite plugin (no config file) | `@tailwindcss/vite` in `vite.config.ts`; CSS-first tokens in `index.css` |
| Ships as one self-contained HTML file | `vite-plugin-singlefile` in `vite.config.ts` |
| 11 section components, 2,426 LOC | `wc -l src/**/*.tsx src/index.css` |
| framer-motion for entrance/scroll motion | `package.json` + component imports |
| Skip link, `:focus-visible`, reduced-motion | `App.tsx` skip link; `index.css:89` `:focus-visible`, `index.css:217` `@media (prefers-reduced-motion: reduce)` |
| Deployed on GitHub Pages | `gh-pages` branch; Pages API `status: built` |
| **Measured build** (run here, 17 Sep 2026) | `npm run build` → 2,280 modules, **517.11 kB single file / 151.26 kB gzip**, 3.27 s |

**Stated prominently:** Aura is a **fictional product** built as a design-and-frontend exercise. The
brand, testimonials, customer logos and pricing are invented marketing copy for a concept page.
No claim of real users, revenue or production SaaS status is made anywhere.

---

## Status Tracker — FEATURED PROJECT

`github.com/Vansh-22f300/status-tracker` · Nuxt 4 SPA + Firebase + Nitro server routes.
Cloned and read at `master` HEAD `fe149bc`, 17 September 2026. **107 commits**, 23 remote branches.
`4,833` lines across `app/`, `server/`, `firebase/`, `functions/` (`find … | xargs wc -l`).

Every row below is labelled **VERIFIED** (read in source), **INFERRED** (reasoned from source but
not directly stated) or **UNKNOWN** (could not be checked from here).

### Stack and structure

| Claim | Evidence | Status |
| --- | --- | --- |
| Nuxt `^4.4.2`, Vue `^3.5.30`, vue-router 5 | `package.json` | VERIFIED |
| SPA mode — `ssr: false` | `nuxt.config.ts:2` | VERIFIED |
| Firebase `^12.11.0` client SDK + `firebase-admin` `^13.6.0` | `package.json` | VERIFIED |
| Nitro server routes, not a separate backend | `server/api/notify.post.js`, `server/api/update.post.js` | VERIFIED |
| 3 pages + 3 welcome pages + 5 components + 4 composables | `app/` tree | VERIFIED |
| Largest files: `team.vue` 974, `status.vue` 545, `reports.vue` 429 LOC | `wc -l` | VERIFIED |
| Google Fonts preconnect (Inter + Manrope) | `nuxt.config.ts` head.link | VERIFIED |

### Authentication and access control

| Claim | Evidence | Status |
| --- | --- | --- |
| Email/password **and** Google popup sign-in | `login.vue:91,93,108,134`; `signup.vue:62,72` | VERIFIED |
| Password reset by email | `reset.vue:32,53` `sendPasswordResetEmail` | VERIFIED |
| Profile auto-created in Firestore on first sign-in | `plugins/auth.client.js` — `getDoc` then `setDoc` | VERIFIED |
| Blocking auth bootstrap (plugin returns a Promise) | `plugins/auth.client.js` — `return new Promise` | VERIFIED |
| Route middleware gates session **and** team membership | `middleware/auth.js` — public paths, `/welcome` redirect | VERIFIED |
| Separate role gate for the manager console | `middleware/manager.js`; `team.vue` `definePageMeta({middleware:['auth','manager']})` | VERIFIED |
| Manager-only nav link hidden client-side | `sidebar.vue:38` `v-if="profile?.role == 'Manager'"` | VERIFIED |
| Specific Firebase error codes handled | `auth/invalid-credential`, `auth/email-already-in-use`, `auth/password-does-not-meet-requirements` | VERIFIED |
| Auth gate works in production | `GET /` on the live URL redirects to `/login` | VERIFIED |

### Data model

| Claim | Evidence | Status |
| --- | --- | --- |
| Three collections: `profiles`, `teams`, `status` | `auth.client.js`, `create.vue`, `status.vue` | VERIFIED |
| Deterministic status doc id `{uid}_{YYYY-MM-DD}` — one doc per user per day | `status.vue` `doc(db,'status',` + `todayKey()` | VERIFIED |
| Date key from `toLocaleDateString('en-CA')` | `status.vue` `todayKey()` | VERIFIED |
| `status` (client intent) vs `notifiedStatus` (server, what was broadcast) | written in `status.vue` vs `notify.post.js` | VERIFIED |
| All status writes use `{ merge: true }` to protect webhook fields | `status.vue`, `team.vue` `confirmStatusChange` | VERIFIED |
| Member count maintained with `increment()` | `team.vue`, `join.vue` | VERIFIED |
| 6-digit numeric join code | `create.vue:48` `Math.floor(100000 + Math.random() * 900000)` | VERIFIED |

### The notification pipeline — the core engineering

| Claim | Evidence | Status |
| --- | --- | --- |
| Webhook is called **before** the Firestore write, so a failure leaves nothing persisted | `status.vue` `doNotify()` — `await handlewebhook()` first, with an in-code comment stating the reason | VERIFIED |
| Server no-ops when the same status was already broadcast today | `notify.post.js` — `notifiedStatus === status` → `{skipped:true}` | VERIFIED |
| 60-second server-side cooldown returning HTTP 429 + `retryAfterMs` | `notify.post.js` `COOLDOWN_MS = 1*60*1000` | VERIFIED |
| Client mirrors the guard: duplicate → toast, genuine change → confirm modal | `status.vue` `notified()` | VERIFIED |
| Cooldown survives a page refresh (restored from `lastNotifiedAt`) | `status.vue` `loadTodayStatus()` → `startCooldown(remaining)` | VERIFIED |
| Live `mm:ss` countdown, button disabled while counting | `status.vue` `cooldownLabel` computed + `:disabled` | VERIFIED |
| Webhook URL is per-team, stored in `teams/{id}.webhookUrl`, not an env var | `notify.post.js` reads `teamSnap.data()?.webhookUrl` | VERIFIED |
| Manager override posts a distinct "Updated by Manager" message | `update.post.js` message template | VERIFIED |
| `/api/update` performs no Firestore write and applies no cooldown | `update.post.js` — no `set`/`update` call | VERIFIED |

### Real-time and frontend

| Claim | Evidence | Status |
| --- | --- | --- |
| Three concurrent `onSnapshot` listeners on the team page | `team.vue` — `teams` doc, `status` query, `profiles` query | VERIFIED |
| All three plus a timer torn down on unmount | `team.vue:416-420` `onUnmounted` | VERIFIED |
| Singleton composables via module-scope refs | `useUser.js`, `useTheme.js` | VERIFIED |
| Dark mode applied pre-hydration to avoid a flash | inline `<script>` in `nuxt.config.ts` head | VERIFIED |
| `color-scheme` meta set to stop Android Chrome Force Dark overriding | `nuxt.config.ts` meta + `useTheme.js` `applyClass` comment | VERIFIED |
| Modals rendered through `<Teleport to="body">` | `status.vue`, `team.vue` | VERIFIED |
| Responsive: 9 rules at `max-width: 768px`, 1 at `900px` | grep over component/page `<style>` blocks | VERIFIED |
| Design tokens as CSS custom properties | `app/assets/css/theme.css` | VERIFIED |

### Security — limitations, all confirmed from source

| Claim | Evidence | Status |
| --- | --- | --- |
| **Firestore rules are wide open** — `allow read, write: if true` | `firestore.rules` (still the Firebase starter template, comment and all) | VERIFIED |
| **API routes verify no ID token** — any caller can POST | `grep verifyIdToken\|Authorization` over `server/` → no matches | VERIFIED |
| **Webhook URL is not validated or host-allow-listed** | `notify.post.js` / `update.post.js` pass `webhookUrl` straight to `$fetch` | VERIFIED |
| **Cooldown is read-then-write, not transactional** | no `runTransaction` anywhere; concurrent requests could both pass | VERIFIED |
| Client Firebase config committed to the repo | `firebase/config.js` — public by design for web SDKs; rules are the real boundary | VERIFIED |
| Admin credential only ever from env, never committed | `firebaseAdmin.js` reads `FIREBASE_SERVICE_ACCOUNT_KEY`; `git log --diff-filter=A` finds no `.env`/service-account file | VERIFIED |
| Admin SDK initialised lazily so a bad key fails per-request, not at boot | `firebaseAdmin.js` `getAdminDb()` + in-file comment | VERIFIED |
| `functions/index.js` is dead code writing to an unused `users` collection | Cloud Function never called from `app/`; README calls it legacy | VERIFIED |
| The project README itself discloses the open rules and lists hardening as roadmap item #1 | `README.md` — "⚠️ currently wide open" | VERIFIED |

### Testing, CI, deployment

| Claim | Evidence | Status |
| --- | --- | --- |
| No automated tests | no `*.test.*` / `*.spec.*` / vitest / jest anywhere | VERIFIED |
| No CI workflows | no `.github/workflows` | VERIFIED |
| No `vercel.json` — Vercel auto-detects Nuxt | repo root listing | VERIFIED |
| Needs a Node host; a static host breaks notifications | `server/api/*` are Nitro routes holding the Admin credential | INFERRED (from architecture; README states the same) |
| Firestore region pinned `asia-south2` | `firebase.json` | VERIFIED |
| Vercel still connected after the account transfer | GitHub Deployments API — Preview build 2026-09-07 matches latest push | VERIFIED |
| Latest **Production** deployment succeeded on current `master` | deployment `5679849211`, `state: success`, ref `fe149bc` = `master` HEAD | VERIFIED |
| `team-status-tracker.vercel.app` live | `GET /` → 200, redirects to `/login`, sign-in UI renders | VERIFIED |
| `status-tracker-eight.vercel.app` is a second alias of the same project | both serve identical markup and titles | VERIFIED |
| Google sign-in / check-in / webhook delivery actually succeed end to end | requires credentials and a Google Chat space | **UNKNOWN** — not claimed on the site |
| Number of real users or teams | no telemetry available; none claimed | **UNKNOWN** — not claimed on the site |

### Not claimed anywhere on the site

No user counts, team counts, message volumes, uptime, latency, adoption or business impact. The
brief's earlier `team-status-tracker` 502 result is superseded: the URL responds 200 today and is
linked on that basis, checked 17 September 2026.

### No screenshots

The repository contains no UI imagery (`public/` holds only `favicon.ico` and `robots.txt`), and no
headless browser is available in this environment, so no capture could be taken. Rather than
fabricate product imagery, the featured section and case study use typography, a code-derived
architecture diagram and the live demo link.

---

## Profile facts

| Fact | Source | Status |
| --- | --- | --- |
| Name — Vansh Mittal | GitHub API `name`; brief | Verified |
| Role — Associate Software Engineer | Brief | Stated as given |
| Company — Compro Technologies | Brief | Stated as given |
| Email — vanshmittal021@gmail.com | Brief; also appears in `Quiz-v2/app.py` | Verified |
| GitHub — `Vansh-22f300` | Live | Verified |
| Employment dates / duties / metrics | **None available** | **Omitted.** No dates, bullets or metrics invented |
| LinkedIn URL | Placeholder left unfilled in brief | **Omitted** until supplied — see `PROFILE` in `script.js` |
| Resume URL | Placeholder left unfilled in brief | **Omitted** until supplied — see `PROFILE` in `script.js` |
| Education | Repo names imply IITM MAD-2 coursework | Referenced only as "MAD-2 coursework", no degree claimed |

Deliberately not claimed anywhere: user counts, uptime, revenue, latency improvements, team size,
awards, certifications, production traffic, or any technology not present in a manifest or import.
