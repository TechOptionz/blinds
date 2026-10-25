# JUST BLINDS — WEBSITE CONTENT & CONTENT MODEL

> **Version:** 1.0 · **Brand:** Just Blinds (working name) · **Status:** High-quality draft copy for Codex implementation; factual business details and offerings require confirmation.
>
> **Use with:** [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md). This file controls the words, product labels, navigation text, form microcopy, asset inventory, and what must never be invented.

---

## 01 — Brand and messaging

**Display name:** Just Blinds

**Suggested descriptor:** Considered window coverings.

**One-line positioning:** Clean-lined blinds, timeless interiors and a simpler way to find the right look for your space.

**Tone:** editorial, natural, premium, clear and human. Write for someone choosing blinds for their own home — not a technical buyer. Use Australian English (`colour`, `favourite`, `enquiry`) as a provisional convention inspired by the Australian market references. Replace localisation if the actual service country differs.

**Core idea:** A window covering is part of the room's architecture and atmosphere, not just something that blocks light. Lead with **light, privacy, texture, simplicity, design**.

**Do not imply:** Just Blinds is already a long-established firm, award winner, Australian manufacturer, family business, or a company that offers measuring/fitting, a showroom, free samples, warranties, motorisation, or free installation **until the owner confirms those claims**.

**Preferred CTA vocabulary:** `Explore Our Blinds` · `Request a Quote` · `Explore This Style` · `View Inspiration` · `Get in Touch`.

---

## 02 — Facts required from owner (do not fabricate)

Keep these settings in a typed config (`content/site.ts` or `content/site.json`), not scattered throughout page JSX:

```yaml
brand:
  displayName: "Just Blinds"
  descriptor: "Considered window coverings."
  status: "working-name"

business:  # TODO: replace with approved facts; omit absent details from published UI
  email: null
  phone: null
  whatsappNumber: null
  address: null
  city: null
  state: null
  country: null
  serviceAreas: []
  openingHours: null
  registeredBusinessName: null
  businessId: null  # e.g. ABN only if relevant and confirmed
  instagramUrl: null
  facebookUrl: null
  domain: null

serviceCapabilities: # TODO: owner to confirm before mentioning publicly
  measurementVisits: null
  installation: null
  supplyOnly: null
  madeToMeasure: null
  freeQuotes: null
  fabricSamples: null
  motorisation: null
  manufacturingOrigin: null

products:  # PROPOSED starter collection; confirm actual range before launch
  enabledSlugs:
    - roller-blinds
    - roman-blinds
    - venetian-blinds

leadDelivery:
  provider: null
  receivingEmail: null
  configured: false
```

**Owner confirmations required before launch:** contact details, location/service area, actual product range, whether a quote is free, what support/services are provided, proof/rights for photos, form delivery account, privacy details, domain, social links. Until confirmed, don't display the missing fact and don't substitute a competitor's details.

---

## 03 — Navigation and global microcopy

**Header**

- Logo: `JUST BLINDS`
- Nav: `Home` · `Our Blinds` · `Gallery` · `About` · `Contact`
- Primary CTA: `Request a Quote`
- Mobile control: `Menu` / `Close menu`
- Full-screen menu secondary copy: `Thoughtful choices for the spaces you love.`

**Default image/text styles**

- Section eyebrow: 10–13 px, uppercase, tracked; examples `THE COLLECTION`, `THE DETAILS`, `INSPIRATION`, `OUR APPROACH`.
- Primary buttons: brief, verb-led; arrow `↗` is decorative and hidden from screen readers.
- No fake urgency: avoid `Only today`, `Limited offer`, `Best prices guaranteed`.

**Footer**

Large wordmark: `JUST BLINDS`  
Tagline: `A better view begins with the details.`  
Nav: `Our Blinds · Gallery · About · Contact`  
Contact heading: `Start a conversation`  
Contact detail: show **only** verified email/phone/social from configuration.  
Copyright: `© {currentYear} Just Blinds. All rights reserved.`  
Footer small print: `Product availability and services may vary. Please enquire for details.` (use if needed).

