import { createContext, FC, ReactNode, useCallback, useContext, useState } from "react";
import WindowsManager from "../../features/windows/windowsManager";
import { WindowProps } from "../../components/windows/WindowView";

type WindowsState = WindowProps[] | undefined;

const WindowsContext = createContext<WindowsState>(undefined);

export const WindowsProvider: FC<{ children: ReactNode, windowsManager: WindowsManager }> = ({ children, windowsManager }) => {
	const [windows, setWindows] = useState<WindowsState>([]);

	const updateWindows = useCallback((updatedWindows: Record<string, WindowProps>) => {
		setWindows(Object.values(updatedWindows));
	}, []);

	windowsManager.setUpdateWindows(updateWindows);

	return (
		<WindowsContext.Provider value={windows}>
			{children}
		</WindowsContext.Provider>
	);
};

export function useWindows(): WindowsState {
	return useContext(WindowsContext);
}