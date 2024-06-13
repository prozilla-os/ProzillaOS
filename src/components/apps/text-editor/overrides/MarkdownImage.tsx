import { useMemo } from "react";
import { MarkdownProps } from "../TextEditor";
import { sanitizeProps } from "../../../../features/apps/text-editor/_utils/sanitizeProps";

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
		alt={alt}
		{...props}
		src={source}
	/>;
}