import { FC } from "react";
import { Vector2 } from "../math/vector2";
import { ModalsManager } from "./modalsManager";
import { ModalProps } from "../../components/modals/ModalView";

export class Modal {
	size: Vector2 = new Vector2(400, 200);
	position: Vector2 = new Vector2(300, 300);
	icon: string | null = null;
	title: string | null = null;
	modalsManager: ModalsManager | null = null;
	element: FC<ModalProps> | null = null;
	props: object = {};
	callback: Function | null = null;
	id: number | null = null;
	dismissible: boolean = true;
	lastInteraction?: number;

	constructor(element: Modal["element"], callback?: Modal["callback"]) {
		this.element = element;
		this.callback = callback as Modal["element"];
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