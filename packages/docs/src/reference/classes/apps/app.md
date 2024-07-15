---
outline: deep
description: "An application that can be run by ProzillaOS"
---

# Class [`App`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/configs/app.tsx)

An application that can be run by ProzillaOS

Applications can be installed by adding them to the `apps` array in [`AppsConfig`](../system/apps-config#apps-app)

## Type parameters

> `<AppProps extends WindowProps = WindowProps>` 

## Constructor

> `new App(name, id, windowContent, windowOptions)`

### Parameters

- **name** : `string`

- **id** : `string`

- **windowContent** : `React.FC<AppProps>`

- **windowOptions** : `object` (optional)

	- windowOptions.size : [`Vector2`](/reference/classes/utils/vector2)

## Properties

### name : `string` {#name}

The display name of this application

> **@default**
> ```ts
> "App"
> ```

### id : `string` {#id}

The unique ID of this application

> **@default**
> ```ts
> "app"
> ```

> [!WARNING]
> Every app must have a unique ID that only contains lower case letters (a-z), numbers (0-9) and dashes (-).

### windowContent : `React.FC<AppProps>` {#window-content}

React component that renders this app inside a window when the app is running

### windowOptions : `object` {#window-options}

Default options that get passed to the `windowContent` component

You can extend this object with any properties

#### Properties

- windowOptions.size : [`Vector2`](/reference/classes/utils/vector2)

### description : `string | null` {#description}

Description of this application

### iconUrl : `string | null` {#icon-url}

URL of the icon of this application

### role : `string | null` {#role}

Defines what parts of the OS this app is responsible for and how it can be used by other apps

### associatedExtensions : `string[]` {#associated-extensions}

An array of file extensions that this application is used to open and read

### pinnedByDefault : `boolean` {#pinned-by-default}

Determines whether the app is pinned by default

> **@default**
> ```ts
> true
> ```

### launchAtStartup : `boolean` {#launch-at-startup}

Determines whether the app is launched at startup

> **@default**
> ```ts
> false
> ```

## Methods

### setName (name : `string`) => `this` {#set-name}

Set the display name of this application

### setDescription (description : `string | null`) => `this` {#set-description}

Set the description of this application

### setIconUrl (iconUrl : `string | null`) => `this` {#set-icon-url}

Set the URL of the icon of this application

### setRole (role : `string | null`) => `this` {#set-role}

Set the role of this application

### setAssociatedExtensions (extensions : `string[] | null`) => `this` {#set-associated-extensions}

Set the associated extensions of this application

### setPinnedByDefault (pinnedByDefault : `boolean`) => `this` {#set-pinned-by-default}

Changes whether this application is pinned by default or not

### setLaunchAtStartup (launchAtStartup : `boolean`) => `this` {#set-launch-at-startup}

Changes whether this application is launched at startup or not

### WindowContent (props : `AppProps`) => `React.ReactElement` {#Window-content}

Renders the app as a React component