import { test as base, expect } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { VirtualLazyFolder } from "../../../dist/main";
import { MockVirtualFile, MockVirtualLazyFolder } from "./virtualDrive.utils";
import { beforeEach } from "vitest";

const test = extend(base)

let mockVirtualLazyFolder: MockVirtualLazyFolder;

beforeEach(() => {
    mockVirtualLazyFolder = new MockVirtualLazyFolder("foo", (f) => {
        f.addFile(new MockVirtualFile("test", "txt"));
    });
});

test("getFilesAsync()", async () => {
    const mockFilesPromise = mockVirtualLazyFolder.getFilesAsync();
    expect(mockVirtualLazyFolder.getFiles()).toStrictEqual([]);

    mockVirtualLazyFolder.completePopulation();
    const mockFiles = await mockFilesPromise;
    expect(mockFiles).toHaveLength(1)
});

test("onPopulate", async () => {
    const mockPromise1 = mockVirtualLazyFolder.loadContent()
    const mockPromise2 = mockVirtualLazyFolder.loadContent()
    expect(mockPromise1).toBe(mockPromise2);
});