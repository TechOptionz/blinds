import { test, expect } from '@playwright/test';
test('curtain collection and detail pages connect correctly and fit all viewports', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    for (const path of ['/curtains', '/curtains/sheer-curtains', '/curtains/blockout-curtains', '/curtains/layered-curtains']) {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}`).toBe(true);
    }
  }
  for (const name of ['Sheer', 'Blockout', 'Layered']) {
    await page.goto('/curtains');
    await page.locator('.curtain-category-copy').getByRole('link', { name: `Explore ${name} Curtains`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp('/curtains/' + name.toLowerCase() + '-curtains$'));
    await page.getByRole('link', { name: `Enquire About ${name} Curtains` }).first().click();
    await expect(page.getByLabel('What are you interested in?')).toHaveValue(name.toLowerCase() + '-curtains');
  }
  expect((await page.goto('/curtains/unknown-style'))?.status()).toBe(404);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height:950 });
    for (const path of ['/curtains', '/curtains/sheer-curtains']) {
      await page.goto(path);
      for (const img of await page.locator('main img').all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0); }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path:`test-results/curtains-${path.split('/').pop()}-${width}.png`, fullPage:true });
    }
  }
});
