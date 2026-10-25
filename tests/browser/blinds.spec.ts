import { test, expect } from '@playwright/test';
test('blinds collection layout, comparisons, FAQs and enquiry links', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    expect((await page.goto('/blinds'))?.status()).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390 || width === 1440) {
      for (const image of await page.locator('main img').all()) { await image.scrollIntoViewIfNeeded(); await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0); }
      await page.screenshot({ path: `test-results/blinds-collection-${width}.png`, fullPage: true });
    }
  }
  await page.getByRole('link', { name: 'Compare the Styles' }).click(); await expect(page).toHaveURL(/#compare-styles$/);
  await page.locator('summary').first().click(); await expect(page.locator('details').first()).toHaveAttribute('open', '');
  for (const name of ['Roller', 'Roman', 'Venetian']) {
    await page.getByRole('link', { name: `Enquire about ${name} Blinds`, exact: true }).click();
    await expect(page.getByLabel('What are you interested in?')).toHaveValue(`${name.toLowerCase()}-blinds`);
    await page.goto('/blinds');
  }
  await page.getByRole('link', { name: 'Discover Curtains', exact: true }).click(); await expect(page).toHaveURL(/\/curtains$/);
});
