import styles from "./SearchMenu.module.css";
import appStyles from "./AppList.module.css";
import { AppsManager } from "../../../features/apps/appsManager";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext";
import { ChangeEventHandler, MutableRefObject, useEffect, useState } from "react";
import { useKeyboardListener } from "../../../hooks/_utils/keyboard";
import { App } from "../../../features/apps/app";
import { ReactSVG } from "react-svg";

interface SearchMenuProps {
	active: boolean;
	setActive: Function;
	searchQuery: string;
	setSearchQuery: Function;
	inputRef: MutableRefObject<HTMLInputElement>;
}

export function SearchMenu({ active, setActive, searchQuery, setSearchQuery, inputRef }: SearchMenuProps) {
	const windowsManager = useWindowsManager();
	const [apps, setApps] = useState<App[] | null>(null);
	const [tabIndex, setTabIndex] = useState(active ? 0 : -1);

	useEffect(() => {
		setTabIndex(active ? 0 : -1);
	}, [active]);

	useEffect(() => {
		if (inputRef.current != null) {
			inputRef.current.focus();
			window.scrollTo(0, document.body.scrollHeight);
		}
	}, [inputRef]);

	useEffect(() => {
		setApps(AppsManager.APPS.filter(({ name, id }) =>
			name.toLowerCase().includes(searchQuery.toLowerCase().trim())
			|| id.toLowerCase().includes(searchQuery.toLowerCase().trim())
		).sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		));
	}, [searchQuery]);

	const onChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		setSearchQuery(value);
	};

	const classNames = [styles.SearchMenuContainer];
	if (active && apps != null)
		classNames.push(styles.Active);

	const onKeyDown = (event: KeyboardEvent) => {
		if ((event.key === "f" || event.key === "g") && event.ctrlKey && !active) {
			event.preventDefault();
			setActive(true);
		} else if (event.key === "Escape" && active) {
			event.preventDefault();
			setActive(false);
		} else if (event.key === "Enter" && active) {
			event.preventDefault();
			if (apps == null) return;
			windowsManager?.open(apps[0].id);
			setActive(false);
		}
	};

	useKeyboardListener({ onKeyDown });

	return <div className={classNames.join(" ")}>
		<div className={styles.SearchMenu}>
			<div className={appStyles.AppList}>
				{apps?.map(({ name, id }) => 
					<button
						key={id}
						className={appStyles.AppButton}
						tabIndex={tabIndex}
						onClick={() => {
							setActive(false);
							windowsManager?.open(id);
						}}
					>
						<ReactSVG src={AppsManager.getAppIconUrl(id)}/>
						<p>{name}</p>
					</button>
				)}
			</div>
			<input
				ref={inputRef}
				className={styles.Input}
				aria-label="Search query"
				tabIndex={tabIndex}
				value={searchQuery}
				onChange={onChange as unknown as ChangeEventHandler}
				spellCheck={false}
				placeholder="Search..."
			/>
		</div>
	</div>;
}