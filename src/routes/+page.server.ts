import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async () => {
		throw redirect(303, '/lists');
	},
} satisfies Actions;
