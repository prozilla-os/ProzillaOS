---
outline: 3
description: "A utility class for keeping track of time"
package: "@prozilla-os/core"
---

# Class [`TimeManager`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/_utils/time.utils.ts)

{{ $frontmatter.description }}

## Properties

### startDate <Badge type="info" text="static"/>

- **Static**
- **Type:** `Date`

## Methods

### reset() <Badge type="info" text="static"/>

Resets the time

### getUptime(precision) <Badge type="info" text="static"/>

Get the current uptime

#### Parameters

- **precision** - Determines how many units of time the uptime is displayed in
  - **Type:** `number`
  - **Default:** `2`

#### Returns

The current uptime in a human-readable format

- **Type:** `string`

#### Example

```ts
TimeManager.getUptime(1);
// Result: 4 hours

TimeManager.getUptime(2);
// Result: 4 hours, 15 minutes 

TimeManager.getUptime(3);
// Result: 4 hours, 15 minutes, 56 seconds
```
