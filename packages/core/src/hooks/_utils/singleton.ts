import { useLazyRef } from "./lazyRef";

export function useSingleton<T>(create: () => T) {
	return useLazyRef(create).current;
}