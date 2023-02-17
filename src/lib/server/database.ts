import { sampleLists } from '$lib/schemas/list';
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

export const saveList = async (list: List): Promise<List> => {
	data[list.id] = list;
	return list;
};

export const deleteList = async (listId: string): Promise<List | undefined> => {
	const list = data[listId];
	delete data[listId];
	return list;
};

const seed = () => {
	const lists = sampleLists();
	data = lists.reduce((acc, list) => ({ ...acc, [list.id]: list }), {});
};

if (process.env.APP_ENV === 'dev') seed();
