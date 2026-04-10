import { Shell, ShellConfig, ShellState } from "../../features";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { useSystemManager } from "../system/systemManagerContext";
import { useSettingsManager } from "../settings/settingsManagerContext";
import { useSingleton } from "../_utils/singleton";
import { Snapshot, useSnapshot } from "valtio";

export function useShell({
	app,
	path,
	input,
	exit,
	sizeRef,
}: Pick<ShellConfig, "app" | "path" | "input" | "exit" | "sizeRef">): [Shell, Snapshot<ShellState>] {
	const virtualRoot = useVirtualRoot();
	const systemManager = useSystemManager();
	const settingsManager = useSettingsManager();

	const shell = useSingleton(() => new Shell({
		app,
		path,
		input,
		virtualRoot: virtualRoot!,
		systemManager,
		settingsManager: settingsManager!,
		exit,
		sizeRef,
	}));

	const state = useSnapshot(shell.state);

	return [shell, state];
}