import { createContext, useCallback, useContext, useState } from "react";
import Modal from "../../features/modals/modal.js";

const ModalsContext = createContext();

/**
 * @param props
 * @param props.children
 * @param props.modalsManager
 * @returns {import("react").Provider<any>}
 */
export function ModalsProvider({ children, modalsManager }) {
	const [modals, setModals] = useState([]);

	const updateModals = useCallback((updatedModals) => {
		setModals(Object.values(updatedModals));
	}, []);

	modalsManager.setUpdateModals(updateModals);

	return (
		<ModalsContext.Provider value={modals}>
			{children}
		</ModalsContext.Provider>
	);
}

/**
 * @returns {Modal[]}
 */
export function useModals() {
	return useContext(ModalsContext);
}