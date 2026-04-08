import { Stream } from "./stream";
import { HistoryEntry } from "./shell";
import { VirtualFolder, VirtualRoot } from "../virtual-drive";
import { SettingsManager } from "../settings/settingsManager";
import { SystemManager } from "../system/systemManager";
import { App } from "../../main";
import { Vector2 } from "@prozilla-os/shared";

type Option = {
	long: string,
	short: string,
	isInput: boolean
};

export type CommandResponse = string | { blank: boolean } | void | Stream;
export type ShellContext = {
	promptOutput: (text: string) => void,
	pushHistory: (entry: HistoryEntry) => void,
	execute: (command: string) => Promise<CommandResponse>,
	virtualRoot: VirtualRoot,
	currentDirectory: VirtualFolder,
	setCurrentDirectory: (directory: VirtualFolder) => void,
	username: string,
	hostname: string,
	rawInputValue: string,
	options: string[],
	exit: () => void,
	inputs: Record<string, string>,
	timestamp: number,
	settingsManager: SettingsManager,
	systemManager: SystemManager,
	app?: App,
	readonly size: Vector2
};

type Execute = (
		((args: string[], params: ShellContext) => CommandResponse | Promise<CommandResponse>)
		| ((args: string[]) => CommandResponse | Promise<CommandResponse>)
		| (() => CommandResponse | Promise<CommandResponse>)
	);

type Manual = {
	purpose?: string,
	usage?: string,
	description?: string,
	options?: object
};

export class Command {
	#name?: string;
	options: Option[] = [];
	manual?: Manual;
	requireArgs?: boolean;
	requireOptions?: boolean;

	execute: Execute = () => {};

	setName(name?: string): Command {
		this.#name = name;

		if (name && !this.manual?.usage) {
			if (!this.manual)
				this.manual = {};

			this.manual.usage = name;
		}

		return this;
	}

	get name() {
		return this.#name ?? "";
	}

	setExecute(execute: Execute): Command {
		this.execute = execute;
		return this;
	}

	setRequireArgs(value: boolean): Command {
		this.requireArgs = value;
		return this;
	}

	setRequireOptions(value: boolean): Command {
		this.requireOptions = value;
		return this;
	}

	setManual({ purpose, usage, description, options }: Manual): Command {
		this.manual = { purpose, usage, description, options };
		return this;
	}

	addOption({ short, long, isInput = false }: Omit<Option, "isInput"> & { isInput?: boolean }): Command {
		this.options.push({ short, long, isInput });
		return this;
	}

	getOption(key: string): Option | undefined {
		return this.options.find((option) => option.short === key || option.long === key);
	}
}