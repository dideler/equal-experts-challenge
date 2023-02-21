import * as db from '$lib/server/database';
import { listSchema, ValidationError } from '$lib/schemas/list';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load = (async () => {
	return {
		lists: await db.getLists(),
		error: null,
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }: RequestEvent) => {
		let list;

		try {
			const formData = await request.formData();
			const data = Object.fromEntries(formData);

			list = listSchema.parse(data);
			list = await db.saveList(list);

			return { action: 'create', list, error: null };
		} catch (err) {
			console.error('Error POST /lists?/create', { error: err });

			if (err instanceof ValidationError) {
				return fail(422, {
					action: 'create',
					list,
					error: 'Validation failed',
					errors: err.flatten().fieldErrors,
				});
			}

			throw error(400, 'Failed to create list');
		}
	},
} satisfies Actions;
