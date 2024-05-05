import React, { createContext, FC, ReactNode, useContext } from "react";
import ModalsManager from "../../features/modals/modalsManager.js";
import { ModalsProvider } from "./modalsContext";

type ModalsManagerState = ModalsManager | undefined;

const modalsManagerContext = createContext<ModalsManagerState>(undefined);

export const ModalsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const modalsManager = new ModalsManager();

	return (
		<modalsManagerContext.Provider value={modalsManager}>
			<ModalsProvider modalsManager={modalsManager}>
				{children}
			</ModalsProvider>
		</modalsManagerContext.Provider>
	);
};

export function useModalsManager(): ModalsManagerState {
	return useContext(modalsManagerContext);
}