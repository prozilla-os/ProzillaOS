---
outline: 2
description: "Functions related to Vite"
package: "@prozilla-os/dev-tools"
---

# Vite functions

{{ $frontmatter.description }}

- **Source:** [`app.vite.config.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/dev-tools/src/configs/app.vite.config.ts)

## appViteConfig(basePath, entryPath)

Helper function for creating Vite configurations for ProzillaOS apps

### Parameters

- **basePath** - Path of base directory
  - **Type:** `string`
- **entryPath** - Path of library entry
  - **Type:** `string`

### Returns

See: <https://vitejs.dev/config/>

- **Type:** `vite.UserConfig`

### Example

```ts
// vite.config.ts

import { defineConfig } from "vite";
import { appViteConfig } from "@prozilla-os/dev-tools";

export default defineConfig({
	...appViteConfig(__dirname, "src/main.ts")
});
```

## stageSitePlugin(options)

A Vite (rollup) plugin for automatically staging a ProzillaOS website during the Vite build process.

This plugin generates meta files and separate HTML files for each application for SEO.

### Parameters

- **options**
  - **Type:** `StageOptions`

```ts
interface StageOptions {
	appsConfig: AppsConfig;

	/**
	 * Name of the website 
	 * @example "ProzillaOS"
	 */
	siteName: string;

	/**
	 * Tag line of the website
	 * @example "Web-based Operating System"
	*/
	siteTagLine: string;

	/**
	 * Domain of the live website
	 * 
	 * A CNAME file will be generated with this value
	 * @example "os.prozilla.dev"
	 */
	domain: string;

	/**
	 * Array of image URLs that will be added to the sitemap
	 */
	imageUrls?: string[];
}
```

### Returns

- **Type:** `rollup.Plugin`

### Example

```ts
// vite.config.ts

import { defineConfig } from "vite";
import { AppsConfig, fileExplorer, terminal, textEditor } from "prozilla-os";

export default defineConfig({
	build: {
		outDir: "dist",
		rollupOptions: {
			plugins: [
				stageSitePlugin({
					appsConfig: new AppsConfig({
						apps: [
							fileExplorer.setName("Files")
							terminal.setName("Commands")
							textEditor.setName("Notes")
						],
					}),
					siteName: "ProzillaOS",
					siteTagLine: "Web-based Operating System",
					domain: "os.prozilla.dev"
				})
			],
		},
	}
});
```
