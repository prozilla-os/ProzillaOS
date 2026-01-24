import { useRef, useEffect, memo, ReactNode } from "react";

// https://stackoverflow.com/a/42234988
/**
 * Calls a function when the user clicks outside of a given element
 * @param callback The function to call
 */
function useOutsideClickListener(ref: { current: HTMLElement | null }, callback: (event: Event) => void) {
	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
				callback(event);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}

export interface OutsideClickListenerProps {
	/** Function that handles clicks outside of this component */
	onOutsideClick: (event: Event) => void;
	children: ReactNode;
}

/**
 * Component that calls a function when the user clicks outside of it
 */
export const OutsideClickListener = memo(({ onOutsideClick, children }: OutsideClickListenerProps) => {
	const wrapperRef = useRef(null);
	useOutsideClickListener(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
});