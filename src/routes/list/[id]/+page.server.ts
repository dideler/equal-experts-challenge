import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

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

		const formData = Object.fromEntries(await request.formData());
		list = { ...list, ...formData };
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
