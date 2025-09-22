---
outline: deep
package: "@prozilla-os/core"
---

# Class [`SystemManager`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/systemManager.ts)

## Constructor

> `new SystemManager(params)`

### Parameters

- **params**
  - **Type:** `SystemManagerParams`

```ts
interface SystemManagerParams {
	systemName: string | null;
	tagLine: SystemMastring | null;
	skin?: Skin;
	desktopConfig: DesktopConfig;
	appsConfig: AppsConfig;
	miscConfig: MiscConfig;
	modalsConfig: ModalsConfig;
	taskbarConfig: TaskbarConfig;
	trackingConfig: TrackingConfig;
	windowsConfig: WindowsConfig;
	virtualDriveConfig: VirtualDriveConfig;
}
```

> [!NOTE] References
>
> - [Skin](../../../skins/classes/skin)

## Properties

### systemName

- **Type:** `string`
- **Default:** `"ProzillaOS"`

### tagLine

- **Type:** `string`
- **Default:** `"Web-based Operating System"`

### skin

- **Type:** [`Skin`](../../../skins/classes/skin)
- **Default:** `new Skin()`

### appsConfig

- **Type:** [`AppsConfig`](./apps-config)

### desktopConfig

- **Type:** [`DesktopConfig`](./desktop-config)

### miscConfig

- **Type:** [`MiscConfig`](./misc-config)

### modalsConfig

- **Type:** [`ModalsConfig`](./modals-config)

### taskbarConfig

- **Type:** [`TaskbarConfig`](./taskbar-config)

### trackingConfig

- **Type:** [`TrackingConfig`](./tracking-config)

### windowsConfig

- **Type:** [`WindowsConfig`](./windows-config)

### virtualDriveConfig

- **Type:** [`VirtualDriveConfig`](./virtual-drive-config)

## Methods

### getUptime(precision)

- **Parameters**
  - **precision**
   	- **Type:** `getUptime`
   	- **Default:** `2`
- **Returns**
  - **Type:** `string`
