---
outline: [1, 2]
description: "Functions related to arrays"
package: "@prozilla-os/shared"
---

# Array functions

{{ $frontmatter.description }}

- **Source:** [`array.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/shared/src/features/_utils/array.utils.ts)

## removeFromArray(item, array)

Remove an item from an array

### Type parameters

- `<ItemType>`

### Parameters

- **item** - Item to remove from the array
  - **Type:** `ItemType`
- **array**
  - **Type:** `ItemType[]`

## randomFromArray(array)

Get a random item from an array

### Type parameters

- `<ItemType>`

### Parameters

- **array**
  - **Type:** `ItemType[]`

### Returns

- **Type:** `ItemType`

## removeDuplicatesFromArray(array)

Removes all duplicate items from an array and returns the array

### Type parameters

- `<ItemType>`

### Parameters

- **array**
  - **Type:** `ItemType[]`

### Returns

- **Type:** `ItemType[]`
