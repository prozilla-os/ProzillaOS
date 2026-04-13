import { describe, it, expect, vi, beforeEach } from "vitest";
import { CommandsManager, Shell, ShellConfig, ShellInterpreter, Stream } from "../../../src/features";
import { EXIT_CODE } from "../../../src/constants";
import { MockSystemManager } from "../system/system.utils";
import { MockVirtualRoot } from "../virtual-drive/virtualDrive.utils";
import { MockSettingsManager } from "../settings/settings.utils";
import { Vector2 } from "@prozilla-os/shared";

describe("ShellInterpreter", () => {
	let shell: Shell;
	let interpreter: ShellInterpreter;

	beforeEach(() => {
		const mockSystemManager = new MockSystemManager();
		const mockVirtualRoot = new MockVirtualRoot(mockSystemManager);
		const mockSettingsManager = new MockSettingsManager(mockVirtualRoot);

		const mockConfig: ShellConfig = {
			systemManager: mockSystemManager,
			virtualRoot: mockVirtualRoot,
			settingsManager: mockSettingsManager,
			exit: vi.fn(),
			sizeRef: { current: new Vector2(80, 24) },
		};
		shell = new Shell(mockConfig);
		interpreter = shell.interpreter;
	});

	it("should parse simple commands into arguments", () => {
		const args = ShellInterpreter.parseCommand("echo \"hello world\" --flag");
		expect(args).toEqual(["echo", "\"hello world\"", "--flag"]);
	});

	it("should return success when executing an empty string", async () => {
		const exitCode = await interpreter.execute("");
		expect(exitCode).toBe(EXIT_CODE.success);
	});

	it("should handle piped commands by setting up a pipeline", async () => {
		const spy = vi.spyOn(interpreter, "spawn").mockResolvedValue(EXIT_CODE.success);
        
		await interpreter.execute("fortune | cowsay");
		expect(spy).toHaveBeenCalledTimes(2);

		const firstCall = spy.mock.calls[0][0];
		expect(firstCall.commandName).toBe("cowsay");

		const secondCall = spy.mock.calls[1][0];
		expect(secondCall.commandName).toBe("fortune");
        
		expect(interpreter.pipeline.length).toBe(0);
	});

	it("should return command not found error for invalid commands", async () => {
		vi.spyOn(CommandsManager, "find").mockReturnValue(null);
		const stderr = new Stream().start();
		let errorOutput = "";
		stderr.on(Stream.DATA_EVENT, (data) => errorOutput += data);

		const process = { 
			stdin: new Stream(), 
			stdout: new Stream(), 
			stderr, 
			commandName: "invalid_cmd", 
			args: ["invalid_cmd"], 
		};

		const exitCode = await interpreter.spawn(process);
        
		expect(exitCode).toBe(EXIT_CODE.commandNotFound);
		expect(errorOutput).toContain(Shell.COMMAND_NOT_FOUND_ERROR);
	});
});