import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000');
  await page.locator('#approach').screenshot({ path: 'test-results/approach-redesign.png' });
  await page.goto('http://localhost:3000/blinds');
  await page.screenshot({ path: 'test-results/collection-redesign.png' });
  await page.locator('.collection-index a').first().click();
  if (!(await page.evaluate(() => location.hash === '#roller-blinds'))) throw new Error('Collection navigation did not reach the product');
} finally { await browser.close(); }
