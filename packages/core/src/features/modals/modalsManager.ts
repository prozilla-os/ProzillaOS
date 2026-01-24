import { MutableRefObject } from "react";
import { Modal } from "./modal";

/**
 * Manages the opening, closing and ordering of modals
 */
export class ModalsManager {
	/** Maps every modal ID to the corresponding modal */
	modals: Record<string, Modal> = {};
	containerRef?: MutableRefObject<HTMLElement>;
	/** Function that handles changes to modals */
	updateModals:  (modals: ModalsManager["modals"]) => void = () => {};

	/**
	 * Opens a modal
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

	/**
	 * Closes a modal
	 * @param modalId The ID of the modal to close 
	 */
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

	/**
	 * Brings a modal into focus
	 * @param modalId The ID of the modal to bring into focus
	 */
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

	setUpdateModals(updateModals: ModalsManager["updateModals"]) {
		this.updateModals = updateModals;
	}

	/**
	 * Returns the IDs of all open modals
	 */
	get modalIds(): string[] {
		return Object.keys(this.modals);
	}

	static getModalIconUrl(name: string): string {
		return `/assets/modals/icons/${name}.svg`;
	}
}