---
outline: deep
package: "@prozilla-os/core"
---

# Class [`MiscConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/miscConfig.ts)

## Constructor

> `new MiscConfig(options)`

### Parameters

- **options**
  - **Type:** `MiscConfigOptions | undefined`

```ts
interface MiscConfigOptions {
	doubleClickDelay?: number;
}
```

## Properties

### doubleClickDelay

The maximum time between two clicks for those clicks to register as a double click in milliseconds

- **Type:** `number`
- **Default:** `250`

> [!NOTE]
> Also applies to touch devices.
