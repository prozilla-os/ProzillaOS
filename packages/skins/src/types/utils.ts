export type Partial<Interface> = {
	[Property in keyof Interface]?: Interface[Property];
};