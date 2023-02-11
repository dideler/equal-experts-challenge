import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const list = await db.getList(params.id);
	return { list };
}) satisfies PageServerLoad;