No address, fake phone, fabricated social handles or unnecessary newsletter signup.

---

## 04 — Homepage: final draft copy, section by section

### Hero / first screen

**Eyebrow**  
`WINDOWS, CONSIDERED.`

**H1**  
`Beautiful blinds.`  
`Better living.`

**Short supporting copy**  
`A considered collection of window blinds for spaces that feel as good as they look. Discover simple lines, softer light and a style that feels like home.`

**Buttons**  
Primary `Explore Our Blinds` → `/blinds`  
Secondary `Request a Quote` → `/contact`

**Scroll label**  
`SCROLL TO EXPLORE`

**Image direction**  
Wide sunlit room with a **clearly identifiable blind**. Allow negative space for headline. The overall brand aesthetic is more important than packing a dozen claims above the fold.

### Intro / editorial statement

**Eyebrow:** `THE JUST BLINDS APPROACH`

**H2:** `Light changes everything.`

**Body:**  
`The right window covering does more than complete a room. It shapes the daylight, creates a sense of privacy and brings everything into balance. We believe choosing blinds should feel inspiring, not overwhelming.`

**Link:** `More About Us` → `/about`

### Collection opening

**Eyebrow:** `THE COLLECTION`

**H2:** `Find your kind of beautiful.`

**Body:**  
`From minimal roller blinds to soft, tailored folds, explore timeless styles for different rooms, moods and ways of living.`

**Link:** `View All Blinds` → `/blinds`

### Product showcase card 01

**Index:** `01 / 03`  
**Heading:** `Roller Blinds`  
**Description:** `Understated and versatile, roller blinds bring a clean finish to windows and a beautifully uncluttered feel to a room.`  
**CTA:** `Explore Roller Blinds` → `/blinds/roller-blinds`  
**Photography:** contemporary roller blind visibly fitted over window.

### Product showcase card 02

**Index:** `02 / 03`  
**Heading:** `Roman Blinds`  
**Description:** `Soft folds and a tailored silhouette give Roman blinds a warm, thoughtful presence — ideal when the fabric is part of the room's character.`  
**CTA:** `Explore Roman Blinds` → `/blinds/roman-blinds`  
**Photography:** clearly recognisable folded Roman blind.

### Product showcase card 03

**Index:** `03 / 03`  
**Heading:** `Venetian Blinds`  
**Description:** `Defined by their crisp horizontal slats, Venetian blinds offer a refined balance of structure, privacy and adjustable light.`  
**CTA:** `Explore Venetian Blinds` → `/blinds/venetian-blinds`  
**Photography:** visible slats and shadow lines (not roller fabric).

### Dark editorial interlude

**Eyebrow:** `DESIGNED AROUND THE WAY YOU LIVE`

**H2:** `The right blinds do more than cover a window.`

**Body:**  
`They shape the light, soften the mood and bring a room together. Sometimes, the smallest design choice makes the biggest difference.`

**Optional link:** `Discover the Collection` → `/blinds`

### Gallery teaser

**Eyebrow:** `INTERIORS & INSPIRATION`

**H2:** `A little inspiration.`

**Body:**  
`Quiet corners, open spaces and beautiful natural light. Find ideas for the way you want your rooms to feel.`

**CTA:** `View Inspiration Gallery` → `/gallery`

**Integrity note:** These are **inspiration images**, not `Our Projects`, unless actual project photographs supplied by Just Blinds are approved for that description.

### Simple three-step guide

**Eyebrow:** `HOW TO BEGIN`

**H2:** `From first idea to final choice.`

**Step 01 — `Tell us about your space`**  
`Share a few details about the room, window and look you have in mind.`

**Step 02 — `Explore the possibilities`**  
`Browse blind styles and tell us which details matter most to you.`

