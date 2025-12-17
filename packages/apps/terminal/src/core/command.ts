import { App, SettingsManager, SystemManager, VirtualFolder, VirtualRoot } from "@prozilla-os/core";
import { Stream } from "./stream";
import { Dispatch, SetStateAction } from "react";
import { HistoryEntry } from "../components/Terminal";

type Option = {
	long: string,
	short: string,
	isInput: boolean
};

export type CommandResponse = string | { blank: boolean } | void | Stream;
export type ExecuteParams = {
	promptOutput?: (text: string) => void,
	pushHistory?: (entry: HistoryEntry) => void,
	virtualRoot?: VirtualRoot,
	currentDirectory: VirtualFolder,
	setCurrentDirectory?: Dispatch<SetStateAction<VirtualFolder>>,
	username?: string,
	hostname?: string,
	rawInputValue?: string,
	options?: string[],
	exit?: () => void,
	inputs?: Record<string, string>,
	timestamp: number,
	settingsManager: SettingsManager,
	systemManager: SystemManager,
	app: App,
};

type Execute = (args?: string[], params?: ExecuteParams) => CommandResponse | Promise<CommandResponse>;

type Manual = {
	purpose?: string,
	usage?: string,
	description?: string,
	options?: object
};

export class Command {
	name: string | undefined;
	options: Option[] = [];
	manual: Manual | undefined;
	requireArgs: boolean | undefined;
	requireOptions: boolean | undefined;

	execute: Execute = () => {};

	setName(name: string): Command {
		this.name = name;

		if (!this.manual?.usage) {
			if (!this.manual)
				this.manual = {};

			this.manual.usage = name;
		}

		return this;
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

	addOption({ short, long, isInput }: Option): Command {
		this.options.push({ short, long, isInput });
		return this;
	}

	getOption(key: string): Option | null {
		let matchingOption: Option | null = null;

		this.options.forEach((option) => {
			if (option.short === key || option.long === key)
				matchingOption = option;
		});

		return matchingOption;
	}
}