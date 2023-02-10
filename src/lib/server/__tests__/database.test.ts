import { describe, it, expect, beforeEach } from 'vitest';
import * as db from '$lib/server/database';
import { newList } from './mockData';
import type { List } from '$lib/types';

const UUID = /\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z/;
const YYYY_MM_DD = /\d{4}-\d{2}-\d{2}/;
const HH_MM_SS_MS = /\d{2}:\d{2}:\d{2}.\d{3}/;
const TIME_UTC_ISO_MS = /\A#{YYYY_MM_DD}T#{HH_MM_SS_MS}Z\z/;

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

describe('saveList', () => {
	it('returns a list with populated properties', async () => {
		const list = { title: 'Groceries' } as List;

		const res = await db.saveList(list);

		expect(res).toStrictEqual({
			id: expect.stringMatching(UUID),
			title: 'Groceries',
			items: [],
			created_at: expect.stringMatching(TIME_UTC_ISO_MS),
			updated_at: expect.stringMatching(TIME_UTC_ISO_MS),
		});
	});

	it('stores the list by its id', async () => {
		const list = newList();

		await db.saveList(list);

		expect(db.data).toMatchObject({ [list.id]: list });
	});
});
