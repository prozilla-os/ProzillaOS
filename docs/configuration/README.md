[← Back](../README.md)

# Configuration

ProzillaOS can be configured in numerous ways. The most important one being via the application itself, by going to the Settings app or directly changing the config files in the `~/.config` folder.

As a developer, there are also the following ways to configure ProzillaOS:

- `src/config` - The `src/config` directory holds all global variables used in the rest of the `src` directory, which are mostly string and number constants, but also includes some arrays and dictionaries that can be adjusted to configure ProzillaOS.
- `styles` - Everything related to styles, can be configured in `styles` directory. Most configurations will happen inside `styles/global`, where you can define the fonts, css variables/properties and other details.
- `public/config` - This directory has XML files that serve as the default data for config files used by the app in the virtual drive. These can be edited by the user once they're loaded during initialisation.
