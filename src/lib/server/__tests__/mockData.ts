import { randomUUID } from 'crypto';
import type { ListStore, List, Item } from '$lib/types';

type ListProps = {
	id?: string;
	title?: string;
	items?: Item[];
	created_at?: string;
	updated_at?: string;
};

export const listsToMap = (lists: Array<List>): ListStore => {
	return lists.reduce((acc, list) => ({ ...acc, [list.id]: list }), {});
};

export const newLists = (listsProps: Array<ListProps>) => {
	return listsProps.map((props) => newList(props));
};

export const newList = (data?: ListProps): List => {
	const currentTime = new Date().toISOString();
	const defaults = {
		id: randomUUID(),
		title: 'Groceries',
		items: [
			{ done: false, desc: 'Eggs' },
			{ done: true, desc: 'Ham' },
		],
		created_at: currentTime,
		updated_at: currentTime,
	};
	return { ...defaults, ...data };
};
