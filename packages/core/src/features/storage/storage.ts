import LZString from "lz-string";

/**
 * A wrapper for {@link localStorage} with additional functionality like compression and a size limit.
 */
export class Storage {
	/**
	 * Enables compression of values stored in this storage.
	 * @default false
	 */
	enableCompression = false;

	/**
	 * The prefix to prepend to keys.
	 * @default undefined
	 */
	prefix: string | undefined;

	/**
	 * The maximum amount of bytes of a value in this storage.
	 */
	static readonly MAX_BYTES = 5_000_000;

	static readonly COMPRESSED_PREFIX = "\uE000";
	static readonly UNCOMPRESSED_PREFIX = "\uE001";

	/**
	 * Stores a key and value pair in this storage.
	 * @param key - The key to store.
	 * @param value - The value to store.
	 */
	store(key: string, value: string) {
		const { result: encodedValue, size: valueSize } = this.encode(value);

		if (this.prefix !== undefined && !key.startsWith(this.prefix))
			key = this.prefix + key;

		const exceededMaxStorage = Storage.getByteSize(key) + valueSize > Storage.MAX_BYTES;

		if (exceededMaxStorage)
			throw new Error("Failed to store value: storage capacity exceeded.");

		localStorage.setItem(key, encodedValue);
	}

	/**
	 * Loads a value associated with the given key.
	 * @param key - The key of the item.
	 * @returns The value of the item.
	 */
	load(key: string): string | null {
		if (this.prefix !== undefined && !key.startsWith(this.prefix))
			key = this.prefix + key;

		let value = localStorage.getItem(key);

		if (value == null) {
			if (this.prefix === undefined || !key.startsWith(this.prefix))
				return null;
			const keyWithoutPrefix = key.replace(this.prefix, "");
			value = localStorage.getItem(keyWithoutPrefix);
			if (value != null) {
				// Replace key
				localStorage.removeItem(keyWithoutPrefix);
				localStorage.setItem(key, value);
			} else {
				return null;
			}
		}

		return this.decode(value);
	}

	/**
	 * Replaces the key of an item if it exists.
	 * @param oldKey - The key to replace.
	 * @param newKey - The new key.
	 */
	rename(oldKey: string, newKey: string): this {
		const value = localStorage.getItem(oldKey);

		if (this.prefix !== undefined && !newKey.startsWith(this.prefix))
			newKey = this.prefix + newKey;

		if (value == null) {
			if (this.prefix !== undefined && !oldKey.startsWith(this.prefix)) {
				this.rename(this.prefix + oldKey, newKey);
			}
			return this;
		}
		localStorage.removeItem(oldKey);
		localStorage.setItem(newKey, value);
		return this;
	}

	/**
	 * Removes the item with the given key from this storage.
	 * @param key - The key of the item.
	 */
	remove(key: string): this {
		localStorage.removeItem(key);
		return this;
	}

	/**
	 * Clears all items stored in this storage.
	 */
	clear(): this {
		localStorage.clear();
		return this;
	}

	/**
	 * Returns the byte size of a key and value pair.
	 * @param key - The key of the item.
	 * @param value - The value of the item.
	 */
	getItemByteSize(key: string, value: string): number {
		if (this.prefix !== undefined && !key.startsWith(this.prefix))
			key = this.prefix + key;

		return Storage.getByteSize(key) + this.getEncodedByteSize(value);
	}

	getEncodedByteSize(string: string | null) : number {
		if (string == null) return 0;
		return this.encode(string).size;
	}

	encode(string: string): { result: string, size: number } {
		const rawSize = Storage.getByteSize(string);

		if (!this.enableCompression || !string.length)
			return { result: string, size: rawSize };

		const compressedString = LZString.compressToUTF16(string);
		const compressedSize = Storage.getByteSize(compressedString);

		if (rawSize <= compressedSize) {
			return { result: Storage.UNCOMPRESSED_PREFIX + string, size: rawSize };
		} else {
			return { result: Storage.COMPRESSED_PREFIX + compressedString, size: compressedSize };
		}
	}

	decode(string: string): string {
		if (!string.length)
			return string;

		if (string.startsWith(Storage.COMPRESSED_PREFIX)) {
			return LZString.decompressFromUTF16(string.slice(1));
		} else if (string.startsWith(Storage.UNCOMPRESSED_PREFIX)) {
			return string.slice(1);
		} else {
			return string;
		}
	}

	setPrefix(prefix?: string): this {
		this.prefix = prefix;
		return this;
	}

	static getByteSize(string: string | null): number {
		if (string == null) return 0;
		return new Blob([string]).size;
	}

	static byteToKilobyte(bytes: number): number {
		return bytes / 1000;
	}

}