import { FC, ReactNode, useCallback, useState } from "react";
import { WindowsContext, WindowsState } from "./windowsContext";
import { WindowProps } from "../../components/windows/WindowView";
import { WindowsManager } from "../../features";

export const WindowsProvider: FC<{ children: ReactNode, windowsManager: WindowsManager }> = ({ children, windowsManager }) => {
	const [windows, setWindows] = useState<WindowsState>([]);

	const updateWindows = useCallback((updatedWindows: Record<string, WindowProps>) => {
		setWindows(Object.values(updatedWindows));
	}, []);

	windowsManager.setUpdateWindows(updateWindows as WindowsManager["updateWindows"]);

	return (
		<WindowsContext.Provider value={windows}>
			{children}
		</WindowsContext.Provider>
	);
};