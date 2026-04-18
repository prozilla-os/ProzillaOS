import { ANSI } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

const FIRE_CHARS = " .:-=+*#%@".split("");
const MAX_HEAT_LEVELS = 256 * 5;

const COLOR_INTENSITY_MODIFIER = 1.5;
const WHITE_HEAT_THRESHOLD = COLOR_INTENSITY_MODIFIER * 60;
const YELLOW_HEAT_THRESHOLD = COLOR_INTENSITY_MODIFIER * 25;
const RED_HEAT_THRESHOLD = COLOR_INTENSITY_MODIFIER * 8;

const CENTER_CONCENTRATION_BIAS = 12;
const MAX_INITIAL_HEAT = 255;
const HEIGHT_COOLING_FACTOR = 1200;
const HEAT_DISSIPATION_RATE = 5;
const VERTICAL_HEAT_LOSS = 1;
const FLICKER_SPEED = 3;
const NOISE_VARIATION_RANGE = 6;
const NOISE_VARIATION_OFFSET = 2;

export const afire = new Command()
	.setManual({
		purpose: "Display burning ASCII art flames",
	})
	.setExecute(function(this: Command, _args, { size, stdin, stdout }) {
		const width = size.x;
		const visibleHeight = size.y;
		const bufferHeight = visibleHeight + 4;
		
		let bitmap = new Uint8Array(width * bufferHeight);
		const heatLookupTable = new Uint32Array(MAX_HEAT_LEVELS);
		let flickerTimer = 0;

		const generateHeatTable = () => {
			const heightCoolingThreshold = Math.max(1, Math.floor(HEIGHT_COOLING_FACTOR / visibleHeight));
			for (let i = 0; i < MAX_HEAT_LEVELS; i++) {
				if (i > heightCoolingThreshold) {
					heatLookupTable[i] = Math.floor((i - heightCoolingThreshold) / HEAT_DISSIPATION_RATE);
				} else {
					heatLookupTable[i] = 0;
				}
			}
		};

		const propagateFire = () => {
			for (let i = 0; i < width * visibleHeight; i++) {
				const combinedHeat = heatLookupTable[
					(bitmap[i + width - 1] || 0) + 
					(bitmap[i + width + 1] || 0) + 
					(bitmap[i + width] || 0) + 
					(bitmap[i + 2 * width - 1] || 0) + 
					(bitmap[i + 2 * width + 1] || 0)
				] || 0;
				
				bitmap[i] = combinedHeat > VERTICAL_HEAT_LOSS ? combinedHeat - VERTICAL_HEAT_LOSS : 0;
			}
		};

		const injectHeatSource = () => {
			flickerTimer--;
			if (flickerTimer < 0)
				flickerTimer = Math.floor(Math.random() * FLICKER_SPEED);

			let leftEdgeWeight = 1;
			let rightEdgeWeight = CENTER_CONCENTRATION_BIAS * width + 1;
			const sourceBaseIndex = width * visibleHeight;

			for (let x = 0; x < width; x++, leftEdgeWeight += CENTER_CONCENTRATION_BIAS, rightEdgeWeight -= CENTER_CONCENTRATION_BIAS) {
				let currentHeat = Math.floor(Math.random() * Math.min(leftEdgeWeight, rightEdgeWeight, MAX_INITIAL_HEAT));
				let clusterSize = Math.floor(Math.random() * NOISE_VARIATION_RANGE);

				while (x < width && clusterSize !== 0) {
					const idx = sourceBaseIndex + x;
					bitmap[idx] = currentHeat;
					currentHeat += Math.floor(Math.random() * NOISE_VARIATION_RANGE) - NOISE_VARIATION_OFFSET;
					
					if (idx + width < bitmap.length) bitmap[idx + width] = currentHeat;
					currentHeat += Math.floor(Math.random() * NOISE_VARIATION_RANGE) - NOISE_VARIATION_OFFSET;
					
					clusterSize--;
					if (clusterSize !== 0) {
						x++;
						leftEdgeWeight += CENTER_CONCENTRATION_BIAS;
						rightEdgeWeight -= CENTER_CONCENTRATION_BIAS;
					}
				}
				
				const finalIdx = sourceBaseIndex + x;
				if (finalIdx + 2 * width < bitmap.length) bitmap[finalIdx + 2 * width] = currentHeat;
				currentHeat += Math.floor(Math.random() * NOISE_VARIATION_RANGE) - NOISE_VARIATION_OFFSET;
			}

			propagateFire();
		};

		generateHeatTable();

		return Shell.animate({
			stdin,
			stdout,
			delay: 50,
			useAltBuffer: true,
			render: () => {
				if (bitmap.length !== width * bufferHeight) {
					bitmap = new Uint8Array(width * bufferHeight);
					generateHeatTable();
				}

				injectHeatSource();

				const output = [];
				for (let y = 0; y < visibleHeight; y++) {
					for (let x = 0; x < width; x++) {
						const heat = bitmap[y * width + x] || 0;
						
						if (heat === 0) {
							output.push(" ");
						} else {
							const charIndex = Math.floor(heat / 63 * FIRE_CHARS.length);
							const char = FIRE_CHARS[Math.min(charIndex, FIRE_CHARS.length - 1)] || " ";
							
							let color = ANSI.fg.red + ANSI.decoration.dim;
							if (heat > WHITE_HEAT_THRESHOLD) {
								color = ANSI.fg.white;
							} else if (heat > YELLOW_HEAT_THRESHOLD) {
								color = ANSI.fg.yellow;
							} else if (heat > RED_HEAT_THRESHOLD) {
								color = ANSI.fg.red;
							}

							output.push(color + char + ANSI.reset);
						}
					}
					if (y < visibleHeight - 1)
						output.push("\n");
				}
				return output.join("");
			},
		});
	});