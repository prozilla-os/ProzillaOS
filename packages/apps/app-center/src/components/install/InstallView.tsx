import { type LoadAppOptions, Button, utilStyles } from "@prozilla-os/core";
import { AppRegistry } from "../../core/appRegistry";
import styles from "./InstallView.module.css";
import { useState, type FormEvent } from "react";

export interface InstallViewProps {
	registry: AppRegistry;
}

export function InstallView({ registry }: InstallViewProps) {
	const [input, setInput] = useState("");
	const [exportName, setExportName] = useState("");
	const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [installing, setInstalling] = useState(false);

	const handleInstall = async (event: FormEvent) => {
		event.preventDefault();
		if (!input.trim() || installing) return;

		setInstalling(true);
		setStatus(null);

		try {
			const options: LoadAppOptions = {};
			if (exportName.trim())
				options.exportName = exportName.trim();

			const entry = await registry.installApp(input.trim(), options);

			setStatus({ type: "success", message: `Installed "${entry.name}" (${entry.id})` });
			setInput("");
			setExportName("");
		} catch (error) {
			setStatus({ type: "error", message: error instanceof Error ? error.message : String(error) });
		}

		setInstalling(false);
	};

	return <form className={styles.InstallView} onSubmit={(event) => { void handleInstall(event); }}>
		<div className={styles.Option}>
			<p className={styles.Label}>Install an app</p>
			<p className={utilStyles.TextLight}>
				Install an app from an npm package or a direct URL.
			</p>
		</div>
		<div className={styles.Option}>
			<p className={styles.Label}>Package</p>
			<input
				className={styles.Input}
				type="text"
				placeholder="@scope/package or https://example.com/app.js"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				disabled={installing}
			/>
		</div>
		<div className={styles.Option}>
			<p className={styles.Label}>Export name</p>
			<input
				className={styles.Input}
				type="text"
				placeholder={installing ? "" : "app (default)"}
				value={exportName}
				onChange={(e) => setExportName(e.target.value)}
				disabled={installing}
			/>
		</div>
		<div className={styles.Option}>
			<div className={styles.ButtonGroup}>
				<Button
					className={styles.Button}
					type="submit"
					disabled={installing || !input.trim()}
				>
					{installing ? "Installing..." : "Install"}
				</Button>
			</div>
		</div>
		{status != null && 
			<p className={`${styles.Status} ${status.type === "error" ? styles.Error : styles.Success}`}>
				{status.message}
			</p>
		}
	</form>;
}
