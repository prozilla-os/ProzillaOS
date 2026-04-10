import { assert, test as base, expect } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { VirtualRoot } from "../../../src/features";
import { MockSystemManager } from "../system/system.utils";
import { MockVirtualRoot } from "./virtualDrive.utils";

const test = extend(base);

let mockVirtualRoot: VirtualRoot | null = null;

test.beforeEach(() => {
	const mockSystemManager = new MockSystemManager();
	mockVirtualRoot = new MockVirtualRoot(mockSystemManager);
});

test("path", () => {
	assert(mockVirtualRoot != null);
	expect(mockVirtualRoot.path).toBe("");
});

test("displayPath", () => {
	assert(mockVirtualRoot != null);
	expect(mockVirtualRoot.displayPath).toBe("/");
});

test("getRoot()", () => {
	assert(mockVirtualRoot != null);
	expect(mockVirtualRoot.getRoot()).toBe(mockVirtualRoot);
});

test("isFile()", () => {
	assert(mockVirtualRoot != null);
	expect(mockVirtualRoot.isFile()).toBe(false);
});

test("isFolder()", () => {
	assert(mockVirtualRoot != null);
	expect(mockVirtualRoot.isFolder()).toBe(true);
});