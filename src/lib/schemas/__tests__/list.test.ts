import { describe, test, expect } from 'vitest';
import { itemSchema } from '$lib/schemas/list';

describe('itemSchema', () => {
	test('`desc` key is required with a defined value', () => {
		let data: object = {};
		expect(() => itemSchema.parse(data)).toThrow(/(desc).+(required)/is);

		data = { desc: undefined };
		expect(() => itemSchema.parse(data)).toThrow(/(desc).+(required)/is);

		data = { desc: 'foo' };
		expect(itemSchema.parse(data)).toMatchObject(data);
	});

	test('`desc` value must be a non-empty string', () => {
		let data: object = {};

		data = { desc: null };
		expect(() => itemSchema.parse(data)).toThrow(/(invalid_type).+(desc)/is);

		data = { desc: 123 };
		expect(() => itemSchema.parse(data)).toThrow(/(invalid_type).+(desc)/is);

		data = { desc: '' };
		expect(() => itemSchema.parse(data)).toThrow(/(too_small).+(desc)/is);

		data = { desc: '  ' };
		expect(() => itemSchema.parse(data)).toThrow(/(too_small).+(desc)/is);

		data = { desc: 'foo' };
		expect(itemSchema.parse(data)).toMatchObject(data);
	});

	test('`desc` value is trimmed as a string', () => {
		const data: object = { desc: ' foo ' };
		expect(itemSchema.parse(data)).toMatchObject({ desc: 'foo' });
	});

	test('`done` is optional', () => {
		let data: object = { desc: 'foo' };

		data = { ...data };
		expect(() => itemSchema.parse(data)).not.toThrow();

		data = { ...data, done: undefined };
		expect(() => itemSchema.parse(data)).not.toThrow();
	});

	test('`done` defaults to false', () => {
		let data: object = { desc: 'foo' };

		data = { ...data };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: null };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });
	});

	test('`done` value must be a boolean or coerce to a boolean', () => {
		let data: object = { desc: 'foo' };

		data = { ...data, done: '' };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: 'non-empty' };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });

		data = { ...data, done: 0 };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: 1 };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });

		data = { ...data, done: true };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });
	});
});
