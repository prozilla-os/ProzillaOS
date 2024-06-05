import { ReactElement, useEffect, useState } from "react";
import { useSettingsManager } from "../settings/settingsManagerContext";
import { SettingsManager } from "../../features/settings/settingsManager";
import { THEMES } from "../../config/themes.config";

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