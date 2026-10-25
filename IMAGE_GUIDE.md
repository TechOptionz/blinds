# Image replacement checklist

Each of the six categories now has a main image and three individually replaceable gallery slots: room setting, material/texture, and finishing detail. Curtain pages also have a separate image beside the heading-style guide.

Illustrations remain visible until a real image is supplied. Each gallery placeholder shows its filename during development. Missing photographs never generate broken-image requests.

## Blinds — folder `public/images/products/`

| Category | Main / hero | Room setting | Material close-up | Finishing detail |
|---|---|---|---|---|
| Roller | `roller-main.webp` | `roller-detail-01.webp` | `roller-detail-02.webp` | `roller-detail-03.webp` |
| Roman | `roman-main.webp` | `roman-detail-01.webp` | `roman-detail-02.webp` | `roman-detail-03.webp` |
| Venetian | `venetian-main.webp` | `venetian-detail-01.webp` | `venetian-detail-02.webp` | `venetian-detail-03.webp` |

## Curtains — folder `public/images/curtains/`

| Category | Main / hero | Room setting | Fabric close-up | Finishing detail |
|---|---|---|---|---|
| Sheer | `sheer-curtains.webp` | `sheer-curtains-gallery-01.webp` | `sheer-curtains-gallery-02.webp` | `sheer-curtains-gallery-03.webp` |
| Blockout | `blockout-curtains.webp` | `blockout-curtains-gallery-01.webp` | `blockout-curtains-gallery-02.webp` | `blockout-curtains-gallery-03.webp` |
| Layered | `layered-curtains.webp` | `layered-curtains-gallery-01.webp` | `layered-curtains-gallery-02.webp` | `layered-curtains-gallery-03.webp` |

The dark heading-style sections use `sheer-curtains-detail.webp`, `blockout-curtains-detail.webp` and `layered-curtains-detail.webp`. The curtains overview uses `curtains-interior.webp` and `curtains-detail.webp`.

## Add your photographs

1. Use an actual WebP image (do not simply rename a JPG extension). Put it in the folder above with the matching name.
2. Run `npm.cmd run images` on Windows, or `npm run images`. Alternatively restart `npm run dev`, which refreshes the manifest automatically.
3. Reload the browser. Rebuild/redeploy when updating a production site.
4. Adjust descriptions, source/permission records and crop positions in `content/images.ts` (blinds), `content/curtains.ts` (curtain main images) or `content/curtain-images.ts` (curtain galleries).

Prefer 2000–2400px-wide room photos for heroes and at least 1200px-wide gallery images. Leave room around the subject for responsive crops. The layout automatically preserves the image slot dimensions.

JPG/PNG can also be used by updating the corresponding path in the central configuration. No component edits are necessary. For new custom images, update alt text to describe the photograph accurately and remove illustration-specific captions before launch. Only label photographs as completed projects when they actually show your work.

The shared gallery layout lives in `components/sections/CategoryImages.tsx`. Original room/detail placeholders can be regenerated with `node scripts/create-detail-placeholders.mjs`.
