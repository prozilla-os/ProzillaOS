import { useState } from "react";
import { clamp } from "../../features/math/clamp.js";

/**
 * @param {*} initialState 
 * @returns {{
 * 	history: *[],
 * 	stateIndex: number,
 * 	pushState: Function,
 * 	undo: Function,
 *  redo: Function,
 * 	undoAvailable: boolean,
 *  redoAvailable: boolean
 * }}
 */
export function useHistory(initialState) {
	const [history, setHistory] = useState(initialState ? [initialState] : []);
	const [stateIndex, setStateIndex] = useState(0);

	const pushState = (state) => {
		if (state === history[0])
			return;

		let newHistory = [
			state,
			...history.slice(stateIndex, history.length)
		];

		// Remove repeated states
		newHistory = newHistory.filter((state, index) => {
			return state !== newHistory[index + 1];
		});

		setHistory(newHistory);
		setStateIndex(0);
	};

	const updateStateIndex = (delta) => {
		const index = clamp(stateIndex + delta, 0, history.length - 1);

		if (index === stateIndex)
			return;

		setStateIndex(index);
	};

	const undo = () => updateStateIndex(1);
	const redo = () => updateStateIndex(-1);

	const undoAvailable = (stateIndex < history.length - 1);
	const redoAvailable = (stateIndex >= 1);

	return { history, stateIndex, pushState, undo, redo, undoAvailable, redoAvailable };
}