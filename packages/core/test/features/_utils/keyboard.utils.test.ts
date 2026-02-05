import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { formatShortcut } from "../../../src/features";

const test = extend(base);

test.simpleCases(formatShortcut, [
	[["a"], "A"],
	[["b"], "B"],
	[["c"], "C"],
	[["A"], "A"],
	[["B"], "B"],
	[["C"], "C"],
	[["0"], "0"],
	[["1"], "1"],
	[["2"], "2"],
	[["a", "1"], "A+1"],
	[["b", "2"], "B+2"],
	[["c", "3"], "C+3"],
	[["Alt", "F4"], "Alt+F4"],
	[["c", "Control"], "Ctrl+C"],
	[["Control", "v"], "Ctrl+V"],
	[["a", "1", "Control", "Shift"], "Ctrl+Shift+A+1"],
	[["+", "Shift"], "Shift+Plus"],
	[["-", "Shift"], "Shift+Minus"],
]);