import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(3500);

// Hero
await page.screenshot({ path: 'screenshot-hero.png' });

// Wire animation (mid-animation)
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-wire-partial.png' });

// Wire animation fully connected
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-wire-connected.png' });

// Bars section
await page.evaluate(() => window.scrollTo(0, 1900));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-bars.png' });

// How we work
await page.evaluate(() => window.scrollTo(0, 2800));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-howwework.png' });

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
await page.screenshot({ path: 'screenshot-footer.png' });

await browser.close();
console.log('Done');
