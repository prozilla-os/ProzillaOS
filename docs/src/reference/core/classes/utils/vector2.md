---
outline: deep
description: "A 2-dimensional vector, set of coordinates or dimensions"
package: "@prozilla-os/core"
---

# Class [`Vector2`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/math/vector2.ts)

{{ $frontmatter.description }}

## Constructor

> `new Vector2(x, y)`

### Parameters

- **x**
  - **Type:** `number`
- **y**
  - **Type:** `number | undefined`

### Examples

```ts
new Vector2(2, 4)
// Result: Vector2(2, 4)

new Vector2(3)
// Result: Vector2(3, 3)
```

## Properties

### x

- **Type:** `number`

### y

- **Type:** `number`

### ZERO

Returns a vector with each value set to zero

- **Static**
- **Type:** `Vector2`
- **Example**

	```ts
	Vector2.ZERO
	// Result: Vector2(0, 0)
	```

### clone

Returns a clone of this vector

- **Type:** `Vector2`

## Methods

### round()

Round the values of this vector to whole numbers

::: details

- **Returns:** `this`
- **Example**

	```ts
	new Vector2(3.6, 1.3).round()
	// Result: Vector2(4, 1)
	```

:::

### getDistance(x, y)

Get the distance between this vector and another

::: details

- **Parameters**
  - **x**
    - **Type:** `number`
  - **y**
    - **Type:** `number`
- **Returns**
  - **Type:** `number`

:::

### getDistance(vector2)

Get the distance between this vector and another

::: details

- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

:::

### add(vector2A, vector2B)

Add two vectors together

::: details

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

:::

### subtract(vector2A, vector2B)

Subtract two vectors

::: details

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

:::

### scale(vector2, scalar)

Scale a vector

::: details

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
  - **scalar**
    - **Type:** `number`
- **Returns**
  - **Type:** `Vector2`

:::

### magnitude(vector2)

Get the magnitude of a vector

::: details

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

:::

### normalize(vector2)

Normalize a vector

::: details

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

:::

### sqrDistance (vector2A, vector2B)

Get the square distance between two vectors

::: details

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

:::

### lerp(vector2A, vector2B, t)

Lerp between two vectors

::: details

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
  - **t**
    - **Type:** `number`
- **Returns**
  - **Type:** `Vector2`

:::
