[← Back](../README.md)

# Applications

Applications (sometimes shortened to apps) are processes that open a window when ran. The window allows the user to view and interact with the app. Apps have a `title`, `id` and a `windowContent` property that refers to the React component of the application interface.

## Table of Contents

- [<img src="../../../public/media/applications/icons/terminal.svg" width=20 height=20 style="vertical-align: middle; background: none;"/> Terminal](terminal/README.md)
- [<img src="../../../public/media/applications/icons/file-explorer.svg" width=20 height=20 style="vertical-align: middle; background: none;"/> File Explorer](file-explorer/README.md)
- [<img src="../../../public/media/applications/icons/media-viewer.svg" width=20 height=20 style="vertical-align: middle; background: none;"/> Media Viewer](media-viewer/README.md)

## Examples

### Adding a new application

```js
// src/components/applications/example/Example.jsx

export function Example() {
	return (
		<p>Application interface goes here.</p>
	)
}
```

```js
// src/features/applications/applications.js

import { Example } from "../../components/applications/example/Example.jsx";

export default class ApplicationsManager {
	static APPLICATIONS = [
		// ...
		new Application("Example App", "example", Example),
	]

	// ...
}
```

### Turning a webpage into an application

```js
// src/features/applications/applications.js

import { WebView } from "../../components/applications/templates/WebView.jsx";

export default class ApplicationsManager {
	static APPLICATIONS = [
		// ...
		new Application("Web App", "web-app",  WebView, { source: "https://prozilla.dev/" }),
	]

	// ...
}
```