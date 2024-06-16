import { createContext, useContext } from "react";
import { WindowsManager } from "../../features/windows/windowsManager";

type WindowsManagerState = WindowsManager | undefined;

export const WindowsManagerContext = createContext<WindowsManagerState>(undefined);

export function useWindowsManager(): WindowsManagerState {
	return useContext(WindowsManagerContext);
}