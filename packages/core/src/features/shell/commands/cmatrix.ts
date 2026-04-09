import { Vector2 } from "@prozilla-os/shared";
import { ANSI, randomFromArray, randomRange, removeFromArray } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

const ANIMATION_SPEED = 1.25;
const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.*\\/()#@&$!?%°:<>[]";

const PARTICLES = {
	spawnRate: 30,
	fallSpeed: 1,
	minSize: 5,
	maxSize: 25,
};

type Particle = {
	position: Vector2,
	size: number;
};

function initializeScreen(size: Vector2) {
	const screen: string[][] = [];
	for (let y = 0; y < size.y; y++) {
		const row: string[] = [];
		for (let x = 0; x < size.x; x++) {
			row.push(" ");
		}
		screen.push(row);
	}
	return screen;
}

function generateScreen(frame: number, screen: string[][], particles: Particle[], size: Vector2): string {
	const framesBetweenSpawn = Math.round(5000 / (PARTICLES.spawnRate * size.x));

	// Spawn new particles
	if (framesBetweenSpawn === 0 || frame % framesBetweenSpawn === 0) {
		const newParticle: Particle = {
			position: new Vector2(randomRange(0, size.x - 1), size.y).round(),
			size: Math.round(randomRange(PARTICLES.minSize, PARTICLES.maxSize)),
		};
		particles.push(newParticle);
	}

	// Move and render particles
	particles.forEach((particle) => {
		particle.position.y -= PARTICLES.fallSpeed;

		// Clean previous render
		for (let i = 0; i < PARTICLES.fallSpeed; i++) {
			const positionX = particle.position.x;
			const positionY = particle.position.y + i + particle.size;

			if (positionY < size.y && positionY >= 0)
				screen[positionY][positionX] = " ";
		}

		// Remove offscreen particles
		if (particle.position.y + particle.size <= 0 || particle.position.x >= size.x)
			return removeFromArray(particle, particles);

		for (let i = 0; i < particle.size; i++) {
			const character = randomFromArray(CHARACTERS.split(""));
			let color = i == 0 ? ANSI.fg.white : ANSI.fg.green;

			if (i > particle.size / 2)
				color = ANSI.fg.green + ANSI.decoration.dim;

			const positionX = particle.position.x;
			const positionY = particle.position.y + i;

			if (positionX < size.x && positionY < size.y && positionY >= 0) {
				screen[positionY][positionX] = color + character + ANSI.reset;
			}
		}
	});

	return [...screen.map((row) => row.join(""))].reverse().join("\n");
}

export const cmatrix = new Command()
	.setManual({
		purpose: "Show a scrolling 'Matrix' like screen",
		usage: "cmatrix",
	})
	.setExecute(function(this: Command, _arguments, { size, stdin, stdout }) {
		const particles: Particle[] = [];

		// Create screen
		let screen = initializeScreen(size);

		const delay = 100 / ANIMATION_SPEED;

		return Shell.animate({ stdin, stdout }, (frame) => {
			// Re-initialize if terminal size changes
			if (screen.length !== size.y || (screen.length !== 0 ? screen[0].length : 0) !== size.x) {
				screen = initializeScreen(size);
			}

			return generateScreen(frame, screen, particles, size);
		}, delay);
	});