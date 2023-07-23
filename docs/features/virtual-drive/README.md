[← Back](../README.md)

# Virtual Drive

The virtual drive is a virtual file and directory system. The root directory is a virtual folder and the access point for all interactions with the virtual drive.

## Table of Contents

- [Virtual File](./virtual-file/README.md)
- [Virtual Folder](./virtual-folder/README.md)

## Examples

### Component interacting with virtual drive

```js
// src/components/applications/example/Example.jsx

export function Example() {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate("~"));

	currentDirectory.createFile("example", "txt", (file) => {
		file.setContent("Foo bar.");
	});
}
```