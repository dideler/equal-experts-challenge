let data = {};

export const reset = async (newData: object = {}): Promise<void> => {
	data = newData;
};

export const getLists = async (): Promise<Array<object>> => {
	return Object.values(data);
};
