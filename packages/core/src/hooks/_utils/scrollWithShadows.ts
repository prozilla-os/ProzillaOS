import { RefObject, useCallback, useEffect, useState } from "react";

export interface UseScrollWithShadowParams<T extends HTMLElement = HTMLElement> {
	ref?: RefObject<T | null>;
	horizontal?: boolean;
	dynamicOffset?: boolean;
	dynamicOffsetFactor?: number;
	shadow?: {
		offset?: number;
		blurRadius?: number;
		spreadRadius?: number;
		color?: {
			r?: number;
			g?: number;
			b?: number;
			a?: number;
		}
	}
}

// https://medium.com/dfind-consulting/react-scroll-hook-with-shadows-9ba2d47ae32
export function useScrollWithShadow<T extends HTMLElement = HTMLElement>(params: UseScrollWithShadowParams<T>) {
	const [initiated, setInitiated] = useState(false);
	const [scrollStart, setScrollStart] = useState(0);
	const [scrollLength, setScrollLength] = useState(0);
	const [clientLength, setClientLength] = useState(0);

	if (params == null)
		params = {};
	if (params.shadow == null)
		params.shadow = {};
	if (params.shadow.color == null)
		params.shadow.color = {};

	const {
		ref,
		horizontal = true,
		dynamicOffset = true,
		dynamicOffsetFactor = 3,
		shadow: {
			offset = 8,
			blurRadius = 5,
			spreadRadius = -5,
			color: {
				r = 0,
				g = 0,
				b = 0,
				a = 50,
			},
		},
	} = params;

	const updateValues = useCallback((element: T) => {
		if (!element)
			return;

		setScrollStart(horizontal ? element.scrollLeft : element.scrollTop);
		setScrollLength(horizontal ? element.scrollWidth : element.scrollHeight);
		setClientLength(horizontal ? element.clientWidth : element.clientHeight);
	}, [horizontal]);

	const onUpdate = (event: React.UIEvent<T, UIEvent> | { target: T | null }) => {
		if (event.target) {
			updateValues(event.target as T);
		}
	};

	useEffect(() => {
		const onResize = () => {
			if (ref?.current != null) updateValues(ref.current);
		};

		if (ref?.current && !initiated) {
			setInitiated(true);
			updateValues(ref.current);
		}

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [ref, updateValues, initiated]);

	const getBoxShadow = () => {
		const startDistance = scrollStart;
		const endDistance = scrollLength - scrollStart - clientLength;

		const isStart = startDistance === 0;
		const isEnd = endDistance === 0;
		const isBetween = scrollStart > 0 && clientLength < scrollLength - scrollStart;

		let startOffset = offset;
		let endOffset = offset;

		if (dynamicOffset) {
			startOffset = startDistance * dynamicOffsetFactor - offset;
			endOffset = endDistance * dynamicOffsetFactor - offset;

			if (startOffset > offset) {
				startOffset = offset;
			} else if (startOffset < 0) {
				startOffset = 0;
			}
			if (endOffset > offset) {
				endOffset = offset;
			} else if (endOffset < 0) {
				endOffset = 0;
			}
		}

		const shadowStartOffset = horizontal ? `${startOffset}px 0` : `0 ${startOffset}px`;
		const shadowEndOffset = horizontal ? `-${endOffset}px 0` : `0 -${endOffset}px`;

		const start = `inset ${shadowStartOffset} ${blurRadius}px ${spreadRadius}px rgba(${r}, ${g}, ${b}, ${a}%)`;
		const end = `inset ${shadowEndOffset} ${blurRadius}px ${spreadRadius}px rgba(${r}, ${g}, ${b}, ${a}%)`;

		let boxShadow = "none";

		if (isStart) {
			boxShadow = end;
		} else if (isBetween) {
			boxShadow = `${start}, ${end}`;
		} else if (isEnd) {
			boxShadow = start;
		}

		return boxShadow;
	};

	return { boxShadow: getBoxShadow(), onUpdate };
}