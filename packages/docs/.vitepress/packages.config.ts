import { DefaultTheme } from "vitepress";

export interface PackageData {
	text: string;
	link: string;
	items?: DefaultTheme.SidebarItem[];
	category: "Libraries" | "Standard apps" | "Non-standard apps";
};

export const PACKAGES: PackageData[] = [
	{
		text: "prozilla-os",
		link: "prozilla-os",
		category: "Libraries"
	},
	{
		text: "@prozilla-os/core",
		link: "core",
		category: "Libraries",
		items: [
			{
				text: "Classes",
				base: "/reference/core/classes/",
				collapsed: false,
				items: [
					{
						text: "Apps",
						base: "/reference/core/classes/apps/",
						collapsed: true,
						items: [
							{ text: "App", link: "app" },
						]
					},
					{
						text: "System",
						base: "/reference/core/classes/system/",
						collapsed: true,
						items: [
							{ text: "AppsConfig", link: "apps-config" },
							{ text: "DesktopConfig", link: "desktop-config" },
							{ text: "MiscConfig", link: "misc-config" },
							{ text: "ModalsConfig", link: "modals-config" },
							{ text: "TaskbarConfig", link: "taskbar-config" },
							{ text: "TrackingConfig", link: "tracking-config" },
							{ text: "WindowsConfig", link: "windows-config" },
						]
					},
					{
						text: "Utils",
						base: "/reference/core/classes/utils/",
						collapsed: true,
						items: [
							{ text: "Vector2", link: "vector2" },
						]
					},
				]
			},
			{
				text: "Functions",
				base: "/reference/core/functions/",
				collapsed: false,
				items: [
					{ text: "Array", link: "/array" },
					{ text: "Browser", link: "/browser" },
					{ text: "Date", link: "/date" },
					{ text: "Math", link: "/math" },
				]
			},
			{
				text: "Constants",
				link: "constants"
			},
		]
	},
	{
		text: "@prozilla-os/skins",
		link: "skins",
		category: "Libraries",
		items: [
			{
				text: "Classes",
				base: "/reference/skins/classes/",
				collapsed: false,
				items: [
					{ text: "Skin", link: "skin" }
				]
			}
		]
	},
	{
		text: "@prozilla-os/shared",
		link: "shared",
		category: "Libraries",
	},
	{
		text: "@prozilla-os/calculator",
		link: "apps/calculator",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/file-explorer",
		link: "apps/file-explorer",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/media-viewer",
		link: "apps/media-viewer",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/settings",
		link: "apps/settings",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/terminal",
		link: "apps/terminal",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/text-editor",
		link: "apps/text-editor",
		category: "Standard apps",
	},
	{
		text: "@prozilla-os/logic-sim",
		link: "apps/logic-sim",
		category: "Non-standard apps",
	}
];

export const packageSidebars = (packages: PackageData[]): DefaultTheme.Sidebar => {
	const sidebar: DefaultTheme.Sidebar = {};

	packages.forEach(({ text, link, items = [] }) => {
		const base = `/reference/${link}/`;
		sidebar[base] = {
			base,
			items: [
				{
					text,
					items: [
						{ text: "Info", link: "/" },
						...items
					]
				}
			]
		};
	});

	return sidebar;
};

export const packageReferenceItems = (packages: PackageData[]): DefaultTheme.SidebarItem[] => {
	const categories: Record<string, DefaultTheme.SidebarItem> = {};

	packages.forEach(({ text, link, category }) => {
		if (!Object.keys(categories).includes(category)) {
			categories[category] = {
				text: category,
				collapsed: true, 
				items: []
			};
		}

		categories[category].items?.push({
			text,
			link
		});
	});

	return Object.values(categories);
};