/**
 * Single source of truth for every fact rendered on this site.
 *
 * Rule: if a statement is not traceable to a file in the source repository or a URL
 * that returned 200 on 17 Sep 2026, it does not belong in this file.
 * The audit trail lives in docs/EVIDENCE.md.
 *
 * Plain ES module, no build step. Pages import what they need.
 */

/* ------------------------------------------------------------------ profile */

export const PROFILE = {
  name: 'Vansh Mittal',
  role: 'Associate Software Engineer',
  company: 'Compro Technologies',
  email: 'vanshmittal021@gmail.com',
  github: 'https://github.com/Vansh-22f300',
  location: 'India',

  linkedin: 'https://www.linkedin.com/in/vansh-mittal-vm/',

  // Not supplied yet. Left empty deliberately: the UI hides the control rather
  // than rendering a dead link. Fill it in and the CTA appears.
  resume: '',

  positioning:
    'I build Full Stack web applications — Vue and React on the front, Flask REST APIs, ' +
    'relational schemas, Redis caching and Celery background jobs behind them.',

  // Site-wide canonical origin (GitHub Pages project site).
  siteUrl: 'https://vansh-22f300.github.io/Portfolio-Sept26',
};

/* --------------------------------------------------------------- experience */

export const EXPERIENCE = [
  {
    company: 'Compro Technologies',
    role: 'Associate Software Engineer',
    type: 'Full-time',
    current: true,
    // No dates, bullets or metrics: none were verifiable from the repositories
    // or supplied in writing. Nothing is invented here.
    note:
      'Current full-time role. Detailed responsibilities are discussed directly — ' +
      'this site keeps to what its own repositories can prove.',
  },
];

/* ------------------------------------------------------- engineering snapshot */

export const SKILLS = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', where: 'ParkEase, Quiz-v2 backends' },
      { name: 'JavaScript', where: 'All four projects' },
      { name: 'TypeScript', where: 'Aura Landing' },
      { name: 'SQL', where: 'SQLAlchemy schemas, reporting queries' },
      { name: 'HTML / CSS', where: 'Every project, incl. this site' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'Vue 3', where: 'ParkEase, Quiz-v2' },
      { name: 'React 18 / 19', where: 'Spotify Clone, Aura Landing' },
      { name: 'Vue Router', where: '11 + 13 route definitions' },
      { name: 'Tailwind CSS 3 / 4', where: 'Spotify Clone, Aura Landing' },
      { name: 'Vite', where: 'All four project frontends' },
      { name: 'Chart.js', where: 'ParkEase + Quiz-v2 reporting' },
      { name: 'framer-motion', where: 'Aura Landing' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Flask', where: 'ParkEase, Quiz-v2' },
      { name: 'Flask-RESTful', where: '14 + 13 resource classes' },
      { name: 'SQLAlchemy', where: 'Both relational schemas' },
      { name: 'JWT auth', where: 'flask-jwt-extended, role gating' },
      { name: 'Celery', where: 'Scheduled + queued jobs' },
      { name: 'REST API design', where: 'Hand-written OpenAPI 3.0 spec' },
    ],
  },
  {
    group: 'Data & caching',
    items: [
      { name: 'PostgreSQL', where: 'Quiz-v2 production config' },
      { name: 'SQLite', where: 'Local development, both apps' },
      { name: 'Redis', where: 'Cache-aside, TTLs, Celery broker' },
      { name: 'Schema design', where: '4-table and 6-table models' },
    ],
  },
  {
    group: 'Infrastructure',
    items: [
      { name: 'Vercel', where: 'ParkEase deployment' },
      { name: 'GitHub Pages', where: 'Aura Landing, this site' },
      { name: 'GitHub Actions', where: 'Pages deployment workflow' },
      { name: 'Gunicorn', where: 'Production WSGI entry point' },
      { name: 'SMTP / Flask-Mail', where: 'Transactional email' },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git', where: 'Daily' },
      { name: 'ESLint / Prettier', where: 'ParkEase frontend' },
      { name: 'Postman', where: 'API testing' },
      { name: 'Nuxt 4 / Firebase', where: 'Status Tracker (reference)' },
    ],
  },
];

/* -------------------------------------------------------------- the projects */

