---
outline: deep
package: "@prozilla-os/core"
---

# Class [`DesktopConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/desktopConfig.ts)

## Constructor

> `new DesktopConfig(options)`

### Parameters

<br>

#### options

- **Optional**
- **Type:** `DesktopConfigOptions`

```ts
interface DesktopConfigOptions {
	defaultIconSize?: 0 | 1 | 2;
	defaultIconDirection?: 0 | 1;
}
```

## Properties

### defaultIconSize

The default size of the desktop icons

| Value | Description |
| --- | --- |
| 0 | Small |
| 1 | Medium |
| 2 | Large |

- **Type:** `0 | 1 | 2`
- **Default:** `1` (Medium)

### defaultIconDirection

The default direction of the desktop icons

| Value | Description |
| --- | --- |
| 0 | Vertical |
| 1 | Horizontal |

- **Type:** `0 | 1`
- **Default:** `0` (Vertical)