import { expect, test } from "@playwright/test";
import path from "node:path";
import { beforeEach } from "node:test";
const UI_URL = "http://localhost:5173";

// sign in before each request
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name='email']").fill("adminTest@gmail.com");
  await page.locator("[name='password']").fill("testpass");

  await page.getByRole("button", { name: "LogIn" }).click();

  await expect(page.getByText("logged in successfuly")).toBeVisible();
});

test("Should show admin dashboard and show details ", async ({ page }) => {
  await page.goto(UI_URL);
  await expect(
    page.getByRole("link", { name: "Admin Dashboard View" })
  ).toBeVisible();
  await expect(page.getByText("DB Hotels")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Test Hotel Name Updated" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Test Hotel Name Updated" }).click();
  await expect(page.getByText("Test Hotel Name Updated")).toBeVisible();
});

test("Should approve hotel  ", async ({ page }) => {
  await page.goto(UI_URL);
  await expect(
    page.getByRole("link", { name: "Admin Dashboard View" })
  ).toBeVisible();
  await expect(page.getByText("DB Hotels")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Test Hotel Name Updated" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Test Hotel Name Updated" }).click();
  await expect(page.getByText("Test Hotel Name Updated")).toBeVisible();
  await page.getByText("Settings").click();
  await expect(page.getByRole("button", { name: "Approve" })).toBeVisible();
  await page.getByRole("button", { name: "Approve" }).click();
  await expect(page.getByText("Approved")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pind" })).toBeVisible();
  await page.getByRole("button", { name: "Pind" }).click();
  await expect(page.getByText("Pending")).toBeVisible();
});

test.beforeEach(async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill("e2e testing");
  await page.locator('[name="city"]').fill("City");
  await page.locator('[name="country"]').fill("Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name='adultCount']").fill("2");
  await page.locator("[name='childCount']").fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "Images", "1.png"),
    path.join(__dirname, "Images", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotell added successfully")).toBeVisible();
});
// we must create a hotel before we can delete it
test("Should delete  hotel  ", async ({ page }) => {
  await page.goto(UI_URL);
  await expect(
    page.getByRole("link", { name: "Admin Dashboard View" })
  ).toBeVisible();
  await expect(page.getByText("DB Hotels")).toBeVisible();
  await expect(page.getByRole("link", { name: "e2e testing" })).toBeVisible();
  await page.getByRole("link", { name: "e2e testing" }).click();
  await expect(page.getByText("e2e testing")).toBeVisible();
  await page.getByText("Settings").click();
  await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Hotel Deleted Successfully")).toBeVisible();
});
