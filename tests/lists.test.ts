import { expect, test } from '@playwright/test';

test('lists page can show lists and create lists', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	await expect(page.getByTestId('list-title')).toHaveCount(0);

	await expect.soft(page.getByText('Create list')).toBeDisabled();
	await page.getByPlaceholder('Add title').fill('  ');
	await expect.soft(page.getByText('Create list')).toBeDisabled();
	await page.getByPlaceholder('Add title').fill('Veggies');
	await expect.soft(page.getByText('Create list')).toBeEnabled();
	await page.getByText('Create list').click();

	await expect(page.getByTestId('list-title')).toHaveCount(1);
	await expect(page.getByTestId('list-title')).toHaveText(['Veggies']);
});
