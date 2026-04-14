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

		const lastEntry = shell.state.history[shell.state.history.length - 1];
		expect(lastEntry.text).toBe("Hello World\n");
	});

	it("respects the -n flag in echo to omit newline", async () => {
		await shell.run("echo -n No Newline");

		const lastEntry = shell.state.history[shell.state.history.length - 1];
		expect(lastEntry.text).toBe("No Newline");
	});

	it("pipes output from echo to rev", async () => {
		// This tests the logic: echo (stdout) -> rev (stdin) -> shell (out)
		await shell.run("echo -n hello | rev");

		const lastEntry = shell.state.history[shell.state.history.length - 1];
		expect(lastEntry.text).toBe("olleh");
	});

	it("pipes multi-line output through cowsay", async () => {
		await shell.run("echo -n \"Hi\nCow\" | cowsay");

		const lastEntry = shell.state.history[shell.state.history.length - 1];
        
		// Verify the speech bubble contains both lines
		expect(lastEntry.text).toContain("Hi");
		expect(lastEntry.text).toContain("Cow");
		// Verify the cow art is present
		expect(lastEntry.text).toContain("^__^");
		expect(lastEntry.text).toContain("(oo)");
	});

	it("handles complex pipelines with multiple stages", async () => {
		await shell.run("echo -n abc | rev | rev");

		const lastEntry = shell.state.history[shell.state.history.length - 1];
		expect(lastEntry.text).toBe("abc");
	});

	it("properly reports command not found in a pipeline and stops", async () => {
		const exitCode = await shell.run("fakecommand | rev");

		expect(exitCode).toBe(EXIT_CODE.success);
        
		const historyTexts = shell.state.history.map((entry) => entry.text);
		expect(historyTexts.some((text) => text?.includes("fakecommand: Command not found"))).toBe(true);
	});

	it("handles quoted arguments with spaces in pipelines", async () => {
		await shell.run("echo -n \"spaced text\" | rev");

		const lastEntry = shell.state.history[shell.state.history.length - 1];
		expect(lastEntry.text).toBe("txet decaps");
	});
});