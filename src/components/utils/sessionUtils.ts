export const getValueFromSessionStorage = (key: string) => {
	const stored = sessionStorage.getItem(key);
	if (!stored) {
		return null;
	}
	return JSON.parse(stored);
}

export const setValueToSessionStorage = (key:string, data:any) => {
	sessionStorage.setItem(key, JSON.stringify(data))
}