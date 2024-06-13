import { useMemo } from "react";
import { MarkdownProps } from "../TextEditor";
import { sanitizeProps } from "../../../../features/apps/text-editor/_utils/sanitizeProps";
import styles from "../TextEditor.module.css";

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

	sanitizeProps(props as MarkdownProps);

	return <img
		{...props}
		src={source}
		className={styles.MarkdownImage}
		alt={alt}
	/>;
}