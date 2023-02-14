import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('lists index and creation', async ({ page }) => {
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

	await addTitleInput.fill('Tesco');
	await expect.soft(createButton).toBeEnabled();

	await createButton.click();

	await expect(listTitles).toHaveCount(1);
	await expect(listTitles).toHaveText(['Veggies']);

	await page.getByText('Veggies').click();
	await page.waitForURL(/.*\/list\/.*/);

	const titleInput = page.locator('#input-title');
	await expect(titleInput).toHaveValue('Veggies');

	const saveButton = page.getByText('Save list');
	await expect.soft(saveButton).toBeEnabled();

	await titleInput.fill(' ');
	await expect.soft(saveButton).toBeDisabled();

	await titleInput.fill('Roast Veggies');
	await expect.soft(saveButton).toBeEnabled();

	await saveButton.click();
	await page.reload();

	await expect(titleInput).toHaveValue('Roast Veggies');

	const deleteButton = page.getByText('Delete list');
	await deleteButton.click();

	await page.waitForURL(/.*\/lists/);
	await expect(listTitles).toHaveCount(0);
});

test('shows error when list does not exist', async ({ page }) => {
	await page.goto('/list/random-id');
	await expect(page.locator('body')).toContainText(['List not found']);
});
