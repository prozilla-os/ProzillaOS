---
outline: deep
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
	appIcons?: Record<number, string>;
	appNames?: Record<number, string>;
	wallpapers: string[];
	defaultWallpaper: string;
	fileIcons: {
		generic: string;
		info?: string;
		text?: string;
		code?: string;
	};
	folderIcons: {
		generic: string;
		images?: string;
		text?: string;
		link?: string;
	};
	loadStyleSheet?: () => void;
}
```

## Properties

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

### macOsSkin

A skin inspired by the macOS interface

### minimalSkin

A minimalistic skin with monochrome icons
