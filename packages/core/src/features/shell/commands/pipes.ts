import { Vector2, ANSI, randomRange, randomFromArray } from "@prozilla-os/shared";
import { Command } from "../command";
import { Shell } from "../shell";

const ANIMATION_DELAY = 40;
const MIN_DEATH_TIME = 10;
const MAX_DEATH_TIME = 20;
const SPAWN_RATE = 0.0015;

const DIRECTIONS = [
	new Vector2(1, 0),
	new Vector2(-1, 0),
	new Vector2(0, 1),
	new Vector2(0, -1),
];

const PIPE_CHARS: Record<string, string> = {
	"1,0|1,0": "-", 
	"-1,0|-1,0": "-",
	"0,1|0,1": "|", 
	"0,-1|0,-1": "|",
	"0,1|1,0": "+",  
	"0,1|-1,0": "+",
	"0,-1|1,0": "+", 
	"0,-1|-1,0": "+",
	"1,0|0,1": "+",  
	"1,0|0,-1": "+", 
	"-1,0|0,1": "+", 
	"-1,0|0,-1": "+", 
};

type Segment = {
	position: Vector2;
	char: string;
};

type Pipe = {
	position: Vector2;
	direction: Vector2;
	color: string;
	dead: boolean;
	segments: Segment[];
	deathTimer: number;
	removing: boolean;
};

function createPipe(size: Vector2): Pipe {
	const colors = [ANSI.fg.blue, ANSI.fg.cyan, ANSI.fg.green, ANSI.fg.magenta, ANSI.fg.red, ANSI.fg.yellow];
	const position = new Vector2(randomRange(0, size.x - 1), randomRange(0, size.y - 1)).round();
	const direction = randomFromArray(DIRECTIONS);
	
	const minTicks = MIN_DEATH_TIME * 1000 / ANIMATION_DELAY;
	const maxTicks = MAX_DEATH_TIME * 1000 / ANIMATION_DELAY;

	return {
		position,
		direction,
		color: randomFromArray(colors),
		dead: false,
		segments: [],
		deathTimer: randomRange(minTicks, maxTicks),
		removing: false,
	};
}

function updatePipes(pipes: Pipe[], size: Vector2) {
	const occupied = new Set<string>();
	pipes.forEach((pipe) => pipe.segments.forEach((segment) => {
		occupied.add(`${segment.position.x},${segment.position.y}`);
	}));

	for (let i = pipes.length - 1; i >= 0; i--) {
		const pipe = pipes[i];

		if (!pipe.dead) {
			const oldDirection = pipe.direction;
			
			if (Math.random() < 0.2) {
				const newDir = randomFromArray(DIRECTIONS);
				if (!(newDir.x === -oldDirection.x && newDir.y === -oldDirection.y)) {
					pipe.direction = newDir;
				}
			}

			const key = `${oldDirection.x},${oldDirection.y}|${pipe.direction.x},${pipe.direction.y}`;
			const char = PIPE_CHARS[key] ?? (pipe.direction.x !== 0 ? "-" : "|");
			
			pipe.segments.push({ position: new Vector2(pipe.position.x, pipe.position.y), char });
			occupied.add(`${pipe.position.x},${pipe.position.y}`);

			const nextPos = pipe.position.add(pipe.direction);

			if (nextPos.x < 0 || nextPos.x >= size.x
				|| nextPos.y < 0 || nextPos.y >= size.y
				|| occupied.has(`${nextPos.x},${nextPos.y}`)) {
				pipe.dead = true;
			} else {
				pipe.position = nextPos;
			}
		} else if (!pipe.removing) {
			pipe.deathTimer--;
			if (pipe.deathTimer <= 0)
				pipe.removing = true;
		} else {
			pipe.segments.shift();
			if (pipe.segments.length === 0)
				pipes.splice(i, 1);
		}
	}

	const maxPipes = Math.max(1, Math.floor(size.x * size.y * SPAWN_RATE));
	if (pipes.filter((pipe) => !pipe.dead).length < maxPipes)
		pipes.push(createPipe(size));
}

export const pipes = new Command()
	.setManual({
		purpose: "Displays animated colorful pipes",
	})
	.setExecute(function(this: Command, _args, { size, stdin, stdout }) {
		const activePipes: Pipe[] = [createPipe(size)];

		return Shell.animate({
			stdin,
			stdout,
			delay: ANIMATION_DELAY,
			render: () => {
				updatePipes(activePipes, size);

				const grid = Array.from({ length: size.y }, () => Array<string>(size.x).fill(" "));

				activePipes.forEach((pipe) => {
					pipe.segments.forEach((segment) => {
						const { x, y } = segment.position;
						if (y >= 0 && y < size.y && x >= 0 && x < size.x) {
							grid[y][x] = pipe.color + segment.char + ANSI.reset;
						}
					});
				});

				return grid.map((row) => row.join("")).reverse().join("\n");
			},
		});
	});