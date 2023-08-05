export class StorageManager {
	static store(key, value) {
		localStorage.setItem(key, value);
	}

	static load(key) {
		return localStorage.getItem(key);
	}

	static clear() {
		localStorage.clear();
	}
}