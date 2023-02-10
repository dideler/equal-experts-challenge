import { expect, test } from '@playwright/test';

test('lists page shows various titles', async ({ page }) => {
	await page.goto('/lists');
	await expect(page).toHaveTitle(/Lists/);
	await expect(page.locator('h1')).toContainText('Lists')
});
