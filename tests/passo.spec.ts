import { test, expect } from "@playwright/test";

test("project starter validates and carries service and brief into the contact step", async ({
  page,
}) => {
  await page.goto("./");
  const form = page.locator("#form");
  await form.getByRole("button", { name: "Continua" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await form.getByLabel("Web app AI", { exact: true }).check();
  await form
    .getByLabel("Cosa vorresti ottenere?")
    .fill("Un assistente per cercare informazioni nei documenti aziendali.");
  await form.getByRole("button", { name: "Continua" }).click();
  await expect(
    page.getByRole("heading", { name: "Dove possiamo ricontattarti?" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Torna allo step precedente" })
    .click();
  await expect(page.getByLabel("Descrivi il progetto")).toHaveValue(
    "Un assistente per cercare informazioni nei documenti aziendali.",
  );
  await page.keyboard.press("Escape");
  await expect(form.getByRole("button", { name: "Continua" })).toBeFocused();
});

test("seven services, six stated prices and payment terms agree; rails support keyboard navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator(".service-poster")).toHaveCount(7);
  await expect(page.locator(".price-package")).toHaveCount(6);
  const prices = ["1.200", "4.500", "8.500", "7.500", "10.000", "10.000"];
  for (const [i, price] of prices.entries()) {
    await expect(page.locator(".service-from").nth(i)).toContainText(price);
    await expect(page.locator(".package-price p").nth(i)).toContainText(price);
  }
  await expect(page.locator(".service-poster").last()).toContainText(
    "Tanto altro",
  );
  await expect(page.locator(".service-poster").last()).toContainText(
    "Su misura",
  );
  const rail = page.getByRole("region", { name: "Servizi", exact: true });
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.locator(".service-collection .rail-progress"),
  ).toContainText("02");
  await page
    .getByRole("button", { name: "Successivo: Servizi", exact: true })
    .click();
  await expect(
    page.locator(".service-collection .rail-progress"),
  ).toContainText("03");
  await expect(page.locator(".payment-stages li").nth(0)).toContainText(
    "30%Per iniziare",
  );
  await expect(page.locator(".payment-stages li").nth(1)).toContainText(
    "20%Alla prima revisione",
  );
  await expect(page.locator(".payment-stages li").nth(2)).toContainText(
    "50%All’approvazione finale",
  );
});

test("gallery stays clean, counters finish, and no image is broken across the page", async ({
  page,
}) => {
  await page.goto("./");
  await page.locator(".project-gallery").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".project-gallery .rail-controls")).toHaveCount(0);
  await expect(page.locator(".carousel-controls")).toHaveCount(0);
  await expect(
    page.locator(".project-gallery").first().locator(".project-slide"),
  ).toHaveCount(4);
  await expect(page.locator(".project-watermark")).toHaveCount(2);
  await expect(page.locator(".case-study")).toHaveCount(0);
  await expect(page.locator("#lavori .eyebrow").first()).toHaveText(
    "I nostri progetti",
  );
  await expect(page.locator(".project-copy h3").first()).toContainText(
    "florame.ai",
  );
  for (const [i, value] of [30, 20, 50].entries()) {
    const counter = page.locator(".counter").nth(i);
    await counter.scrollIntoViewIfNeeded();
    await expect(counter.locator('[aria-hidden="true"]')).toHaveText(
      `${value}%`,
    );
  }
  const broken = await page.locator("img").evaluateAll(async (elements) => {
    const images = elements as HTMLImageElement[];
    await Promise.all(
      images.map(async (image) => {
        image.loading = "eager";
        await image.decode().catch(() => {});
      }),
    );
    return images
      .filter((image) => !image.complete || !image.naturalWidth)
      .map((image) => image.src);
  });
  expect(broken).toEqual([]);
});

test("legacy redesign links select Sito and AI intents carry through the funnel", async ({
  page,
}) => {
  await page.goto("./?intent=redesign");
  await expect(page.locator('.hero input[value="site"]')).toBeChecked();
  await expect(page.locator('.hero input[value="redesign"]')).toHaveCount(0);
  for (const intent of ["ai-app", "iot"]) {
    await page.goto(`./?intent=${intent}`);
    await expect(page.locator(`.hero input[value="${intent}"]`)).toBeChecked();
    await page
      .getByRole("button", { name: "Preventivo", exact: true })
      .first()
      .click();
    await expect(
      page.getByRole("heading", { name: "Cosa vorresti ottenere?" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  }
});

test("portfolio supports mouse dragging without opening project links", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const rail = page.getByRole("region", {
    name: "Galleria florame.ai",
    exact: true,
  });
  await rail.scrollIntoViewIfNeeded();
  const bounds = (await rail.boundingBox())!;
  const popups: unknown[] = [];
  page.on("popup", (popup) => popups.push(popup));
  await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + 90);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 25, bounds.y + 90, { steps: 12 });
  await page.mouse.up();
  await expect
    .poll(() => rail.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  expect(popups).toHaveLength(0);
  await expect(page.locator("#work-heading")).toHaveText(
    /Cosa abbiamo già\s*costruito quest’anno\./,
    { useInnerText: false },
  );
});

test("portfolio stops after manual scrolling and resumes after ten seconds", async ({ page }) => {
  test.setTimeout(35_000);
  await page.goto("./");
  const rail = page.getByRole("region", { name: "Galleria florame.ai" });
  await rail.scrollIntoViewIfNeeded();
  await expect.poll(() => rail.evaluate((el) => el.scrollLeft), { timeout: 7000 }).toBeGreaterThan(100);
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => rail.evaluate((el) => el.scrollLeft)).toBeGreaterThan(400);
  await page.waitForTimeout(3800);
  const stopped = await rail.evaluate((el) => el.scrollLeft);
  await page.waitForTimeout(1200);
  expect(Math.abs((await rail.evaluate((el) => el.scrollLeft)) - stopped)).toBeLessThan(3);
  await expect.poll(() => rail.evaluate((el) => el.scrollLeft), { timeout: 8500 }).toBeGreaterThan(stopped + 100);
});
