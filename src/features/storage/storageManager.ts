export class StorageManager {
	static MAX_BYTES = 5_000_000;

	static store(key: string, value: string) {
		if (key == null || value == null)
			return;

		localStorage.setItem(key, value);
	}

	static load(key: string): string | null {
		if (key == null)
			return null;
		
		return localStorage.getItem(key);
	}

	static clear() {
		localStorage.clear();
	}

	static getByteSize(string: string): number {
		return new Blob([string]).size;
	}

	static byteToKilobyte(bytes: number): number {
		return bytes / 1000;
	}
}