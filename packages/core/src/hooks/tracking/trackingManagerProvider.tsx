import { FC, ReactNode } from "react";
import { TrackingManagerContext } from "./trackingManagerContext";
import { TrackingManager } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";
import { useLazyRef } from "../_utils";

export const TrackingManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const systemManager = useSystemManager();
	const trackingManagerRef = useLazyRef(() => new TrackingManager(systemManager).init());

	return <TrackingManagerContext.Provider value={trackingManagerRef.current}>
		{children}
	</TrackingManagerContext.Provider>;
};