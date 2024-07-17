---
outline: deep
description: "Constants for ProzillaOS"
package: "@prozilla-os/core"
---

# Constants

{{ $frontmatter.description }}

## Utility

- **Source:** [`utils.const.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/constants/utils.const.ts)

### ANSI

Ansi codes for coloring and decorating ansi text

- **Type:** `Ansi`

```ts
interface Ansi {
	fg: Record<number, string>; // Foreground colors
	bg: Record<number, string>; // Background colors
	decoration: Record<number, string>;
	reset: string;
};
```

## Virtual drive

- **Source:** [`virtualDrive.const.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/constants/virtualDrive.const.ts)

### CODE_EXTENSIONS

An array of file extensions for code-related files

- **Type:** `string[]`

### IMAGE_EXTENSIONS

An array of file extensions for image files

- **Type:** `string[]`

## Themes

- **Source:** [`themes.const.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/constants/themes.const.ts)

### THEMES

A map that transforms theme ids into theme names

- **Type:** `Record<number, string | null>`
