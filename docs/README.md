[← Back](../README.md)

# Documentation

## Pages

- [Features](features/README.md)
- [Configuration](configuration/README.md)
- [Design](design/README.md)
- [FAQ](faq/README.md)
- [Roadmap](roadmap/README.md)
- [Contributing](contributing/README.md)

## Overview

### Quickstart

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the web server and go to [localhost:3000](http://localhost:3000/).

### How to run

These are the scripts in logical order, that will be available when you have installed the dependencies. Note that certain scripts can be omitted by running another script. For more information about scripts #1, #2 and #3, check the [officiel Vite documentation](https://vitejs.dev/guide/cli.html).

1. `npm run start`

	Start Vite dev server at [localhost:3000](http://localhost:3000/). Changes to module will dynamically be hot-reloaded, so normally there is no need for hard-refreshes. 

2. `npm run build`

	Compile project using TypeScript and bundle all files into the `dist` directory. This directory can be uploaded to a web server.

3. `npm run serve`

	Start web server with preview of build at [localhost:8080](http://localhost:8080/). Can be useful for testing build before deploying.

4. `npm run stage`

	Run [node program](../src/tools/stage.ts) that stages the build and prepares it for deployment. Script will generate a sitemap, CNAME file, etc.

5. `npm run deploy`

	Run scripts #2 and #4, then execute [deploy.sh](../deploy.sh), which deploys the staged build to GitHub Pages on branch called `gh-pages`.

> [!IMPORTANT]  
> Check the "Deployment" section on the [Configuration](./configuration/README.md) page, to see what configurations must be made before starting the staging or deployment process.

> [!NOTE]  
> After this deployment process, GitHub Pages will run its own build step to finalize the deployment, as seen in the `Actions` tab on GitHub. This usually takes less than a minute and once it's done, your deployment will be live.

### Other scripts

- `npm run fetch`

	Fetch the repository tree using GitHub's API and store it as a JSON file that will be used to populate the virtual drive. More information can be found on the [virtual drive](./features/virtual-drive/README.md) page.

### Configuration

See [docs/configuration](configuration/README.md) for more information.

### Project structure

- [src](../src) directory
	
	Contains all code for the application, including HTML, CSS and TypeScript files. This directory makes use of a feature-based folder structure. Utility files are often separated into their own subdirectory, called `_utils`, inside of their respective directory.

- [public](../public) directory

	Contains all static files like images, webfonts and vector graphics. Also includes the [config](../public/config) and [documents](../public/documents) folders from where certain files are loaded into the [virtual drive](features/virtual-drive/README.md).

- [docs](.) directory

	You are here. This directory contains all documentation for this project.

- [dist](../dist) directory

	Contains the bundled build after the build process. This directory is not included in the GitHub repository.

- External files
	- [Design file (Figma)](https://www.figma.com/file/bEE5RyWgV0QILcXpZWEk2r/ProzillaOS?type=design&node-id=0%3A1&mode=design&t=7KR1tKCp9H5cK3hf-1)
	- [Task board (Notion)](https://prozilla.notion.site/8325fabca1fb4f9885b6d6dfd5aa64c8?v=1a59f7ce50914f5ea711fe6460e52868&pvs=4)

### Code style

Type | Case | Example | Based on
--- | --- | --- | ---
Folders | kebab-case | `virtual-drive` |
`.ts` files | camelCase | `virtualRoot.ts` |
`.tsx` files | PascalCase | `Desktop.tsx` | React component
`.css` files & static assets | kebab-case | `global.css` |
Local `.module.css` files | PascalCase | `Desktop.module.css` | React component
Global `.module.css` files | kebab-case | `utils.module.css` |
CSS class names | PascalCase | ```.WindowsView``` | React component
Variables | camelCase | ```const fooBar = true;``` |
Global constant variables | MACRO_CASE | ```export const NAME = "ProzillaOS";``` |
Classes | PascalCase | ```class WindowsManager { }``` |
React components | PascalCase | ```export function WindowsView({ }) { }``` |
Functions | camelCase | ```function focusWindow() { }``` |
Types | PascalCase | ```type FooBar = boolean;``` |