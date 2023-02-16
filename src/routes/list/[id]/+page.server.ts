import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { Item } from '$lib/types';

export const load = (async ({ params }) => {
	const list = await db.getList(params.id);

	if (!list) {
		return { list, error: 'List not found' };
	}

	return { list };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, params }: RequestEvent) => {
		let list = await db.getList(params.id);

		if (!list) {
			return fail(404, { action: 'save', list, error: 'List not found' });
		}

		const formData = await request.formData();
		const title = formData.get('title')?.toString();
		const itemCount = Number(formData.get('item-count'));
		const newItemText = formData.get('new-item-text')?.toString();
		const newItemCheck = Boolean(formData.get('new-item-check'));

		if (title) {
			list.title = title;
		}

		list.items = [];
		for (let i = 0; i < itemCount; i++) {
			let item: Item;
			const values = formData.getAll(`items[${i}]`);
			if (values.length == 2) {
				item = { done: true, desc: String(values[1]) };
			} else {
				item = { done: false, desc: String(values[0]) };
			}
			list.items.push(item);
		}

		if (newItemText) {
			list.items.push({ done: Boolean(newItemCheck), desc: newItemText });
		}

		list = await db.saveList(list);
		return { action: 'save', list };
	},
	delete: async ({ params }: RequestEvent) => {
		const list = await db.deleteList(params.id);
		if (!list) {
			return fail(404, { action: 'delete', list, error: 'List not found' });
		}
		return { action: 'delete', list };
	},
} satisfies Actions;
