import { FC, ReactNode, useCallback, useState } from "react";
import { ModalsContext, ModalsState } from "./modalsContext";
import { ModalsManager } from "../../features";
import { Modal } from "../../features/modals/modal";

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