import { describe } from "vitest";
import { formatTime } from "../src/features";
import { testFunction } from "@prozilla-os/dev-tools";

describe("formatTime", testFunction(formatTime, [
	[[1000], "1 second"],
	[[1000, 1, true], "in 1 second"],
	[[-1000, 1, true], "1 second ago"],
	[[2000], "2 seconds"],
	[[2000, 1, true], "in 2 seconds"],
	[[-2000, 1, true], "2 seconds ago"],
]));