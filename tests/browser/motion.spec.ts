import { test, expect } from '@playwright/test';
test('cursor feedback, scroll motion and navigation work without obstructing controls', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width:1440,height:950 });
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.goto('/blinds');
  await expect(page.locator('.cursor-feedback')).toHaveCount(0);
  await page.locator('.blind-planning').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.reading-progress').evaluate(el => getComputedStyle(el).transform)).not.toBe('matrix(0, 0, 0, 1, 0, 0)');
  await page.getByRole('link',{name:'Discover Curtains',exact:true}).click();
  await expect(page).toHaveURL(/curtains$/);
  await page.locator('.curtain-category-copy .link-button').first().hover();
  await page.locator('.curtain-category-copy .link-button').first().click();
  await expect(page).toHaveURL(/sheer-curtains$/);
  await page.getByRole('link',{name:'Enquire About Sheer Curtains'}).first().click();
  await page.getByLabel('Your name').hover();
  expect(errors).toEqual([]);
});
test('reduced motion and touch keep decorative cursor disabled', async ({ page, browser }) => {
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/');
  await page.mouse.move(300,300); await expect(page.locator('.cursor-feedback')).toBeHidden(); await expect(page.locator('.reading-progress')).toBeHidden();
  await expect(page.locator('h1')).toBeVisible();
  const context = await browser.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
  const mobile = await context.newPage(); await mobile.goto('http://localhost:3000/curtains');
  await expect(mobile.locator('.cursor-feedback')).toBeHidden();
  await mobile.getByRole('button',{name:'Menu',exact:true}).tap(); await expect(mobile.locator('#site-menu')).toBeVisible();
  await context.close();
});
