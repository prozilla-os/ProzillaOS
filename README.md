<div align="center">
	<br />
	<p>
		<a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/banner-logo-title-small.png" width="576" alt="ProzillaOS" /></a>
	</p>
	<p>
		<a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/Prozilla/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
		<a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/Prozilla/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
		<a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/Prozilla/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
		<a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
	</p>
</div>

## About

This monorepo contains the source code of [os.prozilla.dev][website] as well as multiple packages. You can find the main package at [`prozilla-os`][prozilla-os].

ProzillaOS is a web-based operating system inspired by Ubuntu Linux and Windows. It is made with React, Vite and TypeScript by [Prozilla][prozilla].

> [!WARNING]  
> This repository is currently being transformed into a monorepo. Some things may be temporarily missing/broken. If you have any questions in the meantime, feel free to [open an issue][issues].

## Packages

Each package follows a similar structure and has a `src/main.ts` entry file.

- [`prozilla-os`][prozilla-os] - A bundle containing all essential packages and standard applications of ProzillaOS

### Essentials

- [`@prozilla-os/core`][core] - Core functionality, React components and hooks
- [`@prozilla-os/shared`][shared] - Shared functions and utilities

### Standard applications

- [`@prozilla-os/file-explorer`][file-explorer] - File explorer app
- [`@prozilla-os/terminal`][terminal] - Terminal/shell app
- [`@prozilla-os/text-editor`][text-editor] - Text editor app
- [`@prozilla-os/settings`][settings] - Settings app
- [`@prozilla-os/media-viewer`][media-viewer] - Media viewer app
- [`@prozilla-os/browser`][browser] - Browser app
- [`@prozilla-os/calculator`][calculator] - Calculator app

### Non-standard applications

- [`@prozilla-os/logic-sim`][logic-sim] - Logic simulator app

## Scripts

These are the scripts in logical order, that will be available when you have installed the dependencies. Note that certain scripts can be omitted by running another script. For more information about scripts #1, #2 and #3, check the [officiel Vite documentation](https://vitejs.dev/guide/cli.html). ProzillaOS uses [pnpm](https://pnpm.io/) as its package manager.

### Main scripts

These scripts are related to the website and its lifecycle.

1. `pnpm start`

	Start Vite dev server at [localhost:3000](http://localhost:3000/). Changes to module will dynamically be hot-reloaded, so normally there is no need for hard-refreshes. VSCode is configured to run this script whenever the project is opened.

2. `pnpm run build`

	Compile project using TypeScript and bundle all files into the `dist` directory, or the directory specified in config file. This directory can be uploaded to a web server.

3. `pnpm run preview`

	Start web server with preview of build at [localhost:8080](http://localhost:8080/). Can be useful for testing build before deploying.

4. `pnpm run stage`

	Execute [stage.ts](../scripts/stage.ts), which stages the build and prepares it for deployment. Script will generate a sitemap, robots.txt and all other necessary files.

5. `pnpm run deploy`

	Run scripts #2 and #4, then execute [deploy.ts](../scripts/deploy.ts), which uploads the staged build to GitHub Pages on branch called `gh-pages`. This should then trigger a GitHub Action that deploys the build to production.

### Extra scripts

- `pnpm run fetch`

	Fetch the repository tree using GitHub's API and store it as a JSON file that will be used to populate the virtual drive. More information can be found on the [virtual drive](./features/virtual-drive/README.md) page.

### Scripts/commands for packages

These scripts are related to the packages in this project and their lifecycles.

- `pnpm --filter <package_selector> build`

	Build a sepecific subset of packages or a single package and output to respective `dist` directory/directories. For more information about selecting specific packages, read [pnpm's documentation on filtering](https://pnpm.io/filtering). 

- `pnpm run packages:build`

	Build all packages using Vite in sequential order and output to respective `dist` directories.

- `pnpm run packages:update`

	Create a new changeset for packages and update their version accordingly.

- `pnpm run packages:release`

	Publish the latest versions of each package to the npm registry.

## Links

- [Website/demo][website]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

## Resources

These resources can help you get started with ProzillaOS.

- [prozilla-os/ProzillaOS-boilerplate][boilerplate] - Boilerplate code for a React Vite app implementing ProzillaOS

<div align="center">
	<br />
	<a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/screenshots/screenshot-files-info-taskbar-desktop.png" width="720" alt="Screenshot of ProzillaOS" /></a>
	<br />
</div>

## License

ProzillaOS is [MIT licensed](./LICENSE).

[website]: https://os.prozilla.dev/
[github]: https://github.com/prozilla-os/ProzillaOS
[npm]: https://www.npmjs.com/package/prozilla-os
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
[issues]: https://github.com/prozilla-os/ProzillaOS/issues
[boilerplate]: https://github.com/prozilla-os/ProzillaOS-boilerplate
[prozilla]: https://prozilla.dev/
[prozilla-os]: ./packages/prozilla-os/
[core]: ./packages/core/
[shared]: ./packages/shared/
[file-explorer]: ./packages/apps/file-explorer/
[terminal]: ./packages/apps/terminal/
[text-editor]: ./packages/apps/text-editor/
[settings]: ./packages/apps/settings/
[media-viewer]: ./packages/apps/media-viewer/
[browser]: ./packages/apps/browser/
[calculator]: ./packages/apps/calculator/
[logic-sim]: ./packages/apps/logic-sim/