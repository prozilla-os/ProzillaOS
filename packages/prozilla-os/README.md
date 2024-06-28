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

`prozilla-os` is a React Vite component library written in TypeScript for building web-based operating systems, made by Prozilla. This package combines multiple other packages for easy access to different ProzillaOS features. You can also download these packages separately instead.

**Live demo: [os.prozilla.dev][website]** - [(source)][website-source]

## Installation

```sh
$ npm install prozilla-os
$ yarn add prozilla-os
$ pnpm add prozilla-os
```

## Packages

`prozilla-os` combines the following packages into one:

- [`@prozilla-os/core`][core] - Core functionality, React components and hooks
- [`@prozilla-os/file-explorer`][file-explorer] - File explorer app
- [`@prozilla-os/terminal`][terminal] - Terminal/shell app
- [`@prozilla-os/text-editor`][text-editor] - Text editor app
- [`@prozilla-os/settings`][settings] - Settings app
- [`@prozilla-os/media-viewer`][media-viewer] - Media viewer app
- [`@prozilla-os/browser`][browser] - Browser app
- [`@prozilla-os/calculator`][calculator] - Calculator app

## Usage

For more information about the in-depth usage of each package, check out the links in the section above.

### Basic setup

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";

function App() {
  return (
    <ProzillaOS systemName="Example" tagLine="Powered by ProzillaOS">
      <Taskbar/>
      <WindowsView/>
      <ModalsView/>
      <Desktop/>
    </ProzillaOS>
  );
}
```

<br />

### `<ProzillaOS>` props

```tsx
{

  systemName: string,

  tagLine: string,

  config: {
    apps: new AppsConfig({

      apps: App[]

    }),
    desktop: new DesktopConfig({

      /** Array of URLs of wallpaper images */
      wallpapers: string[],

      /** URL of default wallpaper image */
      defaultWallpaper: string,

      /**
       * @default 1
       */
      defaultIconSize: 0 | 1 | 2,

      /**
       * 0: vertical, 1: horizontal
       * @default 0
       * */
      defaultIconDirection: 0 | 1

    }),
    modals: new ModalsConfig({

      /**
       * Default size of a dialog box
       * @default new Vector2(400, 200)
       */
      defaultDialogSize: Vector2,

      /**
       * Default size of a file selector
       * @default new Vector2(700, 400)
       */
      defaultFileSelectorSize: Vector2

    }),
    taskbar: new TaskbarConfig({

      /**
       * Height of the taskbar in CSS pixels
       * @default 3 * 16
       */
      height: number

    }),
    tracking: new TrackingConfig({

      /**
       * Enable tracking
       * @default true
      */
      enabled: boolean,

      /** Google Analytics measurement ID */
      GAMeasurementId: string

    }),
    virtualDrive: new VirtualDriveConfig({

      fileIcon: string,
      infoFileIcon: string,
      textFileIcon: string,
      codeFileIcon: string,

      folderIcon: string,
      imagesFolderIcon: string,
      textFolderIcon: string,
      folderLinkIcon: string

    }),
    windows: new WindowsConfig({

      /**
       * @default 32
       */
      screenMargin: number,

      /**
       * @default "-"
       */
      titleSeparator: string,

      /**
       * If the user's screen is smaller than these values, windows will always be maximized
       * @default new Vector2(350, 350)
       */
      minScreenSize: Vector2

    })
  }

}
```

## Links

- [Website/demo][website]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

[website]: https://os.prozilla.dev/
[website-source]: https://github.com/prozilla-os/ProzillaOS
[github]: https://github.com/prozilla-os/ProzillaOS/tree/convert-to-monorepo/packages/prozilla-os
[npm]: https://www.npmjs.com/package/prozilla-os
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
[core]: https://www.npmjs.com/package/@prozilla-os/core
[file-explorer]: https://www.npmjs.com/package/@prozilla-os/file-explorer
[terminal]: https://www.npmjs.com/package/@prozilla-os/terminal
[text-editor]: https://www.npmjs.com/package/@prozilla-os/text-editor
[settings]: https://www.npmjs.com/package/@prozilla-os/settings
[media-viewer]: https://www.npmjs.com/package/@prozilla-os/media-viewer
[browser]: https://www.npmjs.com/package/@prozilla-os/browser
[calculator]: https://www.npmjs.com/package/@prozilla-os/calculator