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

<!-- #region about -->

## About

This repository contains the source code of [os.prozilla.dev][demo] as well as multiple packages. You can find the main package at [`prozilla-os`][prozilla-os].

ProzillaOS is a web-based operating system inspired by Ubuntu Linux and Windows. It is made with React, Vite and TypeScript by [Prozilla][prozilla].

<div align="center">
	<br />
	<a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/screenshots/screenshot-files-info-taskbar-desktop.png" width="720" alt="Screenshot of ProzillaOS" /></a>
	<br />
</div>

<!-- #endregion about -->

<!-- #region getting-started -->

## Getting started

Make sure you have [NodeJS](https://nodejs.org/en) (version v18.12 or higher) installed on your device.

1. Clone the GitHub repository.

	```
	git clone https://github.com/prozilla-os/ProzillaOS.git ProzillaOS
	cd ProzillaOS
	```

2. Install package manager and dependencies

	```
	npm install pnpm -g
	pnpm install
	```

3. Run project

	```
	pnpm start
	```

4. Test local dev server by visiting [localhost:3000](http://localhost:3000/)

> [!WARNING]
> In a local environment, ProzillaOS packages will try to import uncompiled versions of other ProzillaOS packages from their respective `src` directory. If this does not happen correctly and a package tries to import a compiled version of another package from its respective `dist` directory, you might run into an error message saying `module not found`. Executing the command `pnpm run packages:build` will compile each package into their `dist` directories and resolve this error. 

<!-- #endregion getting-started -->

<!-- #region packages -->

## Packages

### Libraries (public)

These libraries are different modules of ProzillaOS that can be installed separately or via the bundle package `prozilla-os`. Each library has a `src/main.ts` entry file and is published to the npm registry.

- [`prozilla-os`][prozilla-os]: A bundle containing the core packages and all standard applications of ProzillaOS
- [`@prozilla-os/core`][core]: Core functionality, React components and hooks
- [`@prozilla-os/skins`][skins]: Customizable skins for ProzillaOS
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

<!-- #endregion packages -->

## Links

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

## Resources

These resources can help you get started with ProzillaOS.

- [Getting started guide](https://os.prozilla.dev/docs/guides/getting-started)
- [Self-hosting guide](https://os.prozilla.dev/docs/guides/self-hosting)
- [prozilla-os/ProzillaOS-boilerplate][boilerplate]: Boilerplate code for a React Vite app implementing ProzillaOS


## License

ProzillaOS is [MIT licensed](./LICENSE).

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
[skins]: ./packages/skins/
[shared]: ./packages/shared/
[file-explorer]: ./packages/apps/file-explorer/
[terminal]: ./packages/apps/terminal/
[text-editor]: ./packages/apps/text-editor/
[settings]: ./packages/apps/settings/
[media-viewer]: ./packages/apps/media-viewer/
[browser]: ./packages/apps/browser/
[calculator]: ./packages/apps/calculator/
[logic-sim]: ./packages/apps/logic-sim/
[license]: ./LICENSE
