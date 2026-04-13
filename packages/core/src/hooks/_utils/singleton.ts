import { useLazyRef } from "./lazyRef";

/**
 * Returns a stable value that is instantiated only once.
 * Useful for classes or objects that should not be re-created on every render.
 * @param create - A factory function that returns the singleton instance.
 * @example
 * const systemManager = useSingleton(() => new SystemManager(systemManagerParams));
 */
export function useSingleton<T>(create: () => T) {
	return useLazyRef(create).current;
}