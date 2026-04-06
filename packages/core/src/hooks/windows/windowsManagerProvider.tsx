import { FC, ReactNode } from "react";
import { WindowsManagerContext } from "./windowsManagerContext";
import { WindowsProvider } from "./windowsProvider";
import { WindowsManager } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";
import { useTrackingManager } from "../tracking/trackingManagerContext";
import { useLazyRef } from "../_utils";

export const WindowsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const systemManager = useSystemManager();
	const trackingManager = useTrackingManager();

	if (trackingManager == null)
		throw new Error("WindowsManager is missing TrackingManager");

	const windowsManagerRef = useLazyRef(() => new WindowsManager(systemManager, trackingManager));

	return <WindowsManagerContext.Provider value={windowsManagerRef.current}>
		<WindowsProvider windowsManager={windowsManagerRef.current}>
			{children}
		</WindowsProvider>
	</WindowsManagerContext.Provider>;
};