import { createContext, useContext } from "react";
import { TrackingManager } from "../../features";

type TrackingManagerState = TrackingManager | undefined;

export const TrackingManagerContext = createContext<TrackingManagerState>(undefined);

export function useTrackingManager(): TrackingManagerState {
	return useContext(TrackingManagerContext);
}