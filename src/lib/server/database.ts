import type { List } from '$lib/types';

let data = {};

export const reset = async (newData: object = {}): Promise<void> => {
	data = newData;
};

export const getLists = async (): Promise<List[]> => {
	return Object.values(data);
};
