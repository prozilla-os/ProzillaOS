---
outline: deep
description: "Generates static class name using BEM notation"
package: "@prozilla-os/core"
---

# Hook [`useStaticClassName(block, element, modifier)`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/hooks/_utils/classNames.ts)

{{ $frontmatter.description }}

For more information about BEM, visit the [official website](https://getbem.com/).

## Parameters

- **block**
  - **Type:** `string | undefined`
- **element**
  - **Type:** `string | undefined`
- **modifier**
  - **Type:** `string | string[] | undefined`

## Returns

- **Type:** `string | null`

## Example

```tsx
import { useStaticClassName } from "@prozilla-os/core";

export function Example() {
	return <div className={useStaticClassName("Example")}>
		<h1 className={useStaticClassName("Example", "Title")}>This is a title</h1>
		<p className={useStaticClassName("Example", "Paragraph", "Special")}>This is a special paragraph</p>
	</div>;
}
```

### Result

```html
<div class="ProzillaOS-Example">
	<h1 class="ProzillaOS-Example__Title">This is a title</h1>
	<p class="ProzillaOS-Example__Paragraph--Special">This is a special paragraph</p>
</div>
```
