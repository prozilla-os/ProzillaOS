---
outline: deep
package: "@prozilla-os/core"
---

# Class [`VirtualDriveConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/virtualDriveConfig.ts)

## Constructor

> `new VirtualDriveConfig(options)`

### Parameters

- **options**
  - **Type:** `VirtualDriveConfigOptions | undefined`

```ts
interface VirtualDriveConfigOptions {
	saveData?: boolean;
	defaultData?: {
		includePicturesFolder?: boolean;
		includeDocumentsFolder?: boolean;
		includeDesktopFolder?: boolean;
		includeSourceTree?: boolean;
		loadData?: (virtualRoot: VirtualRoot) => void;
	};
}
```

## Properties

### saveData

Enables persistent storage of the virtual drive

- **Type:** `boolean`
- **Default:** `true`

### defaultData

Configure the data that is loaded initially when ProzillaOS is opened

- **Type:** `DefaultData`

```ts
interface DefaultData {
	/**
	 * Include pictures folder in default data
	 * @default true
	 */
	includePicturesFolder?: boolean;

	/**
	 * Include documents folder in default data
	 * @default true
	 */
	includeDocumentsFolder?: boolean;

	/**
	 * Include desktop folder in default data
	 * @default true
	 */
	includeDesktopFolder?: boolean;

	/**
	 * Include source tree folder in default data
	 * @default true
	 */
	includeSourceTree?: boolean;

	loadData?: (virtualRoot: VirtualRoot) => void;
}
```
