import { useCallback, useEffect, useState } from "react";
import { App } from "../../features";
import { useSystemManager } from "../system/systemManagerContext";

export interface InstalledAppsOptions {
	/**
	 * Comparator function (defaults to alphabetical by name) or a boolean.
	 * If the value is `true`, the default sorting function is used, if it is `false`, the sorting step is skipped.
	 */
	sort?: ((a: App, b: App) => number) | boolean;
	/**
	 * Optional predicate to narrow the list.
	 */
	filter?: (app: App) => boolean;
}

const ALPHABETICAL_SORT = (a: App, b: App): number => a.name.localeCompare(b.name);

/**
 * Returns a reactive list of all currently installed apps.
 *
 * The list stays in sync with `appsConfig.installedApps`, it updates
 * automatically when apps are installed, uninstalled, or added.
 * 
 * **Note:** `sort` and `filter` must be stable references.
 * Passing inline functions will recreate them on every render, 
 * causing an infinite render loop (`Maximum update depth exceeded`).
 * @example
 * ```tsx
 * const installedApps = useInstalledApps();
 *
 * const filter = useCallback((app: App) => app.name.includes(query), [query]);
 * const searchResults = useInstalledApps({ filter });
 *
 * const sort = useCallback((a, b) => (a.metadata?.releaseDate ?? "").localeCompare(b.metadata?.releaseDate ?? ""), []);
 * const sortedByDate = useInstalledApps({ sort });
 * ```
 */
export function useInstalledApps(options: InstalledAppsOptions = {}) {
	const { sort, filter } = options;

	const { appsConfig } = useSystemManager();
	const [apps, setApps] = useState<App[]>([]);

	const updateApps = useCallback(() => {
		let result = [...appsConfig.installedApps];

		if (filter != null)
			result = result.filter(filter);

		if (typeof sort === "boolean") {
			if (sort)
				result.sort(ALPHABETICAL_SORT);
		} else {
			result.sort(sort ?? ALPHABETICAL_SORT);
		}

		setApps(result);
	}, [appsConfig, sort, filter]);

	useEffect(() => {
		updateApps();
		return appsConfig.onAppsChange(updateApps);
	}, [updateApps]);

	return apps;
}
