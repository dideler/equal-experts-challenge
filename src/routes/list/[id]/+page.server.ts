import { error } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const list = await db.getList(params.id);

	if (!list) {
		throw error(404, { message: 'List not found' });
	}

	return { list };
}) satisfies PageServerLoad;

