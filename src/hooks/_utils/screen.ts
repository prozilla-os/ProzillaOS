import { Ref, useEffect, useRef, useState } from "react";
import { TASKBAR_HEIGHT } from "../../config/taskbar.config";

export function useScreenDimensions(): [screenWidth: number | null, screenHeight: number | null] {
	const [screenWidth, setScreenWidth] = useState<number | null>(null);
	const [screenHeight, setScreenHeight] = useState<number | null>(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((event) => {
			setScreenWidth(event[0].contentBoxSize[0].inlineSize);
			setScreenHeight(event[0].contentBoxSize[0].blockSize);
		});

		const root = document.getElementById("root");

		if (root == null)
			throw new Error("Root is null: No element with ID 'root' found");

		resizeObserver.observe(root);
	}, []);

	return [screenWidth, screenHeight];
}

export function useScreenBounds({ avoidTaskbar = true }: { avoidTaskbar: boolean; }): {
	ref: Ref<HTMLElement>;
	initiated: boolean;
	alignLeft: boolean;
	alignTop: boolean;
} {
	const ref = useRef(null);
	const [initiated, setInitiated] = useState(false);
	const [alignLeft, setAlignLeft] = useState(false);
	const [alignTop, setAlignTop] = useState(false);
	const [screenWidth, screenHeight] = useScreenDimensions();

	useEffect(() => {
		if (ref.current == null || screenWidth == null || screenHeight == null)
			return;

		const rect = (ref.current as HTMLElement).getBoundingClientRect();
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