import { describe, it, expect, beforeEach } from 'vitest';

import * as db from '$lib/server/database';
import { newList } from './mockData';

beforeEach(() => {
	db.reset();
});

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

