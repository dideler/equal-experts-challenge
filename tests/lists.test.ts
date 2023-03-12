import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('lists index and creation', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	const listTitles = page.getByTestId('list-title');
	const addTitleInput = page.getByPlaceholder('Add title');
	const createButton = page.getByText('＋');

	await expect(listTitles).toHaveCount(0);
	await expect.soft(addTitleInput).toHaveValue('');
	await expect.soft(createButton).toBeDisabled();

	await addTitleInput.fill('  ');
	await expect.soft(createButton).toBeDisabled();

	await addTitleInput.fill('Tesco');
	await expect.soft(createButton).toBeEnabled();

	await createButton.click();

	await page.waitForURL(/.*\/list\/.*/);
	await page.goto('/lists');

	await expect(listTitles).toContainText(['Tesco']);
});

test('list modification', async ({ page }) => {
	await page.goto('/lists');

	// Create a list by title
	const addTitleInput = page.getByPlaceholder('Add title');
	const createButton = page.getByText('＋');

	await addTitleInput.fill('Sainsburys');
	await createButton.click();

	await page.waitForURL(/.*\/list\/.*/);

	// New list only has title
	const titleInput = page.getByTestId('input-title');
	const itemsInputText = page.getByTestId('input-item-text');
	const itemsInputCheck = page.getByTestId('input-item-check');

	await expect(titleInput).toHaveValue('Sainsburys');
	await expect(itemsInputText).toHaveCount(0);
	await expect(itemsInputCheck).toHaveCount(0);

	// Change title
	const saveButton = page.getByText('Save list');
	await expect.soft(saveButton).toBeEnabled();

	await titleInput.fill(' ');
	await expect.soft(saveButton).toBeDisabled();

	await titleInput.fill('Sainos');
	await expect.soft(saveButton).toBeEnabled();

	// Create items
	const newItemText = page.getByPlaceholder('New item');

	await newItemText.fill('Bananas');

	await newItemText.fill('Oranges');
	await itemsInputCheck.last().check();

	await saveButton.click();
	await page.reload();

	await expect(titleInput).toHaveValue('Sainos');
	await expect(itemsInputText.first()).toHaveValue('Bananas');
	await expect(itemsInputCheck.first()).not.toBeChecked();
	await expect(itemsInputText.last()).toHaveValue('Oranges');
	await expect(itemsInputCheck.last()).toBeChecked();

	// Change an item
	await itemsInputText.first().fill('Baby bananas');
	await itemsInputCheck.first().check();
	await saveButton.click();

	await page.reload();

	await expect(itemsInputText.first()).toHaveValue('Baby bananas');
	await expect(itemsInputCheck.first()).toBeChecked();

	// Delete item (mouse + keyboard)
	await expect(itemsInputText).toHaveCount(2);

	const itemsButtonDelete = page.getByTestId('button-item-del');
	await itemsButtonDelete.first().click();

	await expect(itemsInputText).toHaveCount(1);
	await expect(itemsInputText.first()).toHaveValue('Oranges');

	await itemsInputText.first().click();
	for (let i = 0; i < ' Oranges'.length; i++) {
		await page.keyboard.press('Backspace');
	}

	await expect(itemsInputText).toHaveCount(0);

	await saveButton.click();
	await page.reload();

	await expect(itemsInputText).toHaveCount(0);

	// Delete list
	const deleteButton = page.getByText('Delete list');
	await deleteButton.click();

	await page.waitForURL(/.*\/lists/);
	await expect(page.locator('body')).not.toContainText('Sainos');
});

test('shows error when list does not exist', async ({ page }) => {
	await page.goto('/list/random-id');
	await expect(page.locator('body')).toContainText(['List not found']);
});
