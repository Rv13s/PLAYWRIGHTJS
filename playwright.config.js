// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig({
const config = ({
  testDir: './tests', //what test run
  timeout:30*1000, // Applicable for every test
  expect : {timeout:5000}, // applicable for assertions only
  reporter : 'html', 
  
  
  use: {
    launchOptions : {slowMo:1000},
    browserName:'firefox', //what browser
    headless: true,
    screeshot : 'on',
    trace : 'retain-on-failure'
    
    //slowMo:1000,
  
  },

});

module.exports = config //export default defineConfig({
