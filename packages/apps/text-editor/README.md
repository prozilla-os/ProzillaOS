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

`@prozilla-os/text-editor` is a text editor application for ProzillaOS.

## Installation

`@prozilla-os/core` is required to run this application.

```sh
$ npm install @prozilla-os/core @prozilla-os/text-editor
$ yarn add @prozilla-os/core @prozilla-os/text-editor
$ pnpm add @prozilla-os/core @prozilla-os/text-editor
```

## Usage

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView, AppsConfig } from "@prozilla-os/core";
import { textEditor } from "@prozilla-os/text-editor";

function App() {
  return (
    <ProzillaOS
      systemName="Example"
      tagLine="Powered by ProzillaOS"
      config={{
        apps: new AppsConfig({
          apps: [ textEditor ]
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

## Links

- [Website/demo][website]
- [GitHub][github]
- [npm][npm]
- [Ko-fi][ko-fi]

[website]: https://os.prozilla.dev/text-editor
[github]: https://github.com/prozilla-os/ProzillaOS/tree/convert-to-monorepo/packages/apps/text-editor
[npm]: https://www.npmjs.com/package/@prozilla-os/text-editor
[ko-fi]: https://ko-fi.com/prozilla