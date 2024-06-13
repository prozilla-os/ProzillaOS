[← Back](../README.md)

# Apps

> Related document: [Windows](../windows/README.md)

Applications (often shortened to apps) are processes that open a window when ran. The window allows the user to view and interact with the app. Apps have a `name` and `id` property as well as a `windowContent` property that refers to the React component of the application interface.

## Pages

- [<img src="../../../public/assets/apps/icons/terminal.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Commands (terminal)](terminal/README.md)
- [<img src="../../../public/assets/apps/icons/file-explorer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Files (file-explorer)](file-explorer/README.md)
- [<img src="../../../public/assets/apps/icons/media-viewer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Photos (media-viewer)](media-viewer/README.md)
- [<img src="../../../public/assets/apps/icons/text-editor.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Notes (text-editor)](text-editor/README.md)
- [<img src="../../../public/assets/apps/icons/settings.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Settings (settings)](settings/README.md)

## Name VS ID

In the list above, you can see some app names, as well as the corresponding IDs, which are written between brackers and in kebab-case. App names are mainly used in user interfaces, may change at any point and can contain spaces. App IDs are mostly constrained within the development-side of ProzillaOS, generally will remain unchanged and can not contain spaces. See the table below for a list of use cases.

| Location | Uses ID | Uses name |
| --- | --- | --- |
| File & folder names | :heavy_check_mark: | :x: | 
| React components | :heavy_check_mark: | :x: | 
| Standalone URL | :heavy_check_mark: | :x: | 
| URL params | :heavy_check_mark: | :x: | 
| Static assets | :heavy_check_mark: | :x: | 
| Window title | :x: | :heavy_check_mark: | 
| Apps list | :x: | :heavy_check_mark: | 
| Standalone title | :x: | :heavy_check_mark: | 

> [!CAUTION]  
> Changing the ID of an application that has already been deployed once may cause unexpected issues, like creating invalid links.

## Common components

### Header menu

The header menu is a useful component that can be added to app windows for quick access to useful functions, like saving and opening files. The header menu can also be used to add shortcuts for functions.

#### Example

```tsx
<HeaderMenu>
	<DropdownAction label="File" showOnHover={false}>
		<ClickAction label="New" onTrigger={/* ... */}/>
		<ClickAction label="Open" onTrigger={/* ... */} shortcut={["Control", "o"]}/>
		<ClickAction label="Save" onTrigger={/* ... */} shortcut={["Control", "s"]}/>
		<ClickAction label="Quit" onTrigger={/* ... */} shortcut={["Control", "q"]}/>
	</DropdownAction>
	<DropdownAction label="View" showOnHover={false}>
		<ClickAction
			label={currentMode === "view" ? "Edit mode" : "Preview mode"}
			onTrigger={/* ... */}
			shortcut={["Control", "v"]}
		/>
		<ClickAction label="Zoom in" onTrigger={/* ... */} shortcut={["Control", "+"]}/>
		<ClickAction label="Zoom out" onTrigger={/* ... */} shortcut={["Control", "-"]}/>
		<ClickAction label="Reset Zoom" onTrigger={/* ... */} shortcut={["Control", "0"]}/>
	</DropdownAction>
</HeaderMenu>
```

## App templates

### Webview

The webview template can be used to turn a webpage into an application by simply setting a source property.

#### Example

```ts
// features/apps/apps.ts

import { WebView } from "../../components/apps/templates/WebView";

export default class AppsManager {
	static APPLICATIONS = [
		// ...
		new App("Web App", "web-app",  WebView, { source: "https://prozilla.dev/" }),
	]

	// ...
}
```

## App examples

### Adding a new app

```tsx
// components/apps/example/Example.tsx

export function Example() {
	return (
		<p>Application interface goes here.</p>
	)
}
```

```ts
// features/apps/apps.ts

import { Example } from "../../components/apps/example/Example";

export default class AppsManager {
	static APPLICATIONS = [
		// ...
		new App("Example App", "example", Example),
	]

	// ...
}
```