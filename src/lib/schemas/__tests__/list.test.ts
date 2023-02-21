import { describe, test, expect } from 'vitest';
import { itemSchema, listSchema, formListSchema } from '$lib/schemas/list';

const UUID = '1ED7CF9C-08FB-4E5E-9809-B55B9E685DBE';
const TIME_UTC_ISO = '2020-01-01T00:00:00.123Z';

const RE_UUID =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const RE_YYYY_MM_DD = /\d{4}-\d{2}-\d{2}/;
const RE_HH_MM_SS_MS = /\d{2}:\d{2}:\d{2}.\d{3}/;
const RE_TIME_UTC_ISO_MS = new RegExp(
	`^${RE_YYYY_MM_DD.source}T${RE_HH_MM_SS_MS.source}Z$`
);

describe('itemSchema', () => {
	test('`desc` key is required with a defined value', () => {
		let data: object = {};
		expect(() => itemSchema.parse(data)).toThrow(/(desc).+(required)/is);

		data = { desc: undefined };
		expect(() => itemSchema.parse(data)).toThrow(/(desc).+(required)/is);

		data = { desc: 'desc' };
		expect(itemSchema.parse(data)).toMatchObject(data);
	});

	test('`desc` value must be a string', () => {
		let data: object = {};

		data = { desc: null };
		expect(() => itemSchema.parse(data)).toThrow(/(invalid_type).+(desc)/is);

		data = { desc: 123 };
		expect(() => itemSchema.parse(data)).toThrow(/(invalid_type).+(desc)/is);

		data = { desc: '' };
		expect(itemSchema.parse(data)).toMatchObject(data);

		data = { desc: 'desc' };
		expect(itemSchema.parse(data)).toMatchObject(data);
	});

	test('`desc` value is trimmed as a string', () => {
		const data: object = { desc: ' desc ' };
		expect(itemSchema.parse(data)).toMatchObject({ desc: 'desc' });
	});

	test('`done` is optional', () => {
		let data: object = { desc: 'desc' };

		data = { ...data };
		expect(() => itemSchema.parse(data)).not.toThrow();

		data = { ...data, done: undefined };
		expect(() => itemSchema.parse(data)).not.toThrow();
	});

	test('`done` defaults to false', () => {
		let data: object = { desc: 'desc' };

		data = { ...data };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: undefined };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });
	});

	test('`done` value must be a boolean or coerce to a boolean', () => {
		let data: object = { desc: 'desc' };

		data = { ...data, done: null };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: '' };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: 'on' };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });

		data = { ...data, done: 0 };
		expect(itemSchema.parse(data)).toMatchObject({ done: false });

		data = { ...data, done: 1 };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });

		data = { ...data, done: true };
		expect(itemSchema.parse(data)).toMatchObject({ done: true });
	});
});

