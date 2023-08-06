/**
 * https://stackoverflow.com/a/42234988
 */

import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * @param {import("react").ElementRef} ref
 * @param {Function} callback
 */
function useOutsideClickListener(ref, callback) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 * @param event
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(event);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}

/**
 * @param {object} props
 * @param {Function} props.onOutsideClick
 * @param {import("react").ElementType} props.children
 */
export default function OutsideClickListener({ onOutsideClick, children }) {
	const wrapperRef = useRef(null);
	useOutsideClickListener(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
}
