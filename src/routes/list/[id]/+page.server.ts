import * as db from '$lib/server/database';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load = (async ({ params }) => {
	const list = await db.getList(params.id);

	if (!list) {
		return { list, errors: [{ message: 'List not found' }] };
	}

	return { list, errors: [] };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, params }: RequestEvent) => {
		const formData = Object.fromEntries(await request.formData());
		let list = await db.getList(params.id);

		if (!list) {
			throw error(404, { message: 'List not found' });
		}

		list = { ...list, ...formData };
		db.saveList(list);
	},
} satisfies Actions;
