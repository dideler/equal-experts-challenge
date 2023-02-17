import { z } from 'zod';

export const itemSchema = z.object({
	desc: z.string().trim().min(1),
	done: z.coerce.boolean().default(false),
});

