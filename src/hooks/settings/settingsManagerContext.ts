import { createContext, useContext } from "react";
import { SettingsManager } from "../../features/settings/settingsManager";

type SettingsManagerState = SettingsManager | undefined;

export const SettingsManagerContext = createContext<SettingsManagerState>(undefined);

export function useSettingsManager(): SettingsManagerState {
	return useContext(SettingsManagerContext);
}