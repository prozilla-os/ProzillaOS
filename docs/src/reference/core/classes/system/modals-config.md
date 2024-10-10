---
outline: deep
package: "@prozilla-os/core"
---

# Class [`ModalsConfig`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/modalsConfig.ts)

## Constructor

> `new ModalsConfig(options)`

### Parameters

- **options**
  - **Type:** `ModalsConfigOptions | undefined`

```ts
interface ModalsConfigOptions {
	defaultDialogSize?: Vector2;
	defaultFileSelectorSize?: Vector2;
}
```

> [!NOTE] References
>
> - [Vector2](/reference/core/classes/utils/vector2)

## Properties

### defaultDialogSize

Default size of a dialog box

- **Type:** [`Vector2`](/reference/core/classes/utils/vector2)
- **Default:** `new Vector2(400, 200)`

### defaultFileSelectorSize

Default size of a file selector

- **Type:** [`Vector2`](/reference/core/classes/utils/vector2)
- **Default:** `new Vector2(700, 400)`
