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

describe('getList', () => {
	it('returns the matching list', async () => {
		const list = newList();

		db.reset({ [list.id]: list });

		const res = await db.getList(list.id);
		expect(res).toEqual(list);
	});

	it('returns undefined when the list does not exist', async () => {
		const res = await db.getList('random-id');
		expect(res).toBeUndefined();
	});
});

describe('saveList', () => {
	it('returns the saved list', async () => {
		const list = newList();

		const res = await db.saveList(list);

		expect(res).toStrictEqual(list);
	});

	it('stores the list by its id', async () => {
		const list = newList();

		await db.saveList(list);

		expect(db.data).toMatchObject({ [list.id]: list });
	});
});

describe('deleteList', () => {
	it('deletes the list', async () => {
		const list = newList();

		db.reset({ [list.id]: list });

		await db.deleteList(list.id);
		expect(db.data).toEqual({});
	});

	it('returns the deleted list', async () => {
		const list = newList();

		db.reset({ [list.id]: list });

		const res = await db.deleteList(list.id);
		expect(res).toEqual(list);
	});

	it('returns undefined when the list did not exist', async () => {
		const res = await db.deleteList('random-id');
		expect(res).toBeUndefined();
	});
});
