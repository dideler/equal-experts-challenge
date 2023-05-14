import * as db from '$lib/server/database';
import { formListSchema, listSchema, ValidationError } from '$lib/schemas/list';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load = (async ({ params }) => {
	const list = await db.getList(params.id);

	if (!list) {
		return { list, error: 'List not found' };
	}

	return { list, error: null };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, params }: RequestEvent) => {
		let list = await db.getList(params.id);

		if (!list) {
			return fail(404, { action: 'save', list, error: 'List not found' });
		}

		try {
			const formData = await request.formData();
			const formList = formListSchema.parse(Array.from(formData));

			list = listSchema.parse(formList);
			list = await db.saveList(list);

			return { action: 'save', list, error: null };
		} catch (err) {
			console.error('Error POST /list/:id?/save', { error: err });

			if (err instanceof ValidationError) {
				return fail(422, {
					action: 'save',
					list,
					error: 'Validation failed',
					errors: err.flatten().fieldErrors,
				});
			}

			throw error(400, 'Failed to save list');
		}
	},
	delete: async ({ params }: RequestEvent) => {
		const list = await db.deleteList(params.id);
		if (!list) {
			return fail(404, { action: 'delete', list, error: 'List not found' });
		}
		throw redirect(303, '/lists');
	},
} satisfies Actions;
