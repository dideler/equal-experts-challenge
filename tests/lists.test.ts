import { expect, test } from '@playwright/test';

test('lists page has expected title', async ({ page }) => {
	await page.goto('/lists');
	expect(await page.textContent('h1')).toBe('Lists');
});
