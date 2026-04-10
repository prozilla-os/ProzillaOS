import { FC, ReactNode } from "react";
import { ZIndexManagerContext } from "./zIndexManagerContext";
import { ZIndexManager } from "../../features";
import { useSingleton } from "../_utils";

export const ZIndexManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const zIndexManager = useSingleton(() => new ZIndexManager());

	return <ZIndexManagerContext.Provider value={zIndexManager}>
		{children}
	</ZIndexManagerContext.Provider>;
};