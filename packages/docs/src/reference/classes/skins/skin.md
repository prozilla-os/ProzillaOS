---
outline: deep
description: "Change the look and feel of ProzillaOS"
---

# Class [`Skin`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/skins/src/core/skin.ts)

Change the look and feel of ProzillaOS

## Constructor

> `new Skin(options)`

### Parameters

<br>

#### options

- **Optional**
- **Type:** `SkinOptions`

```ts
interface SkinOptions {
	appIcons?: { [key: string]: string };
	appNames?: { [key: string]: string };
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

- **Type:** `{ [key: string]: string }`

Replacements for app icons based on app id

### appNames

- **Type:** `{ [key: string]: string }`

Replacements for app names based on app id

### wallpapers

- **Type:** `string[]`

Array of URLs of wallpaper images

### defaultWallpaper

- **Type:** `string`
- **Default:** `"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"`
	- Preview:
	
		![Default wallpaper](https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png)

URL of default wallpaper image

### fileIcons

- **Type:** `FileIcons`

URLs of icons for types of files

```ts
interface FileIcons {
	generic: string;
	info?: string;
	text?: string;
	code?: string;
}
```

### folderIcons

- **Type:** `FolderIcons`

URLs of icons for types of folders

```ts
interface FolderIcons {
	generic: string;
	images?: string;
	text?: string;
	link?: string;
}
```

### loadStyleSheet

- **Type:** `() => void`
- **Example:** 

	```ts
	function loadStyleSheet() {
		import("../styles/skins/macOs.css");
	}
	```

Function that dynamically imports style sheet
