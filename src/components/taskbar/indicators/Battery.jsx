import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryThreeQuarters, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./Battery.module.css";
import { UtilMenu } from "../menus/UtilMenu.jsx";
import OutsideClickListener from "../../../hooks/_utils/outsideClick.js";

/**
 * @param {object} props 
 * @param {boolean} props.hideUtilMenus 
 * @param {Function} props.showUtilMenu 
 */
export function Battery({ hideUtilMenus, showUtilMenu }) {
	const [isCharging, setIsCharging] = useState(true);
	const [percentage, setPercentage] = useState(100);
	const [showMenu, setShowMenu] = useState(false);
	// const [chargingTime, setChargingTime] = useState(0);
	// const [dischargingTime, setDischargingTime] = useState(0);

	useEffect(() => {
		navigator.getBattery?.()?.then((battery) => {
			const updateIsCharging = () => {
				setIsCharging(battery.charging);
			};

			const updatePercentage = () => {
				setPercentage(battery.level * 100);
			};

			// const updateChargingTime = () => {
			// 	setChargingTime(battery.chargingTime);
			// };

			// const updateDischargingTime = () => {
			// 	setDischargingTime(battery.dischargingTime);
			// };

			updateIsCharging();
			updatePercentage();
			// updateChargingTime();
			// updateDischargingTime();

			battery.addEventListener("chargingchange", updateIsCharging);
			battery.addEventListener("levelchange", updatePercentage);
			// battery.addEventListener("chargingtimechange", updateChargingTime);
			// battery.addEventListener("dischargingtimechange", updateDischargingTime);

			return () => {
				battery.removeEventListener("chargingchange", updateIsCharging);
				battery.removeEventListener("levelchange", updatePercentage);
				// battery.removeEventListener("chargingtimechange", updateChargingTime);
				// battery.removeEventListener("dischargingtimechange", updateDischargingTime);
			};
		});
	}, []);

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

	let icon = faBatteryFull;
	if (percentage < 10) {
		icon = faBatteryEmpty;
	} else if (percentage < 35) {
		icon = faBatteryQuarter;
	} else if (percentage < 65) {
		icon = faBatteryHalf;
	} else if (percentage < 90) {
		icon = faBatteryThreeQuarters;
	}

	return (<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
		<button className={styles.Button} title="Battery" tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
			{!isCharging
				? <FontAwesomeIcon className={styles["Charging-indicator"]} icon={faMinus}/>
				: null
			}
			<FontAwesomeIcon icon={icon}/>
		</button>
		<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
			<div>
				{!isCharging
					? <FontAwesomeIcon className={styles["Charging-indicator"]} icon={faMinus}/>
					: null
				}
				<FontAwesomeIcon icon={icon}/>
			</div>
			<p>{Math.round(percentage)}%</p>
		</UtilMenu>
	</OutsideClickListener>);
}