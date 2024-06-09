import { expect, test } from "@playwright/test";
import path from "path";
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

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel Name");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
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

test("should display  hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await expect(page.getByText("Test Hotel Name")).toBeVisible();
  await expect(page.getByText("Test City,Test Country")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("100 per night")).toBeVisible();
  await expect(page.getByText("2 adults,2 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel ", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).click();
  await page.waitForSelector('[name="name"]', { state: "attached" }); // waint untill it loaded in to the dom
  await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel Name");
  await page.locator('[name="name"]').fill("Test Hotel Name Updated");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();
  // check after edit
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Test Hotel Name Updated"
  );

  // fill with the original one  to make it pass
  await page.locator('[name="name"]').fill("Test Hotel Name");
});
