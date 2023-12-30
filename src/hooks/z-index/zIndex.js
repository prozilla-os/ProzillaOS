import { useEffect, useState } from "react";
import { useZIndexManager } from "./zIndexManagerContext.js";
import { ZIndexManager } from "../../features/z-index/zIndexManager.js";

export function useZIndex({ groupIndex, index }) {
	const initialIndex = (groupIndex * 10) + index;
	const [zIndex, setZIndex] = useState(initialIndex);
	const zIndexManager = useZIndexManager();

	useEffect(() => {
		const updateIndex = () => {
			const newZIndex = zIndexManager.getIndex(groupIndex, index);

			if (zIndex !== newZIndex)
				setZIndex(newZIndex);
		};

		updateIndex();
		zIndexManager.on(ZIndexManager.EVENT_NAMES.INDEX_CHANGE, updateIndex);

		return () => {
			zIndexManager.off(ZIndexManager.EVENT_NAMES.INDEX_CHANGE, updateIndex);
		};
	}, [groupIndex, index, zIndex, zIndexManager]);

	return zIndex;
}