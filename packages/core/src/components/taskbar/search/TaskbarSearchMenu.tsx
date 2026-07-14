import styles from "./TaskbarSearchMenu.module.css";
import appStyles from "../TaskbarMenus.module.css";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { useClassNames, useInstalledApps, useKeyboardListener, UseKeyboardListenerParams, useWindowsManager } from "../../../hooks";
import { VectorImage } from "../../_utils/vector-image/VectorImage";
import { useTaskbarContext } from "../taskbarSlots";

export function TaskbarSearchMenu() {
	const { searchQuery, setSearchQuery, searchInputRef, activeMenu, toggleMenu } = useTaskbarContext();
	const active = activeMenu === "search";
	const windowsManager = useWindowsManager();
	const installedApps = useInstalledApps();
	const [tabIndex, setTabIndex] = useState(active ? 0 : -1);

	useEffect(() => {
		setTabIndex(active ? 0 : -1);
	}, [active]);

	useEffect(() => {
		if (searchInputRef.current != null) {
			searchInputRef.current.focus();
			window.scrollTo(0, document.body.scrollHeight);
		}
	}, [searchInputRef]);

	const apps = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();

		if (query === "")
			return installedApps;

		return installedApps.filter(({ name, id }) =>
			name.toLowerCase().includes(query)
			|| id.toLowerCase().includes(query)
		);
	}, [installedApps, searchQuery]);

	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		const value = event.target.value;
		setSearchQuery(value);
	}, [setSearchQuery]);

	const listeners = useMemo<UseKeyboardListenerParams>(() => ({
		onKeyDown: (event: KeyboardEvent) => {
			if ((event.key === "f" || event.key === "g") && event.ctrlKey && !active) {
				event.preventDefault();
				toggleMenu("search", false);
			} else if (event.key === "Escape" && active) {
				event.preventDefault();
				toggleMenu("search", false);
			} else if (event.key === "Enter" && active) {
				event.preventDefault();
				if (apps.length > 0) {
					windowsManager?.open(apps[0].id);
				}
				toggleMenu("search", false);
			}
		},
	}), [active, toggleMenu]);

	useKeyboardListener(listeners);

	const appButtonClassName = useClassNames([appStyles.AppButton], "SearchMenu", "AppButton");

	const classNames = [styles.SearchMenuContainer];
	if (active)
		classNames.push(styles.Active);

	return <div className={useClassNames(classNames)}>
		<div className={useClassNames([styles.SearchMenu], "Taskbar", "Menu", "Search")}>
			<div className={useClassNames([appStyles.AppList], "SearchMenu", "AppList")}>
				{apps.map(({ name, id, iconUrl }) =>
					<button
						key={id}
						className={appButtonClassName}
						tabIndex={tabIndex}
						onClick={() => {
							toggleMenu("search", false);
							windowsManager?.open(id);
						}}
					>
						<VectorImage src={iconUrl ?? ""}/>
						<p>{name}</p>
					</button>
				)}
			</div>
			<input
				ref={searchInputRef}
				className={useClassNames([styles.Input], "SearchMenu", "Input")}
				aria-label="Search query"
				tabIndex={tabIndex}
				value={searchQuery}
				onChange={onChange}
				spellCheck={false}
				placeholder="Search..."
			/>
		</div>
	</div>;
}