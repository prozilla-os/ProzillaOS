import styles from "./HeaderMenu.module.css";
import { ActionsProps, Actions } from "../../../actions/Actions";
import { STYLES } from "../../../../config/actions.config";


export function HeaderMenu({ children, ...props }: ActionsProps) {
	return <div className={styles.HeaderMenu}>
		<Actions className={STYLES.HEADER_MENU} {...props}>
			{children}
		</Actions>
	</div>;
}