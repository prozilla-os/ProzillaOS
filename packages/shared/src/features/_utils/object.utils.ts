/**
 * Determines whether {@link arg} is an object.
 */
export function isObject(arg: unknown): arg is Record<PropertyKey, unknown> {
	return arg != null && typeof arg === "object" && !Array.isArray(arg);
}

export type Merge<Target, Sources extends unknown[]> = Sources extends []
	? Target
	: Sources extends [infer FirstSource, ...infer OtherSources]
		? Merge<MergeValues<Target, FirstSource>, OtherSources>
		: Sources extends (infer Source)[]
			? Target | MergeValues<Target, Source>
			: never;

export type MergePrimitive<Target, Source> = undefined extends Source
	? Exclude<Source, undefined> extends never
		? Target
		: Exclude<Source, undefined>
	: Source;

export type MergeValues<Target, Source, OptionalSource extends boolean = false> = Target extends Record<PropertyKey, unknown>
	? Source extends Record<PropertyKey, unknown>
		? MergeObjects<Target, Source, OptionalSource>
		: Source
	: Target extends unknown[]
		? Source extends unknown[]
			? MergeArrays<Target, Source>
			: Source
		: MergePrimitive<Target, Source>;

export type MergeObjects<Target, Source, OptionalSource extends boolean = false> = OptionalSource extends true
	? {
		[Key in keyof Target]: Key extends keyof Source
			? Target[Key] | MergeValues<Target[Key], Source[Key], OptionalSource>
			: Target[Key]
	} & {
		[Key in keyof Source as Key extends keyof Target ? never : Key]?: Source[Key]
	}
	: {
		[Key in keyof Target | keyof Source]: Key extends keyof Source
			? Key extends keyof Target
				? MergeValues<Target[Key], Source[Key]>
				: Source[Key]
			: Target[Key & keyof Target]
	};

export type MergeArrays<Target extends unknown[], Source extends unknown[]> = [...Target, ...Source];

/**
 * Recursively merges two or more objects.
 * 
 * If a property is defined in two objects and the values are both objects, they are merged recursively, 
 * if they are both arrays, they are concatenated, otherwise the value of the second object overrides the value of the first.
 * @param target - The target object to merge the other objects with.
 * @param sources - The objects to merge with the target object.
 * @returns The merged object.
 */
export function mergeDeep<Target extends Record<PropertyKey, unknown>, Sources extends Record<PropertyKey, unknown>[]>(target: Target, ...sources: Sources): Merge<Target, Sources> {
	const result: Target | Merge<Target, Sources> = { ...target };
	
	for (const source of sources) {
		for (const key in source) {
			if (isObject(result[key]) && isObject(source[key])) {
				result[key] = mergeDeep(result[key], source[key]);
			} else if (Array.isArray(result[key]) && Array.isArray(source[key])) {
				result[key] = result[key].concat(source[key]);
			} else if (source[key] !== undefined) {
				result[key] = source[key];
			}
		}
	}

	return result as Merge<Target, Sources>;
}