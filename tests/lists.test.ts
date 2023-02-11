import { expect, test } from '@playwright/test';

test('lists page can show lists and create lists', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	const listTitles = page.getByTestId('list-title');
	const addTitleInput = page.getByPlaceholder('Add title');
	const createButton = page.getByText('Create list');

	await expect(listTitles).toHaveCount(0);
	await expect.soft(addTitleInput).toHaveValue('');
	await expect.soft(createButton).toBeDisabled();

	await addTitleInput.fill('  ');
	await expect.soft(createButton).toBeDisabled();

	await addTitleInput.fill('Veggies');
	await expect.soft(createButton).toBeEnabled();

	await createButton.click();

	await expect(listTitles).toHaveCount(1);
	await expect(listTitles).toHaveText(['Veggies']);

	await page.getByText('Veggies').click();
	await page.waitForURL(/.*\/list\/.*/);
	expect(page.url()).toContain('/list/');
});
