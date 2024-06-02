import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Actions.module.css";
import { faCaretRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import { ActionProps } from "../Actions";
import OutsideClickListener from "../../../hooks/_utils/outsideClick";

interface DropdownActionProps extends ActionProps {
	showOnHover?: boolean;
}

export function DropdownAction({ label, icon, children, showOnHover = true }: DropdownActionProps): ReactElement {
	const [showContent, setShowContent] = useState(false);

	const classNames = [styles.Dropdown];
	if (showContent)
		classNames.push(styles.Active);

	return <OutsideClickListener onOutsideClick={() => {
		if (!showOnHover)
			setShowContent(false);
	}}>
		<div
			key={label}
			className={classNames.join(" ")}
			tabIndex={0}
			onMouseEnter={showOnHover ? () => { setShowContent(true); } : null}
			onMouseLeave={showOnHover ? () => { setShowContent(false); } : null}
			onClick={!showOnHover ? () => { setShowContent(!showContent); } : null}
		>
			<span className={styles.Label}>
				{icon && <div className={styles.Icon}><FontAwesomeIcon icon={icon as IconDefinition}/></div>}
				<p>{label}</p>
			</span>
			<div className={styles["Dropdown-arrow"]}><FontAwesomeIcon icon={faCaretRight}/></div>
			<div className={styles["Dropdown-content"]}>
				{children}
			</div>
		</div>
	</OutsideClickListener>;
}