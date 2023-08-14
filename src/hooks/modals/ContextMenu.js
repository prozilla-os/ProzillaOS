import { ContextMenu } from "../../components/modals/context-menu/ContextMenu.jsx";
import Vector2 from "../../features/math/vector2.js";
import Modal from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modals.js";
import { useShortcuts } from "../utils/keyboard.js";

/**
 * @param {object} props 
 * @param {ModalsManager} props.modalsManager
 * @param {Object<string, Object<string, Function>>} props.options
 * @param {Object<string, Object<string, string[]>>} props.shortcuts
 * @returns {{ onContextMenu: Function }}
 */
export function useContextMenu({ modalsManager, options, shortcuts }) {
	const onContextMenu = (event) => {
		modalsManager.open(new Modal(ContextMenu)
			.setPosition(new Vector2(event?.clientX ?? 0, event?.clientY ?? 0))
			.setProps({ options, shortcuts }));
	};

	useShortcuts({ options, shortcuts, useCategories: false });

	return { onContextMenu };
}