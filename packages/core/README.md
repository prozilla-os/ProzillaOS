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

`@prozilla-os/core` is a React Vite component library written in TypeScript for building web-based operating systems, made by Prozilla.

## Installation

```sh
$ npm install @prozilla-os/core
$ yarn add @prozilla-os/core
$ pnpm add @prozilla-os/core
```

## Usage

### Basic setup

```tsx
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "@prozilla-os/core";

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

### Configuration

```tsx
interface ProzillaOSProps {

  systemName: string,

  tagLine: string,

  skin: new Skin({

    appIcons: Record<number, string> | undefined,

	appNames: Record<number, string> | undefined,

	wallpapers: string[],

	defaultWallpaper: string,

	fileIcons: {
		generic: string;
		info: string | undefined;
		text: string | undefined;
		code: string | undefined;
	},

	folderIcons: {
		generic: string;
		images: string | undefined;
		text: string | undefined;
		link: string | undefined;
	},

	loadStyleSheet: () => void | undefined

  })

  config: {
    apps: new AppsConfig({

      apps: App[]

    }),
    desktop: new DesktopConfig({

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
	misc: new MiscConfig({

      /**
	   * @default 250
	   */
	  doubleClickDelay: number

	})
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

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

[demo]: https://os.prozilla.dev/
[docs]: https://os.prozilla.dev/docs/reference/core
[github]: https://github.com/prozilla-os/ProzillaOS/tree/main/packages/core
[npm]: https://www.npmjs.com/package/@prozilla-os/core
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla