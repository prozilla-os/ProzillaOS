import { FC, ReactNode } from "react";
import { ZIndexManagerContext } from "./zIndexManagerContext";
import { ZIndexManager } from "../../features";
import { useLazyRef } from "../_utils";

export const ZIndexManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const zIndexManagerRef = useLazyRef(() => new ZIndexManager());

	return <ZIndexManagerContext.Provider value={zIndexManagerRef.current}>
		{children}
	</ZIndexManagerContext.Provider>;
};