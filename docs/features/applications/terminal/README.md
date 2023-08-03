[← Back](../README.md)

# <img src="../../../../public/media/applications/icons/terminal.svg" width=30 height=30 style="vertical-align: middle; background: none;"/> Terminal 

A command line tool.

## Commands

See [features/applications/terminal/commands.js](../../../../src/features/applications/terminal/commands.js) for a list of commands. You can edit this file to add/remove/edit commands.

### Examples

```js
// src/features/applications/terminal/commands.js

new Command("cd", (args, { currentDirectory, setCurrentDirectory }) => {
	const path = args[0] ?? "~"; // Default to home directory
	const destination = currentDirectory.navigate(path);

	if (!destination)
		return `cd: ${args[0]}: No such file or directory`;

	setCurrentDirectory(destination);
	return { blank: true }; // Returns without printing anything to the terminal
}),
```