import { createContext, useContext } from "react";
import { VirtualDrive } from "../modules/virtual-drive/virtual-drive.js";

const VirtualDriveContext = createContext();

/**
 * @returns {React.Provider<any>}
 */
export function VirtualDriveProvider({ children }) {
	const virtualDrive = new VirtualDrive();

	return (
		<VirtualDriveContext.Provider value={virtualDrive}>
			{children}
		</VirtualDriveContext.Provider>
	);
}

/**
 * @returns {VirtualDrive}
 */
export function useWindowsManager() {
	return useContext(VirtualDriveContext);
}