import { useMemo } from "react";
import { NAME } from "../../constants/branding.const";

const BLOCK_PREFIX = "-";
const ELEMENT_PREFIX = "__";
const MODIFIER_PREFIX = "--";

/**
 * Generates static class name using BEM notation.
 * @param block - The name of the block.
 * @param element - The name of the element.
 * @param modifier - The name of the modifier(s).
 */
export function useStaticClassName(block?: string, element?: string, modifier?: string | string[]) {
	return useMemo(() => {
		if (block == null)
			return null;

		let className = `${NAME + BLOCK_PREFIX + block}`;
		if (element != null)
			className += ELEMENT_PREFIX + element;

		if (typeof modifier == "string") {
			className += ` ${NAME + BLOCK_PREFIX + block}`;

			if (element != null)
				className += ELEMENT_PREFIX + element;
			className += MODIFIER_PREFIX + modifier;
		} else if (modifier != null) {
			modifier.forEach((mod) => {
				className += ` ${NAME + BLOCK_PREFIX + block}`;

				if (element != null)
					className += ELEMENT_PREFIX + element;
				className += MODIFIER_PREFIX + mod;
			});
		}

		return className.trim();
	}, [block, element, modifier]);
}

/**
 * Combines class names and an optional static class name.
 * @param classNames - The class names to combine.
 * @param block - The name of the block.
 * @param element - The name of the element.
 * @param modifier - The name of the modifier(s).
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