export const PROJECTS = [
  /* ============================================================= PARKEASE == */
  {
    slug: 'parkease',
    name: 'ParkEase',
    fullName: 'ParkEase — Smart Parking Management System',
    flagship: true,
    tagline:
      'A two-role parking platform: drivers book a spot and pay on exit, operators manage lots and read the analytics.',
    role: 'Sole developer — backend, frontend, schema and deployment',
    context: 'Semester-7 minor project',
    status: { label: 'Deployed', tone: 'live' },
    year: '2025',
    stack: ['Vue 3', 'Flask', 'SQLAlchemy', 'Redis', 'Celery', 'Chart.js', 'JWT'],
    metrics: [
      { value: '~3.5k', label: 'lines of Python' },
      { value: '14', label: 'API resource classes' },
      { value: '4', label: 'FK-linked tables' },
      { value: '2', label: 'scheduled jobs' },
    ],
    highlights: [
      'Redis cache-aside with explicit TTLs, invalidated on every booking write.',
      'Celery beat runs a 6pm daily reminder and a monthly report in Asia/Kolkata.',
      'Billing ceilings partial hours server-side; the client never computes price.',
    ],
    links: {
      github: 'https://github.com/Vansh-22f300/ParkEase-Smart-Parking',
      demo: 'https://parkease-mad2.vercel.app',
      demoNote: 'Live · verified 17 Sep 2026',
    },
    hero: {
      src: 'assets/parkease/admin-dashboard.webp',
      thumb: 'assets/parkease/admin-dashboard-thumb.webp',
      alt:
        'ParkEase admin dashboard showing 3 parking lots, 30 total spots, 27 available and 5 registered users, above a parking-lot management table.',
      width: 1366,
      height: 1023,
    },

    overview:
      'ParkEase gives a driver one job — find a lot, take a spot, leave and pay — and gives an operator ' +
      'the other side of it: lot inventory, live occupancy, user administration and revenue reporting. ' +
      'Both roles are served by one Flask API and one Vue single-page application, split by a role claim on the token.',

    problem: [
      'Parking inventory changes every few seconds, but the cost of asking the database for it on every page ' +
        'load is paid on the hottest read path in the app. Cache it for too long and a driver books a spot that ' +
        'is already taken.',
      'The other half of the problem is money and time: cost cannot be decided by the browser, and receipts, ' +
        'reminders and monthly summaries cannot block an HTTP response while an SMTP server thinks about it.',
    ],

    solution: [
      'A Flask-RESTful API of 14 resource classes, with JWT identity and an explicit admin/user gate on every ' +
        'privileged handler.',
      'Redis as a cache-aside layer in front of the read-heavy endpoints, with a deliberately short 10-second ' +
        'TTL on lot availability and an explicit invalidation on every write that changes it.',
      'Celery over the same Redis for work that must not sit inside a request — scheduled reminders, monthly ' +
        'reports and CSV exports.',
      'A Vue 3 SPA with eleven lazily-imported route components, so the admin reporting bundle is never ' +
        'downloaded by a driver who only books spots.',
    ],

    architectureDiagram: {
      src: 'assets/diagrams/parkease-architecture.svg',
      alt:
        'Architecture diagram: Vue 3 SPA calls a Flask-RESTful API over JWT-authenticated HTTPS. The API reads and writes a SQLAlchemy database, uses Redis for cache-aside and as the Celery broker, and a Celery worker with beat scheduler sends email over SMTP.',
      caption:
        'Drawn from the actual module layout — app.py, controllers.py, celery_app.py, tasks.py and the Vue router.',
    },

    decisions: [
      {
        title: 'A 10-second cache TTL, not a 10-minute one',
        body:
          'Availability is the most-read and fastest-changing value in the system. Ten seconds absorbs burst ' +
          'traffic on a lot listing while keeping the worst-case staleness shorter than the time it takes a ' +
          'driver to pick a lot and tap book. Writes do not wait for expiry — booking deletes both the ' +
          'collection key and the per-lot key immediately.',
        evidence: 'controllers.py — cache_set(..., 10) and cache_delete on _book_spot',
      },
      {
        title: 'The server owns the price',
        body:
          'On release the API measures elapsed time, ceilings it to the next whole hour with a one-hour ' +
          'minimum, multiplies by the lot rate, and persists the transaction id and payment method on the ' +
          'reservation row. The client displays a number it is given; it never calculates one.',
        evidence: 'controllers.py — math.ceil(duration_hours) * lot.price',
      },
      {
        title: 'Redis is optional at runtime',
        body:
          'The connection is established inside a try/except; failure logs a warning and sets the client to ' +
          'None. Every cache helper null-checks before touching it, and the rate limiter fails open. A dead ' +
          'cache degrades the app to direct database reads instead of taking it offline.',
        evidence: 'app.py — except: redis_client = None',
      },
      {
        title: 'Route-level code splitting',
        body:
          'Every route in the Vue router is a dynamic import. The two heaviest screens are the admin and user ' +
          'reporting views that pull in Chart.js, and neither is in the initial download.',
        evidence: 'frontend/src/router/index.js — 11 lazy imports',
      },
    ],

    challenges: [
      {
        title: 'Stale availability versus database load',
        body:
          'The first version cached lot data long enough that the UI could offer a spot that no longer existed. ' +
          'Fixing it with a shorter TTL alone would only have narrowed the window. Pairing a short TTL with ' +
          'explicit invalidation on the booking path closes it on the write that actually matters.',
      },
      {
        title: 'Email latency inside the request',
        body:
          'Sending a confirmation over SMTP inside the booking handler makes the driver wait on a third party. ' +
          'The Celery task exists for exactly this; the booking path currently still calls it inline, which is ' +
          'recorded below as a known limitation rather than described as finished work.',
      },
    ],

    tradeoffs: [
      {
        choice: 'SQLite instead of PostgreSQL',
        why:
          'Zero-setup for a coursework project and a reviewer who clones and runs it. The ORM layer keeps the ' +
          'swap cheap, but single-writer locking makes this the first thing to change under real concurrency.',
      },
      {
        choice: 'Redis used as cache, broker and counter store',
        why:
          'One dependency doing three jobs keeps the stack legible. The cost is a shared blast radius — a ' +
          'Redis outage removes caching, queueing and metrics together, which is why the cache path degrades ' +
          'gracefully rather than failing.',
      },
      {
        choice: 'Bespoke CSS per component over a UI framework',
        why:
          'Full control over the interface and no framework payload, at the cost of a large amount of ' +
          'hand-written scoped CSS across the twelve components.',
      },
    ],

    // Stated plainly. A reviewer will find these in ten minutes; better they read them here first.
    limitations: [
      {
        title: 'Passwords are stored and compared in plaintext',
        body:
          'Login does a direct string comparison against the stored value and registration writes the password ' +
          'as given. This is the single most serious defect in the project. Hashing with a slow KDF is the ' +
          'first change the code needs, and Quiz-v2 — built afterwards — uses bcrypt for exactly this reason.',
        evidence: 'controllers.py:907 — if not user or user.password != password',
      },
      {
        title: 'The booking confirmation email bypasses the queue',
        body:
          'The Celery task is defined and registered, but the booking handler calls it directly instead of ' +
          'using .delay(), so SMTP latency lands inside the request. The scheduled reminder and monthly report ' +
          'do run through the worker.',
        evidence: 'controllers.py — "Call directly instead of using .delay()"',
      },
      {
        title: 'Spot allocation is not transactionally locked',
        body:
          'Allocation selects the first available spot and then commits, with no row-level lock. Two ' +
          'simultaneous bookings on the last spot in a lot could race. A SELECT … FOR UPDATE or a unique ' +
          'partial index is the correct fix.',
        evidence: 'controllers.py — _book_spot',
      },
      {
        title: 'Rate limiting is written but barely wired in',
        body:
          'A Redis fixed-window limiter exists and works, but it guards one endpoint. It should sit on ' +
          'authentication and booking before anything else.',
        evidence: 'controllers.py — rate_limit_check called once',
      },
      {
        title: 'No automated test suite',
        body:
          'Verification was manual — Postman against the API and browser testing across both roles. The ' +
          'README lists a test command; there are no test files behind it.',
        evidence: 'no test files in the repository',
      },
    ],

    security: [
      'JWT bearer tokens with a 12-hour expiry, issued on login and verified per request.',
      'Role checks re-evaluated server-side on every admin handler rather than trusted from the client.',
      'Ownership checks on reservation access — a user cannot read or release another user\'s booking.',
      'Parameterised ORM queries throughout; no string-built SQL.',
      'CORS restricted to an explicit origin allow-list.',
      'Not implemented: password hashing — see limitations above.',
    ],

    deployment: [
      'Frontend deployed on Vercel and publicly reachable at parkease-mad2.vercel.app (verified 17 Sep 2026).',
      'Backend configured from environment variables — database URL, JWT secret, Redis host, SMTP credentials.',
      'Gunicorn listed as the production WSGI server.',
      'The Celery worker and beat scheduler run as separate processes from the web server.',
    ],

    lessons: [
      'Cache invalidation belongs on the write path. A TTL alone only shortens the window in which the ' +
        'application is confidently wrong.',
      'Anything that talks to a third party — SMTP above all — should leave the request cycle by default, ' +
        'not once it becomes a visible problem.',
      'Money and permissions are server-side concerns. The moment either is computed in the browser it ' +
        'becomes a suggestion.',
      'Writing the OpenAPI spec by hand exposed inconsistent response shapes that were invisible while ' +
        'building endpoint by endpoint.',
    ],

    future: [
      'Replace plaintext passwords with bcrypt or Argon2 and force a credential reset.',
      'Move the booking confirmation onto the worker with .delay().',
      'Wrap spot allocation in a locking transaction to remove the race.',
      'Extend rate limiting to the auth and booking endpoints.',
      'Add pytest coverage for booking, release and billing arithmetic.',
      'Migrate to PostgreSQL for concurrent writes.',
    ],

    screenshots: [
      { src: 'assets/parkease/landing.webp', thumb: 'assets/parkease/landing-thumb.webp',
        alt: 'ParkEase landing page with the headline Premium Parking Made Simple over a dark parking-garage photograph, with Get Started and How It Works buttons.',
        caption: 'Landing page' },
      { src: 'assets/parkease/find-parking.webp', thumb: 'assets/parkease/find-parking-thumb.webp',
        alt: 'Find Parking screen listing three lots — Saket, Rohini and Model Town — each with hourly price, total and available spots and a Book Now button.',
        caption: 'Lot search with live availability' },
      { src: 'assets/parkease/user-dashboard.webp', thumb: 'assets/parkease/user-dashboard-thumb.webp',
        alt: 'Driver dashboard showing active booking status and quick actions.',
        caption: 'Driver dashboard' },
      { src: 'assets/parkease/my-bookings.webp', thumb: 'assets/parkease/my-bookings-thumb.webp',
        alt: 'My Bookings screen listing the driver\'s parking sessions with times and costs.',
        caption: 'Booking history' },
      { src: 'assets/parkease/admin-dashboard.webp', thumb: 'assets/parkease/admin-dashboard-thumb.webp',
        alt: 'Admin dashboard with counts for parking lots, total spots, available spots and registered users above a lot management table.',
        caption: 'Operator dashboard' },
      { src: 'assets/parkease/parking-lots.webp', thumb: 'assets/parkease/parking-lots-thumb.webp',
        alt: 'Parking lot management screen for creating and editing lots.',
        caption: 'Lot management' },
      { src: 'assets/parkease/manage-users.webp', thumb: 'assets/parkease/manage-users-thumb.webp',
        alt: 'User management table listing registered users with their details and administrative actions.',
        caption: 'User administration' },
      { src: 'assets/parkease/user-reports.webp', thumb: 'assets/parkease/user-reports-thumb.webp',
        alt: 'Reporting screen with Chart.js charts summarising parking usage and spending.',
        caption: 'Chart.js reporting' },
    ],

    evidenceShots: [
      { src: 'assets/parkease/email-booking.webp',
        alt: 'Booking confirmation email from ParkEase No-Reply reading "Your parking booking is confirmed" with location Saket, spot 19 and a start timestamp.',
        caption: 'Booking confirmation, delivered' },
      { src: 'assets/parkease/email-release.webp',
        alt: 'Parking released email from ParkEase No-Reply confirming the session ended at the Rohini location, spot 4, with an end timestamp.',
        caption: 'Release receipt' },
      { src: 'assets/parkease/email-monthly.webp',
        alt: 'Monthly parking report email for November 2025 showing 7 bookings, ₹394.00 spent and 6.6 hours parked.',
        caption: 'Monthly report from the scheduled Celery job' },
    ],

    diagrams: [
      { src: 'assets/parkease/er-diagram.webp',
        alt: 'Entity relationship diagram showing ParkingLot, ParkingSpot, User and ReserveSpot tables with their columns and foreign-key relationships.',
        caption: 'ER diagram — matches models.py field for field' },
      { src: 'assets/parkease/dfd.webp',
        alt: 'Data flow diagram showing driver and admin actors flowing through registration, parking search and booking, payment processing, notification and email services.',
        caption: 'Data flow diagram' },
    ],
  },

  /* ============================================================== QUIZ-V2 == */
  {
    slug: 'quiz-v2',
    name: 'Quiz-v2',
    fullName: 'Quiz-v2 — Multi-User Exam Platform',
    tagline:
      'An exam platform with a four-level subject hierarchy, server-side scoring and an answer key the client never receives.',
    role: 'Sole developer — backend, frontend and schema',
    context: 'Modern Application Development II coursework',
    status: { label: 'Source available', tone: 'source' },
    year: '2025',
    stack: ['Vue 3', 'Flask', 'PostgreSQL', 'Celery', 'Redis', 'bcrypt', 'Chart.js'],
    metrics: [
      { value: '6', label: 'related models' },
      { value: '13', label: 'API resources' },
      { value: 'bcrypt', label: 'password hashing' },
      { value: '2', label: 'scheduled jobs' },
    ],
    highlights: [
      'Correct answers are stripped from the quiz payload; scoring happens server-side only.',
      'bcrypt hashing via passlib — hashed on signup, verified on login.',
      'One Flask process serves both the compiled SPA and the REST API.',
    ],
    links: {
      github: 'https://github.com/Vansh-22f300/Quiz-v2-MAD2_PROJECT',
      demo: null,
      demoNote: 'No public deployment — production config targets PostgreSQL + Redis',
    },

    overview:
      'Quiz-v2 organises material as Subject → Chapter → Quiz → Question and lets an administrator manage every ' +
      'level of that tree while students attempt timed quizzes and track their results. It is the project where ' +
      'I took authentication and exam integrity seriously, and the schema is the most relational work in this portfolio.',

    problem: [
      'An exam application has one requirement that overrides the rest: the person taking the quiz must not be ' +
        'able to obtain the answers. Anything sent to the browser is readable, so correctness cannot be ' +
        'evaluated there and the key cannot travel with the questions.',
      'Around that sits ordinary application work — a deep content hierarchy that has to delete cleanly, ' +
        'per-attempt scoring history, and reporting that should not be recomputed on every page view.',
    ],

    solution: [
      'The quiz delivery endpoint serialises questions and options and deliberately omits correct_answer. ' +
        'Submission posts an answer map; the server resolves each answer against the stored key, computes the ' +
        'score and percentage, assigns a grade and persists the attempt.',
      'Passwords are hashed with bcrypt through passlib on signup and verified on login — never compared directly.',
      'Six SQLAlchemy models with bidirectional relationships and cascade deletes, so removing a subject ' +
        'removes its chapters, quizzes, questions and scores without orphan rows.',
      'A Celery worker with beat handles daily reminders, monthly reports and CSV exports delivered as email ' +
        'attachments.',
    ],

    architectureDiagram: {
      src: 'assets/diagrams/quiz-architecture.svg',
      alt:
        'Architecture diagram: one Flask process serves the compiled Vue SPA and a Flask-RESTful API with bcrypt password hashing and JWT, backed by PostgreSQL in production and SQLite locally, with a Celery worker and beat scheduler sending email over SMTP.',
      caption:
        'Drawn from app.py, backend/api.py, backend/config.py and backend/worker.py.',
    },

    decisions: [
      {
        title: 'The answer key never leaves the server',
        body:
          'GET /start_quiz returns question text and the four options and nothing else — the omission is ' +
          'deliberate and commented in the source. Submission is evaluated server-side against the stored ' +
          'answer. The full key is only returned afterwards, with the result, so a student can review what ' +
          'they got wrong.',
        evidence: 'backend/api.py — Start_Quiz.get and .post',
      },
      {
        title: 'One process serves the SPA and the API',
        body:
          'A catch-all route serves the built Vue bundle and falls back to index.html so client-side routing ' +
          'survives a refresh, while Flask-RESTful owns the API paths. One origin, no CORS in production, one ' +
          'thing to deploy — appropriate for an application of this size.',
        evidence: 'app.py — serve_vue catch-all over frontend/dist',
      },
      {
        title: 'Environment-split configuration',
        body:
          'LocalConfig uses SQLite and local Redis; ProductionConfig reads everything from environment ' +
          'variables and rewrites the legacy postgres:// scheme to postgresql:// so SQLAlchemy accepts a ' +
          'managed-host URL unchanged.',
        evidence: 'backend/config.py',
      },
      {
        title: 'Cascade deletes declared on the relationships',
        body:
          'The content hierarchy is four levels deep with scores hanging off three of them. Declaring ' +
          'cascade=\'all,delete\' on the relationships puts that integrity in the model layer instead of in ' +
          'whichever endpoint happens to perform the delete.',
        evidence: 'backend/models.py',
      },
    ],

    challenges: [
      {
        title: 'Timed attempts across a page refresh',
        body:
          'The quiz has a server-defined time limit that the client counts down. Converting the stored time ' +
          'value into seconds server-side and sending a single number keeps the browser from having to parse ' +
          'a time type, but a refresh still restarts the client-side countdown — the remaining-time source of ' +
          'truth should be the attempt record, not the browser.',
      },
      {
        title: 'Deleting a subject without orphaning scores',
        body:
          'Scores reference subject, chapter and quiz simultaneously. Getting the cascade rules right across ' +
          'all three paths took more iteration than the rest of the schema combined.',
      },
    ],

    tradeoffs: [
      {
        choice: 'Four option columns instead of an options table',
        why:
          'option_1 through option_4 keeps queries and the admin form simple for fixed four-choice questions. ' +
          'It hard-codes the question format — variable-length or multi-select answers would need the ' +
          'normalised table.',
      },
      {
        choice: 'Serving the SPA from Flask instead of a CDN',
        why:
          'One deployable unit and no cross-origin configuration, at the cost of the static-asset performance ' +
          'a CDN would give.',
      },
      {
        choice: 'Server-rendered CSV exports emailed as attachments',
        why:
          'Avoids holding a long-running download open on the web process. The user waits for an email rather ' +
          'than getting the file immediately.',
      },
    ],

    limitations: [
      {
        title: 'Flask-Caching is configured but never applied',
        body:
          'A Cache instance is created and initialised on the app, and the Redis cache settings are in both ' +
          'config classes — but no endpoint carries a @cache.cached decorator. The reporting endpoints are the ' +
          'obvious candidates. As it stands, the caching layer is wiring without a consumer.',
        evidence: 'backend/config.py defines it; backend/api.py only imports it',
      },
      {
        title: 'single_attempt is modelled but not enforced',
        body:
          'The Quiz model carries a single_attempt boolean and the admin UI sets it, but the submission handler ' +
          'does not check for an existing score before accepting a new one. Repeat attempts are possible ' +
          'regardless of the flag.',
        evidence: 'models.py has the column; Start_Quiz.post never reads it',
      },
      {
        title: 'Development secrets are in the local config',
        body:
          'LocalConfig hard-codes a placeholder JWT secret for convenience. Production reads it from the ' +
          'environment, but the local default should still be moved out of source.',
        evidence: 'backend/config.py — LocalConfig',
      },
      {
        title: 'No automated tests',
        body: 'Scoring and cascade behaviour were verified manually. Scoring arithmetic is the clearest ' +
          'candidate for unit tests in the whole portfolio.',
        evidence: 'no test files in the repository',
      },
    ],

    security: [
      'bcrypt password hashing through passlib — hash on signup, verify on login.',
      'JWT with an additional user_id claim, so handlers resolve identity from the token rather than from a ' +
        'client-supplied id.',
      'Admin-only resources re-check the role server-side.',
      'Correct answers excluded from the quiz delivery payload.',
      'Production secrets and database URL read from environment variables.',
    ],

    deployment: [
      'Production configuration targets PostgreSQL and Redis with a managed-host URL scheme rewrite.',
      'A build script compiles the Vue frontend and copies the bundle into the backend static directory.',
      'A WSGI entry point exposes the app for a production server.',
      'Not currently deployed to a public URL — the repository is the evidence for this project.',
    ],

    lessons: [
      'Deciding what not to send is a design decision. Omitting one field from a serialiser is the whole ' +
        'integrity model of this application.',
      'Cascade rules belong in the schema. Enforcing them endpoint by endpoint means the first endpoint you ' +
        'forget becomes a data bug.',
      'Configuration that differs between environments should differ in one file, not in scattered conditionals.',
      'Declaring infrastructure — like the cache here — is not the same as using it. Wiring without a consumer ' +
        'reads as a feature and behaves as nothing.',
    ],

    future: [
      'Apply @cache.cached to the admin and user reporting endpoints.',
      'Enforce single_attempt in the submission handler.',
      'Track attempt start server-side so the timer survives a refresh.',
      'Add unit tests for scoring and grading arithmetic.',
      'Move the local JWT secret into the environment.',
    ],
  },

  /* ======================================================== SPOTIFY CLONE == */
  {
    slug: 'spotify-clone',
    name: 'Spotify Clone',
    fullName: 'Spotify Clone — Music Player Interface',
    tagline:
      'A working music player: one audio element, one state container, shuffle, three-state repeat and a queue that survives a reload.',
    role: 'Sole developer — frontend',
    context: 'Self-directed frontend engineering project',
    status: { label: 'Demo offline', tone: 'offline' },
    year: '2025',
    stack: ['React 18', 'Vite 5', 'Tailwind CSS 3', 'React Router 6', 'Context API'],
    metrics: [
      { value: '64 KB', label: 'gzipped JS' },
      { value: '4.5 KB', label: 'gzipped CSS' },
      { value: '14', label: 'components' },
      { value: '0', label: 'image requests' },
    ],
    highlights: [
      'Audio lives in a ref, so React re-renders never interrupt playback.',
      'Album art is generated from a string hash — no image requests at all.',
      'Queue, likes and playlists persist to localStorage across reloads.',
    ],
    links: {
      github: 'https://github.com/Vansh-22f300/Spotify-clone-arena',
      demo: null,
      demoNote:
        'The previous Vercel URL no longer resolves and the newest deployment sits behind Vercel SSO. Runs locally with npm install && npm run dev.',
    },

    overview:
      'A Spotify-style player built to get the hard part of media UI right: playback state. Browse, search, open ' +
      'an album or playlist, queue tracks, shuffle, repeat one or all, seek, adjust volume, like tracks and build ' +
      'playlists — with real audio playing through a single HTMLAudioElement.',

    problem: [
      'Audio playback and React\'s render model disagree. An <audio> element rendered as JSX can be torn down ' +
        'and rebuilt by a re-render, which stops the music. Playback position, queue and volume are also needed ' +
        'in the player bar, the track rows and the now-playing panel at once.',
      'Prop-drilling that state through the tree produces a component that re-renders on every timeupdate — ' +
        'several times a second, across the whole interface.',
    ],

    solution: [
      'One HTMLAudioElement created imperatively and held in a ref for the lifetime of the app. React never ' +
        'owns it, so no re-render can interrupt playback.',
      'A single PlayerContext owning queue, index, playing state, progress, duration, volume, mute, shuffle, ' +
        'repeat, likes and user playlists — every consumer subscribes to one source.',
      'Callbacks wrapped in useCallback so handlers passed to long track lists stay referentially stable.',
      'Persistence through effects that write queue, likes and playlists to localStorage on change and hydrate ' +
        'from it on load.',
    ],

    decisions: [
      {
        title: 'Cover art generated, never fetched',
        body:
          'Each cover is a deterministic gradient derived from a hash of the album or artist name, rendered as ' +
          'inline SVG. Identical input always produces identical art, so the interface looks populated with ' +
          'zero image requests, no layout shift and no broken-image states.',
        evidence: 'src/components/Cover.jsx, src/utils/format.js',
      },
      {
        title: 'Three-state repeat handled at the source of truth',
        body:
          'Repeat is off, all or one. The logic lives in the context\'s next() and in the audio ended listener ' +
          'rather than in the button that toggles it, so ending a track naturally and pressing next behave ' +
          'identically.',
        evidence: 'src/context/PlayerContext.jsx',
      },
      {
        title: 'Mobile navigation is a separate component',
        body:
          'Rather than restyling the desktop sidebar down to a phone, mobile gets a bottom tab bar that ' +
          'respects the iOS safe-area inset, and the sidebar is hidden below the medium breakpoint. Each ' +
          'navigation pattern is designed for its own context.',
        evidence: 'src/components/MobileNav.jsx — pb-[env(safe-area-inset-bottom)] md:hidden',
      },
      {
        title: 'An error boundary around the routes',
        body:
          'A render error in one view shows a contained fallback instead of unmounting the app and killing ' +
          'playback with it.',
        evidence: 'src/components/ErrorBoundary.jsx',
      },
    ],

    challenges: [
      {
        title: 'Keeping the audio element alive',
        body:
          'The first implementation rendered <audio> in JSX. Any state change that re-rendered the player ' +
          'replaced the node and stopped playback. Moving it into a ref created once outside the render path ' +
          'fixed it permanently.',
      },
      {
        title: 'Progress updates versus list re-renders',
        body:
          'timeupdate fires several times a second. With unstable callbacks, every tick re-rendered every ' +
          'visible track row. Memoising the handlers with useCallback kept the ticking scoped to the ' +
          'components that display time.',
      },
    ],

    tradeoffs: [
      {
        choice: 'Context instead of Redux or Zustand',
        why:
          'One provider covers the entire state surface of this app without adding a dependency. A larger app ' +
          'with more independent slices would benefit from selector-level subscriptions that Context does not ' +
          'provide.',
      },
      {
        choice: 'A static catalogue instead of an API',
        why:
          'Keeps the project focused on interaction and state. There is no backend, no authentication and no ' +
          'real library — this is a UI engineering exercise and is presented as one.',
      },
      {
        choice: 'localStorage rather than a server',
        why:
          'Likes and playlists survive a reload with no infrastructure, but they do not follow the user to ' +
          'another device.',
      },
    ],

    limitations: [
      {
        title: 'The public demo is offline',
        body:
          'The Vercel URL recorded in the repository returns 404 DEPLOYMENT_NOT_FOUND, and the most recent ' +
          'deployment found through the GitHub Deployments API is protected by Vercel SSO, so neither can be ' +
          'linked as a working demo. The source builds and runs in two commands.',
        evidence: 'checked 17 Sep 2026',
      },
      {
        title: 'Audio is royalty-free sample content',
        body:
          'Tracks point at SoundHelix demo MP3s so playback genuinely works in the browser. Titles, artists ' +
          'and albums are placeholder catalogue data, documented as such in the repository README.',
        evidence: 'src/data/catalog.js',
      },
    ],

    testing: [
      'Verified by hand across playback, queue, shuffle, all three repeat states, seek, volume, mute, likes, ' +
        'playlist create/add/remove/delete and reload persistence.',
      'Production build verified during this audit: 50 modules, 208.54 kB JS (64.23 kB gzipped) and 19.16 kB ' +
        'CSS (4.53 kB gzipped) in 1.61 s.',
    ],

    deployment: [
      'Static Vite build, deployable to any static host; a rewrite rule sends all paths to index.html for ' +
        'client-side routing.',
      'No public URL currently resolves — see limitations.',
    ],

    lessons: [
      'Imperative browser APIs should be held outside the render cycle. A ref is the correct place for an ' +
        'object whose identity must outlive every re-render.',
      'High-frequency events make callback stability a correctness concern, not a micro-optimisation.',
      'Generating artwork from data removed an entire category of failure — no requests, no broken images, ' +
        'no layout shift.',
    ],

    future: [
      'Redeploy to a publicly reachable URL.',
      'Add keyboard shortcuts — space to play/pause, arrows to seek.',
      'Add a drag-to-reorder queue view.',
      'Move persistence behind an interface so a backend can replace localStorage.',
    ],
  },

  /* ========================================================= AURA LANDING == */
  {
    slug: 'aura-landing',
    name: 'Aura Landing',
    fullName: 'Aura — Product Landing Page',
    tagline:
      'A conversion-shaped marketing page for a fictional product, built as one self-contained HTML file.',
    role: 'Sole developer — design and frontend',
    context: 'Self-directed frontend and design exercise',
    status: { label: 'Deployed', tone: 'live' },
    year: '2025',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite 7', 'framer-motion'],
    metrics: [
      { value: '1', label: 'file shipped' },
      { value: '151 KB', label: 'gzipped total' },
      { value: '11', label: 'section components' },
      { value: 'v4', label: 'Tailwind, CSS-first' },
    ],
    highlights: [
      'Builds to a single inlined HTML file — no separate JS or CSS requests.',
      'Tailwind v4 configured entirely in CSS, with no JavaScript config file.',
      'Skip link, focus-visible styles and a reduced-motion media query.',
    ],
    links: {
      github: 'https://github.com/Vansh-22f300/aura-landing',
      demo: 'https://vansh-22f300.github.io/aura-landing/',
      demoNote: 'Live · verified 17 Sep 2026',
    },

    // Stated first and plainly, so nobody mistakes the copy for a real company.
    disclaimer:
      'Aura is a fictional product invented for this exercise. The brand, the testimonials, the customer ' +
      'logos and the pricing are written marketing copy for a concept — there is no company, no users and no ' +
      'revenue behind it. The engineering and design work is the deliverable.',

    overview:
      'A full-length product landing page — hero, logo wall, feature grid, interactive showcase, comparison, ' +
      'testimonials, pricing with a monthly/yearly toggle, FAQ accordion and closing call to action — built to ' +
      'practise the thing marketing pages actually demand: typographic hierarchy, motion that guides rather ' +
      'than decorates, and an accessible implementation of interactive sections.',

    problem: [
      'A landing page has to hold a reader through a long scroll and stay legible on a phone, which is a ' +
        'typography and rhythm problem before it is a code problem.',
      'It also has to load fast. Marketing pages tend to accumulate fonts, images and scripts until the thing ' +
        'meant to convert is the thing that stalls.',
    ],

    solution: [
      'Eleven independent section components composed in one page shell, each owning its own layout so ' +
        'sections can be reordered without breaking one another.',
      'Tailwind v4 with design tokens declared in CSS — no tailwind.config.js at all, which is the v4 idiom.',
      'A single-file build: the Vite plugin inlines the JS and CSS into index.html, so the whole page is one ' +
        'HTTP request after the document.',
      'Motion applied to entrances and scroll reveals only, with a reduced-motion media query and a skip link ' +
        'for keyboard users.',
    ],

    decisions: [
      {
        title: 'Ship one file',
        body:
          'vite-plugin-singlefile inlines every asset into the HTML document. For a static marketing page with ' +
          'no routing this removes the request waterfall entirely — the page is parseable the moment the ' +
          'document arrives. The trade-off is no separate caching of JS and CSS, which does not matter for a ' +
          'page a visitor sees once.',
        evidence: 'vite.config.ts — viteSingleFile()',
      },
      {
        title: 'Tailwind v4 with CSS-first configuration',
        body:
          'v4 moves theme configuration into CSS custom properties. Colour scale, fonts and spacing are ' +
          'declared in index.css and consumed as utilities, which keeps design tokens in the same language as ' +
          'the styles that use them.',
        evidence: 'src/index.css, @tailwindcss/vite',
      },
      {
        title: 'Two typefaces, deliberately contrasted',
        body:
          'Inter Tight for interface and body text, Instrument Serif for display moments. The contrast does the ' +
          'hierarchical work that would otherwise need more colour and weight variation.',
        evidence: 'src/index.css — --font-sans, --font-serif',
      },
      {
        title: 'Accessibility on a marketing page',
        body:
          'A skip link, visible :focus-visible states and a prefers-reduced-motion block that disables the ' +
          'animation. Marketing pages routinely skip all three.',
        evidence: 'src/App.tsx, src/index.css',
      },
    ],

    challenges: [
      {
        title: 'Motion that survives being turned off',
        body:
          'Scroll-triggered reveals are easy to build in a way that leaves content invisible when animation is ' +
          'disabled. The reduced-motion path had to be checked section by section to confirm the page reads ' +
          'completely with motion off.',
      },
      {
        title: 'Holding a long scroll together',
        body:
          'Eleven sections in sequence become monotonous without deliberate variation in rhythm — alternating ' +
          'density, width and background weight so the page keeps changing pace without losing its system.',
      },
    ],

    tradeoffs: [
      {
        choice: 'One inlined file over split bundles',
        why:
          'Fewer requests and no waterfall, at the cost of granular caching and a larger single document. ' +
          'Correct for a one-page static site, wrong for an application.',
      },
      {
        choice: 'framer-motion rather than CSS animation',
        why:
          'Orchestrating staggered reveals across eleven sections is markedly simpler with a motion library. ' +
          'It is the single largest dependency in the bundle — justified here by the volume of coordinated ' +
          'motion, and not a dependency I would add for one fade.',
      },
      {
        choice: 'Google Fonts over self-hosting',
        why:
          'Faster to build with; adds a third-party connection that self-hosted subsets would remove.',
      },
    ],

    limitations: [
      {
        title: 'All content is invented',
        body:
          'Testimonials, customer logos, review scores and statistics are fictional copy written for a ' +
          'fictional product. None of it reflects real users or real outcomes, and it is not presented as ' +
          'evidence of anything except design and frontend execution.',
        evidence: 'stated in the repository and above',
      },
      {
        title: 'Presentational only',
        body:
          'No backend, no forms that submit anywhere, no authentication. The pricing toggle switches displayed ' +
          'figures; it does not touch a payment system.',
        evidence: 'no network calls in the source',
      },
    ],

    testing: [
      'Verified by hand across desktop and mobile widths, keyboard traversal of the nav, FAQ and pricing ' +
        'toggle, and with reduced motion enabled.',
      'Production build verified during this audit: 2,280 modules into a single 517.11 kB HTML file ' +
        '(151.26 kB gzipped) in 3.27 s.',
    ],

    deployment: [
      'Deployed to GitHub Pages from a gh-pages branch and publicly reachable (verified 17 Sep 2026).',
      'The build output is one HTML file, so deployment is a file copy.',
    ],

    lessons: [
      'Removing the request waterfall is the highest-leverage performance change available to a static page.',
      'Tailwind v4\'s CSS-first configuration keeps tokens next to the styles consuming them and removes a ' +
        'JavaScript file from the design system.',
      'Accessibility on a marketing page costs very little when it is designed in — a skip link, focus states ' +
        'and one media query.',
      'Type contrast carries hierarchy further than colour does.',
    ],

    future: [
      'Self-host and subset the fonts to drop the third-party connection.',
      'Add a real OG image and richer page metadata.',
      'Measure Core Web Vitals in the field rather than relying on build output.',
    ],
  },
];

