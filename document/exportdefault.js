// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/UIBasics.spec.js', //what test run
  timeout:40*1000, // Applicable for every test
  expect : {timeout:30000}, // applicable for assertions only
  reporter : 'html', 
  use: {
    browserName:'chromium', //what browser
  },

 
});
