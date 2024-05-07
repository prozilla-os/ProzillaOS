[← Back](../README.md)

# Apps

> Related document: [Windows](../windows/README.md)

Applications (often shortened to apps) are processes that open a window when ran. The window allows the user to view and interact with the app. Apps have a `title`, `id` and a `windowContent` property that refers to the React component of the application interface.

> Some apps have a different name in the UI, these names are written between brackets and quotation marks. The other name is the one used in code and file/folder names.

## Table of Contents

- [<img src="../../../public/assets/apps/icons/terminal.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Terminal ("Commands")](terminal/README.md)
- [<img src="../../../public/assets/apps/icons/file-explorer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> File Explorer ("Files")](file-explorer/README.md)
- [<img src="../../../public/assets/apps/icons/media-viewer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Media Viewer ("Photos")](media-viewer/README.md)
- [<img src="../../../public/assets/apps/icons/text-editor.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Text Editor ("Notes")](text-editor/README.md)
- [<img src="../../../public/assets/apps/icons/settings.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Settings](settings/README.md)

## Common components

### Header menu

The header menu is a useful component that can be added to app windows for quick access to useful functions, like saving and opening files. The header menu can also be used to add shortcuts for functions.

#### Example

```js
// components/apps/_common/HeaderMenu.jsx

<HeaderMenu
	options={{
		"File": {
			"New": () => {
				// ...
			},
			"Save": () => {
				// ...
			},
			"Exit": () => {
				// ...
			},
		},
	}}
	shortcuts={{
		"File": {
			"New": ["Control", "e"],
			"Save": ["Control", "s"],
			"Exit": ["Control", "x"],
		},
	}}
/>
```

## App templates

### Webview

The webview template can be used to turn a webpage into an application by simply setting a source property.

#### Example

```js
// features/apps/apps.js

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

```js
// components/apps/example/Example.jsx

export function Example() {
	return (
		<p>Application interface goes here.</p>
	)
}
```

```js
// features/apps/apps.js

import { Example } from "../../components/apps/example/Example";

export default class AppsManager {
	static APPLICATIONS = [
		// ...
		new App("Example App", "example", Example),
	]

	// ...
}
```