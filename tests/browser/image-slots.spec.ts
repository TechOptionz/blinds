import { test, expect } from '@playwright/test';
test('all six categories have three loaded image slots on mobile and desktop', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height:950 });
    for (const path of ['/blinds/roller-blinds', '/blinds/roman-blinds', '/blinds/venetian-blinds', '/curtains/sheer-curtains', '/curtains/blockout-curtains', '/curtains/layered-curtains']) {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('.category-image-grid figure')).toHaveCount(3);
      for (const image of await page.locator('.category-image img').all()) { await image.scrollIntoViewIfNeeded(); await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0); }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.locator('.category-images').screenshot({ path: `test-results/category-image-slots-${width}.png` });
  }
});
