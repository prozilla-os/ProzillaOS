---
outline: deep
---

# Class [`DesktopConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/desktopConfig.ts)

## Constructor

> `new DesktopConfig(options)`

### Parameters

<br>

#### options

- options.wallpapers : `string[]`
- options.defaultWallpaper : `string`
- options.defaultIconSize : `0 | 1 | 2`
- options.defaultIconDirection : `0 | 1`

## Properties

### wallpapers : `string[]` {#wallpapers}

Array of URLs of wallpaper images

> **@default**
> 
> ```ts
> [
> 	"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png",
> 	"https://os.prozilla.dev/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png",
> 	"https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-purple-yellow.png",
> 	"https://os.prozilla.dev/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png",
> 	"https://os.prozilla.dev/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png",
> 	"https://os.prozilla.dev/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png",
> 	"https://os.prozilla.dev/assets/wallpapers/colorful-mesh-gradient-red-green.png",
> 	"https://os.prozilla.dev/assets/wallpapers/flame-abstract-wallpaper-orange.png",
> 	"https://os.prozilla.dev/assets/wallpapers/wave-abstract-wallpaper-teal.png",
> ]
> ```

### defaultWallpaper : `string` {#default-wallpaper}

URL of default wallpaper image

> **@default**
> 
> ```ts
> "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"
> ```
> ![Preview](https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png)

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