---
outline: deep
description: "Combine class names and an optional static class name"
package: "@prozilla-os/core"
---

# Hook [`useClassNames(classNames, block, element, modifier)`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/hooks/_utils/classNames.ts)

{{ $frontmatter.description }}

This hook implements [`useStaticClassName`](./use-static-class-name) to generate static class names.

## Parameters

- **classNames**
  - **Type:** `(string | undefined)[]`
- **block**
  - **Type:** `string | undefined`
- **element**
  - **Type:** `string | undefined`
- **modifier**
  - **Type:** `string | string[] | undefined`

## Returns

- **Type:** `string`

## Example

```tsx
import { useClassNames } from "@prozilla-os/core";
import styles from "./Example.module.css";

export function Example() {
	return <div className={useClassNames([styles.Example], "Example")}>
		<h1 className={useClassNames([styles.Text, styles.Title], "Example", "Title")}>
			This is a title
		</h1>
		<p className={useClassNames([], "Example", "Paragraph", "Special")}>
			This is a special paragraph
		</p>
	</div>;
}
```

### Result

```html
<div class="ProzillaOS-Example _Example_1xkyl_17">
	<h1 class="ProzillaOS-Example__Title _Text_ls3ab_1 _Title_1ur5p_149">This is a title</h1>
	<p class="ProzillaOS-Example__Paragraph--Special">This is a special paragraph</p>
</div>
```
