import { describe, it, expect } from 'vitest';

import * as db from '$lib/server/database';
import { randomUUID } from 'crypto';

const newList = ({
	title = 'Groceries',
	items = [
		{ done: false, desc: 'Eggs' },
		{ done: true, desc: 'Ham' },
	],
} = {}) => {
	const currentTime = new Date().toISOString();
	return {
		id: randomUUID(),
		title,
		items,
		created_at: currentTime,
		updated_at: currentTime,
	};
};

describe('getLists', () => {
	it('returns all stored lists', async () => {
		const list1 = newList({ title: 'Sat' });
		const list2 = newList({ title: 'Sun' });

		db.reset({
			[list1.id]: list1,
			[list2.id]: list2,
		});

		const res = await db.getLists();
		expect(res).toEqual([list1, list2]);
	});
});

