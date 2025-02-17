import { test, expect } from '@playwright/test';

test.describe('Success Page', () => {
  const SUCCESS_PAGE_URL = 'http://localhost:3000/success';
  const EXPECTED_DOWNLOAD_URL = 'http://localhost:8000/download-file';

  test.beforeEach(async ({ page }) => {
    await page.goto(SUCCESS_PAGE_URL);
  });

  test('should display success message and download button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Success! Your file is ready./i })).toBeVisible();
    await expect(page.getByText('Click the button below to download your file.')).toBeVisible();
    const downloadButton = page.getByRole('link', { name: 'Download Job Application Data' });
    await expect(downloadButton).toBeVisible();
  });

  test('should have correct download link', async ({ page }) => {
    const downloadButton = page.getByRole('link', { name: 'Download Job Application Data' });
    const downloadHref = await downloadButton.getAttribute('href');
    expect(downloadHref).toBe(`${EXPECTED_DOWNLOAD_URL}`);
  });

  // test('should trigger file download when clicking button', async ({ page }) => {
  //   const downloadPromise = page.waitForEvent('download');
  //   await page.getByRole('link', { name: 'Download Job Application Data' }).click();
  //   const download = await downloadPromise;
  //   expect(download).not.toBeNull();
  //   expect(download.suggestedFilename()).toMatch(/download-file.*\.(csv|xlsx)/i);
  // });
  test('Download button triggers file download', async ({ page }) => {
    await page.goto('http://localhost:3000/success'); // Update URL as needed
  
    // Wait for the download event when clicking the button
    const [download] = await Promise.all([
      page.waitForEvent('download'), // Listen for the download event
      page.click('a[download]') // Click the download link
    ]);
  
    // Verify the file name or type
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.csv'); // Update file extension as needed
  
    // Save the file to a local folder
    await download.saveAs(`./downloads/${fileName}`);
  
    // Ensure the file exists
    expect(await download.path()).not.toBeNull();
  });
});
