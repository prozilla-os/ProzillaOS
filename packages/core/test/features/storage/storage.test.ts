import { assert, test as base, describe, expect } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { Storage } from "../../../src/features";

const test = extend(base);

let mockStorage: Storage | null = null;

test.beforeEach(() => {
	mockStorage = new Storage();
});

describe("compression", () => {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const mockString = alphabet.split("").map((x) => x.repeat(5)).join("");

	test("encode()", () => {
		assert(mockStorage != null);
		mockStorage.enableCompression = true;
		const encodedString = mockStorage.encode(mockString).result;
		expect(encodedString.length).toBeLessThan(mockString.length);
	});

	test("getEncodedByteSize()", () => {
		assert(mockStorage != null);
		mockStorage.enableCompression = true;
		const byteSize = Storage.getByteSize(mockString);
		const encodedByteSize = mockStorage.getEncodedByteSize(mockString);
		expect(encodedByteSize).toBeLessThan(byteSize);
	});

	test.each([
		alphabet,
		mockString,
		alphabet.repeat(5),
		mockString.repeat(5),
		"Hello world!",
		"abc",
	])("decode(encode(%o))", (string) => {
		assert(mockStorage != null);
		mockStorage.enableCompression = true;
		const decodedString = mockStorage.decode(mockStorage.encode(string).result);
		expect(decodedString).toBe(string);
	});
});