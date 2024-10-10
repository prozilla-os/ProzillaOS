---
outline: 2
description: "Functions related to the keyboard"
package: "@prozilla-os/core"
---

# Keyboard functions

{{ $frontmatter.description }}

- **Source:** [`keyboard.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/_utils/keyboard.utils.ts)

## formatShortcut(shortcut)

Formats a shortcut (combination of keys) into a human-readable format.

For a list of valid key values, refer to this page: [Key values for keyboard events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

### Parameters

- **shortcut** - A list of keys
  - **Type:** `string[]`

### Returns

- **Type:** `string`

### Example

```ts
formatShortcut(["Control", "a"])
// Result: "Ctrl+A"
```
