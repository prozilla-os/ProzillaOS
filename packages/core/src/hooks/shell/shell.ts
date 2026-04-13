import { Shell, ShellConfig, ShellState } from "../../features";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { useSystemManager } from "../system/systemManagerContext";
import { useSettingsManager } from "../settings/settingsManagerContext";
import { useSingleton } from "../_utils/singleton";
import { Snapshot, useSnapshot } from "valtio";

/**
 * A hook that initializes and manages a Shell instance within a React component.
 * It gathers required system contexts and returns a reactive snapshot of the shell's state.
 * @param config - Configuration subset required to instantiate the shell.
 * @returns A tuple containing the stable {@link Shell} instance and its reactive {@link ShellState} snapshot.
 * @example
 * const sizeRef = useRef(Vector2.ZERO);
 * const [shell, state] = useShell({
 *		app: myApp,
 *		path: "~",
 *		input: "echo \"Hello world!\"",
 *		exit: () => closeWindow(),
 *		sizeRef,
 *	});
 */
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