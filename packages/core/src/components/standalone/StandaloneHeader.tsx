import { ReactSVG } from "react-svg";
import styles from "./StandaloneHeader.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../_utils/button/Button";
import { useSystemManager } from "../../hooks/system/systemManagerContext";

interface StandaloneHeaderProps {
	exit: () => void;
}

export function StandaloneHeader({ exit }: StandaloneHeaderProps) {
	const { systemName, skin } = useSystemManager();

	return <header className={styles.Header}>
		<a className={styles.Logo} href="/" tabIndex={0}>
			<ReactSVG src={skin.systemIcon}/>
			<h1>{systemName}</h1>
		</a>
		<Button className={styles.ExitButton} onClick={exit} icon={faTimes}>
			Exit
		</Button>
	</header>;
}