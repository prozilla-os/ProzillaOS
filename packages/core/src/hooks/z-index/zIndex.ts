import { useEffect, useState } from "react";
import { useZIndexManager } from "./zIndexManagerContext";
import { ZIndexManager } from "../../features";

export interface UseZIndexParams {
	groupIndex: number;
	index: number;
}

export function useZIndex({ groupIndex, index }: UseZIndexParams) {
	const initialIndex = (groupIndex * 10) + index;
	const [zIndex, setZIndex] = useState(initialIndex);
	const zIndexManager = useZIndexManager();

	useEffect(() => {
		const updateIndex = () => {
			const newZIndex = zIndexManager?.getIndex(groupIndex, index);

			if (newZIndex != null && zIndex !== newZIndex)
				setZIndex(newZIndex);
		};

		updateIndex();
		zIndexManager?.on(ZIndexManager.INDEX_CHANGE_EVENT, updateIndex);

		return () => {
			zIndexManager?.off(ZIndexManager.INDEX_CHANGE_EVENT, updateIndex);
		};
	}, [groupIndex, index, zIndex, zIndexManager]);

	return zIndex;
}