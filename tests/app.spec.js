const { test, expect } = require('@playwright/test');

test.describe('TextFlow.io E2E Core Workflow', () => {
  test('User can enter text and apply UPPERCASE transformation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check main title
    await expect(page.locator('text=TextFlow')).toBeVisible();

    // Type text in raw input area
    const inputArea = page.locator('textarea[placeholder*="Paste or type raw"]');
    await inputArea.fill('hello textflow test');

    // Click UPPERCASE tool card
    await page.click('text=UPPERCASE');

    // Verify output text
    const outputArea = page.locator('textarea[readonly]');
    await expect(outputArea).toHaveValue('HELLO TEXTFLOW TEST');
  });

  test('User can clear input stream', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const inputArea = page.locator('textarea[placeholder*="Paste or type raw"]');
    await inputArea.fill('sample data');
    await page.click('button[title="Clear Input"]');
    await expect(inputArea).toHaveValue('');
  });
});
