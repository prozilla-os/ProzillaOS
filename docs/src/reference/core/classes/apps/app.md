---
outline: deep
description: "An application that can be run by ProzillaOS"
package: "@prozilla-os/core"
---

# Class [`App`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/app.tsx)

{{ $frontmatter.description }}

Applications can be installed by adding them to the `apps` array in [`AppsConfig`](../system/apps-config#apps-app)

## Type parameters

> `<AppProps extends WindowProps = WindowProps>`

## Constructor

> `new App(name, id, windowContent, windowOptions)`

### Parameters

- **name**
  - **Type:** `string`
- **id**
  - **Type:** `string`
- **windowContent**
  - **Type:** `React.FC<AppProps>`
- **windowOptions**
  - **Type:** `(Partial<AppProps> & WindowOptions) | undefined`

```ts
interface WindowOptions {
	size?: Vector2;
	[key: string]: unknown;
}
```

> [!NOTE] References
>
> - [Vector2](../utils/vector2)

## Properties

### name

The display name of this application

- **Type:** `string`
- **Default:** `"App"`

### id

The unique ID of this application

- **Type:** `string`
- **Default:** `"app"`

> [!WARNING]
> Every app must have a unique ID that only contains lower case letters (a-z), numbers (0-9) and dashes (-).

### windowContent

React component that renders this app inside a window when the app is running

- **Type:** `React.FC<AppProps>`

### windowOptions

Default options that get passed to the `windowContent` component

- **Type:** `(Partial<AppProps> & WindowOptions) | undefined`

```ts
interface WindowOptions {
	size?: Vector2;
	[key: string]: unknown;
}
```

> [!NOTE] References
>
> - [Vector2](../utils/vector2)

### description

Description of this application

- **Type:** `string | null`

### iconUrl

URL of the icon of this application

- **Type:** `string | null`

### role

Defines what parts of the OS this app is responsible for and how it can be used by other apps

- **Type:** `string | null`

### associatedExtensions

An array of file extensions that this application is used to open and read

- **Type:** `string | null`

### pinnedByDefault

Determines whether the app is pinned by default

- **Type:** `boolean`
- **Default:** `true`

### launchAtStartup

Determines whether the app is launched at startup

- **Type:** `boolean`
- **Default:** `false`

## Methods

### setName(name)

Set the display name of this application

- **Parameters**
  - **name**
   	- **Type:** `string`
- **Returns:** `this`

### setDescription(description)

Set the description of this application

- **Parameters**
  - **description**
   	- **Type:** `string`
- **Returns:** `this`

### setIconUrl(iconUrl)

Set the URL of the icon of this application

- **Parameters**
  - **iconUrl**
   	- **Type:** `string | null`
- **Returns:** `this`

### setRole(role)

Set the role of this application

- **Parameters**
  - **role**
   	- **Type:** `string | null`
- **Returns:** `this`

### setAssociatedExtensions(extensions)

Set the associated extensions of this application

- **Parameters**
  - **extensions**
   	- **Type:** `string[] | null`
- **Returns:** `this`

### setPinnedByDefault(pinnedByDefault)

Changes whether this application is pinned by default or not

- **Parameters**
  - **pinnedByDefault**
   	- **Type:** `boolean`
- **Returns:** `this`

### setLaunchAtStartup(launchAtStartup)

Changes whether this application is launched at startup or not

- **Parameters**
  - **launchAtStartup**
   	- **Type:** `boolean`
- **Returns:** `this`

### WindowContent(props)

Renders the app as a React component

- **Parameters**
  - **props**
   	- **Type:** `AppProps`
- **Returns**
  - **Type:** `React.ReactElement`
