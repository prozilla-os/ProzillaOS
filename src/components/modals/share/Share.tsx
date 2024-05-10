import { ChangeEventHandler, useEffect, useState } from "react";
import ModalsManager from "../../../features/modals/modalsManager";
import { WindowedModal } from "../_utils/WindowedModal";
import styles from "./Share.module.css";
import { copyToClipboard, generateUrl } from "../../../features/_utils/browser.utils";
import AppsManager from "../../../features/apps/appsManager";
import utilStyles from "../../../styles/utils.module.css";
import { Button } from "../../_utils/button/Button";
import Option from "./Option";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../../hooks/modals/alert";
import { ModalProps } from "../ModalView";

const APP_OPTIONS: Record<string, Record<string, string>[]> = {
	"terminal": [
		{
			label: "Command",
			name: "input"
		},
	],
	"browser": [
		{
			label: "Website",
			name: "startUrl"
		},
	],
	"file-explorer": [
		{
			label: "Path",
			name: "startPath"
		}
	]
};

export function Share({ modal, params, ...props }: ModalProps) {
	const [appId, setAppId] = useState<string>(params.appId ?? "");
	const [fullscreen, setFullscreen] = useState<boolean>(params.fullscreen ?? false);
	const [options, setOptions] = useState({});
	const [url, setUrl] = useState<string | null>(null);
	const { alert } = useAlert();

	useEffect(() => {
		setUrl(generateUrl({
			appId: appId !== "" ? appId : null,
			fullscreen,
			...options
		}));
	}, [appId, fullscreen, options]);

	const onAppIdChange = (event: Event) => {
		const newAppId = (event.target as HTMLInputElement).value;

		if (newAppId === appId)
			return;

		setAppId(newAppId);

		const appOptions = APP_OPTIONS[appId];
		if (!appOptions) {
			setOptions({});
		} else {
			const newOptions = {};
			appOptions.forEach(({ key }) => {
				newOptions[key] = "";
			});
			setOptions(newOptions);
		}
	};

	const onFullscreenChange = (event: Event) => {
		const newFullscreen = (event.target as HTMLInputElement).checked;
		setFullscreen(newFullscreen);
	};

	const setOption = (name: string, value: string) => {
		setOptions((options = {}) => {
			options = { ...options };
			options[name] = value;
			return options;
		});
	};

	return <WindowedModal className={styles.Container} modal={modal} params={{
		...params,
		title: "Share",
		iconUrl: ModalsManager.getModalIconUrl("share"),
	}} {...props}>
		<div>
			<h1 className={styles.Title}>Share options</h1>
			<form className={styles.Form}>
				<label className={styles.Label}>
					<p>App:</p>
					<select className={styles.Input} name="app" value={appId} onChange={onAppIdChange as unknown as ChangeEventHandler}>
						<option value={""}>(None)</option>
						{AppsManager.APPS.map(({ name, id }) =>
							<option key={id} value={id}>{name}</option>
						)}
					</select>
				</label>
				{appId !== "" ? <label className={styles.Label}>
					<p>Fullscreen:</p>
					<input
						className={styles.Input}
						name="fullscreen"
						type="checkbox"
						checked={fullscreen}
						value={fullscreen.toString()}
						onChange={onFullscreenChange as unknown as ChangeEventHandler}
					/>
					<div className={styles.Checkbox}>
						{fullscreen 
							? <FontAwesomeIcon icon={faSquareCheck}/>
							: <FontAwesomeIcon icon={faSquare}/>
						}
					</div>
				</label> : null}
				{APP_OPTIONS[appId]?.map(({ label, name }) =>
					<Option key={name} name={name} label={label} setOption={setOption}/>
				)}
			</form>
		</div>
		<div>
			<p className={`${styles.Url} ${utilStyles["Text-light"]}`}>{url}</p>
			<Button
				className={`${styles.Button} ${utilStyles["Text-bold"]}`}
				onClick={() => {
					copyToClipboard(url, () => {
						alert({
							title: "Share",
							iconUrl: ModalsManager.getModalIconUrl("share"),
							text: "Copied to clipboard!",
						});
					}, () => {
						alert({
							title: "Share",
							iconUrl: ModalsManager.getModalIconUrl("share"),
							text: "Failed to copy.",
						});
					});
				}}
			>
				Copy URL
			</Button>
		</div>
	</WindowedModal>;
}