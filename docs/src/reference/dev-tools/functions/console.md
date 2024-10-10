---
outline: 2
description: "Functions related to the console"
package: "@prozilla-os/dev-tools"
---

# Console functions

{{ $frontmatter.description }}

- **Source:** [`console.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/dev-tools/src/features/console.ts)

## print(message, status, newLine)

Print messages to the console

### Parameters

- **message** - Message to print to the console
  - **Type:** `string`
- **status** - Status of the message
  - **Type:** `"error" | "info" | "file" | "success" | "start" | undefined`
- **status** - If true, prints the message on a new line
  - **Type:** `boolean | undefined`

### Example

```ts
print("Starting application", "start");
print("Processing information", "info", true);
print("info.txt", "file");
print("Information processed", "success");
print("Application failed", "error", true);
```

<<< ./console-print.ansi
