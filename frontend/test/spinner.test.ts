import { test, expect } from '@playwright/test';

test('Spinner is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/processing'); // Update this if needed

  // Expect the spinner to be visible by its data-testid
  await expect(page.locator('[data-testid="spinner_icon"]')).toBeVisible();
});
