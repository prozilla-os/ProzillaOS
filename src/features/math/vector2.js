export default class Vector2 {
	static ZERO = new Vector2(0, 0);

	constructor(x, y) {
		this.x = x;
		this.y = y ?? x;
	}
}