describe('listSchema', () => {
	test('`id` is optional', () => {
		let data: object = { title: 'title' };

		data = { ...data };
		expect(() => listSchema.parse(data)).not.toThrow();

		data = { ...data, id: undefined };
		expect(() => listSchema.parse(data)).not.toThrow();
	});

	test('`id` defaults to a UUID', () => {
		let data: object = { title: 'title' };

		data = { ...data };
		expect(listSchema.parse(data)).toMatchObject({ id: RE_UUID });

		data = { ...data, id: undefined };
		expect(listSchema.parse(data)).toMatchObject({ id: RE_UUID });
	});

	test('`id` value must be a string UUID', () => {
		let data: object = { title: 'title' };

		data = { ...data, id: null };
		expect(() => listSchema.parse(data)).toThrow(/(invalid).+(string).+(id)/is);

		data = { ...data, id: '' };
		expect(() => listSchema.parse(data)).toThrow(/(invalid).+(string).+(id)/is);

		data = { ...data, id: 'A23-ASD-123' };
		expect(() => listSchema.parse(data)).toThrow(/(invalid).+(string).+(id)/is);

		data = { ...data, id: UUID };
		expect(listSchema.parse(data)).toMatchObject(data);
	});

	test('`title` key is required with a defined value', () => {
		let data: object = {};

		data = { ...data };
		expect(() => listSchema.parse(data)).toThrow(/(title).+(required)/is);

		data = { ...data, title: undefined };
		expect(() => listSchema.parse(data)).toThrow(/(title).+(required)/is);

		data = { title: 'title' };
		expect(listSchema.parse(data)).toMatchObject(data);
	});

	test('`title` value must be a non-empty string', () => {
		let data: object = {};

		data = { title: null };
		expect(() => listSchema.parse(data)).toThrow(/(invalid_type).+(title)/is);

		data = { title: 123 };
		expect(() => listSchema.parse(data)).toThrow(/(invalid_type).+(title)/is);

		data = { title: '' };
		expect(() => listSchema.parse(data)).toThrow(/(too_small).+(title)/is);

		data = { title: '  ' };
		expect(() => listSchema.parse(data)).toThrow(/(too_small).+(title)/is);

		data = { title: 'title' };
		expect(listSchema.parse(data)).toMatchObject(data);
	});

	test('`title` value is trimmed as a string', () => {
		const data: object = { title: ' title ' };
		expect(listSchema.parse(data)).toMatchObject({ title: 'title' });
	});

	test('`items` is optional', () => {
		let data: object = { title: 'title' };

		data = { ...data };
		expect(() => listSchema.parse(data)).not.toThrow();

		data = { ...data, items: undefined };
		expect(() => listSchema.parse(data)).not.toThrow();
	});

	test('`items` defaults to an empty list', () => {
		let data: object = { title: 'title' };

		data = { ...data };
		expect(listSchema.parse(data)).toMatchObject({ items: [] });

		data = { ...data, items: undefined };
		expect(listSchema.parse(data)).toMatchObject({ items: [] });
	});

	test('`items` value must be an empty list or item schema elements', () => {
		let data: object = { title: 'title' };

		data = { ...data, items: null };
		expect(() => listSchema.parse(data)).toThrow(
			/(invalid).+(array).+(items)/is
		);

		data = { ...data, items: '' };
		expect(() => listSchema.parse(data)).toThrow(
			/(invalid).+(array).+(items)/is
		);

		data = { ...data, items: [] };
		expect(listSchema.parse(data)).toMatchObject(data);

		data = { ...data, items: [{ done: true, desc: 'desc' }] };
		expect(listSchema.parse(data)).toMatchObject(data);

		data = { ...data, items: [{ foo: 'bar' }] };
		expect(() => listSchema.parse(data)).toThrow(/(invalid).+(items)/is);
	});

	['created_at', 'updated_at'].forEach((subject) => {
		test(`\`${subject}\` is optional`, () => {
			let data: object = { title: 'title' };

			data = { ...data };
			expect(() => listSchema.parse(data)).not.toThrow();

			data = { ...data, [subject]: undefined };
			expect(() => listSchema.parse(data)).not.toThrow();
		});

		test(`\`${subject}\` defaults to a ISO-8601 UTC string`, () => {
			let data: object = { title: 'title' };

			data = { ...data };
			expect(listSchema.parse(data)).toMatchObject({ id: RE_TIME_UTC_ISO_MS });

			data = { ...data, [subject]: undefined };
			expect(listSchema.parse(data)).toMatchObject({ id: RE_TIME_UTC_ISO_MS });
		});

		test(`\`${subject}\` value must be UTC datetime string with no offset`, () => {
			let data: object = { title: 'title' };

			data = { ...data, [subject]: null };
			expect(() => listSchema.parse(data)).toThrow(
				new RegExp(`(invalid).+(string).+(${subject})`, 'is')
			);

			data = { ...data, [subject]: '' };
			expect(() => listSchema.parse(data)).toThrow(
				new RegExp(`(invalid).+(string).+(${subject})`, 'is')
			);

			data = { ...data, [subject]: '2020-01-01T00:00:00+02:00' };
			expect(() => listSchema.parse(data)).toThrow(
				new RegExp(`(invalid).+(string).+(${subject})`, 'is')
			);

			data = { ...data, [subject]: TIME_UTC_ISO };
			expect(listSchema.parse(data)).toMatchObject(data);
		});
	});
});

