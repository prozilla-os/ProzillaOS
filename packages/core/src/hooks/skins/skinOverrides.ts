import { Skin } from "@prozilla-os/skins";
import { useSkin } from "../system/systemManagerContext";
import { useMemo } from "react";
import { mergeDeep, MergeValues } from "@prozilla-os/shared";

export function useSkinOverrides<Override>(overrides: Map<typeof Skin, Override>): Override | undefined;
export function useSkinOverrides<Override, Default>(overrides: Map<typeof Skin, Override>, defaultValue: Default): MergeValues<Default, Override, true>;
export function useSkinOverrides<Override, Default>(overrides: Map<typeof Skin, Override>, defaultValue?: Default): Default | Override | MergeValues<Default, Override> | undefined {
	const skin = useSkin();
	const override = useMemo(() => {
		const entries = Array.from(overrides.entries());
		const matching = entries.filter(([key]) => skin instanceof key);
		if (matching.length === 0)
			return defaultValue;
		const sources = matching.map(([, value]) => ({ override: value }));
		return mergeDeep({ override: defaultValue }, ...sources).override;
	}, [skin, overrides, defaultValue]);
	return override;
}