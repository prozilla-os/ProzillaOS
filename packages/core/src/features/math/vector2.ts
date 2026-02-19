export class Vector2 {
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
	getDistance(x: number | Vector2, y?: number): number {
		let deltaX = 0, deltaY = 0;

		if (x instanceof Vector2) {
			const vector2 = x;
			deltaX = this.x - vector2.x;
			deltaY = this.y - vector2.y;
		} else {
			deltaX = this.x - x;
			deltaY = this.y - (y ?? x);
		}
		
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	}

	
	add(x: number, y?: number): Vector2;
	add(vector2: Vector2): Vector2;
	add(x: number | Vector2, y?: number): Vector2 {
		return Vector2.add(this, Vector2.#from(x, y));
	}

	subtract(x: number, y?: number): Vector2;
	subtract(vector2: Vector2): Vector2;
	subtract(x: number | Vector2, y?: number): Vector2 {
		return Vector2.subtract(this, Vector2.#from(x, y));
	}

	multiply(x: number, y?: number): Vector2;
	multiply(vector2: Vector2): Vector2;
	multiply(x: number | Vector2, y?: number): Vector2 {
		return Vector2.multiply(this, Vector2.#from(x, y));
	}

	divide(x: number, y?: number): Vector2;
	divide(vector2: Vector2): Vector2;
	divide(x: number | Vector2, y?: number): Vector2 {
		return Vector2.divide(this, Vector2.#from(x, y));
	}

	static add(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x + vector2B.x, vector2A.y + vector2B.y);
	}

	static subtract(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x - vector2B.x, vector2A.y - vector2B.y);
	}

	static multiply(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x * vector2B.x, vector2A.y * vector2B.y);
	}

	static divide(vector2A: Vector2, vector2B: Vector2) {
		return new Vector2(vector2A.x / vector2B.x, vector2A.y / vector2B.y);
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

	static #from(x: number | Vector2, y?: number): Vector2 {
		return typeof x === "number" ? new Vector2(x, y) : x;
	}
}