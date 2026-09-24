import { test, expect } from "@playwright/test";
import path from "node:path";

test("query intent, persistence, invalid query and radio keyboard navigation", async ({
  page,
}) => {
  await page.goto("./?intent=ecommerce");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Il tuo negozio.",
  );
  await expect(page.locator('input[value="ecommerce"]')).toBeChecked();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.reload();
  await expect(page.locator('input[value="ecommerce"]')).toBeChecked();
  await page.goto("./?intent=invalid");
  await expect(page.locator('input[value="ecommerce"]')).toBeChecked();
  await page.locator('input[value="ecommerce"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('input[value="booking"]')).toBeChecked();
  await expect(page).toHaveURL(/intent=booking/);
  await page
    .getByRole("button", { name: "Preventivo", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Cosa vorresti ottenere?" }),
  ).toBeVisible();
});

test("full quote flow, validation, back navigation, focus containment and demo success", async ({
  page,
}) => {
  await page.goto("./");
  const opener = page
    .getByRole("button", { name: "Preventivo", exact: true })
    .first();
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Cosa vuoi realizzare?" }),
  ).toBeVisible();
  await page.getByLabel("Un sito", { exact: true }).check();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await page
    .getByLabel("Descrivi il progetto")
    .fill("Vorrei rinnovare il sito della mia attività.");
  await page.getByText("Sì", { exact: true }).click();
  await page.getByLabel(/Indirizzo del sito/).fill("https://example.com");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Torna allo step precedente" })
    .click();
  await expect(page.getByLabel("Descrivi il progetto")).toHaveValue(
    "Vorrei rinnovare il sito della mia attività.",
  );
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Richiedi il preventivo", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Dove possiamo ricontattarti?" }),
  ).toBeVisible();
  await page.getByLabel("Nome", { exact: true }).fill("Persona Test");
  await page.getByLabel("Attività / Azienda").fill("Attività di prova");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBeTruthy();
  }
  await expect(page.getByText(/Modalità demo/)).toBeVisible();
  await page
    .getByRole("button", { name: "Richiedi il preventivo", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Richiesta ricevuta." }),
  ).toBeVisible();
  await expect(page.getByText(/nessuna richiesta inviata/)).toBeVisible();
  await page.screenshot({ path: "qa/final/390-success.png" });
  await page.getByRole("button", { name: "Vedi i nostri lavori" }).click();
  await expect(dialog).toHaveCount(0);
  await opener.click();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("menu, service disclosures, FAQ, carousel and price selection", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Apri menu" }).click();
  await page
    .getByRole("navigation", { name: "Menu", exact: true })
    .getByRole("link", { name: "Servizi" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const service = page.locator(".service-row").first();
  await expect(service).toHaveAttribute("aria-expanded", "false");
  await service.click();
  await expect(service).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("button", { name: "Quanto costa un sito?", exact: true })
    .click();
  await expect(page.locator("#faq-answer-0")).toBeVisible();
  await page
    .getByRole("button", { name: "Devo pagare un canone?", exact: true })
    .click();
  await expect(page.locator("#faq-answer-0")).toBeHidden();
  await expect(page.locator("#faq-answer-1")).toBeVisible();
  const gallery = page.getByRole("region", {
    name: "Galleria florame.ai",
  });
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => gallery.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  await expect(gallery.locator('img[src*="florame-fiorista"]')).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Richiedi un preventivo per E-commerce",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Cosa vorresti ottenere?" }),
  ).toBeVisible();
});

test("accessibility: page and every funnel step", async ({ page }) => {
  await page.goto("./");
  await page.addScriptTag({
    path: path.resolve("node_modules/axe-core/axe.min.js"),
  });
  async function audit() {
    // Audit the resting UI, not an intermediate opacity frame during a transition.
    await page.evaluate(async () => {
      await Promise.all(
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.playState === "running" &&
              animation.effect?.getComputedTiming().iterations !== Infinity,
          )
          .map((animation) => animation.finished.catch(() => {})),
      );
    });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (
              options: object,
            ) => Promise<{ violations: { id: string; nodes: unknown[] }[] }>;
          };
        }
      ).axe;
      return (
        await axe.run({
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        })
      ).violations;
    });
    expect(violations).toEqual([]);
  }
  await audit();
  await page
    .getByRole("button", { name: "Preventivo", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await audit();
  await page.getByLabel("Un sito", { exact: true }).check();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Cosa vorresti ottenere?" }),
  ).toBeVisible();
  await audit();
  await page
    .getByLabel("Descrivi il progetto")
    .fill("Un progetto da realizzare per il mio business.");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Continua", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Dove possiamo ricontattarti?" }),
  ).toBeVisible();
  await audit();
});

test("every intent fits each requested viewport and storage is optional", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage unavailable");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.goto("./?intent=site");
  await expect(
    page.getByRole("button", { name: "Preventivo", exact: true }).first(),
  ).toBeEnabled();
  for (const [width, height] of [
    [375, 812],
    [390, 844],
    [430, 932],
    [768, 1024],
    [1280, 800],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    for (const intent of [
      "site",
      "ai-app",
      "iot",
      "ecommerce",
      "booking",
      "other",
    ]) {
      await page.locator(`.hero input[value="${intent}"]`).check();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      const lines = await page.locator("h1>span").evaluateAll((spans) =>
        spans.map((span) => {
          // Measure text fragments, excluding the inline-block underline wrapper.
          const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT);
          const baselines: number[] = [];
          while (walker.nextNode()) {
            const range = document.createRange();
            range.selectNodeContents(walker.currentNode);
            for (const rect of range.getClientRects()) {
              if (
                !baselines.some((bottom) => Math.abs(bottom - rect.bottom) < 4)
              )
                baselines.push(rect.bottom);
            }
          }
          return baselines.length;
        }),
      );
      expect(lines, `${width}px ${intent}: unexpected heading wrap`).toEqual([
        1, 1, 1,
      ]);
    }
  }
});
