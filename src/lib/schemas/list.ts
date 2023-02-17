import { z } from 'zod';
import { randomUUID } from 'crypto';

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
