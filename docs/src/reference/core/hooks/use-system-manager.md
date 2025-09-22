---
outline: deep
package: "@prozilla-os/core"
---

# Hook [`useSystemManager()`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/hooks/system/systemManagerContext.ts)

## Returns

- **Type:** [`SystemManager`](../classes/system/system-manager)

## Example

```tsx
import { useSystemManager } from "@prozilla-os/core";

export function Example() {
	const { systemName, tagLine } = useSystemManager();

	return <h1>Welcome to {systemName} - {tagLine}</h1>;
}
```
