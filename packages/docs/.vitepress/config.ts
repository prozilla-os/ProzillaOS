import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "ProzillaOS Docs",
	description: "Documentation for ProzillaOS and its packages.",
	srcDir: "src",
	base: "/docs/",
	head: [
		["link", { rel: "icon", href: "/docs/favicon.ico" }],
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
		["link", { href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap", rel: "stylesheet" }]
	],
	cleanUrls: true,
	outDir: "./dist",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Getting started", link: "/getting-started" }
		],

		sidebar: [
			{
				text: "Docs",
				items: [
					{ text: "Getting started", link: "/getting-started" },
				]
			}
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/prozilla-os/ProzillaOS" }
		],

		logo: {
			dark: "/logo-light.svg",
			light: "/logo-dark.svg"
		},

		siteTitle: "ProzillaOS"
	}
});
