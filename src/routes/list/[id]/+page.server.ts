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
		const itemText = formData.get('item_text')?.toString();
		const itemCheck = formData.get('item_check')?.toString();

		if (title) {
			list.title = title;
		}
		if (itemText) {
			const item: Item = { done: Boolean(itemCheck), desc: itemText };
			list.items.push(item);
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
