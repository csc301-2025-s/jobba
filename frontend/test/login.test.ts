import { test, expect } from "@playwright/test";

test.describe("Login Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000");
	});

	test("should display login button in homepage navbar and navigate to Google auth", async ({ page }) => {
		const loginButton = await page.locator('[data-testid="GoogleLogin"] >> nth=0');
		await expect(loginButton).toBeVisible();
		await loginButton.click();
		await page.waitForURL("**/accounts.google.com/**");
		const currentURL = page.url();
		expect(currentURL).toMatch(/https:\/\/accounts\.google\.com/);
	});
});
