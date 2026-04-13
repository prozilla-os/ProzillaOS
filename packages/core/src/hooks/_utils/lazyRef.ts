import { MutableRefObject, useRef } from "react";

/**
 * A hook that initializes a ref lazily. 
 * Ensures the initializer function is only called once during the initial mount.
 * @param create - A factory function that returns the initial value.
 */
export function useLazyRef<T>(create: () => T) {
	const ref = useRef<T | null>(null);
	if (ref.current === null) {
		ref.current = create();
	}
	return ref as MutableRefObject<T>;
}