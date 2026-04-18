import { ANSI, parseOptionalFloat, parseOptionalInteger } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

const FIRE_CHARS = " .:-=+*#%@".split("");
const MAX_HEAT_LEVELS = 256 * 5;
const WHITE_THRESHOLD = 60;
const YELLOW_THRESHOLD = 25;
const RED_THRESHOLD = 8;

const CENTER_CONCENTRATION_BIAS = 12;
const VERTICAL_HEAT_LOSS = 1;
const FLICKER_SPEED = 3;
const NOISE_VARIATION_RANGE = 6;
const NOISE_VARIATION_OFFSET = 2;

const ANIMATION_SPEED_DEFAULT = 60 / 50;
const INTENSITY_DEFAULT = 1 / 1.5;
const COOLING_FACTOR_DEFAULT = 1200;
const DISSIPATION_RATE_DEFAULT = 5;
const MAX_HEAT_DEFAULT = 255;

export const afire = new Command()
	.setManual({
		purpose: "Display burning ASCII art flames",
		usage: "afire [-s <speed>] [-i <float>] [-c <int>] [-d <int>] [-h <int>]",
		options: {
			"-s speed": `Speed of the animation (Defaults to ${ANIMATION_SPEED_DEFAULT})`,
			"-i float": `Color intensity modifier (defaults to ${INTENSITY_DEFAULT})`,
			"-c int": `Height cooling factor (defaults to ${COOLING_FACTOR_DEFAULT})`,
			"-d int": `Heat dissipation rate (defaults to ${DISSIPATION_RATE_DEFAULT})`,
			"-h int": `Maximum heat source (defaults to ${MAX_HEAT_DEFAULT})`,
		},
	})
	.addOption({ short: "s", long: "speed", isInput: true })
	.addOption({ short: "i", long: "intensity", isInput: true })
	.addOption({ short: "c", long: "cooling", isInput: true })
	.addOption({ short: "d", long: "dissipation", isInput: true })
	.addOption({ short: "h", long: "heat", isInput: true })
	.setExecute(function(this: Command, _args, { size, stdin, stdout, inputs }) {
		const animationDelay = 60 / parseOptionalInteger(inputs.s, ANIMATION_SPEED_DEFAULT);
		const colorThreshold = 1 / parseOptionalFloat(inputs.i, INTENSITY_DEFAULT);
		const coolingFactor = parseOptionalInteger(inputs.c, COOLING_FACTOR_DEFAULT);
		const dissipationRate = parseOptionalInteger(inputs.d, DISSIPATION_RATE_DEFAULT);
		const maxHeat = parseOptionalInteger(inputs.h, MAX_HEAT_DEFAULT);

		const whiteThreshold = colorThreshold * WHITE_THRESHOLD;
		const yellowThreshold = colorThreshold * YELLOW_THRESHOLD;
		const redThreshold = colorThreshold * RED_THRESHOLD;

		let width = size.x;
		let visibleHeight = size.y;
		let bufferHeight = visibleHeight + 4;
		
		let bitmap = new Uint8Array(width * bufferHeight);
		const heatLookupTable = new Uint32Array(MAX_HEAT_LEVELS);
		let flickerTimer = 0;

		const generateHeatTable = () => {
			const heightCoolingThreshold = Math.max(1, Math.floor(coolingFactor / visibleHeight));
			for (let i = 0; i < MAX_HEAT_LEVELS; i++) {
				if (i > heightCoolingThreshold) {
					heatLookupTable[i] = Math.floor((i - heightCoolingThreshold) / dissipationRate);
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
				let currentHeat = Math.floor(Math.random() * Math.min(leftEdgeWeight, rightEdgeWeight, maxHeat));
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
			delay: animationDelay,
			useAltBuffer: true,
			render: () => {
				if (width !== size.x || visibleHeight !== size.y) {
					width = size.x;
					visibleHeight = size.y;
					bufferHeight = visibleHeight + 4;
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
							if (heat > whiteThreshold) {
								color = ANSI.fg.white;
							} else if (heat > yellowThreshold) {
								color = ANSI.fg.yellow;
							} else if (heat > redThreshold) {
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