import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryThreeQuarters, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "./Battery.module.css";

export function Battery() {
	const [isCharging, setIsCharging] = useState(true);
	const [percentage, setPercentage] = useState(100);
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

	return (
		<button className={styles.Button} title="Battery" tabIndex={0}>
			{!isCharging
				? <FontAwesomeIcon className={styles["Charging-indicator"]} icon={faMinus}/>
				: null
			}
			<FontAwesomeIcon icon={icon}/>
		</button>
	);
}