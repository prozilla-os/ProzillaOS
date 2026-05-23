import { type RegistryEntrySnapshot } from "../../core/appRegistry";
import { Header } from "./Header";
import { FeaturedHero } from "./FeaturedHero";
import { AppCard } from "./AppCard";
import { DetailView } from "../detail/DetailView";
import styles from "./BrowseView.module.css";
import { type CategoryType } from "../AppCenter";
import { useSingleton } from "@prozilla-os/core";
import { randomFromArray } from "@prozilla-os/shared";

interface BrowseViewProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	category: CategoryType;
	setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
	entries: readonly RegistryEntrySnapshot[];
	selectedEntry: RegistryEntrySnapshot | null;
	onSelectEntry: (entry: RegistryEntrySnapshot | null) => void;
	onInstall: (entry: RegistryEntrySnapshot) => void;
	onUninstall: (entry: RegistryEntrySnapshot) => void;
}

export function BrowseView({
	searchQuery,
	setSearchQuery,
	category,
	setCategory,
	entries,
	selectedEntry,
	onSelectEntry,
	onInstall,
	onUninstall,
}: BrowseViewProps) {
	const featuredApp = useSingleton(() => entries.length ? randomFromArray([...entries]) : null);

	if (selectedEntry != null) {
		return <DetailView
			entry={selectedEntry}
			onBack={() => onSelectEntry(null)}
			onInstall={() => onInstall(selectedEntry)}
			onUninstall={() => onUninstall(selectedEntry)}
		/>;
	}

	const filtered = entries.filter((entry) => {
		const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase())
			|| entry.id.toLowerCase().replaceAll("-", " ").includes(searchQuery.toLowerCase())
			|| (entry.description ?? "").toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = category === "All" || entry.category === category;
		return matchesSearch && matchesCategory;
	});

	return <div className={styles.BrowseView}>
		{featuredApp != null && 
			<FeaturedHero
				entry={featuredApp}
				onInstall={() => onInstall(featuredApp)}
				onUninstall={() => onUninstall(featuredApp)}
				onOpen={() => onSelectEntry(featuredApp)}
			/>
		}
		<Header
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			entries={entries}
			category={category}
			setCategory={setCategory}
		/>
		<div className={styles.AppGrid}>
			{filtered.length > 0
				? filtered.map((entry) =>
					<AppCard
						key={entry.id}
						entry={entry}
						onOpen={() => onSelectEntry(entry)}
						onInstall={() => onInstall(entry)}
						onUninstall={() => onUninstall(entry)}
					/>
				)
				: <div className={styles.EmptyState}>
					<p>No apps found matching your search.</p>
				</div>
			}
		</div>
	</div>;
}
