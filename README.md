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

   ```sh
   git clone https://github.com/prozilla-os/ProzillaOS.git ProzillaOS
   cd ProzillaOS
   ```

2. Install package manager and dependencies

   ```sh
   npm install pnpm -g
   pnpm install
   ```

3. Build packages and run project

   ```sh
   pnpm run packages:build
   pnpm start
   ```

4. Test local dev server by visiting [localhost:3000](http://localhost:3000/)

<!-- #endregion getting-started -->

For more information, refer to the [self-hosting guide](https://os.prozilla.dev/docs/guides/self-hosting).

<!-- #region packages -->

## Packages

You can find a list of all packages related to ProzillaOS in [packages/README.md](./packages/README.md).

<!-- #endregion packages -->

## Links

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

### Resources

- [Getting started guide](https://os.prozilla.dev/docs/guides/getting-started)
- [Custom app guide](https://os.prozilla.dev/docs/guides/custom-app)
- [Self-hosting guide](https://os.prozilla.dev/docs/guides/self-hosting)
- [Contributing](CONTRIBUTING.md)
- [ProzillaOS boilerplate][boilerplate]

## License

ProzillaOS is [MIT licensed](./LICENSE).

[demo]: https://os.prozilla.dev/
[docs]: https://os.prozilla.dev/docs
[github]: https://github.com/prozilla-os/ProzillaOS
[npm]: https://www.npmjs.com/package/prozilla-os
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
[boilerplate]: https://github.com/prozilla-os/ProzillaOS-boilerplate
[prozilla]: https://prozilla.dev/
[prozilla-os]: ./packages/prozilla-os/
