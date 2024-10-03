<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.svg?v=2" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/Prozilla/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/Prozilla/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/Prozilla/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About

`@prozilla-os/browser` is a ProzillaOS application for browsing the internet.

## Installation

`@prozilla-os/core` is required to run this application.

```sh
npm install @prozilla-os/core @prozilla-os/browser
yarn add @prozilla-os/core @prozilla-os/browser
pnpm add @prozilla-os/core @prozilla-os/browser
```

## Usage

### Basic setup

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView, AppsConfig } from "@prozilla-os/core";
import { browser } from "@prozilla-os/browser";

function App() {
  return (
    <ProzillaOS
      systemName="Example"
      tagLine="Powered by ProzillaOS"
      config={{
        apps: new AppsConfig({
          apps: [ browser ]
        })
      }}
    >
      <Taskbar/>
      <WindowsView/>
      <ModalsView/>
      <Desktop/>
    </ProzillaOS>
  );
}
```

### Window options

```tsx
/**
 * URL to open
 */
url: string;
```

## Links

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

[demo]: https://os.prozilla.dev/browser
[docs]: https://os.prozilla.dev/docs/reference/apps/browser
[github]: https://github.com/prozilla-os/ProzillaOS/tree/main/packages/apps/browser
[npm]: https://www.npmjs.com/package/@prozilla-os/browser
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
