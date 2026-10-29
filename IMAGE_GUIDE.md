# Image replacement checklist

Every image slot on the site is currently filled with licensed stock photography chosen to match its product type (roller, vision, honeycomb, Venetian, shutters, screens, each curtain style and heading). The alt text, source URL and licence for each slot live in `content/image-credits.ts`; the `withCredit()` helper overlays that record onto the asset at build time. All of these photos are Unsplash License or Pexels License images (free for commercial use, no attribution required). None show completed Screens N Blinds projects, so `actualProject` stays `false` until you swap in your own work.

## Replacing a stock photo with your own

1. Drop your WebP over the existing file with the same name (tables below).
2. Update that path's entry in `content/image-credits.ts`: new alt text, `source: 'Screens N Blinds photography'`, your licence note, and set `actualProject` where the component shows completed work.
3. Run `npm run images` (or restart `npm run dev`) and reload.

Each of the categories has a main image and three individually replaceable gallery slots: room setting, material/texture, and finishing detail. Curtain pages also have a separate image beside the heading-style guide. If a photograph is removed, the original illustration placeholder is shown again and the filename appears on the slot during development; missing photographs never generate broken-image requests.

## Blinds — folder `public/images/products/`

One row per style: `roller`, `double-roller`, `sunscreen`, `vision`, `roman`, `honeycomb`, `venetian`, `timber-venetian`, `vertical`, `panel`, `motorised`.

| Slot | File |
|---|---|
| Main / hero | `<style>-main.webp` |
| Room setting | `<style>-detail-01.webp` |
| Material close-up | `<style>-detail-02.webp` |
| Finishing detail | `<style>-detail-03.webp` |
| Comparison card (4:3) | `<style>-compare.webp` |

Site-wide slots: `hero/hero-living-room.webp`, `sections/intro-detail.webp`, `sections/cta-interior.webp`, `about/about-interior.webp` and `gallery/gallery-01.webp` to `gallery-06.webp`.

## Screens and shutters — folders `public/images/screens/` and `public/images/shutters/`

Each item slug (for example `fly-screens`, `plantation-shutters`) has `<slug>.webp` (main) plus `<slug>-detail-01.webp` (room), `-detail-02.webp` (material) and `-detail-03.webp` (finishing detail).

## Curtains — folder `public/images/curtains/`

One row per style: `sheer-curtains`, `blockout-curtains`, `layered-curtains`, `s-fold-curtains`, `pinch-pleat-curtains`.

| Slot | File |
|---|---|
| Main / hero | `<style>.webp` |
| Room setting | `<style>-gallery-01.webp` |
| Fabric close-up | `<style>-gallery-02.webp` |
| Finishing detail | `<style>-gallery-03.webp` |
| Dark heading-style section | `<style>-detail.webp` |

The curtains overview uses `curtains-interior.webp` and `curtains-detail.webp`.

## Heading styles — folder `public/images/curtains/`

The "shape of the fold" cards on `/curtains` and the heading rows on every curtain detail page share one reference image per heading style. Use a close-up of the top of the curtain, roughly 4:3.

| Heading style | File |
|---|---|
| Wave / S-fold | `heading-wave.webp` |
| Pinch pleat | `heading-pinch-pleat.webp` |
| Eyelet | `heading-eyelet.webp` |

If a heading photograph is removed, the illustrations in `public/images/placeholders/heading-*.svg` are shown (regenerate with `node scripts/create-heading-placeholders.mjs`).

## Style comparison cards — folder `public/images/products/`

The "collection at a glance" cards on `/blinds` take one reference image per blind style, named `<style>-compare.webp` (for example `roller-compare.webp`, `double-roller-compare.webp`, `honeycomb-compare.webp`). A 4:3 crop that shows the shape of the blind works best. Until supplied, the main style illustration is reused.

## Add your photographs

1. Use an actual WebP image (do not simply rename a JPG extension). Put it in the folder above with the matching name.
2. Run `npm.cmd run images` on Windows, or `npm run images`. Alternatively restart `npm run dev`, which refreshes the manifest automatically.
3. Reload the browser. Rebuild/redeploy when updating a production site.
4. Adjust alt text and source/permission records in `content/image-credits.ts`; crop positions live in `content/images.ts` (blinds), `content/curtains.ts` (curtain main images), `content/curtain-images.ts` (curtain galleries) and `content/catalogue.ts` (screens and shutters).

Prefer 2000–2400px-wide room photos for heroes and at least 1200px-wide gallery images. Leave room around the subject for responsive crops. The layout automatically preserves the image slot dimensions.

JPG/PNG can also be used by updating the corresponding path in the central configuration. No component edits are necessary. For new custom images, update alt text to describe the photograph accurately and remove illustration-specific captions before launch. Only label photographs as completed projects when they actually show your work.

The shared gallery layout lives in `components/sections/CategoryImages.tsx`. Original room/detail placeholders can be regenerated with `node scripts/create-detail-placeholders.mjs`.
