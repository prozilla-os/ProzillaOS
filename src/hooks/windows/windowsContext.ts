import { createContext, useContext } from "react";
import { WindowProps } from "../../components/windows/WindowView";

export type WindowsState = WindowProps[] | undefined;

export const WindowsContext = createContext<WindowsState>(undefined);

export function useWindows(): WindowsState {
	return useContext(WindowsContext);
}