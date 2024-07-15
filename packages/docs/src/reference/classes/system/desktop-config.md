---
outline: deep
---

# Class [`DesktopConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/desktopConfig.ts)

## Constructor

> `new DesktopConfig(options)`

### Parameters

<br>

#### options

- options.defaultIconSize : `0 | 1 | 2`
- options.defaultIconDirection : `0 | 1`

## Properties

### defaultIconSize : `0 | 1 | 2` {#default-icon-size}

The default size of the desktop icons

| Value | Description |
| --- | --- |
| 0 | Small |
| 1 | Medium |
| 2 | Large |

> **@default**
> 
> ```ts
> 1 // Medium
> ```

### defaultIconDirection : `0 | 1` {#default-icon-direction}

The default direction of the desktop icons

| Value | Description |
| --- | --- |
| 0 | Vertical |
| 1 | Horizontal |

> **@default**
> 
> ```ts
> 0 // Vertical
> ```