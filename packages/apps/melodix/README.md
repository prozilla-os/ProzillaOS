# Melodix

## About 

`@taynotfound/Melodix` is a Music app for ProzillaOS.

## Changelog

The Changelog can be found [here](https://github.com/taynotfound/MelodiX/blob/main/CHANGELOG.md)

## Installation

`@prozilla-os/core` is required to run this application.

```sh
$ npm install @prozilla-os/core @taynotfound/Melodix
$ yarn add @prozilla-os/core @taynotfound/Melodix
$ pnpm add @prozilla-os/core @taynotfound/Melodix
```

## Usage

### Basic setup

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView, AppsConfig } from "@prozilla-os/core";
import { Melodix } from "@taynotfound/Melodix";

function App() {
  return (
    <ProzillaOS
      systemName="Example"
      tagLine="Powered by ProzillaOS"
      config={{
        apps: new AppsConfig({
          apps: [ Melodix ]
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

- [GitHub][github]
- [npm][npm]
- [Taylabs Discord][discord]
- [ProzillaOS Discord][prodis]
- [Ko-fi][ko-fi]
- [Website][website]

[github]: https://github.com/taynotfound/melodix
[npm]: https://www.npmjs.com/package/@taynotfound/Melodix
[discord]: https://discord.gg/C2bAXnYXzm
[ko-fi]: https://ko-fi.com/notfoundsh
[website]: https://www.taymaerz.de/
[prodis]:https://discord.gg/U9KM5q6b