import { Skin } from "@prozilla-os/skins";
import { useSkin } from "../system/systemManagerContext";
import { useMemo } from "react";

export function useSkinOverrides<T>(overrides: Map<typeof Skin, T>): T | undefined
export function useSkinOverrides<T>(overrides: Map<typeof Skin, T>, defaultValue: T): T
export function useSkinOverrides<T>(overrides: Map<typeof Skin, T>, defaultValue?: T) {
	const skin = useSkin();
	const override = useMemo(() => {
		for (const [key, value] of overrides) {
			if (skin instanceof key)
				return value;
		}
		return defaultValue;
	}, [skin, overrides, defaultValue]);
	return override;
}