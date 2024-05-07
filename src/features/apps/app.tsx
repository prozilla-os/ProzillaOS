import React from "react";
import Vector2 from "../math/vector2";
import { WindowProps } from "../../components/windows/WindowView";

export default class App {
	name: string;
	id: string;
	windowContent: React.FC;
	windowOptions?: {
		size: Vector2
	};
	isActive: boolean = false;

	/**
	 * @param windowOptions - Default window options
	 */
	constructor(name: string, id: string, windowContent: React.FC, windowOptions?: object | null) {
		Object.assign(this, { name, id, windowContent, windowOptions });

		if (this.windowContent == null)
			console.warn(`App (${this.id}) is missing the windowContent property.`);
	}

	WindowContent = (props: React.JSX.IntrinsicAttributes & WindowProps) => {
		props = { ...props, ...this.windowOptions };

		if (this.windowContent == null) {
			return null;
		}

		return <this.windowContent {...props}/>;
	};
}