---
outline: 2
description: "Functions related to dates and time"
package: "@prozilla-os/shared"
---

# Date functions

{{ $frontmatter.description }}

- **Source:** [`date.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/shared/src/features/_utils/date.utils.ts)

## formatTime(time, maxLength, allowAffixes)

Format a time

### Parameters

- **time** - Time in milliseconds (negative number represents time in the past)
  - **Type:** `number`
- **maxLength** - The maximum amount of units, e.g.: 3 => years, months, days
  - **Type:** `number | undefined`
  - **Default:** `3`
- **allowAffixes** - Allow "... ago" or "in ..."
  - **Type:** `boolean`

### Returns

- **Type:** `string`

## formatRelativeTime(date, maxLength, allowAffixes)

Format a time relative to now

### Parameters

- **date**
  - **Type:** `Date`
- **maxLength** - The maximum amount of units, e.g.: 3 => years, months, days
  - **Type:** `number | undefined`
   	- **Default:** `3`
- **allowAffixes** - Allow "... ago" or "in ..."
  - **Type:** `boolean`

### Returns

- **Type:** `string`
