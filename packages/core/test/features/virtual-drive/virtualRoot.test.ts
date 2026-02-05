import { assert, test as base, expect } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { AppsConfig, DesktopConfig, MiscConfig, ModalsConfig, SystemManager, TaskbarConfig, TrackingConfig, VirtualDriveConfig, VirtualRoot, WindowsConfig } from "../../../src/features";

const test = extend(base);

let mockVirtualRoot: VirtualRoot | null = null;

test.beforeEach(() => {
	const mockConfig = new VirtualDriveConfig({
		defaultData: {
			includeAppsFolder: true,
			includeDesktopFolder: true,
			includeDocumentsFolder: true,
			includePicturesFolder: true,
			includeSourceTree: false,
		},
		saveData: false,
	});

	const mockSystemManager = new SystemManager({
		systemName: null,
		tagLine: null,
		appsConfig: new AppsConfig(),
		desktopConfig: new DesktopConfig(),
		miscConfig: new MiscConfig(),
		modalsConfig: new ModalsConfig(),
		taskbarConfig: new TaskbarConfig(),
		trackingConfig: new TrackingConfig(),
		windowsConfig: new WindowsConfig(),
		virtualDriveConfig: mockConfig,
	});

	mockVirtualRoot = new VirtualRoot(mockSystemManager);
	mockVirtualRoot.init();
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