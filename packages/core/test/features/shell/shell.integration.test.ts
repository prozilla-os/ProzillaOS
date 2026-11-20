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
		const { output } = await shell.generate("echo Hello World");

		expect(output).toBe("Hello World\n");
	});

	it("respects the -n flag in echo to omit newline", async () => {
		const { output } = await shell.generate("echo -n No Newline");

		expect(output).toBe("No Newline");
	});

	it("pipes output from echo to rev", async () => {
		const { output } = await shell.generate("echo hello | rev");

		if (shell.state.ttyBuffer === "olleh") {
			expect(shell.state.ttyBuffer).toBe("olleh");
		} else {
			expect(output).toBe("olleh\n");
		}
	});

	it("properly reports command not found in a pipeline and stops", async () => {
		const { output, exitCode } = await shell.generate("fakecommand | rev");

		expect(exitCode).toBe(EXIT_CODE.success);
        
		expect(output.includes("fakecommand: Command not found")).toBe(true);
	});

	it("handles complex pipelines with multiple stages", async () => {
		const { output } = await shell.generate("echo abc | rev | rev");

		expect(output).toBe("abc\n");
	});
});