import { expect, test } from '@playwright/test';

test('lists page shows various titles', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	await expect(page.getByTestId('list-title')).toHaveCount(0);

	await page.getByPlaceholder('Add title').fill('Veggies');
	await page.getByText('Create list').click();

	await expect(page.getByTestId('list-title')).toHaveCount(1);
	await expect(page.getByTestId('list-title')).toHaveText(['Veggies']);
});
