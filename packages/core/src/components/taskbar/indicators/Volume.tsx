import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Volume.module.css";
import { useClassNames } from "../../../hooks/_utils/classNames";

interface VolumeProps {
	hideUtilMenus: boolean;
	showUtilMenu: Function;
}

export function Volume({ hideUtilMenus, showUtilMenu }: VolumeProps) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	const updateShowMenu = (show: boolean) => {
		if (show)
			showUtilMenu();

		setShowMenu(show);
	};

	return (<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
		<button title="Volume" className={useClassNames([], "Taskbar", "Indicator", "Volume")} tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
			<FontAwesomeIcon icon={faVolumeHigh}/>
		</button>
		<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
			<FontAwesomeIcon icon={faVolumeHigh}/>
			<p>100%</p>
		</UtilMenu>
	</OutsideClickListener>);
}