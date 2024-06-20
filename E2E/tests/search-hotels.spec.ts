import { expect, test } from "@playwright/test";
const UI_URL = "http://localhost:5173";

// sign in before each request
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name='email']").fill("admin@gmail.com");
  await page.locator("[name='password']").fill("adminpass");

  await page.getByRole("button", { name: "LogIn" }).click();

  await expect(page.getByText("logged in successfuly")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("1 Hotels foundin Test City")).toBeVisible();
  await expect(page.getByText("Test Hotel Name Updated")).toBeVisible();
});

test("Should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel Name Updated").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});
