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
		const item_text = formData.get('item_text')?.toString();

		if (title) list.title = title;
		if (item_text) list.items.push({ done: false, desc: item_text } as Item);

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
