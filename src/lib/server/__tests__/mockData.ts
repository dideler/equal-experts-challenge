import { randomUUID } from 'crypto';
import type { List, Item } from '$lib/types';

export const newList = ({
	title = 'Groceries',
	items = [
		{ done: false, desc: 'Eggs' },
		{ done: true, desc: 'Ham' },
	] as Item[],
} = {}): List => {
	const currentTime = new Date().toISOString();
	return {
		id: randomUUID(),
		title,
		items,
		created_at: currentTime,
		updated_at: currentTime,
	};
};
