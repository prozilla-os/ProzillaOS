import { ReactElement, useEffect, useState } from "react";
import { useSettingsManager } from "../settings/settingsManagerContext";
import { SettingsManager } from "../../features/settings/settingsManager";

export const THEMES = {
	0: "Dark",
	1: "Light",
	2: "Cherry",
	3: "Mango",
	5: "Aqua",
	6: "Grape"
};

interface ThemeProviderProps {
	children: ReactElement;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
	const [theme, setTheme] = useState(0);
	const settingsManager = useSettingsManager();
	const themeSettings = settingsManager.get(SettingsManager.VIRTUAL_PATHS.theme);

	useEffect(() => {
		void themeSettings.get("theme", (value: string) => { setTheme(parseInt(value)); });
	}, [themeSettings]);

	return <div className={`${THEMES[theme]}-theme`}>
		{children}
	</div>;
} 