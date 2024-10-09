---
outline: deep
---

# Configuration

To configure ProzillaOS, pass the following properties inside to the `config` prop on the `<ProzillaOS>` component.

## `<ProzillaOS>` props

### systemName

Name of the system

- **Optional**
- **Type:** `string`
- **Default:** `"ProzillaOS"`

### tagLine

Tag line or short description of the system

- **Optional**
- **Type:** `string`
- **Default:** `"Web-based Operating System"`

### skin

Configurations for assets, stylesheets and other visual elements

- **Optional**
- **Type:** [`Skin`](/reference/skins/classes/skin)
- **Default:** `new Skin()`

### config

Configurations for functional elements and features

- **Optional**
- **Type:** `ConfigOptions`

```ts
interface ConfigOptions {
	apps?: AppsConfig;
	desktop?: DesktopConfig;
	misc?: MiscConfig;
	modals?: ModalsConfig;
	taskbar?: TaskbarConfig;
	tracking?: TrackingConfig;
	windows?: WindowsConfig;
}
```

> [!NOTE] References
> - [AppsConfig](/reference/core/classes/system/apps-config)
> - [DesktopConfig](/reference/core/classes/system/desktop-config)
> - [MiscConfig](/reference/core/classes/system/misc-config)
> - [ModalsConfig](/reference/core/classes/system/modals-config)
> - [TaskbarConfig](/reference/core/classes/system/taskbar-config)
> - [TrackingConfig](/reference/core/classes/system/tracking-config)
> - [WindowsConfig](/reference/core/classes/system/windows-config)

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