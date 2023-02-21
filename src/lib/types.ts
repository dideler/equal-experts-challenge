export type ListStore = { [key: string]: List };

export interface List {
	id: string;
	title: string;
	items: Array<Item>;
	created_at: string;
	updated_at: string;
}

export interface Item {
	done: boolean;
	desc: string;
}

export type FormList = {
	id: string;
	created_at: string;
	title: string;
	items?: Array<{ done?: string; desc?: string }>;
};
export type FormDataRow = [string, string] | undefined;