/* ------------------------------------------------------- featured project */

/* Status Tracker is the primary project, presented above the four numbered
   case studies rather than inside them. Audited at master HEAD fe149bc on
   17 Sep 2026: 107 commits, 4,833 lines across app/, server/, firebase/,
   functions/. Every field below was read from source, not from the README. */

export const FEATURED_PROJECT = {
  slug: 'status-tracker',
  name: 'Status Tracker',
  label: 'Featured project',
  tagline:
    'A team check-in app where the hard part is not the check-in. Every status change posts to a ' +
    'Google Chat webhook, and almost all of the engineering went into deciding when not to send one.',
  status: 'Live',

  stack: [
    'Nuxt 4', 'Vue 3', 'Firebase Auth', 'Cloud Firestore',
    'Nitro server routes', 'firebase-admin', 'Google Chat webhooks',
  ],

  // Counted, not estimated. See docs/EVIDENCE.md for the commands used.
  metrics: [
    { v: '107', l: 'commits' },
    { v: '4,833', l: 'lines of app code' },
    { v: '3', l: 'live listeners' },
    { v: '60 s', l: 'server cooldown' },
  ],

  specs: [
    { k: 'Status',      v: 'Live — production deploy green on current master, checked 17 Sep 2026' },
    { k: 'Scale',       v: '107 commits, 4,833 lines across app, server and config' },
    { k: 'Auth',        v: 'Email/password and Google popup, with route middleware gating session, team membership and manager role separately' },
    { k: 'Real-time',   v: 'Three concurrent onSnapshot listeners on the manager console, all torn down on unmount' },
    { k: 'The detail',  v: 'The 60-second cooldown is enforced server-side and survives a page refresh — restored from lastNotifiedAt in Firestore, not held in memory' },
    { k: 'Honest gap',  v: 'firestore.rules is still the open starter template and the API routes verify no ID token' },
  ],

  decisions: [
    {
      t: 'Send the webhook before writing to the database',
      ev: 'app/components/status.vue — doNotify(); server/api/notify.post.js',
    },
    {
      t: 'Guard on the server, mirror it on the client',
      ev: 'server/api/notify.post.js COOLDOWN_MS; status.vue notified()',
    },
    {
      t: 'Separate status (what you picked) from notifiedStatus (what was announced)',
      ev: 'status.vue, team.vue — setDoc(..., { merge: true })',
    },
    {
      t: 'Rebuild the cooldown from Firestore, not from memory',
      ev: 'status.vue — loadTodayStatus() -> startCooldown(remaining)',
    },
    {
      t: 'Store the webhook per team rather than in the environment',
      ev: 'team.vue saveWebhook(); notify.post.js reads teamSnap.data()',
    },
    {
      t: 'Initialise the Admin SDK lazily so a bad key fails per-request, not at boot',
      ev: 'server/utils/firebaseAdmin.js',
    },
  ],

  // Ranked worst-first. All confirmed by reading source.
  limitations: [
    { t: 'Firestore rules are wide open', ev: 'firestore.rules — unchanged allow read, write: if true' },
    { t: 'The API routes verify no identity token', ev: 'no Authorization / verifyIdToken under server/' },
    { t: 'The webhook URL is never validated or host-allow-listed', ev: 'notify.post.js / update.post.js pass it straight to $fetch' },
    { t: 'The cooldown is read-then-write, not transactional', ev: 'no runTransaction in the codebase' },
    { t: 'No automated tests, and functions/index.js is dead code', ev: 'no test files; no CI; Cloud Function unreferenced' },
    { t: 'Join codes can collide', ev: 'welcome/create.vue — Math.random() with no uniqueness check' },
  ],

  // No screenshots: app is behind auth, repo holds no UI imagery, and no
  // browser was available. Nothing was mocked up to fill the gap.
  screenshots: [],
  diagram: 'assets/diagrams/status-tracker-architecture.svg',

  links: {
    caseStudy: 'projects/status-tracker/',
    github: 'https://github.com/Vansh-22f300/status-tracker',
    demo: 'https://team-status-tracker.vercel.app/',
    demoNote: 'Live · verified 17 Sep 2026',
  },
};

/* ---------------------------------------------------------------- approach */

export const APPROACH = [
  {
    title: 'Read the system before changing it',
    body:
      'Most of the useful information about a codebase is already in it. I would rather spend the first hour ' +
      'reading the data model and the request path than guess and refactor twice.',
  },
  {
    title: 'Put the rules where they cannot be bypassed',
    body:
      'Pricing, permissions and correctness belong on the server. Once any of them is computed in the browser ' +
      'it has become a suggestion rather than a rule.',
  },
  {
    title: 'Name the limitations',
    body:
      'Every project here lists what is wrong with it — plaintext passwords in one, an unused cache layer in ' +
      'another. A reviewer will find them anyway; knowing which ones matter most is the more useful signal.',
  },
  {
    title: 'Add dependencies deliberately',
    body:
      'A motion library earned its place on a page with eleven coordinated sections. This portfolio needed ' +
      'none, so it has none — no framework, no build step, no package.json.',
  },
];
