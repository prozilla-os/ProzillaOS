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

- `prozilla-os` ([source][prozilla-os]) - A bundle containing all other packages
- `@prozilla-os/core` ([source][core]) - Core functionality, React components and hooks
- `@prozilla-os/shared` ([source][shared]) - Shared functions and utilities
- `@prozilla-os/file-explorer` ([source][file-explorer]) - File explorer app
- `@prozilla-os/terminal` ([source][terminal]) - Terminal/shell app
- `@prozilla-os/text-editor` ([source][text-editor]) - Text editor app
- `@prozilla-os/settings` ([source][settings]) - Settings app
- `@prozilla-os/media-viewer` ([source][media-viewer]) - Media viewer app
- `@prozilla-os/browser` ([source][browser]) - Browser app
- `@prozilla-os/calculator` ([source][calculator]) - Calculator app

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