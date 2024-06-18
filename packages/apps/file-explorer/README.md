<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.png" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/Prozilla/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/Prozilla/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/Prozilla/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About 

`@prozilla-os/file-explorer` is a standard ProzillaOS application for browsing files.

## Installation

`@prozilla-os/core` is required to run this application.

```sh
$ npm install @prozilla-os/core @prozilla-os/file-explorer
$ yarn add @prozilla-os/core @prozilla-os/file-explorer
$ pnpm add @prozilla-os/core @prozilla-os/file-explorer
```

## Usage

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView, AppsConfig } from "@prozilla-os/core";
import { fileExplorer } from "@prozilla-os/file-explorer";

function App() {
  return (
    <ProzillaOS
      systemName="Example"
      tagLine="Power by ProzillaOS"
      config={{
        apps: new AppsConfig({
          apps: [ fileExplorer ]
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

<br />

### `<ProzillaOS>` props

```tsx
{

  systemName: string,

  tagLine: string,

  config: {
    apps: {

      apps: App[]

    },
    desktop: {

      /** Array of URLs of wallpaper images */
      wallpapers: string[];

      /** URL of default wallpaper image */
      defaultWallpaper: string;

      /**
       * @default 1
       */
      defaultIconSize: 0 | 1 | 2;

      /**
       * 0: vertical, 1: horizontal
       * @default 0
       * */
      defaultIconDirection: 0 | 1; 

    },
    modals: {

      /**
       * Default size of a dialog box
       * @default new Vector2(400, 200)
       */
      defaultDialogSize: Vector2;

      /**
       * Default size of a file selector
       * @default new Vector2(700, 400)
       */
      defaultFileSelectorSize: Vector2;

    },
    taskbar: {

      /**
       * Height of the taskbar in CSS pixels
       * @default 3 * 16
       */
      height: number;

    },
    tracking: {

      /**
       * Enable tracking
       * @default true
      */
      enabled: boolean;

      /** Google Analytics measurement ID */
      GAMeasurementId: string;

    },
    virtualDrive: {

      fileIcon: string;
      infoFileIcon: string;
      textFileIcon: string;
      codeFileIcon: string;

      folderIcon: string;
      imagesFolderIcon: string;
      textFolderIcon: string;
      folderLinkIcon: string;

    },
    windows: {

      /**
       * @default 32
       */
      screenMargin: number;

      /**
       * @default "-"
       */
      titleSeparator: string;

      /**
       * If the user's screen is smaller than these values, windows will always be maximized
       * @default new Vector2(350, 350)
       */
      minScreenSize: Vector2;

    }
  }

}
```

## Links

- [Website/demo][website]
- [GitHub][github]
- [npm][npm]
- [Ko-fi][ko-fi]

[website]: https://os.prozilla.dev/
[github]: https://github.com/prozilla-os/ProzillaOS/tree/convert-to-monorepo/packages/apps/file-explorer
[npm]: https://www.npmjs.com/package/@prozilla-os/file-explorer
[ko-fi]: https://ko-fi.com/prozilla