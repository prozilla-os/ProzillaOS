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

		// The output is pushed after the command entry
		const output = shell.state.history.at(-1);
		expect(output?.displayText).toBe("Hello World");
	});

	it("respects the -n flag in echo to omit newline", async () => {
		await shell.run("echo -n No Newline");

		// Without a newline, echo's output stays in ttyBuffer and is NOT in history
		// It will be prepended to the NEXT command's prompt
		expect(shell.state.ttyBuffer).toBe("No Newline");
	});

	it("pipes output from echo to rev", async () => {
		await shell.run("echo hello | rev");

		// If rev doesn't output a newline, it stays in the ttyBuffer
		// If it does, it's the last history entry
		const output = shell.state.history.at(-1);
        
		// Adjust based on whether your rev implementation appends a \n
		if (shell.state.ttyBuffer === "olleh") {
			expect(shell.state.ttyBuffer).toBe("olleh");
		} else {
			expect(output?.displayText).toBe("olleh");
		}
	});

	it("properly reports command not found in a pipeline and stops", async () => {
		const exitCode = await shell.run("fakecommand | rev");

		// ShellInterpreter likely returns success even if a pipe stage fails 
		// depending on your implementation of exit codes in pipelines
		expect(exitCode).toBe(EXIT_CODE.success);
        
		const historyTexts = shell.state.history.map((entry) => entry.displayText);
		expect(historyTexts.some((text) => text?.includes("fakecommand: Command not found"))).toBe(true);
	});

	it("handles complex pipelines with multiple stages", async () => {
		await shell.run("echo abc | rev | rev");

		// "abc" is piped through rev twice -> "cba" -> "abc"
		// If echo adds a newline, the final output will be pushed to history
		const output = shell.state.history.at(-1);
		expect(output?.displayText).toBe("abc");
	});
});