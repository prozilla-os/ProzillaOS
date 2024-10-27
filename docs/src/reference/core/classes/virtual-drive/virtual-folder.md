---
outline: [1,3]
description: "A virtual folder that can contains files and sub-folders"
package: "@prozilla-os/core"
---

# Class [`VirtualFolder`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/virtual-drive/folder/virtualFolder.ts) extends [`VirtualBase`](./virtual-base)

{{ $frontmatter.description }}

## Constructor

> `new VirtualFolder(name, type)`

### Parameters

- **name**
  - **Type:** `string`
- **type**
  - **Type:** `number | undefined`

## Properties

### subFolders

- **Type:** `(VirtualFolder | VirtualFolderLink)[]`

### files

- **Type:** `(VirtualFile | VirtualFileLink)[]`

### type

- **Type:** `number | undefined`

## Methods

### setAlias(alias)

- **Parameters**
  - **alias**
   	- **Type:** `string`
- **Returns:** `this`

### hasFile(name, extension)

Returns true if this folder contains a file matching a name and extension

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **extension**
   	- **Type:** `string | undefined`
- **Returns**
  - **Type:** `boolean`

### hasFolder(name)

Returns true if this folder contains a folder matching a name

- **Parameters**
  - **name**
   	- **Type:** `string`
- **Returns**
  - **Type:** `boolean`

### findFile(name, extension)

Finds and returns a file inside this folder matching a name and extension

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **extension**
   	- **Type:** `string | undefined`
- **Returns**
  - **Type:** `VirtualFile | VirtualFileLink | null`

### findSubFolder(name)

Finds and returns a folder inside this folder matching a name

- **Parameters**
  - **name**
   	- **Type:** `string`
- **Returns**
  - **Type:** `VirtualFolder | VirtualFolderLink | null`

### createFile(name, extension, callback)

Creates a file with a name and extension

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **extension**
   	- **Type:** `string | undefined`
  - **callback**
   	- **Type:** `((newFile: VirtualFile | VirtualFileLink) => void) | undefined`
- **Returns:** `this`

### createFiles(files)

Creates files based on an array of objects with file names and extensions

- **Parameters**
  - **files**
   	- **Type:** `{ name: string; extension: string; }[]`
- **Returns:** `this`

### createFileLink(name, callback)

Creates a file link with a name

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **callback**
   	- **Type:** `((newFileLink: VirtualFileLink | VirtualFile) => void) | undefined`
- **Returns:** `this`

### createFileLinks(files)

Creates file links based on an array of objects with file names and extensions

- **Parameters**
  - **files**
   	- **Type:** `{ name: string; }[]`
- **Returns:** `this`

### createFolder(name, callback)

Creates a folder with a name

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **callback**
   	- **Type:** `((newFolder: VirtualFolder) => void) | undefined`
- **Returns:** `this`

### createFolders(names)

Creates folders based on an array of folder names

- **Parameters**
  - **names**
   	- **Type:** `string[]`
- **Returns:** `this`

### createFolderLink(name, callback)

Creates a folder link with a name

- **Parameters**
  - **name**
   	- **Type:** `string`
  - **callback**
   	- **Type:** `((newFolderLink: VirtualFolderLink | VirtualFolder) => void) | undefined`
- **Returns:** `this`

### createFolderLinks(names)

Creates folder links based on an array of folder names

- **Parameters**
  - **names**
   	- **Type:** `string[]`
- **Returns:** `this`

### remove(child)

Removes a file or folder from this folder

- **Parameters**
  - **child**
   	- **Type:** `VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink`
- **Returns:** `this`

### navigate(relativePath)

Returns the file or folder at a relative path or null if it doesn't exist. This works similary to the `cd` command in a Linux environment. By starting your relative path with `.`, `..` or `/` you can refer to the current folder, parent folder or root folder respectively. You may also use aliases to refer to folders with aliases (e.g.: `~` refers to the home directory). If the relative path doesn't resolve to an existing folder or file, the function will return `null`.

- **Parameters**
  - **relativePath**
   	- **Type:** `string`
- **Returns**
  - **Type:** `VirtualFile | VirtualFolder | null`

### delete()

Deletes this folder and all its files and sub-folders recursively

### open(windowsManager)

Opens this folder in file explorer

- **Parameters**
  - **windowsManager**
   	- **Type:** `WindowsManager`

### getFiles(showHidden)

Returns all files inside this folder

- **Parameters**
  - **showHidden** - Whether to include hidden files
   	- **Type:** `boolean`
   	- **Default:** `false`
- **Returns**
  - **Type:** `VirtualFile[]`

### getSubFolders(showHidden)

Returns all sub-folders inside this folder

- **Parameters**
  - **showHidden** - Whether to include hidden folders
   	- **Type:** `boolean`
   	- **Default:** `false`
- **Returns**
  - **Type:** `VirtualFolder[]`

### getItemCount(includeHidden)

Returns the amount of files and sub-folders inside this folder

- **Parameters**
  - **includeHidden** - Whether to include hidden files and folders in the count
   	- **Type:** `boolean`
   	- **Default:** `false`
- **Returns**
  - **Type:** `number`

### isFolder()

- **Returns:** `true`
  - **Type:** `boolean`

### getIconUrl()

- **Returns**
  - **Type:** `string`

### toJSON()

- **Returns**
  - **Type:** `VirtualFolderJson | null`

```ts
interface VirtualFolderJson extends VirtualBaseJson {
	fls?: VirtualFileJson[];
	fds?: VirtualFolderJson[];
}

interface VirtualBaseJson {
	nam: string;
	ico?: string;
}
```

## Example

```ts
const folder = new VirtualFolder("Example");

folder.createFolder("Documents", (documentsFolder) => {
	documentsFolder.createFile("text", "txt", (file) => {
		file.setContent("Hello world!");
	});
});

const textTxt: VirtualFile = folder.navigate("./Documents/text.txt");
console.log(textTxt.content);
```

### Output

```txt
Hello world!
```
