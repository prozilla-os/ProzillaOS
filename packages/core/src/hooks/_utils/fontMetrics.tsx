import { useState, useEffect, useRef, useMemo, ReactElement, RefObject } from "react";
import { Vector2 } from "@prozilla-os/shared";

export interface FontMetricsParams {
	/** A reactive reference to the container element. */
	containerRef: RefObject<HTMLDivElement | null>;
	/**
	 * The string to use for character measurements.
	 * @default "M".repeat(100)
	 */
	testString?: string;
}

export interface FontMetrics {
	/** The dimensions of a single character, in pixels. */
	charSize: Vector2;
	/** The dimensions of the container, in rows and columns. */
	containerSize: Vector2;
	/** The element to attach to the container, used for doing measurements. */
	sentinel: ReactElement;
}

/**
 * Calculates the dimensions of a character and the dimensions 
 * of its container in rows and columns.
 */
export function useFontMetrics({
	containerRef,
	testString = "M".repeat(100),
}: FontMetricsParams): FontMetrics {
	const sentinelRef = useRef<HTMLSpanElement>(null);
	const [charSize, setCharSize] = useState(Vector2.ZERO);
	const [containerSize, setContainerSize] = useState(Vector2.ZERO);

	useEffect(() => {
		let animationFrameId: number;

		const measure = () => {
			animationFrameId = requestAnimationFrame(() => {
				const container = containerRef.current;
				const sentinel = sentinelRef.current;

				if (!container || !sentinel)
					return;

				const sentinelRect = sentinel.getBoundingClientRect();
				if (!sentinelRect.width || !sentinelRect.height)
					return;

				const containerRect = container.getBoundingClientRect();
				const scaleX = container.offsetWidth > 0 ? containerRect.width / container.offsetWidth : 1;
				const scaleY = container.offsetHeight > 0 ? containerRect.height / container.offsetHeight : 1;

				const charWidth = sentinelRect.width / scaleX / testString.length;
				const charHeight = sentinelRect.height / scaleY;

				if (charWidth <= 0 || charHeight <= 0)
					return;

				const containerStyle = getComputedStyle(container);
				const horizontalPadding = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
				const verticalPadding = parseFloat(containerStyle.paddingTop) + parseFloat(containerStyle.paddingBottom);

				const contentWidth = container.clientWidth - horizontalPadding;
				const contentHeight = container.clientHeight - verticalPadding;

				const columns = Math.floor(contentWidth / charWidth);
				const rows = Math.floor(contentHeight / charHeight);

				setCharSize(new Vector2(charWidth, charHeight));
				setContainerSize(new Vector2(columns, rows));
			});
		};

		const container = containerRef.current;
		const sentinel = sentinelRef.current;

		if (!container || !sentinel)
			return;

		const observer = new ResizeObserver(measure);
		observer.observe(container);
		observer.observe(sentinel);

		container.addEventListener("transitionend", measure);
		container.addEventListener("animationend", measure);

		const style = getComputedStyle(container);
		void document.fonts.load(`${style.fontSize} ${style.fontFamily}`).then(measure).catch(() => null);
		document.fonts.addEventListener("loadingdone", measure);

		measure();

		return () => {
			cancelAnimationFrame(animationFrameId);
			observer.disconnect();
			container.removeEventListener("transitionend", measure);
			container.removeEventListener("animationend", measure);
			document.fonts.removeEventListener("loadingdone", measure);
		};
	}, [containerRef, testString]);

	const sentinel = useMemo(() => {
		return <span
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
			{testString}
		</span>;
	}, [testString]);

	return { charSize, containerSize, sentinel };
}