---
outline: [1, 2]
---

# Glossary

**Table of Contents**

[[toc]]

## Actions

A React component used to group and display actions together. This is used in the context menu for example, where each option is a separate action. It can take in a certain style and be passed to a modal, it also supports shortcuts and icons.

## Application (app)

To the user, applications (often shortened to apps) are processes that open a window when ran. The window allows the user to view and interact with the app. To developers, apps instances of the [`App`](core/Classes/App) class with a reference to a React component.

### Categorization

Applications are sorted into these different categories:

- Primary applications - The main applications that are a crucial part of the ProzillaOS system.
- Secondary applications - Other applications that are part of the main repository of ProzillaOS.
- External applications - All other applications.

### Installation

To install an application, you simply have to add it to the `apps` array in your [`AppsConfig`](core/Classes/AppsConfig). There is currently no way for users to install apps via the website. There is currently also no support for applications that are not React components.

## Modal

Modals are modular components that can be instantiated by other components. This feature is mainly used for context menus that are instantiated by windows.

Modals prominently take a position and a callback function as input. When the modal is closed, the callback function is called with optional arguments that usually include whatever the user entered as input while the modal was active. E.g.: A confirmation dialog is usually instantiated at the center of the screen and returns "yes" or "no" to the callback function, depending on which button the user clicked.

Even though modals are very similar to windows, they are also very different. You can look at modals as mini sub-windows that each have their own styling, as opposed to windows that all have a header with a title and some buttons.

## Package

A package is a subset of the ProzillaOS ecosystem. Each package constains unique functionality or a ProzillaOS application. Packages can be installed via [npm](https://www.npmjs.com/).

## Settings

Each group of settings is controlled by a separate xml file. The virtual directory for these files is `~/.config`.

Do not confuse settings with configs. Settings are controlled by the user, while configs define the overall behaviour of ProzillaOS and are defined by the developer.

## Storage

ProzillaOS makes use of the local storage to store persistent data. The data is loaded by the virtual root during the initialization process. On the first run, the default data is loaded.

The data is converted from class instances to a JSON object and then to a string by the virtual root before it is stored in the local storage. To load data from the local storage, an inverse process is used.

## Taskbar

The taskbar serves as a hub for access to various other functionalites, mainly applications. It's very similar to Window's taskbar.

### Segments

The taskbar can be split up into 3 main segments:

- Menus - This includes the home menu, where you can find quick access and a list of applications and the search menu, where you can search for applications by name.
- App list - This is a list of pinned and active applications.
- Indicators - This is a group of indicators that are used to display information, like battery power, network connection and volume.

## Virtual Drive

The virtual drive is a virtual file and directory system. The root directory is a virtual folder and the access point for all interactions with the virtual drive.

## Windows

The windows components are used to view and interact with running applications. Each app opens a window when ran.
