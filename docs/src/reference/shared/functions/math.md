---
outline: 2
description: "Functions related to math"
package: "@prozilla-os/shared"
---

# Math functions

{{ $frontmatter.description }}

- **Source:** [`math.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/shared/src/features/_utils/math.utils.ts)

## clamp(value, min, max)

Clamp a value between a min and a max value

### Parameters

- **value**
  - **Type:** `number`
- **min**
  - **Type:** `number`
- **max**
  - **Type:** `number`

### Returns

- **Type:** `number`

## randomRange(min, max)

Get a random number in a range between a min and a max value

### Parameters

- **min**
  - **Type:** `number`
- **max**
  - **Type:** `number`

### Returns

- **Type:** `number`

## round(value, precision)

Round a number off to a certain amount of digits after the comma

### Parameters

- **value** - Initial value
  - **Type:** `number`
- **precision** - Maximum amount of digits allowed after the comma
  - **Type:** `number`

### Returns

Rounded value

- **Type:** `number`
