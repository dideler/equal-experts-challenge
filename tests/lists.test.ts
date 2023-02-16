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
	const itemInputsText = page.getByTestId('input-item-text');
	const itemInputsCheck = page.getByTestId('input-item-check');

	await expect(titleInput).toHaveValue('Sainsburys');
	await expect(itemInputsText).toHaveCount(0);
	await expect(itemInputsCheck).toHaveCount(0);

	const saveButton = page.getByText('Save list');
	await expect.soft(saveButton).toBeEnabled();

	await titleInput.fill(' ');
	await expect.soft(saveButton).toBeDisabled();

	await titleInput.fill('Sainos');
	await expect.soft(saveButton).toBeEnabled();

	const newItemCheck = page.getByTestId('input-new-item-check');
	const newItemText = page.getByPlaceholder('New item');

	await newItemText.fill('Bananas');
	await saveButton.click();

	await newItemText.fill('Oranges');
	await newItemCheck.check();
	await saveButton.click();

	await page.reload();

	await expect(titleInput).toHaveValue('Sainos');
	await expect(itemInputsText.first()).toHaveValue('Bananas');
	await expect(itemInputsText.last()).toHaveValue('Oranges');
	await expect(itemInputsCheck.last()).toBeChecked();

	const deleteButton = page.getByText('Delete list');
	await deleteButton.click();

	await page.waitForURL(/.*\/lists/);
	await expect(page.locator('body')).not.toContainText('Sainos');
});

test('shows error when list does not exist', async ({ page }) => {
	await page.goto('/list/random-id');
	await expect(page.locator('body')).toContainText(['List not found']);
});
