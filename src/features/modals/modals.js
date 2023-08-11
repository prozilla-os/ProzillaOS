import Modal from "./modal.js";

export default class ModalsManager {
	/**
	 * @type {Modal}
	 */
	modals = {};

	/**
	 * @type {Function}
	 */
	updateModals = () => {};

	/**
	 * @param {Modal} modal 
	 * @param {boolean} closeOthers
	 */
	open(modal, closeOthers = true) {
		if (closeOthers) {
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

		this.modals[id] = modal;
		this.updateModals(this.modals);
	}

	/**
	 * @param {string} modalId 
	 * @param {boolean} sendModalsUpdate
	 */
	close(modalId, sendModalsUpdate = true) {
		modalId = modalId.toString();

		if (!this.modalIds.includes(modalId)) {
			console.log(`Failed to close modal ${modalId}: modal not found`);
			return;
		}

		console.log(`Closing modal ${modalId}`);
		delete this.modals[modalId];

		if (sendModalsUpdate)
			this.updateModals(this.modals);
	}

	/**
	 * @param {string} modalId 
	 */
	focus(modalId) {
		modalId = modalId.toString();

		if (!this.modalIds.includes(modalId)) {
			console.log(`Failed to focus modal ${modalId}: modal not found`);
			return;
		}

		const modal = this.modals[modalId];
		modal.focus();

		this.updateModals(this.modals);
	}

	/**
	 * @param {Function} updateModals 
	 */
	setUpdateModals(updateModals) {
		this.updateModals = updateModals;
	}

	/**
	 * @returns {string[]}
	 */
	get modalIds() {
		return Object.keys(this.modals);
	}
}