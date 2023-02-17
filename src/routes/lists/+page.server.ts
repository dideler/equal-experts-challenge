import * as db from '$lib/server/database';
import { listSchema, ValidationError } from '$lib/schemas/list';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { List } from '$lib/types';

export const load = (async () => {
	return {
		lists: await db.getLists(),
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);
		let list: List;

		try {
			list = listSchema.parse(data);
			list = await db.saveList(list);
			return { action: 'create', list };
		} catch (err) {
			console.error('Error POST /lists?/create', { error: err });
			if (err instanceof ValidationError) {
				return fail(422, {
					action: 'create',
					data,
					error: 'Validation failed',
					errors: err.flatten().fieldErrors,
				});
			} else {
				throw error(400, 'Failed to create list');
			}
		}
	},
} satisfies Actions;
