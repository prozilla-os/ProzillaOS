[← Back](../README.md)

# Applications

> Related document: [Windows](../windows/README.md)

Applications (sometimes shortened to apps) are processes that open a window when ran. The window allows the user to view and interact with the app. Apps have a `title`, `id` and a `windowContent` property that refers to the React component of the application interface.

> Some applications have a different name in the UI, these names are written between brackets and quotation marks. The other name is the one used in code and file/folder names.

## Table of Contents

- [<img src="../../../public/assets/applications/icons/terminal.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Terminal ("Commands")](terminal/README.md)
- [<img src="../../../public/assets/applications/icons/file-explorer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> File Explorer ("Files")](file-explorer/README.md)
- [<img src="../../../public/assets/applications/icons/media-viewer.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Media Viewer ("Photos")](media-viewer/README.md)
- [<img src="../../../public/assets/applications/icons/text-editor.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Text Editor ("Notes")](text-editor/README.md)
- [<img src="../../../public/assets/applications/icons/settings.svg" width=20 height=20 style="vertical-align: text-bottom; background: none;"/> Settings](settings/README.md)

## Common components

### Header menu

The header menu is a useful component that can be added to app windows for quick access to useful functions, like saving and opening files. The header menu can also be used to add shortcuts for functions.

#### Example

```js
// components/applications/.common/HeaderMenu.jsx

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
// features/applications/applications.js

import { WebView } from "../../components/applications/templates/WebView.jsx";

export default class ApplicationsManager {
	static APPLICATIONS = [
		// ...
		new Application("Web App", "web-app",  WebView, { source: "https://prozilla.dev/" }),
	]

	// ...
}
```

## App examples

### Adding a new application

```js
// components/applications/example/Example.jsx

export function Example() {
	return (
		<p>Application interface goes here.</p>
	)
}
```

```js
// features/applications/applications.js

import { Example } from "../../components/applications/example/Example.jsx";

export default class ApplicationsManager {
	static APPLICATIONS = [
		// ...
		new Application("Example App", "example", Example),
	]

	// ...
}
```