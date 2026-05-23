import { Image, Button, removeUrlProtocol } from "@prozilla-os/core";
import { type RegistryEntrySnapshot } from "../../core/appRegistry";
import styles from "./DetailView.module.css";

interface DetailViewProps {
	entry: RegistryEntrySnapshot;
	onBack: () => void;
	onInstall: () => void;
	onUninstall: () => void;
}

export function DetailView({ entry, onBack, onInstall, onUninstall }: DetailViewProps) {
	const { name, id, iconUrl, description, category, author, version, isInstalled, screenshots, website: developerWebsite, releaseDate } = entry;

	return <div className={styles.DetailView}>
		<button className={styles.BackButton} onClick={onBack}>
			<span>&larr;</span> Back to browse
		</button>

		<div className={styles.HeroSection}>
			<div className={styles.HeroIcon}>
				{iconUrl && <Image src={iconUrl}/>}
			</div>
			<h1 className={styles.HeroName}>{name}</h1>
			<div className={styles.HeroMeta}>
				{author != null &&
					<p className={styles.MetaItem}><strong>{author}</strong></p>
				}
				{version != null &&
					<p className={styles.MetaItem}>Version {version}</p>
				}
				{category != null &&
					<p className={styles.MetaItem}>{category}</p>
				}
			</div>
			<div className={styles.ActionButton}>
				{isInstalled
					? <Button className={styles.UninstallButton} onClick={onUninstall}>Uninstall</Button>
					: <Button className={styles.InstallButton} onClick={onInstall}>Install</Button>
				}
			</div>
		</div>

		<div className={styles.ContentSection}>
			{description != null &&
				<div className={styles.Section}>
					<h3 className={styles.SectionTitle}>Description</h3>
					<p className={styles.SectionText}>{description}</p>
				</div>
			}

			{screenshots != null && screenshots.length > 0 &&
				<div className={styles.Section}>
					<h3 className={styles.SectionTitle}>Screenshots</h3>
					<div className={styles.Screenshots}>
						{screenshots.map((url, index) =>
							<div key={index} className={styles.Screenshot}>
								<img src={url} alt={`Screenshot of ${name}`}/>
							</div>
						)}
					</div>
				</div>
			}

			<div className={styles.Section}>
				<h3 className={styles.SectionTitle}>Details</h3>
				<div className={styles.DetailsGrid}>
					{version != null &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>Version</p>
							<p className={styles.DetailValue}>{version}</p>
						</div>
					}
					{author != null &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>Developer</p>
							<p className={styles.DetailValue}>{author}</p>
						</div>
					}
					{category != null &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>Category</p>
							<p className={styles.DetailValue}>{category}</p>
						</div>
					}
					{id &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>App ID</p>
							<p className={styles.DetailValue}>{id}</p>
						</div>
					}
					{releaseDate != null &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>Release date</p>
							<p className={styles.DetailValue}>{releaseDate}</p>
						</div>
					}
					{developerWebsite != null &&
						<div className={styles.DetailItem}>
							<p className={styles.DetailLabel}>Website</p>
							<a className={styles.DetailValue} href={developerWebsite}>{removeUrlProtocol(developerWebsite)}</a>
						</div>
					}
				</div>
			</div>
		</div>
	</div>;
}
