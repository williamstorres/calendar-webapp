import "dotenv/config";
import { test, expect } from "@playwright/test";
import { addHours, format } from "date-fns";
import { fakerES as faker } from "@faker-js/faker";

test.describe("Calendar Events", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_HOST!);
  });

  test("Create new event", async ({ page }) => {
    const today = faker.date.soon();
    const newEventName = faker.company.buzzPhrase();

    await page.getByRole("button", { name: "add event" }).click();

    await page.getByLabel("Titulo").fill(newEventName);
    await page.getByLabel("Ubicación").fill("Santi");
    await page.getByRole("listitem").first().click();

    await page.getByLabel("Descripción").fill(faker.lorem.paragraph());
    await page.getByLabel("Fecha").fill(format(today, "yyyy-MM-dd"));
    await page.getByLabel("Hora de inicio").fill(format(today, "hh:mm"));
    await page
      .getByLabel("Hora de termino")
      .fill(format(addHours(today, 1), "hh:mm"));

    await expect(page.getByRole("button", { name: "Guardar" })).toBeEnabled();
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(
      page.getByRole("button", { name: newEventName }).first(),
    ).toBeVisible();
  });

  test("Update title and date to an event", async ({ page }) => {
    const newDate = faker.date.soon();
    const newEventName = faker.company.buzzPhrase();
    await page.getByRole("button", { name: "Día" }).click();

    await page.waitForTimeout(2000);

    await page.getByTestId("event").first().click({ force: true });

    await page.getByRole("button", { name: "Editar" }).click();

    await page.getByLabel("Titulo").fill(newEventName);
    await page.getByLabel("Fecha").fill(format(newDate, "yyyy-MM-dd"));
    await page.getByLabel("Hora de inicio").fill(format(newDate, "hh:mm"));
    await page
      .getByLabel("Hora de termino")
      .fill(format(addHours(newDate, 1), "hh:mm"));

    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(
      page.getByRole("button", { name: newEventName }).first(),
    ).toBeVisible();
  });

  test("Delete event", async ({ page }) => {
    await page.getByRole("button", { name: "Día" }).click();

    await page.waitForTimeout(2000);

    await page.getByTestId("event").last().click();

    const eventName = await page.getByTestId("event-title").textContent();
    await page.getByRole("button", { name: "Eliminar" }).click();

    await expect(
      page.getByRole("button", { name: eventName! }),
    ).not.toBeAttached();
  });
});
