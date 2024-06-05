import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FileExplorer.module.css";
import utilStyles from "../../../styles/utils.module.css";

export function QuickAccessButton({ onClick, icon, name }) {
	return (
		<button
			tabIndex={0}
			className={`${styles.NavButton} ${utilStyles.TextSemibold}`}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon}/>
			{name}
		</button>
	);
}