import { randomUUID } from 'crypto';
import type { ListStore, List } from '$lib/types';

export let data: ListStore = {};

export const reset = async (newData: ListStore = {}): Promise<void> => {
	data = newData;
};

export const getLists = async (): Promise<List[]> => {
	return Object.values(data) as List[];
};

export const getList = async (listId: string): Promise<List | undefined> => {
	return data[listId];
};

export const saveList = async (listData: object | List): Promise<List> => {
	const currentTime = new Date().toISOString();
	const defaults = {
		id: randomUUID(),
		title: '',
		items: [],
		created_at: currentTime,
		updated_at: currentTime,
	};
	const list: List = { ...defaults, ...listData };
	data[list.id] = list;
	return list;
};

export const deleteList = async (listId: string): Promise<List | undefined> => {
	const list = data[listId];
	delete data[listId];
	return list;
};

const seed = () => {
	const lists: List[] = [
		{
			id: crypto.randomUUID(),
			title: 'Birthday Cake',
			items: [
				{ done: false, desc: 'Flour' },
				{ done: true, desc: 'Eggs' },
				{ done: false, desc: 'Sugar' },
				{ done: false, desc: 'Icing' },
			],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
		{
			id: crypto.randomUUID(),
			title: 'Groceries',
			items: [
				{ done: false, desc: 'Milk' },
				{ done: true, desc: 'Bread' },
				{ done: false, desc: 'Ham' },
			],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	];

	data = lists.reduce((acc, list) => ({ ...acc, [list.id]: list }), {});
};

if (process.env.APP_ENV === 'dev') seed();
