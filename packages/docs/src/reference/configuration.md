---
outline: deep
---

# Configuration

To configure ProzillaOS, pass the following properties inside to the `config` prop on the `<ProzillaOS>` component.

## `<ProzillaOS>` props {#prozillaos}

### systemName : `string` {#system-name}

<br>

> **@default**
> 
> ```ts
> "ProzillaOS"
> ```

### tagLine : `string` {#tag-line}

<br>

> **@default**
> 
> ```ts
> "Web-based Operating System"
> ```

### skin : [`Skin`](./classes/skins/skin) {#skin}

<br>

### config

<br>

#### Properties

- config.apps : [`AppsConfig`](classes/system/apps-config)
- config.desktop : [`DesktopConfig`](classes/system/desktop-config)
- config.misc : [`MiscConfig`](classes/system/misc-config)
- config.modals : [`ModalsConfig`](classes/system/modals-config)
- config.taskbar : [`TaskbarConfig`](classes/system/taskbar-config)
- config.tracking : [`TrackingConfig`](classes/system/tracking-config)
- config.windows : [`WindowsConfig`](classes/system/windows-config)

## Example

```tsx
<ProzillaOS
	systemName={"ProzillaOS"}
	tagLine={"Web-based Operating System"}
	skin={new Skin({
		defaultWallpaper: "/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png"
	})}
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