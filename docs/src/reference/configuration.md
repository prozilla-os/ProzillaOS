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
- **Type:** [`Skin`](/reference/skins/Classes/Skin)
- **Default:** `new Skin()`

### config

Configurations for functional elements and features

- **Optional**
- **Type:** `object`

```ts
{
	apps?: AppsConfig;
	desktop?: DesktopConfig;
	misc?: MiscConfig;
	modals?: ModalsConfig;
	taskbar?: TaskbarConfig;
	tracking?: TrackingConfig;
	windows?: WindowsConfig;
	virtualDrive?: VirtualDriveConfig;
}
```

> [!NOTE] References
>
> - [AppsConfig](/reference/core/Classes/AppsConfig)
> - [DesktopConfig](/reference/core/Classes/DesktopConfig)
> - [MiscConfig](/reference/core/Classes/MiscConfig)
> - [ModalsConfig](/reference/core/Classes/ModalsConfig)
> - [TaskbarConfig](/reference/core/Classes/TaskbarConfig)
> - [TrackingConfig](/reference/core/Classes/TrackingConfig)
> - [WindowsConfig](/reference/core/Classes/WindowsConfig)
> - [VirtualDriveConfig](/reference/core/Classes/VirtualDriveConfig)

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
			defaultIconSize: 1,
			defaultIconDirection: 0
		}),
		taskbar: new TaskbarConfig({
			height: 48
		}),
	}}
>
```
