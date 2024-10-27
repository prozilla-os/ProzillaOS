---
outline: deep
package: "@prozilla-os/core"
---

# Class [`VirtualBase`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/virtual-drive/virtualBase.ts) extends [`EventEmitter`](../../../shared/classes/event-emitter)

## Constructor

> `new VirtualBase(name)`

### Parameters

- **name**
  - **Type:** `string`

## Properties

### id

- **Type:** `string`

### name

- **Type:** `string`

### alias

- **Type:** `string | undefined`

### parent

- **Type:** `VirtualFolder | undefined`

> [!NOTE] References
>
> - [VirtualFolder](./virtual-folder)

### isProtected

- **Type:** `boolean | undefined`

### iconUrl

- **Type:** `string | undefined`

### linkedFile

- **Type:** `VirtualFile | undefined`

### linkedFolder

- **Type:** `VirtualFolder | undefined`

> [!NOTE] References
>
> - [VirtualFolder](./virtual-folder)

### editedByUser

- **Type:** `boolean | undefined`

### isRoot

- **Type:** `boolean | undefined`

### root

- **Type:** `VirtualRoot | undefined`

### path

- **Type:** `string`

### displayPath

Returns path without using this item's alias

- **Type:** `string`

### absolutePath

Returns path without using any aliases

- **Type:** `string`

### canBeEdited

Returns whether this can be edited in its current state

- **Type:** `boolean`

## Methods

### setName(name)

- **Parameters**
  - **name**
   	- **Type:** `string`
- **Returns:** `this`

### setAlias(alias)

- **Parameters**
  - **alias**
   	- **Type:** `string`
- **Returns:** `this`

### setParent(parent)

- **Parameters**
  - **parent**
   	- **Type:** [`VirtualFolder`](./virtual-folder)
- **Returns:** `this`

### setProtected(value)

- **Parameters**
  - **value**
   	- **Type:** `boolean`
- **Returns:** `this`

### setIconUrl(iconUrl)

- **Parameters**
  - **iconUrl**
   	- **Type:** `string | null`
- **Returns:** `this`

### getIconUrl()

- **Returns**
  - **Type:** `string`

### getType()

- **Returns:** `"None"`

### delete()

### confirmChanges(root)

- **Parameters**
  - **root**
   	- **Type:** `VirtualRoot | undefined`

### open(...args)

- **Parameters**
  - **args**
   	- **Type:** `unknown[]`
- **Returns:** `null`

### getRoot()

- **Returns**
  - **Type:** `VirtualRoot`

### isFile()

- **Returns:** `false`
  - **Type:** `boolean`

### isFolder()

- **Returns:** `false`
  - **Type:** `boolean`

### toJSON()

- **Returns**
  - **Type:** `VirtualBaseJson | null`

```ts
interface VirtualBaseJson {
	nam: string;
	ico?: string;
}
```

### toString()

- **Returns**
  - **Type:** `string | null`
