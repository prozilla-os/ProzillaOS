import styles from "./SearchMenu.module.css";
import appStyles from "./AppList.module.css";
import ApplicationsManager from "../../features/applications/applications.js";
import { useWindowsManager } from "../../hooks/windows/WindowsManagerContext.js";
import { ReactSVG } from "react-svg";
import { useEffect } from "react";

export function SearchMenu({ active, setActive, searchQuery, setSearchQuery, inputRef }) {
	const windowsManager = useWindowsManager();

	useEffect(() => {
		if (inputRef.current)
			inputRef.current.focus();
	}, [inputRef]);

	const onChange = (event) => {
		const value = event.target.value;
		setSearchQuery(value);
	}

	const classNames = [styles["Container-outer"]];
	if (active)
		classNames.push(styles.Active);

	return (
		<div className={classNames.join(" ")}>
			<div className={styles["Container-inner"]}>
				<div className={appStyles["App-list"]}>
					{ApplicationsManager.APPLICATIONS.filter(({ name }) =>
						name.toLowerCase().includes(searchQuery.toLowerCase().trim())
					).map(({ name, id }) => 
						<button
							key={id}
							className={appStyles["App-button"]}
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
				<input
					ref={inputRef}
					className={styles.Input}
					value={searchQuery}
					onChange={onChange}
					spellCheck={false}
					autoFocus
				/>
			</div>
		</div>
	);
}