**Step 03 — `Take the next step`**  
`Send an enquiry to discuss what may be suitable for your project.`

**CTA:** `Start an Enquiry` → `/contact`

### Final CTA

**Eyebrow:** `LET'S START SOMETHING BEAUTIFUL`

**H2:** `Your space deserves a better finish.`

**Body:**  
`Whether you know exactly what you want or are just beginning to explore, we'd love to hear what you have in mind.`

**Button:** `Request a Quote` → `/contact`

---

## 05 — Our Blinds landing page (`/blinds`)

**Eyebrow:** `OUR COLLECTION`

**H1:** `Blinds with a point of view.`

**Intro:**  
`Considered forms, practical details and finishes that work with your space. Start with the style that speaks to you, then explore what makes it special.`

**Card labels and one-liners:**

| Product | One-line summary | Slug |
|---|---|---|
| Roller Blinds | Clean lines. Effortless simplicity. | `/blinds/roller-blinds` |
| Roman Blinds | Soft structure. Timeless warmth. | `/blinds/roman-blinds` |
| Venetian Blinds | Sculpted light. Beautiful control. | `/blinds/venetian-blinds` |

**Info interlude H2:** `Not sure where to start?`  
**Copy:** `Every room has different light, privacy and design needs. Tell us what you're looking for, and start a conversation about your options.`  
**CTA:** `Ask About Your Space` → `/contact`

Only display products that are truly offered. If owner confirms a different range (e.g., vertical blinds, shutters, outdoor blinds, curtains), replace the data and copy rather than showing everything by default.

---

## 06 — Product detail page copy (`/blinds/[slug]`)

All pages share components: `eyebrow / H1 / intro / hero image / feature headings / use-case suggestions / gallery / CTA / related product`.

### Roller Blinds

**Eyebrow:** `THE COLLECTION / 01`  
**H1:** `Roller Blinds`  
**Headline:** `Less fuss. More room to breathe.`  
**Intro:**  
`With their streamlined profile and simple form, roller blinds suit interiors that favour clean lines. They offer an understated way to complement a room without taking attention away from the architecture.`

**Three editorial features:**

- **Minimal by nature** — `A neatly composed look that feels modern and uncomplicated.`
- **Made for many moods** — `Discover how different fabrics and finishes can change the feel of the light.`
- **Easy to style** — `A versatile choice alongside contemporary or classic interiors.`

**Suitable-for inspiration:** `Living spaces · Bedrooms · Workspaces` (suggestions, not a product performance guarantee).

**CTA:** `Enquire About Roller Blinds` → `/contact?product=roller-blinds`

### Roman Blinds

**Eyebrow:** `THE COLLECTION / 02`  
**H1:** `Roman Blinds`  
**Headline:** `Softness in every fold.`  
**Intro:**  
`Roman blinds bring the gentle texture of fabric into a more tailored silhouette. Their layered folds add warmth to a window while keeping the overall space balanced and considered.`

**Three editorial features:**

- **Softly structured** — `A refined fabric look with a distinct folded shape.`
- **Textural warmth** — `A natural fit for rooms where materials help tell the story.`
- **Timeless presence** — `A sophisticated look that sits comfortably across design styles.`

**Suitable-for inspiration:** `Bedrooms · Living rooms · Quiet reading corners`.

**CTA:** `Enquire About Roman Blinds` → `/contact?product=roman-blinds`

### Venetian Blinds

**Eyebrow:** `THE COLLECTION / 03`  
**H1:** `Venetian Blinds`  
**Headline:** `Beautifully balanced light.`  
**Intro:**  
`Defined by a series of horizontal slats, Venetian blinds create a crisp and architectural look. Adjustable slats let you refine the direction of natural light while creating a composed finish around the window.`

**Three editorial features:**

