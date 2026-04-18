import { Vector2, ANSI, randomRange } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

interface Snowflake {
	position: Vector2;
	speed: number;
	char: string;
	opacity: number;
}

function initializeSnowBuffer(size: Vector2): number[][] {
	return Array.from({ length: size.y }, () => Array<number>(size.x).fill(0));
}

export const snow = new Command()
	.setManual({
		purpose: "Let it snow",
	})
	.setExecute(function(this: Command, _args, { size, stdin, stdout }) {
		let snowBuffer = initializeSnowBuffer(size);
		const flakes: Snowflake[] = [];
		const chars = ["*", "·", "•", "."];

		const randomFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

		const spawnFlake = () => {
			const isBackground = Math.random() > 0.6;
			flakes.push({
				position: new Vector2(randomRange(0, size.x - 1), size.y - 1),
				speed: isBackground ? randomRange(0.1, 0.3) : randomRange(0.4, 0.8),
				char: isBackground ? "." : randomFromArray(chars),
				opacity: isBackground ? 0.5 : 1,
			});
		};

		return Shell.animate({
			stdin,
			stdout,
			delay: 50,
			render: () => {
				if (snowBuffer.length !== size.y || snowBuffer.length > 0 && snowBuffer[0].length !== size.x) {
					snowBuffer = initializeSnowBuffer(size);
					flakes.length = 0;
				}

				// Gravity
				for (let pass = 0; pass < 2; pass++) {
					for (let y = 1; y < size.y; y++) {
						for (let x = 0; x < size.x; x++) {
							if (snowBuffer[y][x] >= 0.1 && snowBuffer[y - 1][x] === 0) {
								snowBuffer[y - 1][x] = snowBuffer[y][x];
								snowBuffer[y][x] = 0;
							}
						}
					}
				}

				// Melting
				if (Math.random() < size.x / 100) {
					const meltX = Math.floor(randomRange(0, size.x - 1));
					for (let y = 0; y < size.y; y++) {
						if (snowBuffer[y][meltX] > 0) {
							snowBuffer[y][meltX] -= 0.25;
							if (snowBuffer[y][meltX] < 0.1) snowBuffer[y][meltX] = 0;
							break;
						}
					}
				}

				if (Math.random() < size.x / 12)
					spawnFlake();

				const screen = Array.from({ length: size.y }, () => Array<string>(size.x).fill(" "));

				for (let y = 0; y < size.y; y++) {
					for (let x = 0; x < size.x; x++) {
						const val = snowBuffer[y][x];
						if (val > 0) {
							const style = val < 0.6 ? ANSI.decoration.dim : "";
							screen[y][x] = style + "*" + ANSI.reset;
						}
					}
				}

				for (let i = flakes.length - 1; i >= 0; i--) {
					const flake = flakes[i];
					flake.position.y -= flake.speed;

					const gridX = Math.floor(flake.position.x);
					const gridY = Math.floor(flake.position.y);

					if (gridY < 0) {
						flakes.splice(i, 1);
						continue;
					}

					const isAtBottom = gridY === 0;
					const isBelowOccupied = !isAtBottom && gridY < size.y && snowBuffer[gridY - 1][gridX] >= 0.9;

					if (isAtBottom || isBelowOccupied) {
						const canGoLeft = !isAtBottom && gridX > 0 && snowBuffer[gridY - 1][gridX - 1] < 0.1;
						const canGoRight = !isAtBottom && gridX < size.x - 1 && snowBuffer[gridY - 1][gridX + 1] < 0.1;

						if (canGoLeft || canGoRight) {
							flake.position.x += canGoLeft && canGoRight ? Math.random() < 0.5 ? -1 : 1 : canGoLeft ? -1 : 1;
						} else {
							if (flake.opacity === 1 || Math.random() > 0.5)
								snowBuffer[gridY][gridX] = 1;
							flakes.splice(i, 1);
							continue;
						}
					}

					const style = flake.opacity < 1 ? ANSI.decoration.dim : "";
					screen[gridY][gridX] = style + flake.char + ANSI.reset;
				}

				return screen.map((row) => row.join("")).reverse().join("\n");
			},
		});
	});