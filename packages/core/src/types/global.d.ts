export type OptionalInterface<Interface> = {
	[Property in keyof Interface]?: Interface[Property];
};