# SCREENS N BLINDS — DESIGN BLUEPRINT

> **Version:** 1.0 · **Status:** Implementation-ready creative direction · **Brand:** Screens N Blinds (working name)
>
> **Purpose:** Give Codex enough design, interaction, layout, and engineering direction to produce a genuinely polished, distinctive, responsive website — not a generic blinds template.

---

## 01 — The brief, in one minute

Build **Screens N Blinds** as a premium-looking, minimalist **blinds showroom and enquiry website** for a new business. It should feel like a contemporary interiors brand: striking residential photography, confident art direction, generous negative space, beautiful typography, polished scroll transitions, and exceptionally clear enquiry pathways.

**Primary inspiration:** [Urban Window Coverings](https://www.urbanwindowcoverings.au/). **Reference case study:** [Rhythm Digital — Urban Window Coverings](https://www.rhythmdigital.com.au/projects/urban-window-coverings).

The reference agency explicitly describes the project as using **large photography, charcoal and white, sections shifting between dark and light while scrolling, and a simple full-screen menu**. Those are the evidenced principles to use. The exact fonts, timings, breakpoints, and mechanics below are **our proposed original design system**, **not a claim that these are the reference site's values**.

**Desired impression:** quiet luxury · modern · warm · spacious · editorial · trustworthy · tactile.

**What the site is not:** a cluttered catalogue, generic WordPress theme, discount-heavy storefront, oversized e-commerce build, complex configurator, or animation showreel.

**Design inspiration, not duplication:** Do not copy reference source code, copy, brand graphics, images, logos, proprietary artwork, or reproduce sections pixel-for-pixel. Build an original composition that expresses the same high-level quality, mood and interaction patterns.

---

## 02 — Brand foundation

| Item | Direction |
|---|---|
| Working brand | **Screens N Blinds** |
| Positioning | A design-conscious window-coverings business with a carefully edited blinds range |
| Personality | Calm, confident, welcoming, refined — never snobbish |
| Audience | People refreshing a room, furnishing a home, or exploring window-covering options |
| Primary goal | Generate qualified product/quote enquiries |
| Secondary goal | Let visitors understand the styles, browse imagery, and build confidence |
| Tone | Plain-English Australian spelling for the initial draft; easily localisable |
| Brand promise | A beautiful, considered blinds experience — without unverified claims about manufacturing or service |

### Wordmark / identity

Create an elegant **typographic wordmark**, not a complicated emblem. Primary lock-up: `SCREENS N BLINDS`, uppercase or carefully spaced title case. Use clean letterforms with slightly adjusted tracking; give **JUST** a modest lighter visual weight than **BLINDS**, or keep both equal. Optionally introduce a very subtle single-line motif suggesting a lowered blind, but only if it remains recognisable at 24 px. Provide dark-on-light and light-on-dark versions. Use text/SVG, never a blurry screenshot.

**Do not claim this name is trademark-cleared or the domain is available.** Branding is provisional.

---

## 03 — Original visual system

### Colours

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1D211F` | Primary headings, dark sections, buttons |
| `--deep` | `#292D2A` | Alternate dark surface |
| `--paper` | `#F7F6F2` | Default light background |
| `--white` | `#FFFFFF` | Cards, menu on light surfaces |
| `--stone` | `#E8E6E0` | Soft background separation and borders |
| `--muted` | `#777972` | Supporting copy and labels |
| `--warm` | `#B6A895` | Restrained accent, never large orange blocks |

**Colour ratio:** ~65% paper/white, ~25% deep/ink, ~10% stone/warm accent. Use an editorial dark/light sequence, not a fully black website. Ensure text meets contrast requirements; accent-on-paper alone may not be legible for body text.

### Typography

- **Display and headings:** `Manrope` variable (or `Sora` if an even more architectural feel works after comparison); use only one of them. Start with **Manrope**.
- **Body and UI:** `DM Sans` variable. Pairing is deliberate: confident geometric headings + warm, readable interface copy.
- Load fonts through `next/font/google` if available; self-host/locally optimise in production. Use system fallbacks.
- Large editorial headings, restrained all-caps eyebrows, no excessive mixed fonts or ornamental scripts.

Suggested responsive type scale (use `clamp()`):

```css
:root {
  --font-display: 'Manrope', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --type-hero: clamp(3.4rem, 8vw, 8.5rem);
  --type-h1: clamp(2.8rem, 6vw, 6.6rem);
  --type-h2: clamp(2.1rem, 4.5vw, 4.8rem);
  --type-h3: clamp(1.45rem, 2.5vw, 2.65rem);
  --type-body: clamp(1rem, 1.05vw, 1.125rem);
}
```

### Layout grid and spacing

- **Desktop max content width:** 1440 px; set outer gutters using `clamp(20px, 5vw, 80px)`.
- **Editorial grid:** 12 columns desktop; 6 tablet; 4 mobile. Use asymmetric compositions: text 4 columns / image 7 columns, leaving breathing room.
- **Section padding:** 112–160 px desktop; 72–96 px tablet; 56–72 px mobile; adjust on 13-inch laptops.
- **Corner treatment:** almost-square imagery (0–8 px radius). Avoid ubiquitous 24–32 px rounded cards.
- **Borders:** hairline separators, `1px solid rgba(...)`; use whitespace over heavy shadows.
- **Image ratios:** hero approx. 16:9 or cover viewport; product portraits 4:5; supporting stills 3:2; gallery mixed 4:5/3:2.
- Avoid repetitive centered `heading + subtitle + three rounded cards` layouts. Alternate alignments and scales intentionally.

---

## 04 — Site architecture and navigation

### MVP routes

```text
/                      Home (editorial flagship)
/blinds                Curated products overview
/blinds/roller-blinds  Detail page — reusable template
/blinds/roman-blinds   Detail page — reusable template
/blinds/venetian-blinds Detail page — reusable template
/gallery               Inspiration gallery
/about                 Brand/about
/contact               Enquiry / quote request
/privacy               Basic privacy information — publish only after accurate business/legal review
```

Top-level nav: **Home · Our Blinds · Gallery · About · Contact**. Primary nav CTA: **Request a Quote**. Desktop logo left, sparse links in center/right, CTA with subtle border or solid dark fill. On smaller desktops, collapse into a **Menu** trigger and full-screen panel. Mobile always uses overlay menu.

**Full-screen overlay menu:** charcoal background, oversized links, progressive stagger reveal, contact CTA anchored near bottom, dim/cross-fade underlying page, clear close icon, keyboard-accessible focus trap, Escape closes, body scroll locked while open. Respect reduced-motion.

Sticky nav (initially transparent on hero, solid `--paper` on scrolling over light content); ensure text/CTA remains legible on image and dark sections. Use a transparent-to-solid transition, not jarring colour inversion. Distinguish active route and add sticky-header anchor offset.

### Shared reusable sections/components

`SiteHeader`, `FullscreenMenu`, `Footer`, `HeroEditorial`, `SectionEyebrow`, `SplitEditorial`, `ProductShowcase`, `ProductCard`, `ScrollImageReveal`, `GalleryMasonry`, `ImageLightbox`, `SectionCTA`, `EnquiryForm`, `Breadcrumbs`, `PageTransition`, `ReducedMotionProvider`.

Build from central data files; one source of truth for product names, slugs, images, descriptions, CTA copy, and contact details. No hard-coded repeating product blocks across pages.

---

## 05 — Homepage storyboard (the signature experience)

**Build in this order.** Each section should have a reason to exist, an intentional photographic crop, a transition, and a clear visual focal point.

### 01. Cinematic hero (100svh desktop; min ~85svh mobile)

- Full-bleed image of an exceptionally styled interior where **the blind is obvious and identifiable**. The blind must be the subject, not an incidental background object.
- Soft gradient scrim only where needed for text readability. Do not darken the entire beautiful image excessively.
- Tiny eyebrow top-left in content area: `WINDOWS, CONSIDERED.`
- Primary headline: **Beautiful blinds. Better living.** Split over 2 or 3 intentional lines; very large, clean type. Avoid text wrapping over a busy window frame.
- Supporting line of 1–2 sentences below the headline, max width 460 px.
- Primary button **Explore Our Blinds**; secondary text link **Request a Quote**.
- Small `SCROLL TO EXPLORE ↓` indicator near lower edge (optional on mobile).
- Entrance sequence: image from scale 1.035 → 1, eyebrow fade-up, headline reveal line-by-line (avoid inaccessible character-by-character DOM), CTAs fade-up. Overall reveal under 1.3 s; hero text never invisible while fonts load.
- Scroll away: extremely subtle hero image parallax (≤ 8% displacement); no text zoom that harms reading.

### 02. Editorial introduction (paper background)

- Asymmetric two-column split. Small left eyebrow `THE SCREENS N BLINDS APPROACH`; dramatic heading right: **Light changes everything.**
- One succinct supporting paragraph, plus minimal text-link `Discover Screens N Blinds ↗`.
- Animate heading opacity/translate a little on entrance; do not pin here.

### 03. Curated collection / interactive product showcase

- Main product categories **Roller Blinds / Roman Blinds / Venetian Blinds** (editable and pending business confirmation).
- A more editorial treatment than cards-in-a-grid: **one large feature image + product title and index** per item.
- Desktop: alternate compositions; e.g. 01 image left/text right, 02 image right/text left, 03 immersive full-width image with restrained text overlay.
- Each item: `01 / 03`, concise 1–2-sentence text, `Explore Style ↗`.
- **Animation:** image reveals within clipped frame via translateY/scale easing, body stays stable, title appears 80–120 ms after image. Elegant hover: image scale 1.03, underline draws in, arrow shifts 3–5 px.
- Optional desktop-only **pinned one-viewport product stage** with three scroll-selected images is acceptable **only if** content remains fully accessible without JS, keyboard behavior works, and testing shows no jank. Standard scroll reveals are the default. Never force users through three screens of scroll-jacking.

### 04. Dark interlude / manifesto

- Full-width `--ink` section with restrained text and one strong detail photo.
- Eyebrow: `MADE FOR REAL SPACES` (avoid unsupported claim "made to measure" unless confirmed).
- Large statement: **The right blinds do more than cover a window.**
- Supporting text: `They shape the light, soften the mood and bring a room together.`
- Entry should subtly shift background from warm paper into dark; use a fade/reveal, not an abrupt flash or giant rotating text.

### 05. Gallery preview — visual inspiration

- Heading **A little inspiration.** and `Explore Gallery ↗` link.
- Editorial 3–5 image layout, staggered vertical rhythm: one 2-column wide image, smaller complementary portrait, detail shot.
- Hover: gentle zoom and caption slide; click opens accessible lightbox OR gallery route. Label third-party or stock imagery as **inspiration**, never mislabel as completed client projects.
- Touch devices get simple cards and click-throughs, not hover-dependent overlays.

### 06. Simple enquiry journey

- Heading **From first idea to final choice.**
- Three restrained steps, no invented promise of in-home visit or installation:
  1. **Tell us about your space** — Share what you're looking for.
  2. **Explore the possibilities** — Browse our styles and discuss your preferences.
  3. **Take the next step** — Enquire about the best option for your project.
- Thin separators and type-driven composition (avoid icon-heavy process circles).
- If the business later confirms fitting, sample visits or measure-and-quote, update this section and content accordingly.

### 07. Final high-impact CTA

- Large editorial photo **or** solid charcoal field, not a standard card component.
- Headline: **Your space deserves a better finish.**
- Button: **Request a Quote ↗** linking to `/contact`.
- Short reassurance: `Tell us what you have in mind, and we'll take it from there.`

### 08. Footer

- Large `SCREENS N BLINDS` wordmark line; navigation and three confirmed contact methods, if supplied.
- Contact details **must not be invented**; hide unconfigured channels.
- Include copyright using dynamic year; no fake ABN, location, rating, awards, partner logos, reviews, or social icons.

---

## 06 — Inner-page requirements

### `/blinds` (catalogue overview)

Opening editorial title, short intro, then **3 well-photographed, oversized categories** and a small advice/CTA interlude. No filters/cart/prices unless client confirms buying online. Category tiles must link to meaningful detail pages; do not display dead links.

### `/blinds/[slug]` (detail template)

- Slim breadcrumb, compelling image hero, category H1, clean intro.
- Gallery with 3–5 relevant, legally usable, true-to-product images (when assets are available).
- `Why consider this style` plain-language features; no unverified thermal/UV/privacy performance guarantees.
- `Works well in` examples (editorial suggestions, not technical installation advice).
- Optional `Options to ask about` rather than claiming every finish is stocked.
- Related category link + strong **Enquire About [Style]** CTA, preselects product in form.
- Generate metadata via data source. Unknown product slugs return proper 404.

### `/gallery`

Masonry/editorial grid with filter `All / Roller / Roman / Venetian` only if there are enough properly tagged assets; otherwise no filter. A clear label **Inspiration gallery** until actual past-project photography is approved. Accessible dialog lightbox, image captions/alt text, lazy loading beyond first visible row.

### `/about`

Story-led, restrained page: editorial intro, brand approach, values framed as **aspirations** instead of claimed years of experience, then a photo-led CTA. Do not fabricate founders, staff, showroom, workshop, customer metrics, Australian-made claims or business history. A real founder image can be added later.

### `/contact`

Simple visible form with `Name*`, `Email*`, `Phone (optional)`, `Interested in` dropdown, `Message*`, consent/privacy explanation. Optional image upload only if actual backend/storage and security are implemented. Accurate inline validation, accessible error states, loading, real success after successful server processing, bot prevention, backend rate limit, helpful fallback. No fake success toast. A separate map or office address appears **only when supplied and confirmed**.

---

## 07 — Animation design system: modern, not gimmicky

Use `GSAP + ScrollTrigger` **only for scenes where CSS is insufficient**. CSS transitions and `IntersectionObserver`/lightweight motion are preferred for simple reveals. Avoid attaching scroll listeners that mutate React state 60 times/sec.

| Motion | Spec | Constraint |
|---|---|---|
| Section entrance | `opacity 0→1`, `translateY 26→0`, 0.7–0.9 s | Once per view (or intentional reset), not every up/down scroll |
| Image mask reveal | clip/mask cover retract + image scale `1.06→1` | Avoid opacity-0 flash while loading |
| Heading line reveal | split by line or grouped spans, stagger ~0.08 s | Keep semantic heading readable for screen readers |
| Parallax | Very light and capped; ~20–60 px net | Disabled on mobile/reduced motion |
| Dark/light transition | Section-level background colour interpolation | Never reduce contrast during transition |
| Menu overlay | 0.35–0.55 s fade/translate/stagger | Escape, click close, scroll lock, focus trap |
| Card hover | `scale(1.025)`, title underline, arrow +4px | Disable transformations for coarse pointer |
| Link hover | underline reveal, no springy bouncing | Keep affordance clear without hover |
| Route transition | Optional 0.15–0.25 s fade only | Navigation must remain fast and predictable |

**Motion principles:** every animation should reveal hierarchy, communicate interaction, or create editorial pacing. Max **one major animated moment per section**. No scroll hijacking, continuous wobble, unbounded locomotive smooth scroll, auto-playing loud video, global spinning cursor, magnetic buttons everywhere, or 3D gimmicks. Native scrolling by default.

**Reduced motion:** `prefers-reduced-motion: reduce` turns off transforms, parallax, pins, smooth-scroll and animated masks; content always appears. Add accessible focus states and ensure animation never delays clicking.

---

## 08 — Photography / asset direction

### Image brief (mandatory visual consistency)

Source **licensed or client-owned** interior photography. Target bright contemporary Australian-style interiors (without falsely implying local completed projects): natural daylight, linen, warm grey, soft beige, oak, off-white walls, restrained décor, architectural window frames, real blinds in frame.

**Needed assets:**

| Filename suggestion | Purpose | Shot direction |
|---|---|---|
| `hero-living-room.webp` | Homepage hero | Wide living room, large windows, visible refined roller blind, clean left/right copy zone |
| `intro-detail.webp` | About intro | Window texture/detail with natural material palette |
| `roller-main.webp` | Roller collection | Clean-lined roller blind, clearly visible mechanism/fabric |
| `roman-main.webp` | Roman collection | Fabric Roman blinds with visible gathered folds |
| `venetian-main.webp` | Venetian collection | Distinct slats, side lighting and material texture |
| `gallery-01`…`gallery-08.webp` | Inspiration | Variety of real blinds, room types and close-up crops |
| `about-interior.webp` | About page | Calm interior; no invented team photo |
| `cta-interior.webp` | Closing CTA | Moody yet legible window space, not a duplicate of hero |

**Crucial:** A curtain-only image is not a substitute for roller blinds; every category image must match its category. Don't use the reference site's photographs or supplier logos unless there is explicit permission. Don't hotlink third-party websites' image URLs into production. If no approved imagery is supplied, use clearly marked **temporary licensed placeholders** in development and record outstanding assets for launch; do not pass generic fake project images off as customer work.

### Image loading plan

Use `next/image`, responsive `sizes`, explicit dimensions to eliminate CLS. Prioritise the **one** LCP hero image, lazy-load below fold, generate WebP/AVIF variants, compress without visible banding, include meaningful alt text. Use image focal-point metadata per asset for responsive crops. Do not autoplay megabyte-sized hero videos.

---

## 09 — Implementation stack and suggested structure

**Preferred stack:** Next.js App Router + TypeScript + Tailwind CSS + minimal GSAP/ScrollTrigger + React Hook Form/Zod for form if useful. Deployable to Vercel. Use semantic HTML, server components by default, client components only where interaction requires them.

```text
screensnblinds/
├─ app/
│  ├─ page.tsx
│  ├─ blinds/page.tsx
│  ├─ blinds/[slug]/page.tsx
│  ├─ gallery/page.tsx
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ api/enquiry/route.ts        # only if email transport configured
│  ├─ layout.tsx
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ layout/
│  ├─ sections/
│  ├─ motion/
│  └─ ui/
├─ content/
│  ├─ site.ts                   # business settings and CTAs
│  ├─ products.ts               # single category data source
│  └─ gallery.ts
├─ public/images/
│  ├─ hero/
│  ├─ products/
│  └─ gallery/
├─ lib/
│  └─ validation.ts
├─ styles/
└─ README.md
```

**Form integration:** Support a real provider (e.g., Resend/email endpoint) configured with environment variables, server-side validation, rate limiting/honeypot and safe error handling. **No secret keys in client bundle or repository**. If no sender/inbox credentials exist, implement the form UI in an explicitly **unconfigured developer state**, document setup steps, and **do not pretend that submissions are delivered**. Production launch is blocked until the form is truly tested end-to-end. Optional `mailto:` CTA may be used as a clearly labeled fallback when a real email address is supplied.

**SEO:** Unique title/H1/meta description per route, semantic heading hierarchy, canonical URL only once actual domain is provided, Open Graph assets, sitemap, robots, descriptive internal links, compressed imagery, JSON-LD `Organization` only using confirmed facts, `LocalBusiness` only after verifiable name/location/contact/service area supplied. No made-up suburb landing pages or FAQ schema for hidden content.

**Accessibility:** WCAG 2.2 AA target. Contrast, keyboard-only flows, visible focus, appropriate labels, Escape menu/lightbox handling, alt text, 44×44 touch target intent, no keyboard traps, avoid `div` buttons, correct `aria-expanded` and `aria-controls`.

**Performance target:** Aim for Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility, ≥ 95 Best Practices and SEO where feasible, tested on a real production build (these are **targets**, not guaranteed scores). Aim for mobile Core Web Vitals LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms under representative conditions. The most important feeling: instant navigation, smooth native scroll, responsive images.

---

## 10 — Mobile-first art direction

Do not simply shrink desktop. Make **deliberate mobile compositions**:

- Header: compact wordmark, visible quote CTA when space permits, 44 px menu trigger.
- Hero: portrait crop selected specifically for 375–430 px widths; headline ~42–58 px; photo subject and text must never conflict.
- Product showcases: image first, readable title and description second; no awkward horizontal scroll unless clearly signposted.
- Remove heavy parallax and pinned scroll sequences on mobile.
- Gallery: 1 column small mobile, 2 columns larger screens/tablet; natural image aspect ratios.
- Footer/contact: contact links easily tappable; form fields one per row and compatible with autofill.
- Check at **360, 390, 430, 768, 1024, 1280, 1440, 1920 px**, including landscape phone and 200% text zoom. No horizontal overflow or cut-off headings.

---

## 11 — Definition of done / QA checklist

**Visual**
- [ ] Looks intentionally art-directed, not a component library demo.
- [ ] Comparable polish to Urban reference while entirely original.
- [ ] Hero image actually shows an appropriate blind; all category photos match labels.
- [ ] Strong type hierarchy, generous whitespace, alternating photographic layouts.
- [ ] Animated dark/light sections are smooth; no unreadable transitional frames.
- [ ] No irrelevant icons, fake counters, filler reviews, stock staff profiles, or placeholder text in launch build.

**Functional**
- [ ] All nav links and `Explore` CTAs lead to real pages.
- [ ] Product detail pages, gallery (and lightbox if built), fullscreen menu work on touch and keyboard.
- [ ] Contact form submits through a configured endpoint; actual delivery validated before publishing.
- [ ] Loading, error and success states verified, including invalid input and network failure.
- [ ] Responsive layouts inspected with screenshot tests at specified breakpoints.
- [ ] Dark/light sections, sticky nav and menu overlay visually reviewed with scroll interactions.

**Technical**
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` pass (adapt commands to project scripts).
- [ ] Reduced-motion path tested and contains no hidden text.
- [ ] No console errors, hydration warnings, layout jumps, broken images or dead anchors.
- [ ] Metadata, alt text, canonical strategy, robots/sitemap reviewed.
- [ ] Performance measured on production build and heaviest animations profiled.
- [ ] Config fields are replaceable without editing JSX in many files.

---

## 12 — Execution plan for Codex

1. Read **both** `DESIGN_BLUEPRINT.md` and `WEBSITE_CONTENT.md` before writing UI. Treat the content file as the copy/source-of-truth; this file as the design/interaction contract.
2. Inspect repository, package scripts and any provided real assets; preserve usable existing work.
3. Establish fonts, tokens, layout primitives, global navigation/footer, typed content model.
4. Build homepage completely with excellent imagery treatment and restrained motion.
5. Build products overview and reusable three-category pages from data.
6. Build gallery, about, contact and all links. Integrate form transport only when configuration exists.
7. Add accessible full-screen menu and controlled GSAP reveals; test reduced-motion.
8. Optimise and QA desktop/mobile, repair overflow and ensure real production builds.
9. Return **file list + screenshots/screenshot paths + test results + unresolved items**. Clearly distinguish fully working functionality from configuration still needed.

### Copy-paste kickoff for Codex

> Build the **Screens N Blinds** site using `DESIGN_BLUEPRINT.md` as the exact visual/interaction brief and `WEBSITE_CONTENT.md` as the central copy and business-data specification. Our inspiration is the **overall visual quality** of urbanwindowcoverings.au: premium photography, charcoal/white editorial design, dark/light scrolling sequences, and a full-screen menu. Create an ORIGINAL, exceptionally polished design, not a pixel clone. Prioritise a cinematic hero, asymmetric section layouts, unusually good typography, image-driven product reveals, and extremely smooth mobile-responsive scroll effects. Follow the MVP routes and data architecture; use real semantic pages and functional links. Never fabricate testimonials, addresses, phone numbers, years of experience, project photos or form success. Implement or flag unconfigured email delivery as specified. Review desktop/mobile screenshots, run lint/typecheck/build, and keep iterating until it feels like a high-end design studio built it.

---

## 13 — Reference provenance and interpretation

- **Observed from public site content:** Urban Window Coverings showcases a large editorial homepage, individual service/category pages, interior photographs and an enquiry path: https://www.urbanwindowcoverings.au/
- **Explicitly confirmed by the design agency:** charcoal/white aesthetic, large photography, dark/light scrolling transitions, full-screen menu, CMS-backed project content and enquiry forms: https://www.rhythmdigital.com.au/projects/urban-window-coverings
- **Design choices newly proposed for Screens N Blinds:** brand colours, fonts, layout measurements, animation timings, sitemap, UX, technology stack and all copy. These are intentional implementation decisions rather than an extraction of a site's proprietary files.
