import { test, expect } from '@playwright/test';

test('Google Login button is visible', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Update this if needed

  // Expect the "Login with Google" button to be visible
  const button = page.locator('[data-testid="homepage-google-login-button"]');
  await expect(button).toBeVisible();
});

test('Email link is visible', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check if the email link exists
  const buttons = page.getByRole('link', { name: 'send us an email' });
  await expect(buttons.first()).toBeVisible();
  await expect(buttons.nth(1)).toBeVisible();
});

test('Iframe (YouTube video) is present', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check if the iframe exists
  const iframe = page.locator('iframe[title="YouTube video player"]');
  await expect(iframe).toBeVisible();
});