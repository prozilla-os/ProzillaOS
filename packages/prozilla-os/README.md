<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.svg?v=2" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/prozilla-os/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/prozilla-os/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/prozilla-os/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About

`prozilla-os` is a React Vite component library written in TypeScript for building web-based operating systems, made by Prozilla. This package combines multiple other packages for easy access to different ProzillaOS features. You can also download these packages separately instead.

**Live demo: [os.prozilla.dev][demo]** - [(source)][website-source]

## Installation

```sh
npm install prozilla-os
yarn add prozilla-os
pnpm add prozilla-os
```

## Packages

`prozilla-os` combines the following packages into one:

- [`@prozilla-os/core`][core] - Core functionality, React components and hooks
- [`@prozilla-os/shared`][shared] - Common utility functions
- [`@prozilla-os/file-explorer`][file-explorer] - File explorer app
- [`@prozilla-os/terminal`][terminal] - Terminal/shell app
- [`@prozilla-os/text-editor`][text-editor] - Text editor app
- [`@prozilla-os/settings`][settings] - Settings app
- [`@prozilla-os/media-viewer`][media-viewer] - Media viewer app
- [`@prozilla-os/browser`][browser] - Browser app
- [`@prozilla-os/calculator`][calculator] - Calculator app
- [`@prozilla-os/app-center`][app-center] - App center

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

### Configuration

```ts
interface ProzillaOSProps {
  systemName?: string;
  tagLine?: string;
  skin?: Skin;
  config?: {
    apps?: Partial<AppsConfigOptions>;
    desktop?: Partial<DesktopConfigOptions>;
    misc?: Partial<MiscConfigOptions>;
    modals?: Partial<ModalsConfigOptions>;
    taskbar?: Partial<TaskbarConfigOptions>;
    tracking?: Partial<TrackingConfigOptions>;
    windows?: Partial<WindowsConfigOptions>;
    virtualDrive?: Partial<VirtualDriveConfigOptions>;
  };
  children?: ReactNode;
}
```

```ts
interface SkinOptions {
  systemIcon: string;
  appIcons?: { [key: string]: string };
  appNames?: { [key: string]: string };
  wallpapers: string[];
  defaultWallpaper: string;
  fileIcons: {
    generic: string;
    info?: string;
    text?: string;
    code?: string;
    external?: string;
    video?: string;
    audio?: string;
  };
  folderIcons: {
    generic: string;
    images?: string;
    text?: string;
    link?: string;
    video?: string;
    audio?: string;
  };
  loadStyleSheet?: () => void;
  defaultTheme?: Theme;
}
```

```ts
interface AppsConfigOptions {
  apps: App[];
}

interface DesktopConfigOptions {
  /** @default 1 */
  defaultIconSize: 0 | 1 | 2;
  /** 0: vertical, 1: horizontal @default 0 */
  defaultIconDirection: 0 | 1;
}

interface MiscConfigOptions {
  /** @default 250 */
  doubleClickDelay: number;
}

interface ModalsConfigOptions {
  /** Default size of a dialog box @default new Vector2(400, 200) */
  defaultDialogSize: Vector2;
  /** Default size of a file selector @default new Vector2(700, 400) */
  defaultFileSelectorSize: Vector2;
}

interface TaskbarConfigOptions {
  /** Height of the taskbar in CSS pixels @default 3 * 16 */
  height: number;
}

interface TrackingConfigOptions {
  /** Enable tracking @default true */
  enabled: boolean;
  /** Google Analytics measurement ID */
  GAMeasurementId: string;
}

interface WindowsConfigOptions {
  /** @default 32 */
  screenMargin: number;
  /** @default "-" */
  titleSeparator: string;
  /** If the user's screen is smaller than these values, windows will always be maximized @default new Vector2(350, 350) */
  minScreenSize: Vector2;
}

interface VirtualDriveConfigOptions {
  /** Enables persistent storage of the virtual drive. */
  saveData: false | {
    enableCompression: boolean;
    prefix?: string;
    migrations?: [string, string][];
  };
  /** Configure the data that is loaded initially. */
  defaultData: {
    includePicturesFolder?: boolean;
    includeAudioFolder?: boolean;
    includeVideoFolder?: boolean;
    includeDocumentsFolder?: boolean;
    includeDesktopFolder?: boolean;
    includeSourceTree?: boolean;
    includeAppsFolder?: boolean;
    includeScriptsFolder?: boolean;
    loadData?: (virtualRoot: VirtualRoot) => void;
  };
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
[docs]: https://os.prozilla.dev/docs/reference/prozilla-os
[website-source]: https://github.com/prozilla-os/ProzillaOS
[github]: https://github.com/prozilla-os/ProzillaOS/tree/main/packages/prozilla-os
[npm]: https://www.npmjs.com/package/prozilla-os
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
[core]: https://www.npmjs.com/package/@prozilla-os/core
[shared]: https://www.npmjs.com/package/@prozilla-os/shared
[file-explorer]: https://www.npmjs.com/package/@prozilla-os/file-explorer
[terminal]: https://www.npmjs.com/package/@prozilla-os/terminal
[text-editor]: https://www.npmjs.com/package/@prozilla-os/text-editor
[settings]: https://www.npmjs.com/package/@prozilla-os/settings
[media-viewer]: https://www.npmjs.com/package/@prozilla-os/media-viewer
[browser]: https://www.npmjs.com/package/@prozilla-os/browser
[app-center]: https://www.npmjs.com/package/@prozilla-os/app-center
[calculator]: https://www.npmjs.com/package/@prozilla-os/calculator
