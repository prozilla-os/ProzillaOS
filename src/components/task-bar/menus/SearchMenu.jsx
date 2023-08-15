import styles from "./SearchMenu.module.css";
import appStyles from "./AppList.module.css";
import ApplicationsManager from "../../../features/applications/applications.js";
import { useWindowsManager } from "../../../hooks/windows/windowsManagerContext.js";
import { ReactSVG } from "react-svg";
import { useEffect } from "react";
import { useState } from "react";
import { useKeyboardListener } from "../../../hooks/utils/keyboard.js";

/**
 * @param {object} props 
 * @param {boolean} props.active
 * @param {Function} props.setActive
 * @param {string} props.searchQuery
 * @param {Function} props.setSearchQuery
 * @param {import("react").ElementRef} props.inputRef
 */
export function SearchMenu({ active, setActive, searchQuery, setSearchQuery, inputRef }) {
	const windowsManager = useWindowsManager();
	const [apps, setApps] = useState(null);
	const [tabIndex, setTabIndex] = useState(active ? 0 : -1);

	useEffect(() => {
		setTabIndex(active ? 0 : -1);
	}, [active]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
			window.scrollTo(0, document.body.scrollHeight);
		}
	}, [inputRef]);

	useEffect(() => {
		setApps(ApplicationsManager.APPLICATIONS.filter(({ name }) =>
			name.toLowerCase().includes(searchQuery.toLowerCase().trim())
		));
	}, [searchQuery]);

	const onChange = (event) => {
		const value = event.target.value;
		setSearchQuery(value);
	};

	const classNames = [styles["Container-outer"]];
	if (active && apps)
		classNames.push(styles.Active);

	const onKeyDown = (event) => {
		if (event.key === "f" && event.ctrlKey) {
			event.preventDefault();
			setActive(true);
		}
	};

	useKeyboardListener({ onKeyDown });

	return (
		<div className={classNames.join(" ")}>
			<div className={styles["Container-inner"]}>
				<input
					ref={inputRef}
					className={styles.Input}
					aria-label="Search query"
					tabIndex={tabIndex}
					value={searchQuery}
					onChange={onChange}
					spellCheck={false}
				/>
				<div className={appStyles["App-list"]}>
					{apps?.map(({ name, id }) => 
						<button
							key={id}
							className={appStyles["App-button"]}
							tabIndex={tabIndex}
							onClick={() => {
								setActive(false);
								windowsManager.open(id);
							}}
							title={name}
						>
							<ReactSVG src={`${process.env.PUBLIC_URL}/media/applications/icons/${id}.svg`}/>
							<p>{name}</p>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}