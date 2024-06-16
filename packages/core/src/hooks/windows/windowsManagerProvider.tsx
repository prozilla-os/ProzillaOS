import { FC, ReactNode } from "react";
import { WindowsManagerContext } from "./windowsManagerContext";
import { WindowsProvider } from "./windowsProvider";
import { WindowsManager } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";
import { useTrackingManager } from "../tracking/trackingManagerContext";

export const WindowsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const systemManager = useSystemManager();
	const trackingManager = useTrackingManager();

	if (trackingManager == null)
		throw new Error("WindowsManager is missing TrackingManager");

	const windowsManager = new WindowsManager(systemManager, trackingManager);

	return (
		<WindowsManagerContext.Provider value={windowsManager}>
			<WindowsProvider windowsManager={windowsManager}>
				{children}
			</WindowsProvider>
		</WindowsManagerContext.Provider>
	);
};