import { FC, ReactNode } from "react";
import { ModalsProvider } from "./modalsProvider";
import { modalsManagerContext } from "./modalsManagerContext";
import { ModalsManager } from "../../features";
import { useSingleton } from "../_utils";

export const ModalsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const modalsManager = useSingleton(() => new ModalsManager());

	return <modalsManagerContext.Provider value={modalsManager}>
		<ModalsProvider modalsManager={modalsManager}>
			{children}
		</ModalsProvider>
	</modalsManagerContext.Provider>;
};