import { Image, Button } from "@prozilla-os/core";
import { type RegistryEntrySnapshot } from "../../core/appRegistry";
import styles from "./FeaturedHero.module.css";

interface FeaturedHeroProps {
	entry: RegistryEntrySnapshot;
	onInstall: () => void;
	onUninstall: () => void;
	onOpen: () => void;
}

export function FeaturedHero({ entry, onInstall, onUninstall, onOpen }: FeaturedHeroProps) {
	const { name, iconUrl, description, isInstalled } = entry;

	return <div className={styles.FeaturedHero} onClick={onOpen} style={{ cursor: "pointer" }}>
		<div className={styles.HeroIcon}>
			{iconUrl && <Image src={iconUrl}/>}
		</div>
		<div className={styles.HeroContent}>
			<p className={styles.HeroLabel}>Featured app</p>
			<h2 className={styles.HeroName}>{name}</h2>
			<p className={styles.HeroDescription}>
				{description ?? "No description available."}
			</p>
		</div>
		<div className={styles.HeroButton} onClick={(event) => { event.stopPropagation(); }}>
			{isInstalled
				? <Button onClick={onUninstall}>Uninstall</Button>
				: <Button onClick={onInstall}>Install</Button>
			}
		</div>
	</div>;
}
