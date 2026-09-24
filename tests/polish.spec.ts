import { test, expect } from "@playwright/test";

test("production hydration and interactions emit no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("./?intent=site", { waitUntil: "networkidle" });
  await expect(page.locator('input[value="site"]')).toBeChecked();
  await page.locator("#servizi").scrollIntoViewIfNeeded();
  await page.locator(".service-row").first().click();
  await expect(page.locator("#service-0")).toBeVisible();
  await page
    .getByRole("button", { name: "Quanto costa un sito?", exact: true })
    .click();
  await expect(page.locator("#faq-answer-0")).toBeVisible();
  expect(errors).toEqual([]);
});

test("visual emphasis preserves the approved copy for all six intents", async ({
  page,
}) => {
  for (const [intent, expected] of Object.entries({
    site: "Il tuo sito.Un nuovoinizio.",
    "ai-app": "La tua app.L’AI, al tuoservizio.",
    iot: "Dispositivi.Connessi eintelligenti.",
    ecommerce: "Il tuo negozio.Ancheonline.",
    booking: "Meno passaggi.Più tempoper te.",
    other: "La tua idea.Il prossimopasso.",
  })) {
    await page.goto(`./?intent=${intent}`);
    await expect(page.locator(`.hero input[value="${intent}"]`)).toBeChecked();
    const actual = (await page.locator("h1").textContent())!
      .replace(/\s+/g, "")
      .replace(/v\d+\.\d+\.\d+/g, "vVERSION");
    expect(actual, intent).toBe(expected.replace(/\s+/g, ""));
  }
});

test("motion respects preference changes; 3D assets load; closed disclosures are inert", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator(".service-row").first()).toBeEnabled();
  const services = page.locator("#servizi");
  await services.scrollIntoViewIfNeeded();
  for (const image of await services.locator("img").all()) {
    await image.evaluate((el: HTMLImageElement) => {
      el.loading = "eager";
    });
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator("#service-0")).toHaveAttribute("inert", "");
  await page.locator(".service-row").first().click();
  await expect(page.locator("#service-0")).not.toHaveAttribute("inert", "");
  expect(
    await page
      .locator(".signature-route path")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await expect(page.locator(".faq-list")).toHaveClass(/is-revealed/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => page.locator(".reveal-ready:not(.is-revealed)").count())
    .toBe(0);
});
