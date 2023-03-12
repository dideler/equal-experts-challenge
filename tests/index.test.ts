import { expect, test } from '@playwright/test';

test('index page has expected title', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('h1')).toHaveText('Grocery List App');
});

test('button redirects user to their lists', async ({ page }) => {
	await page.goto('/');

	const button = page.getByText('Get Started');
	await button.click();

	expect(page.url()).toMatch(/lists$/);
});
