---
outline: [1, 3]
description: "An abstract class for creating event emitters"
package: "@prozilla-os/shared"
---

# Class [`EventEmitter`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/shared/src/features/_utils/event.utils.ts)

{{ $frontmatter.description }}

## Type parameters

> `<EventMap extends EventNamesMap>`

```ts
type EventNamesMap = Record<string, string>;
```

## Properties

### EVENT_NAMES

A map of valid event names

- **Type:** `EventNamesMap`
- **Default:** `{}`

## Methods

### on(eventName, callback)

Add event listener for an event

#### Type parameters

- `<Key extends keyof EventMap>`

#### Parameters

- **eventName**
  - **Type:** `Key`
- **callback**
  - **Type:** `(data: unknown) => void`

### off(eventName, callback)

Remove event listener for an event

#### Type parameters

- `<Key extends keyof EventMap>`

#### Parameters

- **eventName**
  - **Type:** `Key`
- **callback**
  - **Type:** `(data: unknown) => void`

### emit(eventName, data)

Dispatch event

#### Type parameters

- `<Key extends keyof EventMap>`

#### Parameters

- **eventName**
  - **Type:** `Key`
- **data**
  - **Type:** `unknown | undefined`

## Example

Here is a class called Stream that sends events when the stream starts, stops and when the stream receives input. Any event listener listening to the `"new"` event, will receive the input from the stream.

```ts
import { EventEmitter } from "@prozilla-os/shared";

const StreamEvents = {
	new: "new",
	start: "start",
	stop: "stop",
} as const;

export class Stream extends EventEmitter<typeof StreamEvents> {
	static EVENT_NAMES = StreamEvents;

	enabled: boolean = false;

	start() {
		if (this.enabled)
			return;

		this.enabled = true;
		this.emit("start");
	}

	stop() {
		if (!this.enabled)
			return;

		this.enabled = false;
		this.emit("stop");
	}

	send(text: string) {
		if (this.enabled)
			this.emit("new", text);
	}
}
```
