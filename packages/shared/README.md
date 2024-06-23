<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.svg" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/Prozilla/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/Prozilla/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/Prozilla/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About 

`@prozilla-os/shared` is a library of shared utility functions for ProzillaOS packages.

## Installation

```sh
$ npm install @prozilla-os/shared
$ yarn add @prozilla-os/shared
$ pnpm add @prozilla-os/shared
```

## Usage

### `appViteConfig(basePath, entryPath)`

Helper function for creating Vite configurations for ProzillaOS apps.

#### Params

- `basePath` (string) - Path of base directory
- `entryPath` (string) - Path of library entry

#### Example
```tsx
// vite.config.ts

import { defineConfig } from "vite";
import { appViteConfig } from "@prozilla-os/shared";

export default defineConfig({
	...appViteConfig(__dirname, "src/main.ts")
});
```

## Links

- [Website/demo][website]
- [GitHub][github]
- [npm][npm]
- [Ko-fi][ko-fi]

[website]: https://os.prozilla.dev/
[github]: https://github.com/prozilla-os/ProzillaOS/tree/convert-to-monorepo/packages/shared
[npm]: https://www.npmjs.com/package/@prozilla-os/shared
[ko-fi]: https://ko-fi.com/prozilla