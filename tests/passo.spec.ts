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

test("six services, payment terms and prices agree; rails support keyboard navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator(".service-poster")).toHaveCount(6);
  await expect(page.locator(".price-package")).toHaveCount(6);
  const prices = ["1.200", "4.500", "8.500", "7.500", "10.000", "10.000"];
  for (const [i, price] of prices.entries()) {
    await expect(page.locator(".service-from").nth(i)).toContainText(price);
    await expect(page.locator(".package-price p").nth(i)).toContainText(price);
  }
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

test("gallery pauses, counters finish, and no image is broken across the page", async ({
  page,
}) => {
  await page.goto("./");
  await page.locator(".project-gallery").first().scrollIntoViewIfNeeded();
  await page
    .getByRole("button", { name: "Metti in pausa la galleria" })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: "Riprendi la galleria" }),
  ).toBeVisible();
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
