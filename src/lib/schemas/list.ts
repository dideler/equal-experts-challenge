import { z } from 'zod';
import { randomUUID } from 'crypto';
import type { List, FormList, FormDataRow } from '$lib/types';

export { ZodError as ValidationError } from 'zod';

const currentTime = () => new Date().toISOString();

export const itemSchema = z.object({
	desc: z.string().trim(),
	done: z.coerce.boolean().default(false),
});

export const listSchema = z.object({
	id: z.string().uuid().default(randomUUID),
	title: z.string().trim().min(1),
	items: z.array(itemSchema).default([]),
	created_at: z.string().datetime().default(currentTime),
	updated_at: z.string().datetime().default(currentTime),
});

const formId = z.tuple([z.string().regex(/^id$/), z.string().uuid()]);

const formCreatedAt = z.tuple([
	z.string().regex(/^created-at$/),
	z.string().datetime(),
]);

const formTitle = z.tuple([
	z.string().regex(/^title$/),
	z.string().trim().min(1),
]);

const formItem = z.tuple([z.string().regex(/^items\[\d+\]$/), z.string()]);

export const formListSchema = z
	.tuple([formId, formCreatedAt, formTitle])
	.rest(formItem.optional())
	.transform((formData) => formData.reduce(toFormList, {} as FormList));

const toFormList = (list: FormList, row: FormDataRow): FormList => {
	if (!row) return list;

	const [key, val] = row;

	switch (key) {
		case 'id':
			return { ...list, id: val };
		case 'title':
			return { ...list, title: val };
		case 'created-at':
			return { ...list, created_at: val };
	}

	const match = key.match(/items\[(\d+)\]/);
	if (!match) {
		return list;
	}

	const index = parseInt(match[1]);
	const items = list.items || [];
	const item = items[index]
		? { desc: val, done: items[index].desc }
		: { desc: val };

	items[index] = item;
	return { ...list, items };
};

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
				{ done: true, desc: 'Onion' },
				{ done: false, desc: 'Tomato' },
				{ done: false, desc: 'Eggplant' },
			],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	];
};
