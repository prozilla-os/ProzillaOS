import { WindowProps } from "../../components";
import { Vector2 } from "../";
import { FC } from "react";
import { APP_CATEGORIES } from "../../constants/apps.const";

const validIdRegex = /^[a-zA-Z0-9-]+$/;

interface AppMetadata {
	name: string;
	version: `${number}.${number}.${number}`;
	author: string;
}

/**
 * An application that can be ran by ProzillaOS
 * Applications can be installed by adding them to the `apps` array in {@link AppsConfig}
 */
export class App<AppProps extends WindowProps = WindowProps> {
	/**
	 * The display name of this application
	 */
	name: string = "App";

	/**
	 * The unique ID of this application
	 */
	id: string = "app";

	/**
	 * Main component that renders this app inside a window
	 */
	windowContent: FC<AppProps>;

	/**
	 * Default options that get passed to the {@link this.windowContent} component
	 */
	windowOptions?: {
		size: Vector2;
		[key: string]: unknown;
	};

	/**
	 * Description of this application
	 */
	description: string | null = null;

	/**
	 * URL of the icon of this application
	 */
	iconUrl: string | null = null;

	/**
	 * Defines what the app can handle and how it can be used elsewhere in the system
	 */
	role: string | null = null;

	/**
	 * An array of file extensions that this application can interpret
	 */
	associatedExtensions: string[] = [];

	/**
	 * Determines whether the app is pinned by default
	 * @default true
	 */
	pinnedByDefault = true;

	/**
	 * Determines whether the app is launched at startup
	 * @default false
	 */
	launchAtStartup = false;

	/**
	 * The category the app belongs to
	 */
	category: typeof APP_CATEGORIES[number] | null = null;

	/**
	 * Metadata of the app's package
	 */
	metadata: AppMetadata | null = null;

	/**
	 * Determines whether a desktop icon is added to the default data
	 * @default false
	 */
	showDesktopIcon: boolean = false;

	isActive: boolean = false;
	isPinned?: boolean;
	isInstalled = true;

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

		if (this.windowContent == null)
			return null;

		return <this.windowContent {...props}/>;
	};

	/**
	 * Set the display name of this application
	 */
	setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Set the description of this application
	 */
	setDescription(description: App["description"]): this {
		this.description = description;
		return this;
	}

	/**
	 * Set the URL of the icon of this application
	 */
	setIconUrl(iconUrl: App["iconUrl"]): this {
		this.iconUrl = iconUrl;
		return this;
	}

	/**
	 * Set the role of this application
	 */
	setRole(role: string | null): this {
		this.role = role;
		return this;
	}

	/**
	 * Set the associated extensions of this application
	 */
	setAssociatedExtensions(extensions: string[] | null): this {
		this.associatedExtensions = extensions ?? [];
		return this;
	}

	/**
	 * Changes whether this application is pinned by default or not
	 */
	setPinnedByDefault(pinnedByDefault: boolean): this {
		this.pinnedByDefault = pinnedByDefault;
		return this;
	}

	/**
	 * Changes whether this application is launched at startup or not
	 */
	setLaunchAtStartup(launchAtStartup: boolean): this {
		this.launchAtStartup = launchAtStartup;
		return this;
	}

	/**
	 * Changes whether this application is installed by default or not
	 */
	setInstalled(installed: boolean): this {
		this.isInstalled = installed;
		return this;
	}

	/**
	 * Changes the category this application belongs to
	 */
	setCategory(category: typeof APP_CATEGORIES[number] | null): this {
		this.category = category;
		return this;
	}

	/**
	 * Changes the metadata for this application
	 */
	setMetadata(metadata: AppMetadata | null): this {
		this.metadata = metadata;
		return this;
	}

	/**
	 * Changes whether this application has a desktop icon in the default data
	 */
	setShowDesktopIcon(showDesktopIcon: boolean): this {
		this.showDesktopIcon = showDesktopIcon;
		return this;
	}
}