import { describe, it, expect, beforeEach, vi } from "vitest";
import { Shell } from "../../../src/features";
import { MockSystemManager } from "../system/system.utils";
import { MockVirtualRoot } from "../virtual-drive/virtualDrive.utils";
import { MockSettingsManager } from "../settings/settings.utils";
import { Vector2 } from "@prozilla-os/shared";
import { EXIT_CODE } from "../../../src/constants";

describe("Shell", () => {
	let shell: Shell;

	beforeEach(() => {
		const mockSystemManager = new MockSystemManager();
		const mockVirtualRoot = new MockVirtualRoot(mockSystemManager);
		const mockSettingsManager = new MockSettingsManager(mockVirtualRoot);

		const mockConfig = {
			systemManager: mockSystemManager,
			virtualRoot: mockVirtualRoot,
			settingsManager: mockSettingsManager,
			exit: vi.fn(),
			sizeRef: { current: new Vector2(80, 24) },
		};
		shell = new Shell(mockConfig);
	});

	it("executes echo and captures output in history", async () => {
		await shell.run("echo Hello World");

		const output = shell.state.history.at(-1);
		expect(output?.displayText).toBe("Hello World");
	});

	it("respects the -n flag in echo to omit newline", async () => {
		await shell.run("echo -n No Newline");

		expect(shell.state.ttyBuffer).toBe("No Newline");
	});

	it("pipes output from echo to rev", async () => {
		await shell.run("echo hello | rev");

		const output = shell.state.history.at(-1);
		if (shell.state.ttyBuffer === "olleh") {
			expect(shell.state.ttyBuffer).toBe("olleh");
		} else {
			expect(output?.displayText).toBe("olleh");
		}
	});

	it("properly reports command not found in a pipeline and stops", async () => {
		const exitCode = await shell.run("fakecommand | rev");

		expect(exitCode).toBe(EXIT_CODE.success);
        
		const historyTexts = shell.state.history.map((entry) => entry.displayText);
		expect(historyTexts.some((text) => text?.includes("fakecommand: Command not found"))).toBe(true);
	});

	it("handles complex pipelines with multiple stages", async () => {
		await shell.run("echo abc | rev | rev");

		const output = shell.state.history.at(-1);
		expect(output?.displayText).toBe("abc");
	});
});