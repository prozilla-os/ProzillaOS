import { FC, ReactNode } from "react";
import { WindowsManager } from "../../features/windows/windowsManager";
import { WindowsManagerContext } from "./windowsManagerContext";
import { WindowsProvider } from "./windowsProvider";

export const WindowsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const windowsManager = new WindowsManager();

	return (
		<WindowsManagerContext.Provider value={windowsManager}>
			<WindowsProvider windowsManager={windowsManager}>
				{children}
			</WindowsProvider>
		</WindowsManagerContext.Provider>
	);
};