- **Clean geometry** — `Distinct lines bring visual structure to a space.`
- **Adjustable daylight** — `Slats allow the direction of entering light to be changed.`
- **Flexible character** — `An easy style to pair with a variety of room settings.`

**Suitable-for inspiration:** `Living areas · Studies · Kitchens` (confirm material suitability for moisture-prone rooms).

**CTA:** `Enquire About Venetian Blinds` → `/contact?product=venetian-blinds`

**Important merchandising note:** Do not add fabricated fabric SKUs, colours, availability labels, installation methods, acoustic ratings, thermal savings, fire ratings, child-safety certifications, or discounts. Confirm real options before adding selectable finishes or configurators. In Australia, any future cord/control-safety claims must be verified against relevant obligations.

---

## 07 — Gallery page (`/gallery`)

**Eyebrow:** `THE INSPIRATION EDIT`

**H1:** `Spaces worth slowing down for.`

**Intro:**  
`A collection of interiors and details that celebrate light, texture and beautifully finished windows. Save an idea or simply enjoy the view.`

**Gallery category filters (only if assets support them):**  
`All Inspiration` · `Roller` · `Roman` · `Venetian`

**Sample editorial image captions** *(not client-project titles; adjust to actual image content)*:

- `Morning light, beautifully softened.`
- `Simple lines, calm interiors.`
- `A softer way to frame a view.`
- `Texture in the little details.`
- `The beauty of natural daylight.`
- `Where comfort meets clean design.`

**Photo requirement:** use photography owned/licensed for the website. If using licensed inspirational stock, label it `Inspiration` and never imply that Just Blinds designed or installed the room.

**Bottom CTA H2:** `Inspired by what you see?`  
**Copy:** `Tell us about your window and the look you're working towards.`  
**CTA:** `Get in Touch` → `/contact`

---

## 08 — About page (`/about`)

**Eyebrow:** `ABOUT JUST BLINDS`

**H1:** `Simple choices. Beautiful spaces.`

**Lead:**  
`We believe the best interiors are made of thoughtful details. A beautifully chosen blind can transform the way light enters a room and how the space feels throughout the day.`

**Section H2:** `A little detail goes a long way.`

**Body:**  
`Just Blinds is built around a simple idea: window coverings should feel like a natural part of the home, not an afterthought. We focus on clean styles, considered choices and a welcoming place to begin exploring what could work for your space.`

**Section H2:** `Style that feels like you.`

**Body:**  
`Some rooms call for a minimal finish. Others come alive with texture. There isn't one perfect look for every window — the most satisfying choice is the one that fits the room and the people living in it.`

**Values-style statements (no fabricated achievements):**

- **Considered simplicity** — `Keep the experience clear, calm and easy to explore.`
- **Attention to detail** — `Care about material, texture, proportion and light.`
- **A personal approach** — `Make room for different styles, spaces and ideas.`

**CTA heading:** `Let's find your starting point.`  
**CTA:** `Contact Just Blinds` → `/contact`

**Do not add:** fictional founder story, `20 years of experience`, `1000+ happy customers`, fake employees, premises or in-house manufacturing.

---

## 09 — Contact / enquiry page (`/contact`)

**Eyebrow:** `GET IN TOUCH`

**H1:** `Let's talk about your windows.`

**Intro:**  
`Have a space in mind? Tell us a little about what you're looking for and we'll start the conversation.`

**Form title:** `Send an enquiry`

**Fields:**

| Field key | Label | Type | Required | Notes |
|---|---|---|---|---|
| `name` | `Your name` | text | Yes | Min 2, max 100 chars |
| `email` | `Email address` | email | Yes | Validate server side |
| `phone` | `Phone number (optional)` | tel | No | Do not require phone without approval |
| `product` | `What are you interested in?` | select | No | `I'm exploring` + three confirmed products |
| `message` | `Tell us about your space` | textarea | Yes | Min 10, max 3000 chars |
| `consent` | `I agree to be contacted about my enquiry.` | checkbox | Yes | Show privacy link if published |

