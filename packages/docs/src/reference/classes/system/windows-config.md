---
outline: deep
package: "@prozilla-os/core"
---

# Class [`WindowsConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/windowsConfig.ts)

## Constructor

> `new WindowsConfig(options)`

### Parameters

<br>

#### options

- **Optional**
- **Type:** `WindowsConfigOptions`

```ts
interface WindowsConfigOptions {
	screenMargin?: number;
	titleSeparator?: string;
	minScreenSize?: Vector2;
}
```

> [!NOTE] References
> - [Vector2](/reference/classes/utils/vector2)

## Properties

### screenMargin

- **Type:** `number`
- **Default:** `32`

The margin in CSS pixels that windows will keep between them and the edges of the screen on smaller devices

### titleSeparator

- **Type:** `string`
- **Default:** `"-"`

A string that is placed between different parts of a window title

### minScreenSize

- **Type:** [`Vector2`](/reference/classes/utils/vector2)
- **Default:** `new Vector2(350, 350)`

If the user's screen is smaller than these values, windows will always be maximized

> [!WARNING] 
> Keep these values as low as possible, as this limits some functionality of the OS on devices with certain screen sizes.
