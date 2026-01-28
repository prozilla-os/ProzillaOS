import { FC } from "react";
import { Vector2 } from "../math/vector2";
import { ModalsManager } from "./modalsManager";
import { ModalProps } from "../../components/modals/ModalView";

/**
 * Represents a modal window.
 */
export class Modal {
	/**
	 * The size of this modal.
	 * @default new Vector2(400, 200)
	 */
	size: Vector2 = new Vector2(400, 200);
	/**
	 * The position of this modal.
	 * @default new Vector2(300, 300)
	 */
	position: Vector2 = new Vector2(300, 300);
	/**
	 * The icon of this modal.
	 * @default null
	 */
	icon: string | null = null;
	/**
	 * The title of this modal.
	 * @default null
	 */
	title: string | null = null;
	/**
	 * The manager that handles all modals.
	 */
	modalsManager: ModalsManager | null = null;
	/**
	 * The content of this modal.
	 * @default null
	 */
	element: FC<ModalProps> | null = null;
	props: object = {};
	callback: ((...args: unknown[]) => void) | null = null;
	/** The ID of this modal. */
	id: number | null = null;
	/**
	 * Whether this modal can be dismissed (e.g., by pressing ESC).
	 * @default true
	 */
	dismissible: boolean = true;
	/** Timestamp of the most recent interaction with this modal. */
	lastInteraction?: number;

	constructor(element: Modal["element"], callback?: Modal["callback"]) {
		this.element = element;
		this.callback = callback as Modal["callback"];
		this.focus();
	}

	setIcon(icon: string): Modal {
		this.icon = icon;
		return this;
	}

	setTitle(title: string): Modal {
		this.title = title;
		return this;
	}

	setPosition(position: Vector2): Modal {
		this.position = position;
		return this;
	}

	setSize(size: Vector2): Modal {
		this.size = size;
		return this;
	}

	setProps(props: object): Modal {
		this.props = props;
		return this;
	}

	/**
	 * @param {boolean} dismissible 
	 * @returns {Modal}
	 */
	setDismissible(dismissible: boolean): Modal {
		this.dismissible = dismissible;
		return this;
	}

	focus() {
		this.lastInteraction = Date.now();
	}

	finish(...args: unknown[]) {
		if (this.modalsManager == null || this.id == null)
			return;

		this.modalsManager.close(this.id);
		this.callback?.(...args);
	}

	close() {
		this.finish();
	}
}