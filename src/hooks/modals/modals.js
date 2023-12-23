import { useCallback, useState } from "react";
import ModalsManager from "../../features/modals/modalsManager.js";
import Modal from "../../features/modals/modal.js";

/**
 * @returns {[ModalsManager, Modal[]]}
 */
export function useModals() {
	const modalsManager = new ModalsManager();
	const [modals, setModals] = useState([]);

	const updateModals = useCallback((updatedModals) => {
		setModals(Object.values(updatedModals));
	}, []);

	modalsManager.setUpdateModals(updateModals);
	
	return [modalsManager, modals];
}