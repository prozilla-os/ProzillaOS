[← Back](../README.md)

# Actions

A React component used to group and display actions together. This is used in the context menu for example, where each option is a separate action. It can take in a certain style and be passed to a modal, it also supports shortcuts and icons.

## Example

```tsx
<Actions className={STYLES.SHORTCUTS_LISTENER}>
	<ClickAction
		label="Reload"
		shortcut={["Control", "r"]}
		icon={faArrowsRotate}
		onTrigger={() => {
			reloadViewport();
		}}
	/>
	<ClickAction
		label="Exit"
		shortcut={["Control", "q"]}
		icon={faTimes}
		onTrigger={() => {
			closeViewport();
		}}
	/>
</Actions>
```

## Action types

Name | HTML equivalent
--- | --
Click action | \<button/>
Dropdown action | N/A
Radio action | \<input type="radio"> 
Toggle action | \<input type="checkbox">
Divider | \<hr/>