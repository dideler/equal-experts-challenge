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
