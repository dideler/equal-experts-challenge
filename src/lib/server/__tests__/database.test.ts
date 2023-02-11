import { describe, it, expect, beforeEach } from 'vitest';
import * as db from '$lib/server/database';
import { newList } from './mockData';
import type { List } from '$lib/types';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const YYYY_MM_DD = /\d{4}-\d{2}-\d{2}/;
const HH_MM_SS_MS = /\d{2}:\d{2}:\d{2}.\d{3}/;
const TIME_UTC_ISO_MS = new RegExp(
	`^${YYYY_MM_DD.source}T${HH_MM_SS_MS.source}Z$`
);

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

describe('getList', () => {
	it('returns the matching list when it exists', async () => {
		const list = newList();

		db.reset({ [list.id]: list });

		const res = await db.getList(list.id);
		expect(res).toEqual(list);
	});

	it('returns undefined when it does not exist', async () => {
		const res = await db.getList('random-id');
		expect(res).toBeUndefined();
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
