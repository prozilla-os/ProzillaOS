import { FC, ReactNode } from "react";
import { ModalsManager } from "../../features/modals/modalsManager";
import { ModalsProvider } from "./modalsProvider";
import { modalsManagerContext } from "./modalsManagerContext";

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