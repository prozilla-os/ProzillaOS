[← Back](../README.md)

# Settings

Each group of settings is controlled by a separate xml file. The virtual directory for these files is `~/.config`. The default values for these files can be viewed and edited inside the [public/config](../../../public/config/) directory.

## Examples

### Example of config file containing settings

```xml
<!-- public/config/desktop.xml -->

<!--
	This config file defines the default path to the desktop wallpaper.
 	The virtual file can be found at "~/.config/desktop.xml".
-->

<options>
	<wallpaper>/assets/wallpapers/vibrant-wallpaper-purple-yellow.png</wallpaper>
</options>
```

### Example of component reading settings

```tsx
// components/desktop/Desktop.tsx

export function Desktop() {
	const settingsManager = useSettingsManager();
	const [wallpaper, setWallpaper] = useState(null);

	useEffect(() => {
		(async () => {
			const settings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.desktop);
			settings.get("wallpaper", setWallpaper);
		})();
	}, [settingsManager]);

	return <img src={wallpaper}/>;
}
```