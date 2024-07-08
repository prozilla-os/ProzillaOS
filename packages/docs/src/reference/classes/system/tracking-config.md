---
outline: deep
---

# Class [`TrackingConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/trackingConfig.ts)

## Constructor

> `new TrackingConfig(options)`

### Parameters

<br>

#### options

- options.enabled : `boolean`
- options.GAMeasurementId : `string`

## Properties

### enabled : `boolean` {#enabled}

Determines whether tracking is enabled

> **@default**
>
> ```ts
> true
> ```

### GAMeasurementId : `string` {#ga-measurement-id}

Google Analytics measurement ID

> [!WARNING]
> This option is required if you want to enable tracking. The tracking feature currently only supports tracking via Google Analytics.