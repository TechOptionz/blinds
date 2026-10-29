import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests/browser', timeout: 90000, workers: 1, use: { baseURL: 'http://localhost:3000', channel: 'msedge', headless: true, screenshot: 'only-on-failure' }, reporter: 'list' });
