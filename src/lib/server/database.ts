import type { ListStore, List } from '$lib/types';

let data: ListStore = {};

export const reset = async (newData: ListStore = {}): Promise<void> => {
	data = newData;
};

export const getLists = async (): Promise<List[]> => {
	return Object.values(data) as List[];
};

export const saveList = async (list: List): Promise<List> => {
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

if (process.env.APP_ENV !== 'prod') seed();
