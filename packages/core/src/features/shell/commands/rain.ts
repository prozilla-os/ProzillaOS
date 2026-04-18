import { Vector2, ANSI, randomRange, removeFromArray, parseOptionalFloat } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

const ANIMATION_SPEED = 2;
const DROP_CHAR = "|";
const SPLASH_SEQUENCE = [".", "v", "V", "w", "W", "v", "."];
const MAX_LENGTH = 2;

const PARTICLES = {
	spawnRate: 40,
	fallSpeed: 1,
};

type RainParticle = {
	position: Vector2;
	isSplashing: boolean;
	splashFrame: number;
	inBackground: boolean;
	length: number;
};

function initializeScreen(size: Vector2): string[][] {
	return Array.from({ length: size.y }, (): string[] => 
		Array.from({ length: size.x }, (): string => " ")
	);
}

function generateScreen(frame: number, screen: string[][], particles: RainParticle[], size: Vector2): string {
	const framesBetweenSpawn = Math.round(5000 / (PARTICLES.spawnRate * size.x));

	if (framesBetweenSpawn === 0 || frame % framesBetweenSpawn === 0) {
		particles.push({
			position: new Vector2(randomRange(0, size.x - 1), size.y - 1).round(),
			isSplashing: false,
			splashFrame: 0,
			inBackground : Math.random() > 0.5,
			length: Math.round(randomRange(1, MAX_LENGTH)),
		});
	}

	particles.forEach((particle) => {
		for (let i = 0; i < PARTICLES.fallSpeed; i++) {
			const y = particle.position.y + particle.length + i - 1;
			if (y < screen.length)
				screen[y][particle.position.x] = " ";
		}

		if (particle.isSplashing) {
			if (particle.splashFrame >= SPLASH_SEQUENCE.length) {
				screen[0][particle.position.x] = " ";
				removeFromArray(particle, particles);
				return;
			}
			
			const splashChar = SPLASH_SEQUENCE[particle.splashFrame];
			const color = particle.inBackground || particle.splashFrame > SPLASH_SEQUENCE.length / 2
				? ANSI.fg.cyan + ANSI.decoration.dim 
				: ANSI.fg.cyan;

			screen[0][particle.position.x] = color + splashChar + ANSI.reset;
			particle.splashFrame++;
		} else {
			particle.position.y -= PARTICLES.fallSpeed;

			if (particle.position.y <= 0) {
				particle.position.y = 0;
				particle.isSplashing = true;
				particle.splashFrame = 0;
			} else if (particle.position.y < size.y) {
				const color = particle.inBackground ? ANSI.fg.blue + ANSI.decoration.dim : ANSI.fg.blue;
				screen[particle.position.y][particle.position.x] = color + DROP_CHAR + ANSI.reset;
			} else {
				removeFromArray(particle, particles);
			}
		}
	});

	return screen.map((row: string[]) => row.join("")).reverse().join("\n");
}

export const rain = new Command()
	.setManual({
		purpose: "Show an animated rain effect with splashes",
		usage: "rain [-s <speed>]",
		options: {
			"-s speed": `Speed of the animation (Defaults to ${ANIMATION_SPEED})`,
		},
	})
	.addOption({ short: "s", long: "speed", isInput: true })
	.setExecute(function(this: Command, _arguments, { size, stdin, stdout, inputs }) {
		const particles: RainParticle[] = [];
		let screen = initializeScreen(size);
		const delay = 60 / parseOptionalFloat(inputs.s, ANIMATION_SPEED);

		return Shell.animate({
			stdin,
			stdout,
			delay,
			render: (frame) => {
				if (screen.length !== size.y || (screen.length !== 0 ? screen[0].length : 0) !== size.x)
					screen = initializeScreen(size);

				return generateScreen(frame, screen, particles, size);
			},
		});
	});