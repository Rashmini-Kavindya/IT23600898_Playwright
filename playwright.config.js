// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* GitHub Actions වලදී පෝලිමට ටෙස්ට් දුවන්න (Stable වෙන්න) */
  fullyParallel: false, 

  /* 'test.only' අමතක වෙලා දාලා තිබ්බොත් CI එකේදී fail කරන්න */
  forbidOnly: !!process.env.CI,

  /* එක පාරක් fail වුණොත් තව 2 පාරක් try කරන්න (Network errors නිසා වෙන වැරදි මකාගන්න) */
  retries: process.env.CI ? 2 : 0,

  /* CI එකේදී එක Worker එකක් පමණක් පාවිච්චි කරන්න */
  workers: process.env.CI ? 1 : undefined,

  /* Report එක HTML විදියට බලන්න */
  reporter: 'html',

  use: {
    /* ටෙස්ට් එකක් fail වුණොත් විතරක් screenshot එකක් ගන්න */
    screenshot: 'only-on-failure',

    /* Fail වුණොත් විතරක් වීඩියෝ එකක් (trace) ගන්න */
    trace: 'on-first-retry',

    /* Browser එක headless mode එකේ දුවන්න (GitHub වලට අනිවාර්යයි) */
    headless: true,
  },

  /* අපි දැනට Chrome (Chromium) විතරක් පාවිච්චි කරමු */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});