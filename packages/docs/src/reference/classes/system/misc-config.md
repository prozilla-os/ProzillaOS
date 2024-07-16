---
outline: deep
package: "@prozilla-os/core"
---

# Class [`MiscConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/miscConfig.ts)

## Constructor

> `new MiscConfig(options)`

### Parameters

<br>

#### options

- **Optional**
- **Type:** `MiscConfigOptions`

```ts
interface MiscConfigOptions {
	doubleClickDelay?: number;
}
```

## Properties

### doubleClickDelay

- **Type:** `number`
- **Default:** `250`

The maximum time between two clicks for those clicks to register as a double click in milliseconds

> [!NOTE] 
> Also applies to touch devices.
