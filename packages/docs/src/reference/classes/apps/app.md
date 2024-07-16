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

<br>

#### name

- **Type:** `string`

#### id

- **Type:** `string`

#### windowContent

- **Type:** `React.FC<AppProps>`

#### windowOptions

- **Optional**
- **Type:** `WindowOptions`

```ts
interface WindowOptions {
	size?: Vector2;
	[key: string]: unknown;
}
```

> [!NOTE] References
> - [Vector2](../utils/vector2)

## Properties

### name

- **Type:** `string`
- **Default:** `"App"`

The display name of this application

### id

- **Type:** `string`
- **Default:** `"app"`

The unique ID of this application

> [!WARNING]
> Every app must have a unique ID that only contains lower case letters (a-z), numbers (0-9) and dashes (-).

### windowContent

- **Type:** `React.FC<AppProps>`

React component that renders this app inside a window when the app is running

### windowOptions

- **Type:** `WindowOptions`

Default options that get passed to the `windowContent` component

```ts
interface WindowOptions {
	size?: Vector2;
	[key: string]: unknown;
}
```

> [!NOTE] References
> - [Vector2](../utils/vector2)

### description

- **Type:** `string | null`

Description of this application

### iconUrl

- **Type:** `string | null`

URL of the icon of this application

### role

- **Type:** `string | null`

Defines what parts of the OS this app is responsible for and how it can be used by other apps

### associatedExtensions

- **Type:** `string | null`

An array of file extensions that this application is used to open and read

### pinnedByDefault

- **Type:** `boolean`
- **Default:** `true`

Determines whether the app is pinned by default

### launchAtStartup

- **Type:** `boolean`
- **Default:** `false`

Determines whether the app is launched at startup

## Methods

### setName(name)

- **Parameters**
  - **name**
	- **Type:** `string`
- **Returns**
  - **Type:** `this`

Set the display name of this application

### setDescription(description)

- **Parameters**
  - **description**
	- **Type:** `string`
- **Returns**
  - **Type:** `this`

Set the description of this application

### setIconUrl(iconUrl)

- **Parameters**
  - **iconUrl**
	- **Type:** `string | null`
- **Returns**
  - **Type:** `this`

Set the URL of the icon of this application

### setRole(role)

- **Parameters**
  - **role**
	- **Type:** `string | null`
- **Returns**
  - **Type:** `this`

Set the role of this application

### setAssociatedExtensions(extensions)

- **Parameters**
  - **extensions**
	- **Type:** `string[] | null`
- **Returns**
  - **Type:** `this`

Set the associated extensions of this application

### setPinnedByDefault(pinnedByDefault)

- **Parameters**
  - **pinnedByDefault**
	- **Type:** `boolean`
- **Returns**
  - **Type:** `this`

Changes whether this application is pinned by default or not

### setLaunchAtStartup(launchAtStartup)

- **Parameters**
  - **launchAtStartup**
	- **Type:** `boolean`
- **Returns**
  - **Type:** `this`

Changes whether this application is launched at startup or not

### WindowContent(props)

- **Parameters**
  - **props**
	- **Type:** `AppProps`
- **Returns**
  - **Type:** `React.ReactElement`

Renders the app as a React component