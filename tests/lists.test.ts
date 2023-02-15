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

	await expect(listTitles).toContainText(['Tesco']);
});

test('list modification', async ({ page }) => {
	await page.goto('/lists');

	const addTitleInput = page.getByPlaceholder('Add title');
	const createButton = page.getByText('Create list');

	await addTitleInput.fill('Sainsburys');
	await createButton.click();

	await page.getByText('Sainsburys').click();
	await page.waitForURL(/.*\/list\/.*/);

	const titleInput = page.getByTestId('input-title');
	const itemInputs = page.getByTestId('input-item');
	await expect(titleInput).toHaveValue('Sainsburys');
	await expect(itemInputs).toHaveCount(0);

	const saveButton = page.getByText('Save list');
	await expect.soft(saveButton).toBeEnabled();

	await titleInput.fill(' ');
	await expect.soft(saveButton).toBeDisabled();

	await titleInput.fill('Sainos');
	await expect.soft(saveButton).toBeEnabled();

	const newItem = page.getByPlaceholder('New item');
	await newItem.fill('Bananas');
	await saveButton.click();
	await newItem.fill('Oranges');
	await saveButton.click();

	await page.reload();
	await expect(titleInput).toHaveValue('Sainos');
	await expect(itemInputs.first()).toHaveValue('Bananas');
	await expect(itemInputs.last()).toHaveValue('Oranges');

	const deleteButton = page.getByText('Delete list');
	await deleteButton.click();

	await page.waitForURL(/.*\/lists/);
	await expect(page.locator('body')).not.toContainText('Sainos');
});

test('shows error when list does not exist', async ({ page }) => {
	await page.goto('/list/random-id');
	await expect(page.locator('body')).toContainText(['List not found']);
});
