import { describe, it, expect, vi, beforeEach } from "vitest";
import { CommandsManager, Shell, ShellConfig, ShellInterpreter, Stream, Command } from "../../../src/features";
import { EXIT_CODE } from "../../../src/constants";
import { MockSystemManager } from "../system/system.utils";
import { MockVirtualRoot } from "../virtual-drive/virtualDrive.utils";
import { MockSettingsManager } from "../settings/settings.utils";
import { Vector2 } from "@prozilla-os/shared";
import { Process } from "../../../src/features/shell/shell";

describe("ShellInterpreter", () => {
	let interpreter: ShellInterpreter;
	let successCommand: Command;
	let failCommand: Command;

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
		const mockShell = new Shell(mockConfig);

		interpreter = mockShell.interpreter;

		successCommand = new Command()
			.setName("success")
			.setExecute(() => EXIT_CODE.success);

		failCommand = new Command()
			.setName("fail")
			.setExecute(() => EXIT_CODE.generalError);

		vi.spyOn(CommandsManager, "find").mockImplementation((name: string): Command | null => {
			if (name === "success" || name === "true" || name === "echo") return successCommand;
			if (name === "fail") return failCommand;
			return null;
		});
	});

	it("should return success when executing an empty string", async () => {
		const exitCode = await interpreter.execute("");
		expect(exitCode).toBe(EXIT_CODE.success);
	});

	it("should respect logical AND (&&) operator and short-circuit on failure", async () => {
		const exitCode = await interpreter.execute("fail && success");
		expect(exitCode).toBe(EXIT_CODE.generalError);
	});

	it("should respect logical OR (||) operator and short-circuit on success", async () => {
		const exitCode = await interpreter.execute("success || fail");
		expect(exitCode).toBe(EXIT_CODE.success);
	});

	it("should handle piped commands correctly", async () => {
		await interpreter.execute("echo hello | echo world");
		expect(interpreter.pipeline.length).toBe(0);
	});

	it("should terminate all processes in the pipeline when requested", () => {
		const mockProcess: Process = {
			stdin: new Stream(),
			stdout: new Stream(),
			stderr: new Stream(),
			commandName: "test",
			args: ["test"],
		};
		
		const signalSpy = vi.spyOn(mockProcess.stdin, "signal");
		interpreter.pipeline = [mockProcess];

		interpreter.terminatePipeline("SIGINT");

		expect(signalSpy).toHaveBeenCalledWith("SIGINT");
		expect(interpreter.pipeline.length).toBe(0);
	});

	it("should return command not found error for invalid commands", async () => {
		vi.spyOn(CommandsManager, "find").mockReturnValue(null);
		const stderr = new Stream().start();
		let errorOutput = "";
		
		stderr.on(Stream.DATA_EVENT, function(this: void, data: string) {
			errorOutput += data;
		});

		const exitCode = await interpreter.execute("invalid_cmd", [], { stderr });
		
		expect(exitCode).toBe(EXIT_CODE.commandNotFound);
		expect(errorOutput).toContain(Shell.COMMAND_NOT_FOUND_ERROR);
	});
});