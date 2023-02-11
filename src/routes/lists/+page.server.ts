import * as db from '$lib/server/database';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { List } from '$lib/types';

export const load = (async () => {
	return {
		lists: await db.getLists(),
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async (event: RequestEvent) => {
		const formData = Object.fromEntries(await event.request.formData());
		db.saveList(formData);
	},
} satisfies Actions;
