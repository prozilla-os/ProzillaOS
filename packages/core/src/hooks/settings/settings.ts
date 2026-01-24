import { useCallback, useEffect, useState } from "react";
import { SettingsManager } from "../../features";
import { useSettingsManager } from "./settingsManagerContext";
import { Listener, parseBool } from "@prozilla-os/shared";

export type SettingsPath = typeof SettingsManager.VIRTUAL_PATHS[string];

/**
 * Returns the value of a setting and a function to update it
 * @param path The path of the settings file
 * @param key The key of the setting
 * @param defaultValue The default value of the setting
 * @returns The value of a setting and a function to update it
 */
export function useStringSetting(path: SettingsPath, key: string, defaultValue?: string | null) {
	return useSetting(path, key, defaultValue ?? null, (value) => value.length ? value : null, (value) => value ?? "");
}

/**
 * Returns the items of a list value of a setting and a function to update it
 * @param path The path of the settings file
 * @param key The key of the setting
 * @param defaultValue The default value of the setting
 * @returns The items of a list value of a setting and a function to update it
 */
export function useListSetting(path: SettingsPath, key: string, defaultValue?: string[]) {
	return useSetting<string[]>(path, key, defaultValue ?? [], (value) => value.length ? value.split(",") : [], (value) => value.join(","));
}

/**
 * Returns the boolean value of a setting and a function to update it
 * @param path The path of the settings file
 * @param key The key of the setting
 * @param defaultValue The default value of the setting
 * @returns The boolean value of a setting and a function to update it
 */
export function useBoolSetting(path: SettingsPath, key: string, defaultValue?: boolean) {
	return useSetting<boolean>(path, key, defaultValue ?? false, (value) => parseBool(value));
}

/**
 * Returns the integer value of a setting and a function to update it
 * @param path The path of the settings file
 * @param key The key of the setting
 * @param defaultValue The default value of the setting
 * @returns The integer value of a setting and a function to update it
 */
export function useIntSetting(path: SettingsPath, key: string, defaultValue?: number) {
	return useSetting<number>(path, key, defaultValue ?? 0, (value) => parseInt(value));
}

/**
 * Returns the value of a setting and a function to update it
 * @param path The path of the settings file
 * @param key The key of the setting
 * @param defaultValue The default value of the setting
 * @param parse A function that converts a string to a value
 * @param stringify A function that converts a value to a string
 * @returns The value of a setting and a function to update it
 */
export function useSetting<Type = string>(path: SettingsPath, key: string, defaultValue: Type, parse: (value: string) => Type, stringify: (value: Type) => string = (value) => String(value)): [Type, (value: Type | string) => void] {
	const [value, setValue] = useState<Type>(defaultValue);
	const settingsManager = useSettingsManager();

	// Read the value of the setting
	useEffect(() => {
		const settings = settingsManager?.getSettings(path);

		if (!settings)
			return;

		let listener: Listener | undefined = undefined;
		void settings.get(key, (newValue) => setValue(parse(newValue))).then((result) => {
			listener = result.listener;

			if (!result.value)
				setValue(defaultValue);
		});

		return () => {
			if (listener) settings.removeListener(listener);
		};
	}, [settingsManager]);

	// Write the value of the setting
	const set = useCallback((value: Type | string) => {
		const settings = settingsManager?.getSettings(path);

		if (typeof value !== "string")
			value = stringify(value);
		
		void settings?.set(key, value);
	}, [settingsManager]);

	return [value, set];
}