[← Back](../README.md)

# Settings

Each group of settings is controlled by a separate xml file. The virtual directory for these files is `~/.config`. The default values for these files can be viewed and edited inside the [public/config](../../../public/config/) directory.

## Example

```xml
<!-- public/config/desktop.xml -->

<!--
	This config file defines the default path to the desktop wallpaper.
 	The virtual file can be found at "~/.config/desktop.xml".
-->

<?xml version="1.0"?>
<options>
	<wallpaper>/media/wallpapers/wallpaper-1.png</wallpaper>
</options>
```