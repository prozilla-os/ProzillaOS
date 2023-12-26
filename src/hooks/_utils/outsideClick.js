/**
 * https://stackoverflow.com/a/42234988
 */

import { useRef, useEffect, memo } from "react";

function useOutsideClickListener(ref, callback) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(event);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}

/**
 * @param {object} props
 * @param {Function} props.onOutsideClick
 * @param {import("react").ElementType} props.children
 */
const OutsideClickListener = memo(({ onOutsideClick, children }) => {
	const wrapperRef = useRef(null);
	useOutsideClickListener(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
});

export default OutsideClickListener;