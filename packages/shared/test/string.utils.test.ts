import { test as base } from "vitest";
import { extend } from "@prozilla-os/dev-tools";
import { fillTemplate, isolate, kebabToCamelCase, parseBool, resolveUrl, splitAt } from "../src/features";

const test = extend(base);

test.simpleCases(parseBool, [
	["true", true],
	["True", true],
	["TRUE", true],
	["TrUe", true],
	["tRuE", true],
	["   true   ", true],
	["false", false],
	["False", false],
	["FALSE", false],
	["FaLsE", false],
	["fAlSe", false],
	["   false   ", false],
	["This is not a bool.", false],
	["", false],
]);

test.simpleCases(kebabToCamelCase, [
	["foo-bar", "fooBar"],
	["short", "short"],
	["", ""],
]);

test.cases(splitAt, [
	[["string", 0], ["", "tring"]],
	[["string", 1], ["s", "ring"]],
	[["string", 2], ["st", "ing"]],
	[["string", 3], ["str", "ng"]],
	[["string", 4], ["stri", "g"]],
	[["string", 5], ["strin", ""]],
	[["string", 6], ["string", ""]],
	[["string", -1], ["string", ""]],
	[["", 0], ["", ""]],
	[["", 1], ["", ""]],
	[["s", 0], ["", ""]],
	[["s", 1], ["s", ""]],
]);

test.cases(resolveUrl, [
	[["foo"], "foo"],
	[["foo", "bar"], "foo/bar"],
	[["one", "two", "three"], "one/two/three"],
	[["/one/", "/two/", "/three/"], "/one/two/three/"],
	[["/one/", "two", "/three/"], "/one/two/three/"],
	[["/one", "/two", "/three"], "/one/two/three"],
	[["one/", "two/", "three/"], "one/two/three/"],
	[["path", "?foo=1", "?bar=2"], "path?foo=1&bar=2"],
	[[""], ""],
]);

test.cases(fillTemplate, [
	[["Hello {user}!", { user: "John Doe" }], "Hello John Doe!"],
	[["Hello user!", { user: "John Doe" }], "Hello user!"],
	[["Hello {user}! Nice to meet you, {user}.", { user: "John Doe" }], "Hello John Doe! Nice to meet you, John Doe."],
	[["{base}/foo/bar", { base: "https://os.prozilla.dev" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}foo/bar", { base: "https://os.prozilla.dev" }, { join: "/" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}/foo/bar", { base: "https://{domain}", domain: "os.prozilla.dev" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}foo/bar", { base: "https://{domain}", domain: "os.prozilla.dev" }, { join: "/" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}/foo/bar", { subdomain: "os", base: "https://{domain}", domain: "{subdomain}.prozilla.dev" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}foo/bar", { subdomain: "os", base: "https://{domain}", domain: "{subdomain}.prozilla.dev" }, { join: "/" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}/{path}", { subdomain: "os", base: "https://{domain}", domain: "{subdomain}.prozilla.dev", path: "foo/bar" }], "https://os.prozilla.dev/foo/bar"],
	[["{base}{path}", { subdomain: "os", base: "https://{domain}", domain: "{subdomain}.prozilla.dev", path: "foo/bar" }, { join: "/" }], "https://os.prozilla.dev/foo/bar"],
]);

test.cases(isolate, [
	[["onetwothree", "two"], ["one", "two", "three"]],
	[["onefootwobarthreefoo", "foo"], ["one", "foo", "twobarthree", "foo"]],
	[["foofoofoo", "foo"], ["foo", "foo", "foo"]],
	[["foo", "foo"], ["foo"]],
	[["foo", "bar"], ["foo"]],
	[["", ""], [""]],
	[["", "foo"], [""]],
]);