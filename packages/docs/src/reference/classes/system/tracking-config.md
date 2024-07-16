---
outline: deep
package: "@prozilla-os/core"
---

# Class [`TrackingConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/trackingConfig.ts)

## Constructor

> `new TrackingConfig(options)`

### Parameters

<br>

#### options

- **Optional**
- **Type:** `TrackingConfigOptions`

```ts
interface TrackingConfigOptions {
	enabled?: boolean;
	GAMeasurementId?: string;
}
```

## Properties

### enabled

- **Type:** `boolean`
- **Default:** `true`

Determines whether tracking is enabled

### GAMeasurementId

- **Type:** `string`

Google Analytics measurement ID

> [!WARNING]
> This option is required if you want to enable tracking. The tracking feature currently only supports tracking via Google Analytics.