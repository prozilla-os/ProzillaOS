import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OutsideClickListener from "../../../hooks/_utils/outsideClick.js";
import { UtilMenu } from "../menus/UtilMenu.jsx";
import styles from "./Volume.module.css";

/**
 * @param {object} props 
 * @param {boolean} props.hideUtilMenus 
 * @param {Function} props.showUtilMenu 
 */
export function Volume({ hideUtilMenus, showUtilMenu }) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	const updateShowMenu = (show) => {
		if (show)
			showUtilMenu();

		setShowMenu(show);
	};

	return (<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
		<button title="Volume" tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
			<FontAwesomeIcon icon={faVolumeHigh}/>
		</button>
		<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
			<FontAwesomeIcon icon={faVolumeHigh}/>
			<p>100%</p>
		</UtilMenu>
	</OutsideClickListener>);
}