---
outline: deep
description: "Learn how to get started with ProzillaOS"
---

# Getting started

## Prerequisites

This guide assumes you have already set up a basic React project with TypeScript. To learn more about how to set up a React project, check out the official [React documentation](https://react.dev/learn/start-a-new-react-project). The React documentation also has a guide on [how to start using TypeScript in your React project](https://react.dev/learn/typescript).

## Installation

There are multiple ways to install ProzillaOS. The simplest way is to install the bundle package `prozilla-os`, which contains the core functionality as well as all standard applications.

::: code-group

```bash [NPM]
npm install prozilla-os
```

```bash [Yarn]
yarn add prozilla-os
```

```bash [PNPM]
pnpm add prozilla-os
```

```bash [Bun]
bun add prozilla-os
```

:::

Alternatively, you can install the `@prozilla-os/core` package, which only contains the core functionality, and install the apps manually or create custom apps.

::: code-group

```bash [NPM]
npm install @prozilla-os/core
```

```bash [Yarn]
yarn add @prozilla-os/core
```

```bash [PNPM]
pnpm add @prozilla-os/core
```

```bash [Bun]
bun add @prozilla-os/core
```

:::

### Installing apps

Install apps by running the command below. Replace `[app]` with the id of the app you want to install.

::: code-group

```bash [NPM]
npm install @prozilla-os/[app]
```

```bash [Yarn]
yarn add @prozilla-os/[app]
```

```bash [PNPM]
pnpm add @prozilla-os/[app]
```

```bash [Bun]
bun add @prozilla-os/[app]
```

:::

## Usage

Your entry file should look something like this:

```tsx
// index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<React.StrictMode><App/></React.StrictMode>);
```

Change your `<App>` component to:

```tsx
// App.tsx

import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";

export function App(): ReactElement {
	return <ProzillaOS
		systemName={"Example"}
		tagLine={"Powered by ProzillaOS"}
		config={{
			// Configuration
		}}
	>
		<Taskbar/>
		<WindowsView/>
		<ModalsView/>
		<Desktop/>
	</ProzillaOS>;
}
```

Replace `"Example"` with a system name of your choosing and `"Power by ProzillaOS"` by your tag line/short description.

If you don't want a taskbar/desktop/modal in your project, you can leave those components out. Unless you don't want to be able to open applications in your project, you will need to keep the `<WindowsView>` component.

> [!CAUTION]
> Depending on how you installed ProzillaOS, your import statement will look slightly different. Make sure you are importing from the correct package that you installed previously.

### Using apps

To start using applications in your project, use the `appsConfig` class to add a list of apps to your configuration.

```tsx
<ProzillaOS
	{/* Other props */}
	config={{
		apps: new appsConfig({
			apps: [
				// Applications go here
			]
		})
	}}
>
```

#### Example

Here is an example that shows you how to add the fileExplorer app:

```tsx
import { fileExplorer } from "prozilla-os"

```

```tsx
<ProzillaOS
	{/* Other props */}
	config={{
		apps: new appsConfig({
			apps: [
				fileExplorer.setName("Files")
					.setDescription("Browse and manage your virtual files on ProzillaOS.")
					.setIconUrl("/assets/apps/icons/file-explorer.svg")
			]
		})
	}}
>
```

> [!TIP]
> Move your configurations to separate files to make them more readable and keep a better overview of your different configurations. You can then import these configurations into your `App.tsx` file and use them as values for the `config` prop of the `<ProzillaOS>` component.

Once that's done, go ahead and start your project and open it in your browser to check it out. Congratulations, you've made your own operating system inside the browser!

## Community

If you have questions or need help, reach out to the community on [Discord](https://discord.gg/JwbyQP4tdz).
