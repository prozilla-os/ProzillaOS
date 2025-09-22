import { useMemo } from "react";
import { NAME } from "../../constants/branding.const";

const BLOCK_PREFIX = "-";
const ELEMENT_PREFIX = "__";
const MODIFIER_PREFIX = "--";

/**
 * Generates static class name using BEM notation
 */
export function useStaticClassName(block?: string, element?: string, modifier?: string | string[]) {
	return useMemo(() => {
		if (block == null)
			return null;

		let className = "";

		if (modifier == null || typeof modifier == "string") {
			className = NAME + BLOCK_PREFIX + block;

			if (element != null)
				className += ELEMENT_PREFIX + element;
			if (modifier != null)
				className += MODIFIER_PREFIX + modifier;
		} else {
			modifier?.forEach((mod) => {
				className += ` ${NAME + BLOCK_PREFIX + block}`;

				if (element != null)
					className += ELEMENT_PREFIX + element;
				if (mod != null)
					className += MODIFIER_PREFIX + mod;
			});

			className = className.trim();
		}

		return className;
	}, [block, element, modifier]);
}

/**
 * Combine class names and an optional static class name
 */
export function useClassNames(classNames: (string | undefined)[], block?: string, element?: string, modifier?: string | string[]) {
	const staticClassName = useStaticClassName(block, element, modifier);

	return useMemo(() => {
		const resultClassNames = [...classNames];

		resultClassNames.filter((className) => className != null);

		if (staticClassName != null)
			resultClassNames.unshift(staticClassName);

		return resultClassNames.join(" ");
	}, [classNames, staticClassName]);
}