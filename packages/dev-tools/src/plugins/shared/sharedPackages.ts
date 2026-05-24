export interface SharedPackage {
	/** Package specifier (e.g. `"react"`, `"@prozilla-os/core"`). */
	specifier: string;
	/**
	 * When set, the package is treated as a manual chunk with this name.
	 * When omitted, the package's pre-built entry file is emitted as a
	 * static asset for the import map. Chunk-name packages are bundled
	 * naturally by Rollup in the site build; asset packages are served
	 * directly from disk to dynamically-loaded apps.
	 */
	chunkName?: string;
	/** When `true`, a CJS-to-ESM shim is generated for the package's chunk. */
	isCommonJS?: boolean;
}

export const DEFAULT_SHARED_PACKAGES: SharedPackage[] = [
	{ specifier: "@prozilla-os/core" },
	{ specifier: "@prozilla-os/shared" },
	{ specifier: "@prozilla-os/skins" },
	{ specifier: "tslib" },
	{ specifier: "@fortawesome/react-fontawesome" },
	{ specifier: "@fortawesome/fontawesome-svg-core" },
	{ specifier: "@fortawesome/free-solid-svg-icons" },
	{ specifier: "@fortawesome/free-regular-svg-icons" },
	{ specifier: "react", chunkName: "react", isCommonJS: true },
	{ specifier: "react/jsx-runtime", chunkName: "react-jsx-runtime", isCommonJS: true },
	{ specifier: "react-dom", chunkName: "react-dom", isCommonJS: true },
];
