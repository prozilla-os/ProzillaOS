import { createContext, useCallback, useContext, useState } from "react";

const WindowsContext = createContext();

/**
 * @returns {React.Provider<any>}
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

export function useWindows() {
	return useContext(WindowsContext);
}