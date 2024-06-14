import styles from "./HeaderMenu.module.css";
import { ActionsProps, Actions } from "../../../actions/Actions";
import { STYLES } from "../../../../config/actions.config";
import { useZIndex } from "../../../../hooks/z-index/zIndex";
import { ZIndexManager } from "../../../../features/z-index/zIndexManager";


export function HeaderMenu({ children, ...props }: ActionsProps) {
	const zIndex = useZIndex({ groupIndex: ZIndexManager.GROUPS.MODALS, index: 0 });

	return <div className={styles.HeaderMenu} style={{ zIndex }}>
		<Actions className={STYLES.HEADER_MENU} {...props}>
			{children}
		</Actions>
	</div>;
}