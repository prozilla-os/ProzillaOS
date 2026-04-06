import { FC, ReactNode } from "react";
import { ModalsProvider } from "./modalsProvider";
import { modalsManagerContext } from "./modalsManagerContext";
import { ModalsManager } from "../../features";
import { useLazyRef } from "../_utils";

export const ModalsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const modalsManagerRef = useLazyRef(() => new ModalsManager());

	return <modalsManagerContext.Provider value={modalsManagerRef.current}>
		<ModalsProvider modalsManager={modalsManagerRef.current}>
			{children}
		</ModalsProvider>
	</modalsManagerContext.Provider>;
};