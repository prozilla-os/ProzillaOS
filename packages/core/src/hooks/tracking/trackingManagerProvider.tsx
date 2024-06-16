import { FC, ReactNode } from "react";
import { TrackingManagerContext } from "./trackingManagerContext";
import { TrackingManager } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";

export const TrackingManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const systemManager = useSystemManager();
	const trackingManager = new TrackingManager(systemManager).init();

	return <TrackingManagerContext.Provider value={trackingManager}>
		{children}
	</TrackingManagerContext.Provider>;
};