import { useMemo } from "react";

interface MarkdownImageProps {
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

	return <img
		alt={alt}
		{...props}
		src={source}
	/>;
}