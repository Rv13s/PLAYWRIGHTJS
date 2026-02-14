// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig({
const config = ({
  testDir: './tests', //what test run
  timeout: 30 * 1000, // Applicable for every test
  expect: { timeout: 5000 }, // applicable for assertions only
  reporter: 'html',

  projects: [

    {

      name: 'chromium',
      use: {
        launchOptions: { slowMo: 1000 },
        browserName: 'chromium', //what browser
        headless: true,
        screeshot: 'on',
        trace: 'retain-on-failure',
        viewport : {width:720, height : 1920}

        //slowMo:1000,

      }
    },
    {

      name: 'webkit',
      use: {
        launchOptions: { slowMo: 1000 },
        browserName: 'webkit', //what browser
        headless: true,
        screeshot: 'on',
        trace: 'retain-on-failure',
        ...devices['iPhone 15 Pro Max']

        //slowMo:1000,

      },

    }, {
      name: 'firefox',
      use: {
        launchOptions: { slowMo: 1000 },
        browserName: 'firefox', //what browser
        headless: true,
        screeshot: 'on',
        trace: 'retain-on-failure'

        //slowMo:1000,

      },

    }

  ],



});

module.exports = config //export default defineConfig({
