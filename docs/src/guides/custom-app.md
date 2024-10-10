---
outline: deep
description: "Learn how to create your own custom ProzillaOS apps"
---

# Making a custom app

## Prerequisites

This guide assumes you have already set up a basic React project with TypeScript. To learn more about how to set up a React project, check out the official [React documentation](https://react.dev/learn/start-a-new-react-project). The React documentation also has a guide on [how to start using TypeScript in your React project](https://react.dev/learn/typescript).

## Building an interface

Create a new file called `MyApp.tsx` inside your `components` folder, this file will hold the main part of your interface, which will be a React component.

```tsx
// components/MyApp.tsx

import { WindowProps } from "prozilla-os";

export function MyApp({ app }: WindowProps) {
	return <h1>Welcome to {app.name}!</h1>;
}
```

To make your app look pretty, you'll need some CSS. Create a file called `MyApp.module.css` in the same folder as your component, which will include your classes and styles.

```css
/* components/MyApp.module.css */

.Title {
	font-size: 2rem;
}
```

Then import your stylesheet in your React component and apply your classes:

```tsx
// components/MyApp.tsx

import { WindowProps } from "prozilla-os";
import styles from "./MyApp.module.css"

export function MyApp({ app }: WindowProps) {
	return <h1 className={styles.Title}>Welcome to {app.name}!</h1>;
}
```

## Creating your app

Now that we have a basic interface, we'll need to turn this into an actual app and make it work with the ProzillaOS applications sytem.

Create a new file called `index.ts`, this file will set your app's metadata and export it along with a reference to your React component.

```ts
// index.ts

import { App } from "prozilla-os";
import { MyApp } from "./components/MyApp";

/**
 * Change this to the name of your application
 * This is what users will see when they use your app
 */
const name = "My App";

/**
 * Change this to the name of your application, but only use lower case letters and hyphens (-)
 * This won't be seen by users very often, but will be used by ProzillaOS to identify your app
 */
const id = "my-app";

const myApp = new App(name, id, MyApp)
	.setDescription("An interesting description of your app and its purpose") 
	.setIconUrl("A link to a cool SVG icon for your app");

export { myApp };
```

Make sure to set a valid icon URL or your app might become invisible.

## Using your app

There you go! You have now made a custom ProzillaOS app that you can start using. Refer to the [Getting started guide](./getting-started) for more information about how to use your custom app.

## What's next?

Now you can publish your app as an npm or a GitHub package and share it with others. Feel free to [edit this file](https://github.com/prozilla-os/ProzillaOS/edit/main/packages/README.md) to add a link to your ProzillaOS app in the official ProzillaOS repo on GitHub and on the ProzillaOS documentation site.
