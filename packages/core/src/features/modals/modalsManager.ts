import { MutableRefObject } from "react";
import { Modal } from "./modal";

export class ModalsManager {
	modals: Record<string, Modal> = {};
	containerRef?: MutableRefObject<HTMLElement>;
	updateModals: Function = () => {};

	/**
	 * @param single - Set to false to preserve other open modals
	 */
	open(modal: Modal, single: boolean = true) {
		if (single) {
			this.modalIds.forEach((id) => {
				this.close(id, false);
			});
		}

		let id = 0;
		while (this.modalIds.includes(id.toString())) {
			id++;
		}

		modal.id = id;
		modal.modalsManager = this;

		console.info(`Opening modal ${id}`);
		this.modals[id] = modal;
		this.updateModals(this.modals);
	}

	close(modalId: string | number, sendModalsUpdate: boolean = true) {
		modalId = modalId.toString();

		if (!this.modalIds.includes(modalId)) {
			console.warn(`Failed to close modal ${modalId}: modal not found`);
			return;
		}

		console.info(`Closing modal ${modalId}`);
		delete this.modals[modalId];

		if (sendModalsUpdate)
			this.updateModals(this.modals);
	}

	focus(modalId: string) {
		modalId = modalId.toString();

		if (!this.modalIds.includes(modalId)) {
			console.warn(`Failed to focus modal ${modalId}: modal not found`);
			return;
		}

		const modal = this.modals[modalId];
		modal.focus();

		this.updateModals(this.modals);
	}

	setUpdateModals(updateModals: Function) {
		this.updateModals = updateModals;
	}

	get modalIds(): string[] {
		return Object.keys(this.modals);
	}

	static getModalIconUrl(name: string): string {
		return `/assets/modals/icons/${name}.svg`;
	}
}