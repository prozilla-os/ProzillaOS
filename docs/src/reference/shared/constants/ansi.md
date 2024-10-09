---
outline: deep
description: "ANSI codes for coloring and decorating ANSI text"
package: "@prozilla-os/shared"
---

# ANSI constants

{{ $frontmatter.description }}

- **Source:** [`ansi.const.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/shared/src/constants/ansi.const.ts)

## ANSI

- **Type:** `Ansi`

```ts
interface Ansi {
	fg: Record<number, string>; // Foreground colors
	bg: Record<number, string>; // Background colors
	decoration: Record<number, string>;
	reset: string;
};
```
