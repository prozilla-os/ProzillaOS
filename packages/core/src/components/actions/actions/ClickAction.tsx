import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Actions.module.css";
import { memo, MouseEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ActionProps } from "../Actions";
import { formatShortcut } from "../../../features";
import { ImagePreview } from "../../_utils/directory-list/ImagePreview";

export interface ClickActionProps extends ActionProps {
	icon?: string | object;
}

export const ClickAction = memo(({ actionId, label, shortcut, disabled, onTrigger, icon }: ClickActionProps) => {
	const classNames = [styles.Button];
	if (disabled)
		classNames.push(styles.Disabled);

	return (<button key={actionId} className={classNames.join(" ")} tabIndex={0} disabled={disabled} onClick={onTrigger as unknown as MouseEventHandler}>
		<span className={styles.Label}>
			{icon && <div className={styles.Icon}>
				{typeof icon == "string"
					? <ImagePreview source={icon} className={styles.ImageIcon}/>
					: <FontAwesomeIcon icon={icon as unknown as IconProp}/>
				}
			</div>}
			<p>{label}</p>
		</span>
		{shortcut && <p className={styles.Shortcut}>{formatShortcut(shortcut)}</p>}
	</button>);
});