import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Real mobile pages, captured without browser/device chrome or fabricated UI.
const shots = [
  ["florame-01", "https://florame.ai/"],
  ["florame-hub", "https://hub.florame.ai/demo"],
  ["florame-fiorista", "https://florame.ai/pages/fiori-nino"],
  ["florame-02", "https://florame.ai/pages/florame-ai-landing"],
  ["1719-01", "https://1719urbanbistrot.it/"],
  ["1719-02", "https://1719urbanbistrot.it/", "menu"],
];
await mkdir("public/projects/mobile", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
});
try {
  for (const [name, url, section] of shots) {
    if (process.env.CAPTURE_PROJECT && !process.env.CAPTURE_PROJECT.split(",").includes(name)) continue;
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.evaluate(() => Promise.race([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 5000)),
      ]));
      // Public pages load consent and storefront data after initial rendering.
      await page.waitForTimeout(12000);
      const reject = page.getByRole("button", { name: "Rifiuta tutti", exact: true });
      if (await reject.isVisible()) await reject.click();
      if (section === "menu") {
        await page.getByRole("link", { name: /Vai al men[uù]/i }).click();
      }
      await page.waitForTimeout(2000);
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.race([new Promise(resolve => setTimeout(resolve, 8000)), Promise.all(images.filter((image) => {
          const box = image.getBoundingClientRect();
          return box.top < innerHeight && box.bottom > 0;
        }).map((image) => image.decode().catch(() => {})))]);
      });
      const buffer = await page.screenshot({ animations: "disabled" });
      await sharp(buffer).webp({ quality: 86 }).toFile(`public/projects/mobile/${name}.webp`);
      for (const width of [480, 768, 1440]) {
        await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality: 83 })
          .toFile(`public/projects/mobile/${name}-${width}.webp`);
      }
      console.log(`${name}: ${page.url()} — ${await page.title()}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
