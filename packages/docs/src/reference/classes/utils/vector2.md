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

<br>

#### x

- **Type:** `number`

#### y

- **Optional**
- **Type:** `number`

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

- **Static**
- **Type:** `Vector2`

Returns a vector with each value set to zero

- **Example**

	```ts
	Vector2.ZERO
	// Result: Vector2(0, 0)
	```

### clone

- **Type:** `Vector2`

Returns a clone of this vector

## Methods

### round()

- **Returns**
  - **Type:** `this`

Round the values of this vector to whole numbers

- **Example**

	```ts
	new Vector2(3.6, 1.3).round()
	// Result: Vector2(4, 1)
	```

### getDistance(x, y)

- **Parameters**
  - **x**
    - **Type:** `number`
  - **y**
    - **Type:** `number`
- **Returns**
  - **Type:** `number`

Get the distance between this vector and another

### getDistance(vector2)

- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

Get the distance between this vector and another

### add(vector2A, vector2B)

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

Add two vectors together

### subtract(vector2A, vector2B)

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

Subtract two vectors

### scale(vector2, scalar)

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
  - **scalar**
    - **Type:** `number`
- **Returns**
  - **Type:** `Vector2`

Scale a vector

### magnitude(vector2)

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

Get the magnitude of a vector

### normalize(vector2)

- **Static**
- **Parameters**
  - **vector2**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `Vector2`

Normalize a vector

### sqrDistance (vector2A, vector2B)

- **Static**
- **Parameters**
  - **vector2A**
    - **Type:** `Vector2`
  - **vector2B**
    - **Type:** `Vector2`
- **Returns**
  - **Type:** `number`

Get the square distance between two vectors

### lerp(vector2A, vector2B, t)

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

Lerp between two vectors
