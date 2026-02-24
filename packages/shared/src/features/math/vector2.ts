export class Vector2 {
	x: number;
	y: number;

	constructor(xy: number)
	constructor(x: number, y?: number)
	constructor(x: number, y?: number) {
		this.x = x;
		this.y = y ?? x;
	}

	static get ZERO() {
		return new Vector2(0, 0);
	};

	get clone() {
		return new Vector2(this.x, this.y);
	}

	get magnitude() {
		return this.getDistance(this);
	}

	setX(x: number): this {
		this.x = x;
		return this;
	}

	setY(y: number): this {
		this.y = y;
		return this;
	}

	set(x: number, y: number): this {
		this.x = x;
		this.y = y;
		return this;
	}

	round(): this {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	normalize() {
		const magnitude = this.magnitude;
		return this.scale(magnitude === 0 ? 0 : 1 / magnitude);
	}

	scale(scalar: number) {
		return this.multiply(scalar);
	}

	getDistanceSquared(x: number, y?: number): number;
	getDistanceSquared(vector2: Vector2): number;
	getDistanceSquared(x: number | Vector2, y?: number): number {
		const other = Vector2.#simplifyVectorArgs(x, y);
		const deltaX = this.x - other.x;
		const deltaY = this.y - other.y;
		return deltaX * deltaX + deltaY * deltaY;
	}

	getDistance(x: number, y?: number): number;
	getDistance(vector2: Vector2): number;
	getDistance(x: number | Vector2, y?: number): number {
		const other = Vector2.#simplifyVectorArgs(x, y);
		return Math.sqrt(this.getDistanceSquared(other.x, other.y));
	}

	
	add(x: number, y?: number): this;
	add(vector2: Vector2): this;
	add(x: number | Vector2, y?: number): this {
		const other = Vector2.#simplifyVectorArgs(x, y);
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	subtract(x: number, y?: number): this;
	subtract(vector2: Vector2): this;
	subtract(x: number | Vector2, y?: number): this {
		const other = Vector2.#simplifyVectorArgs(x, y);
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	multiply(x: number, y?: number): this;
	multiply(vector2: Vector2): this;
	multiply(x: number | Vector2, y?: number): this {
		const other = Vector2.#simplifyVectorArgs(x, y);
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	divide(x: number, y?: number): this;
	divide(vector2: Vector2): this;
	divide(x: number | Vector2, y?: number): this {
		const other = Vector2.#simplifyVectorArgs(x, y);
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	lerp(vector2: Vector2, t: number): this {
		this.x += (vector2.x - this.x) * t;
		this.y += (vector2.y - this.y) * t;
		return this;
	}

	static sum(vector2A: Vector2, vector2B: Vector2) {
		return vector2A.clone.add(vector2B);
	}

	static difference(vector2A: Vector2, vector2B: Vector2) {
		return vector2A.clone.subtract(vector2B);
	}

	static product(vector2A: Vector2, vector2B: Vector2) {
		return vector2A.clone.multiply(vector2B);
	}

	static division(vector2A: Vector2, vector2B: Vector2) {
		return vector2A.clone.divide(vector2B);
	}

	static scale(vector2: Vector2, scalar: number) {
		return vector2.clone.scale(scalar);
	}

	static normalize(vector2: Vector2) {
		return vector2.clone.normalize();
	}

	static lerp(vector2A: Vector2, vector2B: Vector2, t: number) {
		return vector2A.clone.lerp(vector2B, t);
	}

	static from({ x, y }: { x: number, y: number }) {
		return new Vector2(x, y);
	}

	static #simplifyVectorArgs(x: number | Vector2, y?: number): { x: number, y: number} {
		if (x instanceof Vector2) {
			y = x.y;
			x = x.x;
		} else if (y === undefined) {
			y = x;
		}
		return { x, y };
	}
}