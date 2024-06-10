[← Back](../README.md)

# Virtual Drive

> Related document: [Storage](../storage/README.md)

The virtual drive is a virtual file and directory system. The root directory is a virtual folder and the access point for all interactions with the virtual drive.

## Examples

### Component interacting with virtual drive

```tsx
// components/apps/example/Example.tsx

export function Example() {
	const virtualRoot = useVirtualRoot();
	const [currentDirectory, setCurrentDirectory] = useState(virtualRoot.navigate("~"));

	currentDirectory.createFile("example", "txt", (file) => {
		file.setContent("Foo bar.");
	});
}
```

## Virtual Root

The virtual root is a virtual folder that contains all other folders and files. It serves as the root directory for the virtual drive and is used as an access point in applications.

The default data for the virtual root is set in the `loadDefaultData()` function in the `VirtualRoot` class. It uses the contents of the GitHub repository to populate the root folder, allowing the user to browse the source code of ProzillaOS using its file explorer. To create or update the fetched repository tree data, so it can be used by ProzillaOS, run `npm run fetch`. This will fetch and cache the paths of every file and folder inside the repository. You should only run this command whenever a file/folder has been added/removed from the repo, because there is a [rate limit of 60 requests per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).  

For more information about how the virtual root is stored and loaded, check the [Storage](../storage/README.md) docs.

## Virtual File

Virtual files can have content or a source URL. Content is mainly used for text files, while the source property is mainly used for images.

## Virtual Folder

Virtual folders can contain files and sub-folders.

## Virtual File & Folder link

Virtual file links are files with no content or source URL, that simply point to another file on the virtual drive. Virtual folder links are folders with no sub-folders or files, that point to another folder. Virtual links can have some properties of their own, like a name or an icon URL.