**Submit:** `Send Enquiry ↗`  
**Loading:** `Sending your enquiry…`  
**Real success (only after server confirmed delivery):** `Thank you — your enquiry has been sent. We'll be in touch using the details you've provided.`  
**Validation:** `Please check the highlighted fields and try again.`  
**Delivery failure:** `Sorry, we couldn't send your enquiry right now. Please try again.`

**Behind the scenes:** Product-detail CTAs prefill `?product=...`. Sanitize/validate on server. Delivery must use a real configured integration. When no integration is configured, do **not** render a seemingly working `Send` flow with fake success; block production launch or show an honest alternative once a contact email is available.

**Secondary contact block (conditional):**

- Heading: `Prefer to speak directly?`
- Show confirmed phone/email/WhatsApp only if present; otherwise omit this entire block.
- Do not embed a random Google Map or use competitor contact details.

**Privacy note:** `We’ll use the information you provide to respond to your enquiry.` Add an accurate real privacy policy before launch; review applicable obligations with business owner.

---

## 10 — Optional FAQ content (only if the layout needs it)

**Q. How do I choose the right blind style?**  
`Start with what matters most in your room: the amount of daylight, how much privacy you want, and the look you like. Our product pages introduce the main styles so you can compare them at a glance.`

**Q. What is the difference between roller, Roman and Venetian blinds?**  
`Roller blinds have a smooth, streamlined panel; Roman blinds form soft fabric folds; Venetian blinds use adjustable horizontal slats. Each brings a different look and way of managing light.`

**Q. Can I ask about a particular room or window?**  
`Yes. Describe the space in the enquiry form and mention any priorities such as privacy, light or décor.`

**Q. Can I see more examples?**  
`Visit the inspiration gallery for a look at styles, colours and room settings.`

Do not state measuring, quotes, fitting, sample times, safety certification or lead times until formally confirmed.

---

## 11 — SEO draft metadata (no fake local targeting)

| Route | Page title | Description |
|---|---|---|
| `/` | `Just Blinds | Beautiful Blinds for Considered Spaces` | `Explore timeless roller, Roman and Venetian blinds, discover interior inspiration and enquire about a look that suits your space.` |
| `/blinds` | `Our Blinds | Roller, Roman & Venetian | Just Blinds` | `Discover the Just Blinds collection, with clean-lined roller blinds, soft Roman blinds and refined Venetian blinds.` |
| `/blinds/roller-blinds` | `Roller Blinds | Just Blinds` | `Explore the simple, modern look of roller blinds and find inspiration for a clean-lined window finish.` |
| `/blinds/roman-blinds` | `Roman Blinds | Just Blinds` | `Discover Roman blinds, defined by softly folded fabric and a timeless, tailored finish.` |
| `/blinds/venetian-blinds` | `Venetian Blinds | Just Blinds` | `Explore Venetian blinds and discover how crisp horizontal slats bring structure and adjustable light to interiors.` |
| `/gallery` | `Blinds Inspiration Gallery | Just Blinds` | `Explore interior inspiration with window blinds, thoughtful materials and beautiful natural light.` |
| `/about` | `About Just Blinds | Thoughtful Window Coverings` | `Discover the design-led thinking behind Just Blinds and our approach to simple, considered interiors.` |
| `/contact` | `Contact Just Blinds | Enquire About Blinds` | `Tell Just Blinds about your space, explore window-covering ideas or send an enquiry about your preferred style.` |

When business location is confirmed, research location-specific keywords and adjust copy naturally. Don't SEO-target Australian suburbs solely because the reference site is Australian. Use full structured data only with verified business attributes.

---

## 12 — Asset and content data contract

Suggested file paths; imagery is **not included in these markdown files**. Names below are an assignment plan, not a claim that assets are licensed or already supplied.

