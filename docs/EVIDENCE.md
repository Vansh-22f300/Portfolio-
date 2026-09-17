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
| `https://status-tracker-eight.vercel.app` | **200** — redirects to `/login`, app renders | Verified live demo (reference) |
| `https://test-clone-eta.vercel.app` | **404 `DEPLOYMENT_NOT_FOUND`** | **Not linked.** Marked "demo offline" |
| `https://team-status-tracker.vercel.app/login` | **502 Bad Gateway** | **Not linked** |
| `https://github.com/vansh-22f300/status-tracker` | **404** — wrong owner | **Not linked** |
| `https://github.com/vansh-22f/status-tracker` | **200** | Correct repo link |

### Corrections to the supplied brief

Three links in the brief were wrong. Rather than ship dead links, the verified equivalents are used:

- Status Tracker repo is under **`vansh-22f`**, not `vansh-22f300`.
- Status Tracker live app is **`status-tracker-eight.vercel.app`**; `team-status-tracker` returns 502.
- The Spotify demo recorded in the repo is **dead**. The latest Vercel deployment
  (`test-clone-sc2y-…`, via GitHub Deployments API) is behind Vercel SSO, so it is not publicly
  linkable either. The card states the demo is offline and links source + a local run command.

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

## Status Tracker (reference only, not a selected project)

Owner `vansh-22f` (separate account). Nuxt 4 + Firebase.

| Claim | Evidence |
| --- | --- |
| Nuxt 4, Vue 3, Firebase + firebase-admin | `package.json` |
| Firestore + Google Chat webhook delivery | `README.md` architecture + notification-pipeline sections |
| Role-gated manager console | `middleware/manager.js`, `pages/team.vue` |
| Live `onSnapshot` feeds | `README.md`; `components/checkin.vue`, `yesterday.vue` |
| Route middleware auth | `middleware/auth.js`, `plugins/auth.client.js` |
| Firebase Data Connect schema present | `dataconnect/schema/schema.gql` |
| Deployed and reachable | `https://status-tracker-eight.vercel.app` → 200 |

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
