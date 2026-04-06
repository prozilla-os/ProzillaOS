import { MutableRefObject, useRef } from "react";

export function useLazyRef<T>(create: () => T) {
	const ref = useRef<T | null>(null);
	if (ref.current === null) {
		ref.current = create();
	}
	return ref as MutableRefObject<T>;
}