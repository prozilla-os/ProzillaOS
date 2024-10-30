---
outline: [1, 3]
description: "Change the look and feel of ProzillaOS"
package: "@prozilla-os/skins"
---

# Class [`Skin`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/skins/src/core/skin.ts)

{{ $frontmatter.description }}

## Constructor

> `new Skin(options)`

### Parameters

- **options**
  - **Type:** `SkinOptions | undefined`

```ts
interface SkinOptions {
	systemIcon?: string;
	appIcons?: Record<number, string>;
	appNames?: Record<number, string>;
	wallpapers?: string[];
	defaultWallpaper?: string;
	fileIcons?: {
		generic: string;
		info?: string;
		text?: string;
		code?: string;
	};
	folderIcons?: {
		generic: string;
		images?: string;
		text?: string;
		link?: string;
	};
	loadStyleSheet?: () => void;
}
```

## Properties

### systemIcon

SVG icon for the system

- **Type:** `string`

#### Default

`"https://os.prozilla.dev/icon.svg"`

![Default system icon](https://os.prozilla.dev/icon.svg)

### appIcons

Replacements for app icons based on app id

- **Type:** `{ [key: string]: string }`

### appNames

Replacements for app names based on app id

- **Type:** `{ [key: string]: string }`

### wallpapers

Array of URLs of wallpaper images

- **Type:** `string[]`

### defaultWallpaper

URL of default wallpaper image

- **Type:** `string`

#### Default

`"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"`

![Default wallpaper](https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png)

### fileIcons

URLs of icons for types of files

- **Type:** `FileIcons`

```ts
interface FileIcons {
	generic: string;
	info?: string;
	text?: string;
	code?: string;
}
```

#### Default

![Default file icons](/assets/file-icons.png)

### folderIcons

URLs of icons for types of folders

- **Type:** `FolderIcons`

```ts
interface FolderIcons {
	generic: string;
	images?: string;
	text?: string;
	link?: string;
}
```

#### Default

![Default folder icons](/assets/folder-icons.png)

### loadStyleSheet

Function that dynamically imports style sheet

- **Type:** `() => void`

#### Example

```ts
function loadStyleSheet() {
	import("../styles/skins/macOs.css");
}
```

## Instances

For more information about the designs of these skins, refer to the [skins page](../../../about/skins).

### macOsSkin

A skin inspired by the MacOS interface

#### Preview

![Preview of the MacOS skin](/screenshots/skins/mac.png)

#### Usage

```tsx
// App.tsx

import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { macOsSkin } from "@prozilla-os/skins"; // [!code highlight]

export function App(): ReactElement {
	return <ProzillaOS
		systemName={"Example"}
		tagLine={"Powered by ProzillaOS"}
		skin={macOsSkin} // [!code highlight]
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
```

### minimalSkin

A minimalistic skin with monochrome icons

#### Preview

![Preview of the minimalistic skin](/screenshots/skins/minimal.png)

#### Usage

```tsx
// App.tsx

import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { minimalSkin } from "@prozilla-os/skins"; // [!code highlight]

export function App(): ReactElement {
	return <ProzillaOS
		systemName={"Example"}
		tagLine={"Powered by ProzillaOS"}
		skin={minimalSkin} // [!code highlight]
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
```

### windows95Skin

A skin inspired by the Windows95 interface

#### Preview

![Preview of the Windows95 skin](/screenshots/skins/windows95.png)

#### Usage

```tsx
// App.tsx

import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { windows95Skin } from "@prozilla-os/skins"; // [!code highlight]

export function App(): ReactElement {
	return <ProzillaOS
		systemName={"Example"}
		tagLine={"Powered by ProzillaOS"}
		skin={windows95Skin} // [!code highlight]
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
```

### pixelSkin

A pixelated skin with pixel art

#### Preview

![Preview of the Pixel skin](/screenshots/skins/pixel.png)

#### Usage

```tsx
// App.tsx

import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";
import { pixelSkin } from "@prozilla-os/skins"; // [!code highlight]

export function App(): ReactElement {
	return <ProzillaOS
		systemName={"Example"}
		tagLine={"Powered by ProzillaOS"}
		skin={pixelSkin} // [!code highlight]
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
```
