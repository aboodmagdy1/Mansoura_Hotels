import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

// the testing flow
// 1) navigate to the page
// 2)click on stuffs on the screen
//3) check any data you want to know about them

test("should allow the user to sign in ", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  //check if the form exists
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  // fill data(data in E2E database not the real DB)
  await page.locator('[name="email"]').fill("admin@gmail.com");
  await page.locator('[name="password"]').fill("adminpass");

  await page.getByRole("button", { name: "Login" }).click();

  //assertion after login
  await expect(page.getByText("logged in successfuly")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  //make a random email to make tests run every time i make test (email is unique)
  const randomEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@gmail.com`;
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Register Now!" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test");
  await page.locator("[name=lastName]").fill("tt");
  await page.locator("[name=email]").fill(randomEmail);
  await page.locator("[name=password]").fill("testpass");
  await page.locator("[name=confirmPassword]").fill("testpass");

  await page.getByRole("button", { name: "Create Account" }).click();

  //after the register
  await expect(page.getByText("Registeration successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
