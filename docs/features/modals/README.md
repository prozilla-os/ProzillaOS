[← Back](../README.md)

# Modals

Modals are modular components that can be instantiated by other components. This feature is mainly used for context menus that are instantiated by windows.

Modals prominently take a position and a callback function as input. When the modal is closed, the callback function is called with optional arguments that usually include whatever the user entered as input while the modal was active. E.g.: A confirmation dialog is usually instantiated at the center of the screen and returns "yes" or "no" to the callback function, depending on which button the user clicked. 

Even though modals are very similar to windows, they are also very different. You can look at modals as mini sub-windows that each have their own styling, as opposed to windows that all have a header with a title and some buttons.