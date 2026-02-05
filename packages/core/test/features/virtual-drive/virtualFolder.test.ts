import { test as base, expect } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { MockVirtualFile, MockVirtualFolder } from "./test.utils";

const test = extend(base);

test("toJSON()", () => {
	const mockVirtualFolderEmpty = new MockVirtualFolder("foo");
	mockVirtualFolderEmpty.confirmChanges();
	expect(mockVirtualFolderEmpty.toJSON()).toStrictEqual({
		nam: "foo",
		ico: undefined,
	});

	const mockVirtualFile = new MockVirtualFile("bar");
	const mockVirtualFolderWithFile = new MockVirtualFolder("foo");
	mockVirtualFolderWithFile.addFile(mockVirtualFile);
	expect(mockVirtualFolderWithFile.toJSON()).toStrictEqual({
		nam: "foo",
		ico: undefined,
		fls: [
			mockVirtualFile.toJSON(),
		],
	});

	const mockVirtualFolder = new MockVirtualFolder("bar");
	const mockVirtualFolderWithSubFolder = new MockVirtualFolder("foo");
	mockVirtualFolderWithSubFolder.addFolder(mockVirtualFolder);
	expect(mockVirtualFolderWithSubFolder.toJSON()).toStrictEqual({
		nam: "foo",
		ico: undefined,
		fds: [
			mockVirtualFolder.toJSON(),
		],
	});

	const mockVirtualFolderWithFileAndSubFolder = new MockVirtualFolder("foo");
	mockVirtualFolderWithFileAndSubFolder.addFile(mockVirtualFile).addFolder(mockVirtualFolder);
	expect(mockVirtualFolderWithFileAndSubFolder.toJSON()).toStrictEqual({
		nam: "foo",
		ico: undefined,
		fls: [
			mockVirtualFile.toJSON(),
		],
		fds: [
			mockVirtualFolder.toJSON(),
		],
	});
});

test("isFile()", () => {
	const mockVirtualFolder = new MockVirtualFolder("foo");
	expect(mockVirtualFolder.isFile()).toBe(false);
});

test("isFolder()", () => {
	const mockVirtualFolder = new MockVirtualFolder("foo");
	expect(mockVirtualFolder.isFolder()).toBe(true);
});
