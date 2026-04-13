import { describe, it, expect, vi, beforeEach } from "vitest";
import { Shell, ShellConfig, Stream } from "../../../src/features";
import { EXIT_CODE } from "../../../src/constants";
import { MockSystemManager } from "../system/system.utils";
import { MockVirtualRoot } from "../virtual-drive/virtualDrive.utils";
import { MockSettingsManager } from "../settings/settings.utils";
import { Vector2 } from "@prozilla-os/shared";

describe("Shell", () => {
	let shell: Shell;
	let mockConfig: ShellConfig;

	beforeEach(() => {
		const mockSystemManager = new MockSystemManager();
		const mockVirtualRoot = new MockVirtualRoot(mockSystemManager);
		const mockSettingsManager = new MockSettingsManager(mockVirtualRoot);

		mockConfig = {
			systemManager: mockSystemManager,
			virtualRoot: mockVirtualRoot,
			settingsManager: mockSettingsManager,
			exit: vi.fn(),
			sizeRef: { current: new Vector2(80, 24) },
		};
		shell = new Shell(mockConfig);
	});

	it("should update history index when navigating up and down", () => {
		shell.pushHistory({ text: "cmd1", isCommand: true, value: "cmd1" });
		shell.pushHistory({ text: "cmd2", isCommand: true, value: "cmd2" });

		shell.historySearch(1);
		expect(shell.state.line).toBe("cmd2");

		shell.historySearch(1);
		expect(shell.state.line).toBe("cmd1");

		shell.historySearch(-1);
		expect(shell.state.line).toBe("cmd2");
	});

	it("should reset input value after submission", async () => {
		vi.spyOn(shell.interpreter, "execute").mockResolvedValue(EXIT_CODE.success);
		shell.setLine("test command");
		await shell.run("test command");
		expect(shell.state.line).toBe("");
	});

	it("readInput should prioritize rawLine over stdin", async () => {
		const stdin = new Stream().start();
		const callback = vi.fn().mockReturnValue(EXIT_CODE.success);
        
		const result = await Shell.readInput("direct input", stdin, callback);
        
		expect(callback).toHaveBeenCalledWith("direct input");
		expect(result).toBe(EXIT_CODE.success);
	});

	it("readInput should wait for stdin if rawLine is empty", async () => {
		const stdin = new Stream().start();
		const callback = vi.fn().mockReturnValue(EXIT_CODE.success);
        
		const promise = Shell.readInput("", stdin, callback);
        
		stdin.write("piped data");
		stdin.stop();
        
		const result = await promise;
		expect(callback).toHaveBeenCalledWith("piped data");
		expect(result).toBe(EXIT_CODE.success);
	});
});