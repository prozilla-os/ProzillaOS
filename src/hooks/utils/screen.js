import { useEffect, useRef, useState } from "react";
import { TASKBAR_HEIGHT } from "../../config/taskbar.config.js";

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

/**
 * @param {object} props 
 * @param {boolean} props.avoidTaskbar
 * @returns {{
 * 	ref,
 * 	initiated: boolean,
 * 	alignLeft: boolean,
 * 	alignTop: boolean
 * }}
 */
export function useScreenBounds({ avoidTaskbar = true }) {
	const ref = useRef(null);
	const [initiated, setInitiated] = useState(false);
	const [alignLeft, setAlignLeft] = useState(false);
	const [alignTop, setAlignTop] = useState(false);
	const [screenWidth, screenHeight] = useScreenDimensions();

	useEffect(() => {
		if (ref.current == null || screenWidth == null || screenHeight == null)
			return;

		const rect = ref.current.getBoundingClientRect();
		const maxX = screenWidth;
		let maxY = screenHeight;

		if (avoidTaskbar)
			maxY -= TASKBAR_HEIGHT;

		const isOverflowingRight = (rect.x + rect.width > maxX);
		const isOverflowingBottom = (rect.y + rect.height > maxY);

		if (isOverflowingRight)
			setAlignLeft(true);
		if (isOverflowingBottom)
			setAlignTop(true);

		setInitiated(true);
	}, [alignLeft, avoidTaskbar, screenHeight, screenWidth]);

	return { ref, initiated, alignLeft, alignTop };
}