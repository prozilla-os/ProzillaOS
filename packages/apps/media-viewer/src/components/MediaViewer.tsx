import { useEffect, useState, useRef } from "react";
import styles from "./MediaViewer.module.css";
import {
	AppsConfig,
	IMAGE_EXTENSIONS,
	VIDEO_EXTENSIONS,
	AUDIO_EXTENSIONS,
	useSystemManager,
	useWindowsManager,
	VirtualFile,
	WindowProps,
} from "@prozilla-os/core";

export interface MediaViewerProps extends WindowProps {
	file?: VirtualFile;
}

export function MediaViewer({ file, close, setTitle }: MediaViewerProps) {
	const { appsConfig } = useSystemManager();
	const windowsManager = useWindowsManager();
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (file != null) setTitle?.(file.id);
	}, [file, setTitle]);

	useEffect(() => {
		if (
			file &&
			file.extension &&
			AUDIO_EXTENSIONS.includes(file.extension) &&
			file.source
		) {
			if (audioRef.current) {
				audioRef.current.src = file.source;
				void audioRef.current.play();
				setIsPlaying(true);
			}
		}

		if (
			file &&
			file.extension &&
			VIDEO_EXTENSIONS.includes(file.extension) &&
			file.source
		) {
			if (videoRef.current) {
				videoRef.current.src = file.source;
				void videoRef.current.play();
				setIsPlaying(true);
			}
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
			if (videoRef.current) {
				videoRef.current.pause();
				videoRef.current.currentTime = 0;
			}
		};
	}, [file]);

	const handlePlay = () => {
		if (audioRef.current) {
			void audioRef.current.play();
		}
		if (videoRef.current) {
			void videoRef.current.play();
		}
		setIsPlaying(true);
	};

	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
		}
		if (videoRef.current) {
			videoRef.current.pause();
		}
		setIsPlaying(false);
	};

	const handleStop = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
		setIsPlaying(false);
	};

	if (file == null) {
		const fileExplorerApp = appsConfig.getAppByRole(
			AppsConfig.APP_ROLES.FileExplorer
		);

		setTimeout(() => {
			if (fileExplorerApp != null)
				windowsManager?.open(fileExplorerApp.id, { path: "~/Pictures" });
			close?.();
		}, 10);
		return null;
	}

	if (
		file.extension == null ||
		(!IMAGE_EXTENSIONS.includes(file.extension) &&
			!AUDIO_EXTENSIONS.includes(file.extension) &&
			!VIDEO_EXTENSIONS.includes(file.extension))
	) {
		return <p>Invalid file format.</p>;
	}

	if (file.source == null) return <p>File failed to load.</p>;

	if (IMAGE_EXTENSIONS.includes(file.extension)) {
		return (
			<div className={styles.MediaViewer}>
				<img src={file.source} alt={file.id} draggable="false" />
			</div>
		);
	}

	if (AUDIO_EXTENSIONS.includes(file.extension)) {
		return (
			<article className={styles.audioViewer}>
				<h3>Playing audio: {file.id}</h3>
				<audio ref={audioRef} controls />
				<div className={styles.audioControls}>
					<button
						className={isPlaying ? styles.isPlaying : styles.isNotPlaying} onClick={handlePlay}	disabled={isPlaying}>
						Play
					</button>
					<button
						className={isPlaying ? styles.isPlaying : styles.isNotPlaying} onClick={handlePause} disabled={!isPlaying}>
					Pause	
					</button>
					<button
						className={isPlaying ? styles.isPlaying : styles.isNotPlaying} onClick={handleStop}>
					Stop
					</button>
				</div>
			</article>
		);
	}

	if (VIDEO_EXTENSIONS.includes(file.extension)) {
		if (file.extension === "youtube") {
			return (
				<div className={styles.videoViewer}>
					<h3>Playing video: {file.id}</h3>
					<iframe
						className=""
						width="560"
						height="315"
						src={file.source.replace("watch?v=", "embed/")}
						title={file.id}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			);
		} else {
			return (
				<article className={styles.videoViewer}>
					<h3>Playing video: {file.id}</h3>
					<video ref={videoRef} controls className={styles.videoPlayer}>
						<source src={file.source} type={`video/${file.extension}`} />
					Your browser does not support the video tag.
					</video>
				</article>
			);
		}
	}

	return null;
}