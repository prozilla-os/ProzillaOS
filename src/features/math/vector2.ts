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
}