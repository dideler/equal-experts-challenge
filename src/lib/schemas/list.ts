import { z } from 'zod';
import { randomUUID } from 'crypto';
import type { List } from '$lib/types';

export { ZodError as ValidationError } from 'zod';

export const itemSchema = z.object({
	desc: z.string().trim().min(1),
	done: z.coerce.boolean().default(false),
});

export const listSchema = z.object({
	id: z.string().uuid().default(randomUUID),
	title: z.string().trim().min(1),
	items: z.array(itemSchema).default([]),
	created_at: z.string().datetime().default(new Date().toISOString()),
	updated_at: z.string().datetime().default(new Date().toISOString()),
});

export const sampleLists = (): List[] => {
	return [
		{
			id: crypto.randomUUID(),
			title: 'Birthday Cake',
			items: [
				{ done: false, desc: 'Flour' },
				{ done: true, desc: 'Eggs' },
				{ done: false, desc: 'Sugar' },
				{ done: false, desc: 'Icing' },
			],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
		{
			id: crypto.randomUUID(),
			title: 'Groceries',
			items: [
				{ done: false, desc: 'Milk' },
				{ done: true, desc: 'Bread' },
				{ done: false, desc: 'Ham' },
			],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	];
};
