import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Actions.module.css";
import { faCaretRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useState } from "react";
import { ActionProps } from "../Actions";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { useClassNames } from "../../../hooks";

export interface DropdownActionProps extends ActionProps {
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
			className={useClassNames(classNames, "Actions", "Dropdown")}
			tabIndex={0}
			onMouseEnter={() => {
				if (showOnHover)
					setShowContent(true);
			}}
			onMouseLeave={() => {
				if (showOnHover)
					setShowContent(false);
			}}
			onClick={() => {
				if (!showOnHover)
					setShowContent(!showContent);
			}}
		>
			<span className={useClassNames([styles.Label], "Actions", "Label")}>
				{icon && <div className={styles.Icon}><FontAwesomeIcon icon={icon as IconDefinition}/></div>}
				<p>{label}</p>
			</span>
			<div className={styles.DropdownArrow}><FontAwesomeIcon icon={faCaretRight}/></div>
			<div className={useClassNames([styles.DropdownContent], "Actions", "Content")}>
				{children}
			</div>
		</div>
	</OutsideClickListener>;
}