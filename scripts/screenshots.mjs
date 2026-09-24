import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const baseURL = process.env.QA_URL || "http://localhost:3000";
const pass = process.env.QA_PASS || "final";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  headless: true,
});
const viewports = process.env.QA_QUICK
  ? [[390, 844]]
  : [
      [375, 812],
      [390, 844],
      [430, 932],
      [768, 1024],
      [1280, 800],
      [1440, 900],
    ];
await mkdir(`qa/${pass}`, { recursive: true });
const results = [];
for (const [width, height] of viewports) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(baseURL, { waitUntil: "networkidle", timeout: 120000 });
  await expect(
    page.getByRole("button", { name: "Preventivo", exact: true }).first(),
  ).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (image) => {
        image.loading = "eager";
        await image.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({
    caret: "initial",
    path: `qa/${pass}/${width}-full.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `qa/${pass}/${width}-hero.png`,
    caret: "initial",
  });
  const sections = await page.locator("main > section").evaluateAll((nodes) =>
    nodes.map((node) => ({
      id: node.id || node.className,
      height: Math.round(node.getBoundingClientRect().height),
    })),
  );
  const overflow = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    offenders: [...document.querySelectorAll("body *")]
      .filter(
        (el) =>
          !el.closest(".rail-track,.call-window-stage") &&
          el.getBoundingClientRect().right > innerWidth + 1,
      )
      .map((el) => el.tagName + "." + el.className)
      .slice(0, 10),
  }));
  if (width === 390 || width === 1440) {
    for (const id of [
      "inizio",
      "lavori",
      "approccio",
      "servizi",
      "parliamone",
      "prezzi",
      "faq",
      "preventivo",
    ])
      await page
        .locator(`#${id}`)
        .screenshot({
          path: `qa/${pass}/${width}-${id}.png`,
          caret: "initial",
        });
    for (const name of ["process", "payment"])
      await page
        .locator(`.${name}`)
        .screenshot({
          path: `qa/${pass}/${width}-${name}.png`,
          caret: "initial",
        });
    await page
      .getByRole("button", { name: "Preventivo", exact: true })
      .first()
      .click();
    await page.getByRole("dialog").waitFor();
    await page.screenshot({ path: `qa/${pass}/${width}-quote.png` });
  }
  results.push({ width, height, overflow, errors, sections });
  await page.close();
}
await writeFile(
  `qa/${pass}/measurements.json`,
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
