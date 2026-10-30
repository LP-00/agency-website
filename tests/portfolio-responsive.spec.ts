import { test, expect } from "@playwright/test";

test("portfolio uses unframed mobile captures and logos align with project headings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".project-gallery").first().scrollIntoViewIfNeeded();
    for (const project of await page.locator(".project").all()) {
      const heading = await project.locator(".project-heading").boundingBox();
      const logo = await project.locator(".project-watermark").boundingBox();
      expect(Math.abs(heading!.y + heading!.height / 2 - logo!.y - logo!.height / 2)).toBeLessThan(2);
    }
    const screenshots = await page.locator(".project-gallery img").evaluateAll(async (images) => {
      return Promise.all((images as HTMLImageElement[]).map(async (image) => {
        await image.decode();
        const style = getComputedStyle(image);
        const frame = getComputedStyle(image.parentElement!);
        return {
          src: image.currentSrc,
          ratio: image.naturalWidth / image.naturalHeight,
          border: style.borderTopWidth,
          padding: frame.paddingTop,
        };
      }));
    });
    expect(screenshots).toHaveLength(6);
    for (const image of screenshots) {
      expect(image.src).toContain("/projects/mobile/");
      expect(image.ratio).toBeCloseTo(390 / 844, 2);
      expect(image.border).toBe("0px");
      expect(image.padding).toBe("0px");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test("vertical wheel scroll passes through service and price rails to the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    for (const label of ["Servizi", "Prezzi e soluzioni"]) {
      const rail = page.getByRole("region", { name: label, exact: true });
      await rail.scrollIntoViewIfNeeded();
      if (label === "Servizi") {
        await rail.getByRole("button", { name: "Ad esempio", exact: true }).first().click();
        await expect(rail.getByRole("button", { name: "Ad esempio", exact: true }).first()).toHaveAttribute("aria-expanded", "true");
      }
      const box = (await rail.boundingBox())!;
      await page.mouse.move(box.x + 100, Math.max(100, Math.min(600, box.y + 100)));
      const before = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, 300);
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 200);
      expect(await rail.evaluate(el => el.scrollTop)).toBe(0);
      // Horizontal navigation remains available while the vertical gesture belongs to the page.
      await rail.focus();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
    }
  }
});

test("a vertical finger swipe on each rail scrolls the page", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  try {
    await page.goto(baseURL!);
    const session = await context.newCDPSession(page);
    for (const label of ["Servizi", "Prezzi e soluzioni"]) {
      const rail = page.getByRole("region", { name: label, exact: true });
      await rail.scrollIntoViewIfNeeded();
      const box = (await rail.boundingBox())!;
      const startY = Math.min(650, Math.max(320, box.y + 350));
      const before = await page.evaluate(() => scrollY);
      await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 140, y: startY }] });
      for (let i = 1; i <= 8; i++) {
        await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 140, y: startY - i * 25 }] });
      }
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
      expect(await rail.evaluate(el => el.scrollTop)).toBe(0);
    }
  } finally {
    await context.close();
  }
});
