import { useSystemManager, APP_CATEGORIES } from "@prozilla-os/core";
import styles from "./AppCenter.module.css";
import { Header } from "./header/Header";
import { List } from "./list/List";
import { useState } from "react";

export type CategoryType = typeof APP_CATEGORIES[number] | "All";

export function AppCenter() {
	const { appsConfig } = useSystemManager();
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState<CategoryType>("All");

	return <div className={styles.AppCenter}>
		<Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} category={category} setCategory={setCategory}/>
		<List apps={appsConfig.apps} searchQuery={searchQuery} category={category}/>
	</div>;
}