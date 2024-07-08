---
outline: deep
---

# Class [`WindowsConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/windowsConfig.ts)

## Constructor

> `new WindowsConfig(options)`

### Parameters

<br>

#### options

- options.screenMargin : `number`
- options.titleSeparator : `string`
- options.minScreenSize : `Vector2`

## Properties

### screenMargin : `number` {#screen-margin}

The margin that windows will keep between them and the edges of the screen on smaller devices

> **@default**
> ```ts
> 32
> ```

### titleSeparator : `string` {#title-separator}

A string that is placed between different parts of a window title

> **@default**
> ```ts
> "-"
> ```

### minScreenSize : `Vector2` {#min-screen-size}

If the user's screen is smaller than these values, windows will always be maximized

> **@default**
> ```ts
> new Vector2(350, 350)
> ```

> [!WARNING] 
> Keep these values as low as possible, as this limits some functionality of the OS on devices with certain screen sizes.
