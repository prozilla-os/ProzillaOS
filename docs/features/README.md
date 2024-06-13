[← Back](../README.md)

# Features

Most code for features can be found in the [features](../../src/features) directory. This directory is a library that is mostly used by files in the [components](../../src/components) and [hooks](../../src/hooks) directory.

> [!NOTE]  
> Mentions of directories inside this part of the documentation, are relative to the `src` folder.
> ```
> components -> src/components
> hooks -> src/hooks
> ```

> [!TIP]  
> To see the status and to-do's of each feature, check the [task board](https://prozilla.notion.site/8325fabca1fb4f9885b6d6dfd5aa64c8?v=1a59f7ce50914f5ea711fe6460e52868&pvs=4) on Notion.

## Pages

- [Actions](actions/README.md)
- [Apps](apps/README.md)
- [Modals](modals/README.md)
- [Settings](settings/README.md)
- [Storage](storage/README.md)
- [Taskbar](taskbar/README.md)
- [Virtual Drive](virtual-drive//README.md)
- [Windows](windows/README.md)
- [Z-index](z-index/README.md)

## Overview

This is a simplified overview of ProzillaOS' features, check the pages inside this folder for more details about each individual feature.

### System

- Customizable **taskbar** with a home menu, search menu, pinned apps and utilities
- Customizable **desktop** with icons, accompanied by custom wallpapers
- **Virtual drive** that can handle files, folders, symbolic links, as well as read from external sources
	- Storage system that stores and loads the virtual drive from local storage 

### Applications

- Resizable and draggable **windows**, with dynamic titles, for displaying and interacting with apps, which adapts to the user's screen resolution
- Native and web-view **applications**
	- **File explorer** that interacts with virtual drive and allows user to browse the source code on the website itself
	- **Terminal** with custom linux-inspired commands
	- **Settings** application for customizing appearance, managing apps and managing virtual drive
	- **Text editor** app that can read and write files as well as render markdown files
	- Other applications like a calculator, minigames, image viewer, browser, etc.
- **Standalone** system that allows each app to have its own dedicated page in an isolated view, which is also indexable by search engines
- **URL params** that trigger an app to open with optional arguments

### Interactions

- **Modals** that can be used as context menus, header menus, file selectors, dialog boxes, etc.
- Advanced **actions** system, for easily assembling different menus that can handle dropdowns, selections, toggles, shortcuts, etc.

### Assets

- Custom **wallpapers** made in Figma
- Custom **icons** made in Figma inspired by Font Awesome

### Codebase

- Free, open-source and self-hostable
- Uses **React**, **Vite** and **TypeScript**
- Extensive **documentation**
- **Configuration** files that allow you to configure almost everything inside the project
- **Eslint** for linting
- Custom **build and deployment tools** to automate tasks
- Separation of concerns and feature-based folder structure
