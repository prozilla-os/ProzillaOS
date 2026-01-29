import { Vector2 } from "@prozilla-os/core";
import { ANSI, randomFromArray, randomRange, removeFromArray } from "@prozilla-os/shared";
import { Command } from "../command";
import { Stream } from "../stream";

const ANIMATION_SPEED = 1.25;
const SCREEN_WIDTH = 75;
const SCREEN_HEIGHT = 20;
const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.*\\/()#@&$!?%°:<>[]";

const PARTICLES = {
	framesBetweenSpawn: 30,
	fallSpeed: 1,
	minSize: 5,
	maxSize: 25,
};

type Particle = {
	position: Vector2,
	size: number;
};

function generateScreen(frame: number, screen: string[][], particles: Particle[]): string {
	// Spawn new particles
	if (frame % PARTICLES.framesBetweenSpawn) {
		const newParticle: Particle = {
			position: new Vector2(randomRange(0, SCREEN_WIDTH), SCREEN_HEIGHT).round(),
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

			if (positionY < SCREEN_HEIGHT && positionY >= 0)
				screen[positionY][positionX] = " ";
		}

		// Remove offscreen particles
		if (particle.position.y + particle.size <= 0 || particle.position.x >= SCREEN_WIDTH)
			return removeFromArray(particle, particles);

		for (let i = 0; i < particle.size; i++) {
			const character = randomFromArray(CHARACTERS.split(""));
			let color = i == 0 ? ANSI.fg.white : ANSI.fg.green;

			if (i > particle.size / 2)
				color = ANSI.fg.green + ANSI.decoration.dim;

			const positionX = particle.position.x;
			const positionY = particle.position.y + i;

			if (positionX < SCREEN_WIDTH && positionY < SCREEN_HEIGHT && positionY >= 0) {
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
	.setExecute(function() {
		const stream = new Stream();
		const particles: Particle[] = [];

		// Create screen
		const screen: string[][] = [];
		for (let y = 0; y < SCREEN_HEIGHT; y++) {
			const row: string[] = [];
			for (let x = 0; x < SCREEN_WIDTH; x++) {
				row.push(" ");
			}
			screen.push(row);
		}

		let frame = 0;
		const interval = setInterval(() => {
			const text = generateScreen(frame, screen, particles);
			stream.send(text);
			frame++;
		}, 100 / ANIMATION_SPEED);

		stream.on(Stream.STOP_EVENT, () => {
			clearInterval(interval);
		});

		stream.start();

		return stream;
	});