describe('formListSchema', () => {
	const requiredFormData = [
		['id', UUID],
		['created-at', TIME_UTC_ISO],
		['title', 'Test Title'],
	];

	test('`id`, `created-at`, `title` are required in that order', () => {
		let formData: unknown[][] = [];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData = [['id', UUID]];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData = [['created-at', TIME_UTC_ISO]];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData = [
			['id', undefined],
			['created-at', undefined],
			['title', undefined],
		];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData = [
			['title', 'Test Title'],
			['created-at', TIME_UTC_ISO],
			['id', UUID],
		];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData = [
			['id', UUID],
			['created-at', TIME_UTC_ISO],
			['title', 'Test Title'],
		];
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('`id` must be a UUID string', () => {
		const formData: unknown[][] = [...requiredFormData];

		formData[0] = ['id', 123];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[0] = ['id', ''];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[0] = ['id', UUID];
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('`created-at` must be UTC datetime string with no offset', () => {
		const formData: unknown[][] = [...requiredFormData];

		formData[1] = ['created-at', undefined];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[1] = ['created-at', '2020-01-01T00:00:00+02:00'];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[1] = ['created-at', TIME_UTC_ISO];
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('`title` must be a non-empty string', () => {
		const formData: unknown[][] = [...requiredFormData];

		formData[2] = ['title', 123];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[2] = ['title', ''];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[2] = ['title', 'Cake'];
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('`items[n]` is optional', () => {
		const formData: unknown[][] = [...requiredFormData];
		expect(() => formListSchema.parse(formData)).not.toThrow();

		formData.push(['items[0]', '1st item text']);
		formData.push(['items[0]', '1st item check']);
		formData.push(['items[1]', '2nd item text']);
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('`items[n]` must be a string', () => {
		const formData: unknown[][] = [...requiredFormData];

		formData[3] = ['items[0]', 123];
		expect(() => formListSchema.parse(formData)).toThrow();

		formData[3] = ['items[0]', ''];
		formData[4] = ['items[1]', '2nd item text'];
		expect(() => formListSchema.parse(formData)).not.toThrow();

		formData[3] = ['items[0]', 'this item is checked'];
		formData[4] = ['items[0]', 'on'];
		expect(() => formListSchema.parse(formData)).not.toThrow();
	});

	test('transforms form data to a form list after parsing and validating', () => {
		const formData = [
			...requiredFormData,
			['items[0]', '1st item text'],
			['items[1]', '2nd item check'],
			['items[1]', '2nd item text'],
		];

		const data = formListSchema.parse(formData);

		expect(data).toEqual({
			id: UUID,
			title: 'Test Title',
			created_at: TIME_UTC_ISO,
			items: [
				{ desc: '1st item text' },
				{ done: '2nd item check', desc: '2nd item text' },
			],
		});
	});

	test('output is compatible as input for listSchema', () => {
		const formData = [
			['id', UUID],
			['created-at', TIME_UTC_ISO],
			['title', 'Bday Cake'],
			['items[0]', 'Cake mix'],
			['items[1]', 'on'],
			['items[1]', 'Eggs'],
			['items[2]', 'Veg oil'],
		];

		const formList = formListSchema.parse(formData);
		const list = listSchema.parse(formList);

		expect(list).toMatchObject({
			id: UUID,
			title: 'Bday Cake',
			items: [
				{ done: false, desc: 'Cake mix' },
				{ done: true, desc: 'Eggs' },
				{ done: false, desc: 'Veg oil' },
			],
			created_at: TIME_UTC_ISO,
			updated_at: RE_TIME_UTC_ISO_MS,
		});
	});
});
