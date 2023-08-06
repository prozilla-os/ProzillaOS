import { createContext, useContext } from "react";
import WindowsManager from "../../features/windows/windows.js";
import { WindowsProvider } from "./WindowsContext.js";

const WindowsManagerContext = createContext();

/**
 * @param {object} props
 * @param {import("react").ElementType} props.children
 * @returns {import("react").Provider<any>}
 */
export function WindowsManagerProvider({ children }) {
	const windowsManager = new WindowsManager();

	return (
		<WindowsManagerContext.Provider value={windowsManager}>
			<WindowsProvider windowsManager={windowsManager}>
				{children}
			</WindowsProvider>
		</WindowsManagerContext.Provider>
	);
}

/**
 * @returns {WindowsManager}
 */
export function useWindowsManager() {
	return useContext(WindowsManagerContext);
}