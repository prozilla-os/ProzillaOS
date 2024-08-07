import { useMemo } from "react";
import { MarkdownProps } from "../TextEditor";
import styles from "../TextEditor.module.css";
import { sanitizeProps } from "../../core/_utils/sanitizeProps";

interface MarkdownImageProps extends MarkdownProps {
	src: string;
	alt: string
}

export function MarkdownImage({ alt, src, ...props }: MarkdownImageProps) {
	const source = useMemo(() => {
		if (src.startsWith("public")) {
			return src.replace(/^public\//g, "/");
		}

		return src;
	}, [src]);

	sanitizeProps(props);

	return <img
		{...props}
		src={source}
		className={styles.MarkdownImage}
		alt={alt}
	/>;
}