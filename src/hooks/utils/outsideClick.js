/**
 * https://stackoverflow.com/a/42234988
 */

import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClickListener(ref, callback) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
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
 * @param {Object} props
 * @param {Function} props.onOutsideClick
 */
export default function OutsideClickListener({ onOutsideClick, children }) {
	const wrapperRef = useRef(null);
	useOutsideClickListener(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
}
