import { clamp } from "@prozilla-os/shared";
import { useState } from "react";

/**
 * Returns an object that handles stateful history with undo and redo methods
 */
export function useHistory<Type>(initialState: Type): {
	/** The entries of the history */
	history: Type[];
	/** The index of the active entry in list of entries */
	stateIndex: number;
	/** Adds a new entry to the history */
	pushState: (state: Type) => void;
	/** Moves backwards in the history */
	undo: () => void;
	/** Moves forwards in the history */
	redo: () => void;
	undoAvailable: boolean;
	redoAvailable: boolean;
} {
	const [history, setHistory] = useState<Type[]>(initialState ? [initialState] : []);
	const [stateIndex, setStateIndex] = useState(0);

	const pushState = (state: Type) => {
		if (state === history[0])
			return;

		let newHistory = [
			state,
			...history.slice(stateIndex, history.length),
		];

		// Remove repeated states
		newHistory = newHistory.filter((state, index) => {
			return state !== newHistory[index + 1];
		});

		setHistory(newHistory);
		setStateIndex(0);
	};

	const updateStateIndex = (delta: number) => {
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