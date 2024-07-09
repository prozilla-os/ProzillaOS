---
outline: deep
---

# Class [`Vector2`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/math/vector2.ts)

## Constructor

> `new Vector2(x, y)`

### Parameters

- **x** : `number`

- **y** : `number` (optional)

> [!TIP]
> If you leave out the parameter `y`, the properties `x` and `y` will be set to the same value, e.g.:
>
> ```ts
> new Vector2(10) --> new Vector2(10, 10)
> ```

## Properties

### x : `number` {#x}

### y : `number` {#y}

### ZERO : `Vector2` <Badge type="info" text="static"/> {#zero}

Returns a vector with each value set to zero

> ```ts
> Vector2.ZERO --> new Vector2(0, 0)
> ```

### clone : `Vector2` {#clone}

Returns a clone of this vector

## Methods

### round () => `this` {#round}

Round the values of this vector to full numbers

> ```ts
> new Vector2(3.6, 1.3) --> new Vector2(4, 1)
> ```

### getDistance (x : `number`, y : `number`) => `number` {#get-distance}
### getDistance (vector2 : `Vector2`) => `number`

Get the distance between this vector and another

### add (vector2A : `Vector2`, vector2B: `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#add}

Add two vectors together

### subtract (vector2A : `Vector2`, vector2B: `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#subtract}

Subtract two vectors

### scale (vector2 : `Vector2`, scalar: `number`) => `Vector2` <Badge type="info" text="static"/> {#scale}

Scale a vector

### magnitude (vector2 : `Vector2`) => `number` <Badge type="info" text="static"/> {#magnitude}

Get the magnitude of a vector

### normalize (vector2 : `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#normalize}

Get the magnitude of a vector

### sqrDistance (vector2A : `Vector2`, vector2B : `Vector2`) => `number` <Badge type="info" text="static"/> {#sqr-distance}

Get the square distance of two vectors

### lerp (vector2A : `Vector2`, vector2B : `Vector2`, t : `number`) => `Vector2` <Badge type="info" text="static"/> {#lerp}

Lerp between two vectors
