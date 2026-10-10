# Micronics Devlon Showcase

Here's the complete prompt in the same copy-paste format, with backend removed and light/dark theme + an enhanced, more explicitly interactive hero slider added throughout.

---

Build a complete, premium, multi-page corporate website WITH a full admin panel for "Micronics Devlon" (micronicsdevlon.com), a data backup, recovery and data-protection software and services company. The public site must be a real multi-page site using React Router (not one page). The look should be eye-catching, modern and elegant: a super attractive hero, rich hover and transition effects, and clean, well-spaced sections everywhere else. DO NOT use any video anywhere (no video backgrounds, no video embeds). Use images and CSS/JS animation only.

TECH STACK
React + Vite + TypeScript, Tailwind CSS (palette as CSS-variable design tokens), shadcn/ui, Framer Motion, @react-three/fiber + @react-three/drei (hero 3D accent), lucide-react, React Router, react-helmet-async, React Hook Form + Zod, Recharts (admin charts). Put all data access behind a small service layer (src/services/*) so a real backend can be swapped in later without touching components.

NO BACKEND — FRONTEND ONLY
Do not use Supabase, Lovable Cloud, or any external database/auth service. Instead:
- All data (products, services, solutions, features, platforms, pricing plans, faqs, testimonials, posts, hero slides, leads, newsletter subscribers, site settings, media, activity log, users) lives in a local mock data layer (src/data/*) and is read/written through src/services/* functions backed by localStorage, so the admin panel is fully interactive and edits reflect on the public site immediately, but nothing persists to a real server.
- Admin login is a simple mock auth check (hardcoded credentials or a "logged in" flag in localStorage) that gates all /admin routes — no real user accounts, no roles table, no RLS, no server-side validation.
- Users & roles screen is UI-only: invite/assign/deactivate actions update localStorage for demo purposes only.
- All forms (contact, request a demo, free trial, request a quote, newsletter) validate with Zod and save into local leads/newsletter state, showing a toast — no real submission endpoint.

LIGHT AND DARK THEME (required, both public site and admin panel)
- Ship both a light theme and a dark theme from the same CSS-variable design tokens (never hardcode colors in components — always reference tokens like --bg, --surface, --text, --border, --primary, --accent, redefined per theme).
- Light theme is default: white/off-white backgrounds, navy headings, blue/orange accents as specified below.
- Dark theme: deep navy/near-black backgrounds (e.g. #0B1220 / #111A2E), off-white text, the same electric-blue and orange accents slightly boosted in brightness so they stay vibrant, soft shadows replaced with subtle glow/border treatments, images and hero overlays dimmed so nothing feels blown out.
- Theme toggle (sun/moon icon, smooth animated color crossfade, no flash) in the header and admin top bar. Respect prefers-color-scheme on first load, then persist explicit choice in localStorage.
- Every component, chart (Recharts), and the 3D hero accent must be correctly themed in dark mode — check hero overlays, glass cards, mega menus, admin sidebar, data tables, form inputs, toasts, badges.

BRAND AND DESIGN SYSTEM (derived from the logo)
- I will attach the logo: a blue and navy "M" inside an orange circular swoosh ending in an upward arrow. Use it as-is in the header, footer, admin sidebar and favicon.
- Palette: navy #1B2A6B (headings, dark sections, footer, admin sidebar); electric blue #29A8F0 with gradient to #5CC8FF (primary buttons, links, icons); orange #F7941D with gradient to #FF7A00 (accent: key CTAs, badges, highlights, arrow motif); neutrals white #FFFFFF, off-white #F7F9FC, border #E6EAF2, body text #4A5568.
- Signature motif: the logo's circular swoosh and upward arrow, used as glowing thin arcs, orbiting rings, rising-arrow icons in buttons, and a large faint arc in the CTA banner — present in both themes.
- Typography: "Plus Jakarta Sans" for headings (bold, tight tracking), "Inter" for body.
- Feel: generous white space, large confident headlines, rounded-2xl cards, soft layered shadows (glow-based in dark mode), thin borders, subtle gradients. Alternate light and navy sections with curved/wave/diagonal dividers.

HERO SECTION (must be super attractive, interactive sliding images)
BACKGROUND IMAGES (no video):
- Full-viewport hero with a full-bleed BACKGROUND IMAGE SLIDER of 4 high-quality, professional, royalty-free photos (Unsplash-style): (1) modern data center with glowing server racks, (2) abstract blue cloud/network connections, (3) cybersecurity padlock/shield with digital glow, (4) IT team working with dashboards. Use direct image URLs with descriptive alt text, optimized WebP, srcset and object-fit: cover. Preload the first image and lazy-load the rest.
- Slides auto-advance every 6 seconds with a smooth cross-fade and a slow Ken Burns zoom/pan on the active image. Fully interactive: clickable thumbnail/progress-bar indicators (jump to any slide), prev/next arrows, swipe/drag support on touch and with mouse-drag on desktop, and pause-on-hover. Headline, subtext and CTA text change per slide with a staggered animation, sourced from a local heroSlides mock data array (image, headline, subheading, CTA labels and links, order, active flag) editable from the admin panel.
- Navy-to-blue gradient overlay (roughly 70–85% opacity on the left fading toward the right, adjusted for dark mode so it doesn't wash out an already-dark UI) over each image so text stays readable. Subtle orange glow at the bottom-right.

ATTRACTIVE LAYERS ON TOP:
- Slowly drifting blue and orange glow orbs, tiny floating particles, a faint perspective grid fading toward the horizon, and thin glowing circular arcs rotating slowly (echoing the logo swoosh).
- Right side: an interactive 3D accent (react-three-fiber): a glossy glass/metallic shield with orbiting orange rings and small floating data cubes, softly lit, floating and tilting with the mouse. Keep it tasteful so it never hides the text. Lazy-load with Suspense, cap devicePixelRatio at 2, and fall back to a static glass shield graphic on mobile, low-power devices and prefers-reduced-motion.
- 2–3 small floating glass cards ("Backup successful", "99.99% uptime", "AES-256 encrypted") bobbing at different speeds, with subtle mouse parallax.
- Headline: large, staggered word-by-word reveal with a blue-to-orange gradient on the key word and a rotating keyword ("Backup / Recovery / Protection"). One-line subheading. Buttons: primary orange with shimmer sweep and sliding arrow, secondary glass outline button. Small trust row (e.g., "Trusted by 500+ businesses").
- A glass stats bar overlapping the bottom of the hero (4 count-up counters: uptime, backups per day, platforms supported, 24/7 support), a "scroll down" indicator, and a curved wave divider into the next section.
- All inner pages (products, services, solutions, backup-for, pricing, etc.) get a shorter hero using a relevant background image with the same navy gradient overlay, arcs and breadcrumbs.

MOTION AND HOVER EFFECTS (site-wide)
- Page transitions between routes with Framer Motion AnimatePresence (fade + slight slide/scale); scroll to top on route change; thin scroll progress bar.
- Scroll-reveal with staggered fade-up and light parallax on background shapes and images.
- Cards (products, services, solutions, platforms, pricing): 3D tilt on hover following the mouse, a cursor-following spotlight glow, an animated gradient border, and a lift with stronger shadow.
- Platform tiles: icon scales/rotates slightly and a "Learn more" arrow reveals.
- Buttons: subtle magnetic pull, shimmer on primary, arrow slide on hover. Links and nav: animated underline from the left. Mega menus open with a smooth scale/fade and staggered items.
- Images and dashboard mockups: gentle zoom and tilt on hover. Subtle cursor glow on desktop only.
- Use transform/opacity animations only. Respect prefers-reduced-motion by disabling tilt, parallax, Ken Burns and 3D. Theme-toggle transition itself must be smooth (crossfade colors, no flash of unstyled content).

PUBLIC SITEMAP (all separate pages, content loaded from the local mock data layer)
/  Home
/products  and  /products/:slug
/services  and  /services/:slug
/solutions  and  /solutions/:slug
/features
/backup/:slug  ("Backup for ..." landing pages generated from a platforms mock dataset: Microsoft 365, Exchange, SharePoint, OneDrive, Teams, Google Workspace, VMware, Hyper-V, Proxmox, MySQL, MariaDB, Oracle, SQL Server, PostgreSQL, Windows, Linux, Synology NAS, QNAP NAS, Amazon S3, Mobile)
/pricing, /resources and /resources/:slug, /support, /free-trial, /about, /contact, /privacy, /terms, and a styled 404
All forms (contact, request a demo, free trial, request a quote, newsletter) validate with Zod, save into local leads/newsletter state, and show a toast.

STARTER PRODUCTS (each with its own detail page)
1. Central Backup Server (web console for admins and MSPs)
2. Backup Client for Servers & Workstations (Windows, Linux, macOS)
3. Microsoft 365 & Google Workspace Backup
4. Virtual Machine Backup (VMware, Hyper-V, Proxmox)
5. Database Backup (MySQL, MariaDB, Oracle, SQL Server, PostgreSQL)
6. NAS Backup Agent (Synology, QNAP)
7. Mobile Backup App (Android, iOS)
Product page: hero with background image and overlay, short pitch and CTAs, sticky sub-nav (Overview, Features, Requirements, Pricing, FAQ) highlighting the active section, 6 key features, supported platforms, system requirements table, pricing teaser, FAQ, related products.

STARTER SERVICES (each with its own detail page)
1. Managed Backup-as-a-Service  2. Backup Infrastructure as a Service  3. Installation & Configuration  4. Encryption Key Recovery  5. Server Upgrade Service  6. Backup App Branding (white-label)  7. Custom Branded Installer  8. Product Comparison (comparison table page)
Service page: hero with background image, what's included, a 4-step process with an animated line, pulsing nodes and the orange arrow traveling along it on scroll, who it's for, quote form, FAQ.

STARTER SOLUTIONS
Small Business Backup, MSP Backup, Enterprise Backup, Cloud Application Backup, Ransomware Protection (immutable backup), Disaster Recovery.

HOME PAGE
1. Header: logo left; Solutions, Features, Services, Pricing, Support; orange "Free Trial" button; theme toggle. Transparent over the hero, then sticky with blur on scroll. Mega menus for Solutions, Features and Services (grouped columns, icon + title + one line). Mobile: hamburger with accordion drawer.
2. Hero (as described above).
3. Marquee of supported platform names that pauses on hover.
4. "Everything you run, protected": grid of platform tiles linking to /backup/:slug with category filter tabs.
5. Products and Services: two groups of tilt-on-hover cards.
6. Features: bento grid (immutable backup, AES-256 encryption, 2FA, deduplication, fast granular restore, automatic restore testing).
7. Why choose us plus testimonials carousel.
8. Pricing preview (3 plans, middle one highlighted in orange as "Most Popular").
9. Final CTA: navy-to-blue gradient panel over a subtle background image, with rotating glowing arcs and a large orange button.
FOOTER: navy (theme-adjusted), curved top edge, logo, tagline, newsletter input, social icons, and 5 tidy columns (Products, Services, Solutions, "Backup for ..." multi-column list, Company/Support).

ADMIN PANEL (at /admin, protected by mock auth, UI-only)
- /admin/login: elegant login (email + password, forgot password link) in the brand design with an animated gradient background, themed for both light/dark. Auth is a mock check (hardcoded credentials or a localStorage "logged in" flag) gating all /admin routes — no real backend validation.
- Layout: collapsible navy sidebar with the logo and grouped navigation, top bar with global search, theme toggle, notifications bell and user menu (profile, change password, logout — UI only). Breadcrumbs, responsive on mobile, smooth transitions, skeleton loaders and empty states.
- Dashboard: stat cards with count-up (total leads, new leads this week, products, services, newsletter subscribers), a line chart of leads over time, a donut chart of leads by type, a table of latest leads, and quick actions (Add product, Add service, Add post) — all sourced from local mock/localStorage data.
- Full CRUD (against localStorage, not a real database), each with a searchable, sortable, paginated data table, status filters, bulk actions, and add/edit forms in a drawer or page (React Hook Form + Zod): Hero slides, Products, Services, Solutions, Features, Platforms, Pricing plans, FAQs, Testimonials, Resources/blog posts.
  Every item has: title, slug (auto-generated, editable), short description, rich-text body, icon picker, image upload (local file preview only), status (draft/published), drag-and-drop display order, SEO title and description, timestamps. Hero slides manage the background image, headline, subheading, CTA labels and links, order and active flag. Products and services also manage key features, a requirements table, and related items.
- Leads/Inquiries: table of contact, demo, free-trial and quote requests (local state) with filters by type, status (new, contacted, qualified, closed) and date range; detail drawer with notes; status change; CSV export; delete.
- Newsletter subscribers: list, search, CSV export, delete.
- Media library: local file picker with grid view, search, copy object URL, delete, and an image picker reused in all forms.
- Site settings: logo and favicon, company name, tagline, contact email/phone/address, social links, default SEO, footer text, maintenance-mode toggle, default theme (light/dark/system) — persisted to localStorage.
- Users & roles: UI-only management screen (invite users, assign roles, deactivate); changes persist to localStorage for demo purposes only.
- Activity log: who created, edited or deleted what and when (tracked in local state as actions happen), with filters.
- Edits in the admin update the public site immediately (shared localStorage/service layer). Confirm dialogs for deletes, toasts for all actions, and warnings for unsaved changes.

QUALITY
Fully responsive (mobile first) for both public site and admin, accessible (semantic HTML, contrast in both themes, visible focus states, alt text), breadcrumbs on inner pages, unique SEO title, description and Open Graph tags per page, loading skeletons, empty and error states. Images must be optimized (WebP, responsive sizes, lazy loading). All copy and visuals must be original: take inspiration from the layout structure of enterprise backup websites, but do not copy any text, images, logos or product names from any other company.

BUILD ORDER
(1) design tokens (light + dark theme variable sets), layout, header with mega menus, footer, page transitions, theme toggle with persistence; (2) mock data layer and service functions (including hero slides) with localStorage persistence; (3) Home with the full image-based interactive hero slider, verified in both themes; (4) Products list and detail template; (5) Services list and detail template; (6) Solutions, Features, Backup-for pages; (7) Pricing, Resources, Support, Contact, forms saving to local leads store; (8) Admin layout, mock login, dashboard, themed for light/dark; (9) Admin CRUD for all content types including hero slides, backed by localStorage; (10) Leads, subscribers, media, settings, users and activity log. Keep the design and theming consistent throughout, checking every new screen in both light and dark mode before moving to the next.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://micronics-theme-builder.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/01819735-365e-4436-9b5f-1931539f2df9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
