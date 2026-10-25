# Verification — 24 October 2026

Tested the production Next.js build locally in headless Microsoft Edge on Windows.

## Passed

- `npm run lint`: no errors or warnings.
- `npx tsc --noEmit`: no type errors.
- `npm run build`: successful production build; all requested routes generated.
- `npm test`: 3 tests passed. Shared input validation, missing-delivery rejection, cross-origin rejection, mocked provider acceptance/failure/missing receipt, and durable-rate-limit rejection.
- Playwright: 6 browser tests passed (five in the full run, then the added screenshot/no-JavaScript test in a targeted run).
- All eight requested pages return 200; an unknown product returns 404.
- Visible image assets load; internal links resolve to implemented routes; no page runtime errors encountered.
- All pages checked for horizontal overflow at 360, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels: none detected.
- Mobile menu opens, locks body scroll, wraps keyboard focus, closes on Escape, restores focus and navigates.
- Gallery filters return the expected items; lightbox next/previous wraps correctly, Escape closes it and focus returns to the opening tile.
- Product enquiry links preselect the form; unconfigured form visibly explains its status and cannot send.
- Reduced-motion screenshots, 200% root text size overflow check and no-JavaScript homepage content check pass.
- Reviewed desktop/mobile homepage screenshots and contact/product inner-page screenshots for layout and type hierarchy.

The first browser run exposed a modal focus-wrap issue, which was fixed and retested. Its image check was also corrected to bring lazy-loaded images into view before checking readiness.

## Review artifacts

Current screenshots in `test-results/` include:

- `hero-desktop.png`
- `hero-mobile.png`
- `-contact-390.png`, `-contact-1440.png`
- `-gallery-390.png`, `-gallery-1440.png`
- `-about-390.png`, `-about-1440.png`
- `-blinds-roman-blinds-390.png`, `-blinds-roman-blinds-1440.png`

Playwright clears its output directory at each run. The responsive test recreates full homepage screenshots at all eight widths when rerun.

## Limits and launch setup

Initial restricted-shell builds could not reach Google Fonts, and the TypeScript test loader hit a Windows sandbox account lookup restriction. The same build and tests passed with the required environment access.

Next.js warns that no public metadata base is set. This is expected until the owner configures `NEXT_PUBLIC_SITE_URL`; the site remains non-indexable in the meantime. The Open Graph image itself builds successfully.

No live email was sent: provider tests use mocks, and actual inbox delivery requires supplied Resend credentials, a verified sender and a production Redis rate limiter. No Lighthouse score, real-device performance result, Safari/Firefox compatibility test or actual hosting deployment is claimed. Swipe controls are implemented but were not exercised on a physical touch device. Final photographs, business details, domain and an approved privacy policy remain launch requirements.
