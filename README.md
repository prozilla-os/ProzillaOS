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

This monorepo contains the source code of [os.prozilla.dev][demo] as well as multiple packages. You can find the main package at [`prozilla-os`][prozilla-os].

ProzillaOS is a web-based operating system inspired by Ubuntu Linux and Windows. It is made with React, Vite and TypeScript by [Prozilla][prozilla].

## Packages

### Libraries (public)

These libraries are different modules of ProzillaOS that can be installed separately or via the bundle package `prozilla-os`. Each library has a `src/main.ts` entry file and is published to the npm registry.

- [`prozilla-os`][prozilla-os]: A bundle containing the core packages and all standard applications of ProzillaOS
- [`@prozilla-os/core`][core]: Core functionality, React components and hooks
- [`@prozilla-os/skins`](./shared/): Customizable skins for ProzillaOS
- [`@prozilla-os/shared`][shared]: Shared functions and utilities

#### Standard applications

- [`@prozilla-os/file-explorer`][file-explorer]: File explorer app
- [`@prozilla-os/terminal`][terminal]: Terminal/shell app
- [`@prozilla-os/text-editor`][text-editor]: Text editor app
- [`@prozilla-os/settings`][settings]: Settings app
- [`@prozilla-os/media-viewer`][media-viewer]: Media viewer app
- [`@prozilla-os/browser`][browser]: Browser app
- [`@prozilla-os/calculator`][calculator]: Calculator app

#### Non-standard applications

- [`@prozilla-os/logic-sim`][logic-sim]: Logic simulator app

### Sites (internal)

These packages contains the source code of parts of the ProzillaOS website. They are published to GitHub pages.

- [`@prozilla-os/demo`](./packages/demo/): Demo site
- [`@prozilla-os/docs`](./packages/docs/): Documentation site

## Scripts

ProzillaOS uses the package manager [pnpm](https://pnpm.io/) to run scripts.

### Global

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;start</pre> | Run [`pnpm run site:start`](#package-prozilla-os-demo). VSCode is configured to run this script whenever the project is opened.
| <pre>pnpm&nbsp;run&nbsp;build</pre> | Build every package in sequential order.
| <pre>pnpm&nbsp;run&nbsp;deploy</pre> | Clear the `dist` directory, build and stage each package that comprises the website, then deploy to GitHub pages. This should then trigger a GitHub Action that deploys the build to production.
| <pre>pnpm&nbsp;run&nbsp;publish</pre> | Publish the `dist` directory directly to GitHub pages.

### Public packages

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;packages:build</pre> | Build all packages using Vite in sequential order and output to respective `dist` directories.
| <pre>pnpm&nbsp;run&nbsp;packages:update</pre> | Create a new changeset for packages and update their version accordingly.
| <pre>pnpm&nbsp;run&nbsp;packages:release</pre> | Publish the latest versions of each package to the npm registry.

> [!TIP] 
> Use `pnpm --filter <package_selector> build` to build a sepecific subset of packages or a single package and output to respective `dist` directory/directories. For more information about selecting/filtering specific packages, read [pnpm's documentation on filtering](https://pnpm.io/filtering).

### Internal package: `@prozilla-os/demo`

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;demo:start</pre> | See [`pnpm run start`](./packages/demo/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;demo:build</pre> | See [`pnpm run build`](./packages/demo/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;demo:preview</pre> | See [`pnpm run preview`](./packages/demo/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;demo:stage</pre> | See [`pnpm run stage`](./packages/demo/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;demo:deploy</pre> | See [`pnpm run deploy`](./packages/demo/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;demo:fetch</pre> | See [`pnpm run fetch`](./packages/demo/README.md#scripts)

### Internal package: `@prozilla-os/docs`

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;docs:start</pre> | See [`pnpm run start`](./packages/docs/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;docs:build</pre> | See [`pnpm run build`](./packages/docs/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;docs:preview</pre> | See [`pnpm run preview`](./packages/docs/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;docs:stage</pre> | See [`pnpm run stage`](./packages/docs/README.md#scripts)
| <pre>pnpm&nbsp;run&nbsp;docs:deploy</pre> | Build and stage docs, then run `pnpm run publish`.
| <pre>pnpm&nbsp;run&nbsp;docs:generate</pre> | See [`pnpm run generate`](./packages/docs/README.md#scripts)

## Links

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

## Resources

These resources can help you get started with ProzillaOS.

- [prozilla-os/ProzillaOS-boilerplate][boilerplate]: Boilerplate code for a React Vite app implementing ProzillaOS

<div align="center">
	<br />
	<a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/screenshots/screenshot-files-info-taskbar-desktop.png" width="720" alt="Screenshot of ProzillaOS" /></a>
	<br />
</div>

[demo]: https://os.prozilla.dev/
[docs]: https://os.prozilla.dev/docs
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