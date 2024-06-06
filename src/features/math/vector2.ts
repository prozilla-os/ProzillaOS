export default class Vector2 {
	x: number;
	y: number;

	static get ZERO() {
		return new Vector2(0, 0);
	};

	get clone() {
		return new Vector2(this.x, this.y);
	}

	constructor(x: number, y?: number) {
		this.x = x;
		this.y = y ?? x;
	}

	round(): Vector2 {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	getDistance(x: number, y?: number): number;
	getDistance(vector2: Vector2): number;

	getDistance(x: unknown, y?: unknown): number {
		let deltaX = 0, deltaY = 0;

		if (x instanceof Vector2) {
			const vector2 = x;
			deltaX = this.x - vector2.x;
			deltaY = this.y - vector2.y;
		} else {
			deltaX = this.x - (x as number);
			deltaY = this.y - (y as number);
		}
		
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	}

	static add(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x + vector2B.x, vector2A.y + vector2B.y);
	}

	static subtract(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x - vector2B.x, vector2A.y - vector2B.y);
	}

	static scale(vector2: Vector2, scalar: number) {
		return new Vector2(vector2.x * scalar, vector2.y * scalar);
	}

	static magnitude(vector2: Vector2) {
		return Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
	}

	static normalize(vector2: Vector2) {
		const magnitude = Vector2.magnitude(vector2);
		return magnitude === 0 ? Vector2.ZERO : Vector2.scale(vector2, 1 / magnitude);
	}

	static sqrDistance(vector2A: Vector2, vector2B: Vector2) {
		const dx = vector2A.x - vector2B.x;
		const dy = vector2A.y - vector2B.y;
		return dx * dx + dy * dy;
	}

	static lerp(vector2A: Vector2, vector2B: Vector2, t: number) {
		return new Vector2(
			vector2A.x + (vector2B.x - vector2A.x) * t,
			vector2A.y + (vector2B.y - vector2A.y) * t
		);
	}
}