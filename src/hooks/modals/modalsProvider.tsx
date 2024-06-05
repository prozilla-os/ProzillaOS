import { FC, ReactNode, useCallback, useState } from "react";
import ModalsManager from "../../features/modals/modalsManager";
import { ModalsContext, ModalsState } from "./modalsContext";
import Modal from "../../features/modals/modal";

export const ModalsProvider: FC<{ children: ReactNode, modalsManager: ModalsManager }> = ({ children, modalsManager }) => {
	const [modals, setModals] = useState<ModalsState>([]);

	const updateModals = useCallback((updatedModals: Record<string, Modal>) => {
		setModals(Object.values(updatedModals));
	}, []);

	modalsManager.setUpdateModals(updateModals);

	return (
		<ModalsContext.Provider value={modals}>
			{children}
		</ModalsContext.Provider>
	);
};