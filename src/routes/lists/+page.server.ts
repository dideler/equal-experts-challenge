import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';

export const load = (async () => {
	return {
		lists: await db.getLists(),
	};
}) satisfies PageServerLoad;
