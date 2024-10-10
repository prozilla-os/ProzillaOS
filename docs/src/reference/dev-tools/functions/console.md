---
outline: deep
description: "Functions related to the console"
package: "@prozilla-os/dev-tools"
---

# Console functions

{{ $frontmatter.description }}

- **Source:** [`console.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/dev-tools/src/features/console.ts)

## print(message, status, newLine)

Print messages to the console

::: details

- **Parameters**
  - **message** - Message to print to the console
    - **Type:** `string`
  - **status** - Status of the message
    - **Type:** `"error" | "info" | "file" | "success" | "start" | undefined`
  - **status** - If true, adds a new-line symbol at the end of the message
    - **Type:** `boolean | undefined`

:::
