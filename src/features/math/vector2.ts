export default class Vector2 {
	x: number;
	y: number;

	static ZERO = new Vector2(0, 0);

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y ?? x;
	}

	round(): Vector2 {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
}