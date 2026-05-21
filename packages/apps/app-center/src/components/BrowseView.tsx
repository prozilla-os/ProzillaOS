import { App } from "@prozilla-os/core";
import { Header } from "./header/Header";
import { List } from "./list/List";
import { CategoryType } from "./AppCenter";

interface BrowseViewProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	category: CategoryType;
	setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
	apps: App[];
}

export function BrowseView({ searchQuery, setSearchQuery, category, setCategory, apps }: BrowseViewProps) {
	return <>
		<Header
			searchQuery={searchQuery}
			setSearchQuery={setSearchQuery}
			category={category}
			setCategory={setCategory}
		/>
		<List apps={apps} searchQuery={searchQuery} category={category}/>
	</>;
}
