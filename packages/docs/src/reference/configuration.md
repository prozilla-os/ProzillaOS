---
outline: deep
---

# Configuration

To configure ProzillaOS, pass the following properties inside to the `config` prop on the `<ProzillaOS>` component.

## `<ProzillaOS>` props

### systemName : `string`

<br>

#### @default

```ts
"ProzillaOS"
```

### tagLine : `string`

<br>

#### @default

```ts
"Web-based Operating System"
```

### config : {}

<br>

#### Properties

- apps : [`AppsConfig`](classes/system/apps-config)
- desktop : [`DesktopConfig`](classes/system/desktop-config)
- taskbar : [`TaskbarConfig`](classes/system/taskbar-config)

## Example

```tsx
<ProzillaOS
	systemName={"ProzillaOS"}
	tagLine={"Web-based Operating System"}
	config={{
		apps: new AppsConfig({
			apps: [
				fileExplorer.setName("Files")
					.setDescription("Browse and manage your virtual files on ProzillaOS.")
					.setIconUrl("/assets/apps/icons/file-explorer.svg"),
				terminal.setName("Commands")
					.setDescription("A command line tool inspired by the Unix shell that runs entirely in your browser using ProzillaOS. Allows you to interact and manipulate the virtual drive and run silly commands.")
					.setIconUrl("/assets/apps/icons/terminal.svg"),
				settings.setName("Settings")
					.setDescription(`Configure ProzillaOS's settings and customize your experience.`)
					.setIconUrl("/assets/apps/icons/settings.svg"),
			],
		}),
		desktop: new DesktopConfig({
			defaultWallpaper: "/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png"
		}),
		taskbar: new TaskbarConfig({
			height: 48
		}),
	}}
>
```