import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { removeBaseUrl, removeUrlProtocol } from "../../../src/features";

const test = extend(base);

test.simpleCases(removeUrlProtocol, [
	["https://example.com/foo/bar", "example.com/foo/bar"],
	["https://example.com/foo", "example.com/foo"],
	["https://example.com/", "example.com"],
	["https://example.com", "example.com"],
	["https://example.com/?foo=bar", "example.com/?foo=bar"],
]);

test.simpleCases(removeBaseUrl, [
	["https://example.com/foo/bar", "/foo/bar"],
	["https://example.com/foo", "/foo"],
	["https://example.com/", "/"],
	["https://example.com", ""],
	["https://example.com/?foo=bar", "/?foo=bar"],
	["https://demo.example.com/", "/"],
	["https://demo.example.com", ""],
]);