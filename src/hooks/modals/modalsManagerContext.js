import { createContext, useContext } from "react";
import ModalsManager from "../../features/modals/modalsManager.js";
import { ModalsProvider } from "./modalsContext.js";

const modalsManagerContext = createContext();

/**
 * @param {object} props
 * @param {import("react").ElementType} props.children
 * @returns {import("react").Provider<any>}
 */
export function ModalsManagerProvider({ children }) {
	const modalsManager = new ModalsManager();

	return (
		<modalsManagerContext.Provider value={modalsManager}>
			<ModalsProvider modalsManager={modalsManager}>
				{children}
			</ModalsProvider>
		</modalsManagerContext.Provider>
	);
}

/**
 * @returns {ModalsManager}
 */
export function useModalsManager() {
	return useContext(modalsManagerContext);
}