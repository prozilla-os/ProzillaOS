import { Vector2 } from "../../math/vector2";
import { WindowProps } from "../../../components/windows/WindowView";
import { FC } from "react";

const validIdRegex = /^[a-zA-Z0-9-]+$/;

export class App<AppProps extends WindowProps = WindowProps> {
	name: string = "App";
	id: string = "app";
	windowContent: FC<AppProps>;
	windowOptions?: {
		size: Vector2;
		[key: string]: unknown;
	};

	description: string | null = null;
	iconUrl: string | null = null;

	isActive: boolean = false;
	isPinned?: boolean;

	/**
	 * @param windowOptions - Default window options
	 */
	constructor(name: App["name"], id: App["id"], windowContent: App<AppProps>["windowContent"], windowOptions?: App["windowOptions"]) {
		this.name = name;
		this.id = id;
		this.windowContent = windowContent;
		this.windowOptions = windowOptions;

		if (this.id.match(validIdRegex) == null)
			throw new Error(`Invalid app ID found: ${this.id}`
				+ "\nApp IDs may only contain letters (a-zA-Z), numbers (0-9) and dashes (-).");
	}

	WindowContent = (props: AppProps) => {
		props = { ...props, ...this.windowOptions };

		if (this.windowContent == null) {
			return null;
		}

		return <this.windowContent {...props}/>;
	};

	setDescription(description: App["description"]): this {
		this.description = description;
		return this;
	}

	setIconUrl(iconUrl: App["iconUrl"]): this {
		this.iconUrl = iconUrl;
		return this;
	}

	setName(name: string): this {
		this.name = name;
		return this;
	}
}