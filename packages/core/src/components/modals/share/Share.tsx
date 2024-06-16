import { ChangeEventHandler, MutableRefObject, ReactEventHandler, UIEventHandler, useEffect, useRef, useState } from "react";
import { ModalsManager } from "../../../features/modals/modalsManager";
import { WindowedModal } from "../_utils/WindowedModal";
import styles from "./Share.module.css";
import { copyToClipboard, generateUrl } from "../../../features/_utils/browser.utils";
import { AppsManager } from "../../../features/apps/appsManager";
import utilStyles from "../../../styles/utils.module.css";
import { Button } from "../../_utils/button/Button";
import { Option } from "./Option";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../../hooks/modals/alert";
import { ModalProps } from "../ModalView";
import { useScrollWithShadow } from "../../../hooks/_utils/scrollWithShadows";

const APP_OPTIONS: Record<string, { label: string, name: string }[]> = {
	"terminal": [
		{
			label: "Command",
			name: "input"
		},
		{
			label: "Path",
			name: "path"
		}
	],
	"browser": [
		{
			label: "Website",
			name: "url"
		},
	],
	"file-explorer": [
		{
			label: "Path",
			name: "path"
		}
	],
	"text-editor": [
		{
			label: "Path",
			name: "path"
		}
	],
};

export function Share({ modal, params, ...props }: ModalProps) {
	const [appId, setAppId] = useState<string>(params?.appId ?? "");
	const [fullscreen, setFullscreen] = useState<boolean>(params?.fullscreen ?? false);
	const [standalone, setStandalone] = useState<boolean>(params?.standalone ?? false);
	const [options, setOptions] = useState({});
	const [url, setUrl] = useState<string | null>(null);
	const { alert } = useAlert();
	const formRef = useRef<HTMLFormElement>(null);
	const { boxShadow, onUpdate } = useScrollWithShadow({
		ref: formRef as MutableRefObject<HTMLFormElement>,
		horizontal: false,
		dynamicOffsetFactor: 1,
		shadow: {
			offset: 20,
			blurRadius: 10,
			spreadRadius: -10,
			color: { a: 25 },
		}
	});

	useEffect(() => {
		setUrl(generateUrl({
			appId: appId !== "" ? appId : undefined,
			fullscreen,
			standalone,
			...options
		}));
	}, [appId, fullscreen, standalone, options]);

	useEffect(() => {
		onUpdate({ target: formRef.current as unknown as HTMLElement });
	}, [appId]);

	const onAppIdChange = (event: Event) => {
		const newAppId = (event.target as HTMLInputElement).value;

		if (newAppId === appId)
			return;

		setAppId(newAppId);
	};

	const onFullscreenChange = (event: Event) => {
		const newFullscreen = (event.target as HTMLInputElement).checked;
		setFullscreen(newFullscreen);
	};

	const onStandaloneChange = (event: Event) => {
		const newStandalone = (event.target as HTMLInputElement).checked;
		setStandalone(newStandalone);
	};

	const setOption = (name: string, value: string) => {
		setOptions((options: Record<string, string> = {}) => {
			options = { ...options };
			options[name] = value;
			return options;
		});
	};

	return <WindowedModal className={styles.Share} modal={modal} params={{
		...params,
		title: "Share",
		iconUrl: ModalsManager.getModalIconUrl("share"),
	}} {...props}>
		<div className={styles.Top}>
			<h1 className={styles.Title}>Share options</h1>
			<div className={styles.FormContainer} style={{ boxShadow }}>
				<form
					className={styles.Form}
					onScroll={onUpdate as unknown as UIEventHandler}
					onResize={onUpdate as unknown as ReactEventHandler}
					ref={formRef}
				>
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
						<p>Standalone:</p>
						<input
							className={styles.Input}
							name="standalone"
							type="checkbox"
							checked={standalone}
							value={standalone.toString()}
							onChange={onStandaloneChange as unknown as ChangeEventHandler}
						/>
						<div className={styles.Checkbox}>
							{standalone 
								? <FontAwesomeIcon icon={faSquareCheck}/>
								: <FontAwesomeIcon icon={faSquare}/>
							}
						</div>
					</label> : null}
					{appId !== "" ? <label className={styles.Label}>
						<input
							className={styles.Input}
							name="fullscreen"
							type="checkbox"
							checked={fullscreen}
							disabled={standalone}
							value={fullscreen.toString()}
							onChange={onFullscreenChange as unknown as ChangeEventHandler}
						/>
						<p>Fullscreen:</p>
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
		</div>
		<div className={styles.Bottom}>
			<p className={`${styles.Url} ${utilStyles.TextLight}`}>{url}</p>
			<Button
				className={`${styles.Button} ${utilStyles.TextBold}`}
				onClick={() => {
					copyToClipboard(url as string, () => {
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
				Copy
			</Button>
		</div>
	</WindowedModal>;
}