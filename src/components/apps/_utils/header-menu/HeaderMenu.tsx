import styles from "./HeaderMenu.module.css";
import { ActionsProps, Actions, STYLES } from "../../../actions/Actions";


export function HeaderMenu({ children, ...props }: ActionsProps) {
	return <div className={styles.Container}>
		<Actions className={STYLES.HEADER_MENU} {...props}>
			{children}
		</Actions>
	</div>;
}