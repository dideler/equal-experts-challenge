import { expect, test } from '@playwright/test';

import * as db from '../src/lib/server/database.js';
import { newList } from '../src/lib/server/__tests__/mockData.js';

test.beforeEach(async ({ page }) => {
	const list1 = newList({ title: 'Cake ingredients' });
	const list2 = newList({ title: 'Weekly shop' });

	db.reset({
		[list1.id]: list1,
		[list2.id]: list2,
	});

	await page.goto('/lists');
});

test('lists page shows various titles', async ({ page }) => {
	await page.goto('/lists');

	await expect.soft(page).toHaveTitle(/Lists/);
	await expect.soft(page.locator('h1')).toContainText('Lists');

	test.fail();
	await expect(page.locator('li')).toHaveCount(2);
});
