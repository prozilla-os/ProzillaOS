import { APPS } from "../apps.config";

export const CURSORS = {
	default: "default",
	pointer: "pointer"
};

export const FONT = "outfit";
export const ENABLE_COLOR_CACHING = true;
export const VIRTUAL_PATH = `~/Apps/${APPS.LOGIC_SIM}/`;

export const BACKGROUND = {
	padding: 30,
	borderWidth: 7.5,
};

export const CONTROLLER = {
	radius: 25,
	borderWidth: 5,
	pinOffset: 42.5,
	connectorWidth: 7.5,
	handleWidth: 15,
	handleTrackWidth: 22.5,
	placingOpacity: 0.5,
};

export const WIRE = {
	width: 5,
	snappingSensitivity: 10,
	cornerRadius: 25,
	resolution: 8,
};

export const PIN = {
	radius: 10,
	label: {
		offset: 10,
		fontSize: 15,
		padding: 5,
	}
};

export const CHIP = {
	BorderWidth: 5,
	padding: 10,
	fontSize: 35,
	placingOutline: 10,
};

export const COLORS = {
	pin: {
		fill: "black-4",
		fillHover: "black-3",
		labelText: "white-0",
		labelBackground: "black-4"
	},
	controller: {
		stroke: "black-4",
		connector: "black-4",
		on: "red-0",
		off: "red-2",
		hover: "white-0",
		handle: "black-3",
		handleHover: "black-4",
	},
	background: {
		border: "black-0",
		outer: "black-1",
		inner: "black-2",
		margin: "black-2",
	},
	wire: {
		placing: "black-1",
	},
	chip: {
		text: "black-4",
		outline: "white-0",
	}
};