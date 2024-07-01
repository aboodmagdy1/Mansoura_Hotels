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

test("Should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test City");
  // fill date to make sure there will be a n of nights to book
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 3);
  const formatedDate = newDate.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formatedDate);

  //search
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel Name Updated").click();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost : $300.00")).toBeVisible(); // will not change 3 nights and the price is constatnt

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");

  await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/28");
  await stripeFrame.locator('[placeholder="CVC"]').fill("888");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("22222");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Test Hotel Name Updated")).toBeVisible();
});