```ts
// content/products.ts (suggested shape — implement real TypeScript types)
export const products = [
  {
    slug: 'roller-blinds',
    name: 'Roller Blinds',
    index: '01',
    teaser: 'Clean lines. Effortless simplicity.',
    heroImage: '/images/products/roller-main.webp',
    gallery: [
      '/images/products/roller-detail-01.webp',
      '/images/products/roller-detail-02.webp',
    ],
  },
  {
    slug: 'roman-blinds',
    name: 'Roman Blinds',
    index: '02',
    teaser: 'Soft structure. Timeless warmth.',
    heroImage: '/images/products/roman-main.webp',
    gallery: ['/images/products/roman-detail-01.webp'],
  },
  {
    slug: 'venetian-blinds',
    name: 'Venetian Blinds',
    index: '03',
    teaser: 'Sculpted light. Beautiful control.',
    heroImage: '/images/products/venetian-main.webp',
    gallery: ['/images/products/venetian-detail-01.webp'],
  },
];
```

### Required photographic deliverables

| Asset | Priority | Exact need |
|---|---|---|
| `hero-living-room.webp` | P0 | Exceptional full-width blind-focused interior with text-safe area |
| `roller-main.webp`, `roman-main.webp`, `venetian-main.webp` | P0 | One accurate and consistent hero per category |
| `intro-detail.webp`, `about-interior.webp` | P1 | Brand/detail scenes to support editorial sections |
| `gallery-01.webp` … `gallery-08.webp` | P1 | Consistent interiors / blind close-ups with license tracking |
| `cta-interior.webp` | P2 | Closing cinematic visual (can reuse crop of an approved asset) |
| `product-*-detail-*.webp` | P2 | Detail-page imagery that truly matches each blind style |

**Asset metadata** should include path, descriptive alt text, photographer/source, license/permission, product tag, whether photo depicts actual Just Blinds work, and desired desktop/mobile focal point. Don't show broken URLs when assets have not been supplied; use a clearly identified temporary dev substitute, and fail the launch checklist until high-quality approved assets are ready.

### Brand photo art direction

- Bright natural light, lived-in premium interiors, tactile neutral material palettes.
- Calm but not sterile; a few intentional accents, not excessive furniture clutter.
- Photos should make the window covering apparent.
- Mix wide scene / medium room composition / macro texture.
- Avoid random AI-generated representations of products presented as actual inventory or completed installations without clear labeling/approval.

---

## 13 — Launch-readiness editorial rules

Before production, replace or resolve every unresolved fact:

- [ ] Business name `Just Blinds` is approved and availability checks completed.
- [ ] Three product categories are confirmed (or replaced with actual available styles).
- [ ] Email / phone / contact channel supplied; live form actually delivers and is tested.
- [ ] Business location/service area supplied if local SEO and availability promises are used.
- [ ] Whether pricing, quotation, supply, measuring, fitting, samples and motorisation are offered is confirmed.
- [ ] Real/licensed blind-specific photography supplied or approved; credits tracked where required.
- [ ] Any gallery images labeled `Projects` are truly documented client work; otherwise remain `Inspiration`.
- [ ] No placeholder copy, fake testimonial, fabricated social proof, unsupported guarantees, invented certifications or generic addresses remain.
- [ ] Domain, privacy text, form data handling and contact consent are accurate.

---

## 14 — How Codex should use this file

1. Translate each page's content into semantic, accessible components. **Preserve these headings and copy unless a layout constraint requires minor edits**.
2. Define shared route/product/contact data; avoid copy duplication.
3. Use the structure and animations in `DESIGN_BLUEPRINT.md` to make the *same copy* feel premium via layout, art direction and motion.
4. For missing business facts, keep safe conditional omissions and clearly document pending values; never auto-fill with a competitor's facts.
5. Show the owner exactly which facts and image rights are outstanding at handover.

**Final creative principle:** Just Blinds should feel like a boutique interiors website first, while remaining straightforward and credible for a real startup business.
