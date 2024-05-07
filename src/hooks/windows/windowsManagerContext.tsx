import { createContext, FC, ReactNode, useContext } from "react";
import WindowsManager from "../../features/windows/windowsManager";
import { WindowsProvider } from "./windowsContext";

type WindowsManagerState = WindowsManager | undefined;

const WindowsManagerContext = createContext<WindowsManagerState>(undefined);

export const WindowsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const windowsManager = new WindowsManager();

	return (
		<WindowsManagerContext.Provider value={windowsManager}>
			<WindowsProvider windowsManager={windowsManager}>
				{children}
			</WindowsProvider>
		</WindowsManagerContext.Provider>
	);
};

export function useWindowsManager(): WindowsManagerState {
	return useContext(WindowsManagerContext);
}