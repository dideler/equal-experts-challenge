import { describe, it, expect } from 'vitest';

import * as db from '$lib/server/database';

describe('getLists', () => {
	it('returns an array', async () => {
		const res = await db.getLists();
		expect(res).toBeInstanceOf(Array);
	});
});

