import { expect, test } from '@playwright/test';

test('lists page shows various titles', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	await expect(page.locator('li')).toHaveCount(2);
});
