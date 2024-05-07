import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatShortcut } from "../../../features/_utils/string.utils";
import styles from "../Actions.module.css";
import { ImagePreview } from "../../apps/file-explorer/directory-list/ImagePreview";
import { memo, MouseEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ActionProps } from "../Actions";

interface ClickActionProps extends ActionProps {
	icon?: string | object;
}

export const ClickAction = memo(({ actionId, label, shortcut, onTrigger, icon }: ClickActionProps) => {
	return (<button key={actionId} className={styles.Button} tabIndex={0} onClick={onTrigger as unknown as MouseEventHandler}>
		<span className={styles.Label}>
			{icon && <div className={styles.Icon}>
				{typeof icon == "string"
					? <ImagePreview source={icon} className={styles["Image-icon"]}/>
					: <FontAwesomeIcon icon={icon as unknown as IconProp}/>
				}
			</div>}
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>);
});