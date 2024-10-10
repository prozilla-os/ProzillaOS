---
outline: deep
package: "@prozilla-os/core"
---

# Class [`TrackingConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/trackingConfig.ts)

## Constructor

> `new TrackingConfig(options)`

### Parameters

- **options**
  - **Type:** `TrackingConfigOptions | undefined`

```ts
interface TrackingConfigOptions {
	enabled?: boolean;
	GAMeasurementId?: string;
}
```

## Properties

### enabled

Determines whether tracking is enabled

- **Type:** `boolean`
- **Default:** `true`

### GAMeasurementId

Google Analytics measurement ID

- **Type:** `string`

> [!WARNING]
> This option is required if you want to enable tracking. The tracking feature currently only supports tracking via Google Analytics.
