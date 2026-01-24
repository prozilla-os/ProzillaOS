import { Vector2 } from "../../../features/math/vector2";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

export interface ImageProps {
	className?: string;
	src?: string;
	[key: string]: unknown;
}

export function VectorImage({ className, src, ...props }: ImageProps) {
	const [dimensions, setDimensions] = useState<Vector2>(Vector2.ZERO);

	useEffect(() => {
		if (src == null)
			return;

		const image = new Image();

		image.onload = () => {
			setDimensions(new Vector2(image.naturalWidth, image.naturalHeight));
		};

		image.src = src;
	}, [src]);

	if (src?.endsWith(".svg")) {
		return <ReactSVG className={className} src={src} {...props}/>;
	} else {
		return <div>
			<div>
				<svg
					width={200}
					height={200}
					className={className}
					viewBox={"0 0 200 200"}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					shapeRendering="crispEdges"
					{...props}
				>    
					<g transform={`scale(${200 / (dimensions.x ?? 1)})`}>
						<image width={dimensions.x} height={dimensions.y} href={src} style={{ imageRendering: "crisp-edges" }}/>
					</g>
				</svg>
			</div>
		</div>;
	}
}