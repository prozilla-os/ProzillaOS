import type { DefaultTheme } from "vitepress";
import { packageReferenceItems, PACKAGES } from "./packages.config";

export const NAVIGATION: (DefaultTheme.NavItemChildren & DefaultTheme.SidebarItem)[] = [
	{
		text: "About",
		base: "/about",
		collapsed: false,
		items: [
			{ text: "Introduction", link: "/introduction" },
			{ text: "Examples", link: "/examples" },
			{ text: "Features", link: "/features" },
		],
	},
	{
		text: "Guides",
		base: "/guides",
		collapsed: false,
		items: [
			{ text: "Getting started", link: "/getting-started" },
			{ text: "Custom app", link: "/custom-app" },
			{ text: "Self-hosting", link: "/self-hosting" },
		],
	},
	{
		text: "Reference",
		base: "/reference",
		collapsed: false,
		items: [
			{ text: "Configuration", link: "/configuration" },
			{ text: "Glossary", link: "/glossary" },
			{ text: "Packages", link: "/packages" },
			{
				items: packageReferenceItems(PACKAGES),
			},
		] as (DefaultTheme.NavItemWithLink & DefaultTheme.SidebarItem)[],
	},
];