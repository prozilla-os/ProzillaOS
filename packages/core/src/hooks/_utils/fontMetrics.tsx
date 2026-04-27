import { useState, useEffect, useRef, useMemo, ReactElement, RefObject } from "react";
import { Vector2 } from "@prozilla-os/shared";

export interface FontMetricsParams {
	/** A reactive reference to the container element. */
	containerRef: RefObject<HTMLDivElement | null>;
	/**
	 * The character to use for doing measurements with.
	 * @default "M"
	 */
	char?: string;
	/**
	 * The amount of characters to use for measurements.
	 * @default 100
	 */
	charCount?: number;
}

export interface FontMetrics {
	/** The dimensions of a single character, in pixels. */
	charSize: Vector2;
	/** The dimensions of the container, in rows and columns. */
	containerSize: Vector2;
	/** The element to attach to the container, used for doing measurements. */
	Sentinel: () => ReactElement;
}

/**
 * Calculates the dimensions of a character and the dimensions 
 * of its container in rows and columns.
 */
export function useFontMetrics({
	containerRef,
	char = "M",
	charCount = 100,
}: FontMetricsParams): FontMetrics {
	const sentinelRef = useRef<HTMLSpanElement>(null);
	const [charSize, setCharSize] = useState(Vector2.ZERO);
	const [containerSize, setContainerSize] = useState(Vector2.ZERO);

	useEffect(() => {
		const container = containerRef.current;
		const sentinel = sentinelRef.current;
		if (!container || !sentinel)
			return;

		const measure = () => {
			requestAnimationFrame(() => {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (!container || !sentinel)
					return;

				const containerStyle = getComputedStyle(container);
				const sentinelRect = sentinel.getBoundingClientRect();

				if (!sentinelRect.width || !sentinelRect.height)
					return;

				const charWidth = sentinelRect.width / charCount;
				const charHeight = sentinelRect.height;

				const horizontalPadding = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
				const verticalPadding = parseFloat(containerStyle.paddingTop) + parseFloat(containerStyle.paddingBottom);
				const containerRect = container.getBoundingClientRect();

				const columns = Math.floor((containerRect.width - horizontalPadding) / charWidth);
				const rows = Math.floor((containerRect.height - verticalPadding) / charHeight);

				if (charWidth > 0 && charHeight > 0)
					setCharSize(new Vector2(charWidth, charHeight));
				setContainerSize(new Vector2(columns, rows));
			});
		};

		const observer = new ResizeObserver(measure);
		observer.observe(container);
		observer.observe(sentinel);

		const style = getComputedStyle(container);
		void document.fonts.load(`${style.fontSize} ${style.fontFamily}`).then(measure);
		document.fonts.addEventListener("loadingdone", measure);

		measure();

		return () => {
			observer.disconnect();
			document.fonts.removeEventListener("loadingdone", measure);
		};
	}, [containerRef, charCount]);

	const Sentinel = useMemo(() => {
		return () => 
			<span
				ref={sentinelRef}
				aria-hidden="true"
				style={{
					position: "absolute",
					pointerEvents: "none",
					visibility: "hidden",
					whiteSpace: "pre",
					left: 0,
					top: 0,
				}}
			>
				{char.repeat(charCount)}
			</span>;
	}, [char, charCount]);

	return { charSize, containerSize, Sentinel };
}