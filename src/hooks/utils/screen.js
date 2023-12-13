import { useEffect, useState } from "react";

/**
 * @returns {[number, number]}
 */
export function useScreenDimensions() {
	const [screenWidth, setScreenWidth] = useState(null);
	const [screenHeight, setScreenHeight] = useState(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			setScreenWidth(event[0].contentBoxSize[0].inlineSize);
			setScreenHeight(event[0].contentBoxSize[0].blockSize);
		});

		resizeObserver.observe(document.getElementById("root"));
	}, []);

	return [screenWidth, screenHeight];
}