import { test, expect } from '@playwright/test';
const routes = ['/curtains/sheer-curtains', '/curtains/blockout-curtains', '/curtains/layered-curtains', '/', '/curtains', '/blinds', '/blinds/roller-blinds', '/blinds/roman-blinds', '/blinds/venetian-blinds', '/gallery', '/about', '/contact'];
test('all pages and image assets load, links are valid, no browser errors', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route); expect(response?.status()).toBe(200); await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    const hrefs = await page.locator('a[href^="/"]').evaluateAll(links => links.map(a => a.getAttribute('href')!.split('?')[0]));
    expect(hrefs.every(href => routes.includes(href))).toBe(true);
  }
  expect(errors).toEqual([]);
  expect((await page.goto('/blinds/not-a-product'))?.status()).toBe(404);
});
test('responsive layouts and screenshot review artifacts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of routes) {
      await page.goto(route); await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at ${width}px`).toBe(true);
    }
    await page.goto('/');
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
  }
});
test('mobile menu traps focus, locks scroll, closes on Escape and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Menu', exact: true }); await trigger.click();
  const menu = page.getByRole('dialog', { name: 'Main menu' }); await expect(menu).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
  for (let i = 0; i < 9; i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true); }
  await page.keyboard.press('Escape'); await expect(menu).not.toBeVisible(); await expect(trigger).toBeFocused();
  await trigger.click(); await menu.locator('a[href="/gallery"]').click(); await expect(page).toHaveURL(/gallery/); await expect(menu).not.toBeVisible();
});
test('gallery filters and lightbox keyboard controls', async ({ page }) => {
  await page.goto('/gallery'); await page.getByRole('button', { name: 'roman' }).click(); await expect(page.locator('.gallery-tile')).toHaveCount(2);
  await page.locator('.gallery-tile').first().click(); const box = page.getByRole('dialog', { name: 'Inspiration image viewer' }); await expect(box).toBeVisible();
  await expect(box.locator('.lightbox-bottom')).toContainText('1 / 2'); await page.keyboard.press('ArrowRight'); await expect(box.locator('.lightbox-bottom')).toContainText('2 / 2');
  await page.keyboard.press('ArrowRight'); await expect(box.locator('.lightbox-bottom')).toContainText('1 / 2'); await page.keyboard.press('ArrowLeft'); await expect(box.locator('.lightbox-bottom')).toContainText('2 / 2');
  await page.keyboard.press('Escape'); await expect(box).not.toBeVisible(); await expect(page.locator('.gallery-tile').first()).toBeFocused();
});
test('product enquiry is preselected and unconfigured delivery is honest', async ({ page }) => {
  await page.goto('/blinds/roman-blinds'); await page.getByRole('link', { name: 'Enquire About Roman Blinds' }).first().click();
  await expect(page.getByLabel('What are you interested in?')).toHaveValue('roman-blinds');
  await expect(page.getByRole('button', { name: 'Send Enquiry' })).toBeDisabled(); await expect(page.getByText('Online enquiries are not available yet.', { exact: false })).toBeVisible();
});
test('inner-page screenshots, text zoom and no-JavaScript content', async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of ['/gallery', '/about', '/contact', '/blinds/roman-blinds']) {
      await page.goto(route); await page.screenshot({ path: `test-results/${route.replaceAll('/', '-')}-${width}.png`, fullPage: true });
    }
  }
  await page.goto('/'); await page.screenshot({ path: 'test-results/hero-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 }); await page.screenshot({ path: 'test-results/hero-mobile.png' });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const noJs = await browser.newContext({ javaScriptEnabled: false }); const staticPage = await noJs.newPage(); await staticPage.goto('/'); await expect(staticPage.locator('h1')).toBeVisible(); await expect(staticPage.getByRole('heading', { name: 'Light changes everything.' })).toBeVisible(); await noJs.close();
});
