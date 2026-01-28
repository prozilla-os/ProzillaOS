import styles from "./HeaderMenu.module.css";
import { ActionsProps, Actions } from "../../actions/Actions";
import { useZIndex } from "../../../hooks/z-index/zIndex";
import { ZIndexManager } from "../../../features/z-index/zIndexManager";
import { ActionsManager } from "../../../features/actions/actionsManager";
import { useClassNames } from "../../../hooks";

/**
 * Component that shows a header menu at the top of a window.
 */
export function HeaderMenu({ children, ...props }: ActionsProps) {
	const zIndex = useZIndex({ groupIndex: ZIndexManager.GROUPS.MODALS, index: 5 });

	return <div className={useClassNames([styles.HeaderMenu], "HeaderMenu")} style={{ zIndex }}>
		<Actions mode={ActionsManager.MODES.headerMenu} {...props}>
			{children}
		</Actions>
	</div>;
}