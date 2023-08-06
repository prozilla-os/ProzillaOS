import { createContext, useCallback, useContext, useState } from "react";

const WindowsContext = createContext();

/**
 * @param props
 * @param props.children
 * @param props.windowsManager
 * @returns {import("react").Provider<any>}
 */
export function WindowsProvider({ children, windowsManager }) {
	const [windows, setWindows] = useState([]);

	const updateWindows = useCallback((updatedWindows) => {
		// console.log(updatedWindows);
		setWindows(Object.values(updatedWindows));
	}, []);

	windowsManager.setUpdateWindows(updateWindows);

	return (
		<WindowsContext.Provider value={windows}>
			{children}
		</WindowsContext.Provider>
	);
}

/**
 * @returns {object[]}
 */
export function useWindows() {
	return useContext(WindowsContext);
}