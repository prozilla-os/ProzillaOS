import { i as x, m as N } from "/assets/object.utils-xiWGUq8N.js";
const s = {
  /**
   * Foreground colors.
   */
  fg: {
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  },
  /**
   * Background colors.
   */
  bg: {
    black: "\x1B[40m",
    red: "\x1B[41m",
    green: "\x1B[42m",
    yellow: "\x1B[43m",
    blue: "\x1B[44m",
    magenta: "\x1B[45m",
    cyan: "\x1B[46m",
    white: "\x1B[47m"
  },
  /**
   * Screen buffer and clearing controls.
   */
  screen: {
    enterAltBuffer: "\x1B[?1049h",
    exitAltBuffer: "\x1B[?1049l",
    clear: "\x1B[2J",
    clearLine: "\x1B[2K",
    home: "\x1B[H"
  },
  /**
   * Cursor controls.
   */
  cursor: {
    /** Changes the position of the cursor. */
    position: (r, t) => `\x1B[${r};${t}H`,
    hide: "\x1B[?25l",
    show: "\x1B[?25h",
    save: "\x1B[s",
    restore: "\x1B[u"
  },
  /**
   * Terminal input.
   */
  input: {
    /** Move cursor up. */
    arrowUp: "\x1B[A",
    /** Move cursor down. */
    arrowDown: "\x1B[B",
    /** Move cursor right. */
    arrowRight: "\x1B[C",
    /** Move cursor left. */
    arrowLeft: "\x1B[D",
    horizontalTab: "	",
    lineFeed: `
`,
    verticalTab: "\v",
    formFeed: "\f",
    carriageReturn: "\r",
    backspace: "\b",
    delete: "",
    escape: "\x1B",
    pageUp: "\x1B[5~",
    pageDown: "\x1B[6~",
    ctrlA: "",
    ctrlB: "",
    ctrlC: "",
    ctrlD: "",
    ctrlE: "",
    ctrlF: "",
    ctrlG: "\x07",
    ctrlH: "\b",
    ctrlI: "	",
    ctrlJ: `
`,
    ctrlK: "\v",
    ctrlL: "\f",
    ctrlM: "\r",
    ctrlN: "",
    ctrlO: "",
    ctrlP: "",
    ctrlQ: "",
    ctrlR: "",
    ctrlS: "",
    ctrlT: "",
    ctrlU: "",
    ctrlV: "",
    ctrlW: "",
    ctrlX: "",
    ctrlY: "",
    ctrlZ: ""
  },
  /**
   * Decorations.
   */
  decoration: {
    dim: "\x1B[2m",
    bold: "\x1B[1m",
    italic: "\x1B[3m",
    underline: "\x1B[4m",
    blink: "\x1B[5m",
    invert: "\x1B[7m",
    strike: "\x1B[9m"
  },
  reset: "\x1B[0m"
};
class o {
  /**
   * Makes text black using {@link ANSI.fg.black}.
   */
  static black(t) {
    return o.apply(t, s.fg.black);
  }
  /**
   * Makes text red using {@link ANSI.fg.red}.
   */
  static red(t) {
    return o.apply(t, s.fg.red);
  }
  /**
   * Makes text green using {@link ANSI.fg.green}.
   */
  static green(t) {
    return o.apply(t, s.fg.green);
  }
  /**
   * Makes text yellow using {@link ANSI.fg.yellow}.
   */
  static yellow(t) {
    return o.apply(t, s.fg.yellow);
  }
  /**
   * Makes text blue using {@link ANSI.fg.blue}.
   */
  static blue(t) {
    return o.apply(t, s.fg.blue);
  }
  /**
   * Makes text magenta using {@link ANSI.fg.magenta}.
   */
  static magenta(t) {
    return o.apply(t, s.fg.magenta);
  }
  /**
   * Makes text cyan using {@link ANSI.fg.cyan}.
   */
  static cyan(t) {
    return o.apply(t, s.fg.cyan);
  }
  /**
   * Makes text white using {@link ANSI.fg.white}.
   */
  static white(t) {
    return o.apply(t, s.fg.white);
  }
  /**
   * Sets background to black using {@link ANSI.bg.black}.
   */
  static blackBackground(t) {
    return o.apply(t, s.bg.black);
  }
  /**
   * Sets background to red using {@link ANSI.bg.red}.
   */
  static redBackground(t) {
    return o.apply(t, s.bg.red);
  }
  /**
   * Sets background to green using {@link ANSI.bg.green}.
   */
  static greenBackground(t) {
    return o.apply(t, s.bg.green);
  }
  /**
   * Sets background to yellow using {@link ANSI.bg.yellow}.
   */
  static yellowBackground(t) {
    return o.apply(t, s.bg.yellow);
  }
  /**
   * Sets background to blue using {@link ANSI.bg.blue}.
   */
  static blueBackground(t) {
    return o.apply(t, s.bg.blue);
  }
  /**
   * Sets background to magenta using {@link ANSI.bg.magenta}.
   */
  static magentaBackground(t) {
    return o.apply(t, s.bg.magenta);
  }
  /**
   * Sets background to cyan using {@link ANSI.bg.cyan}.
   */
  static cyanBackground(t) {
    return o.apply(t, s.bg.cyan);
  }
  /**
   * Sets background to white using {@link ANSI.bg.white}.
   */
  static whiteBackground(t) {
    return o.apply(t, s.bg.white);
  }
  /**
   * Makes text bold using {@link ANSI.decoration.bold}.
   */
  static bold(t) {
    return o.apply(t, s.decoration.bold);
  }
  /**
   * Makes text dim using {@link ANSI.decoration.dim}.
   */
  static dim(t) {
    return o.apply(t, s.decoration.dim);
  }
  /**
   * Makes text italic using {@link ANSI.decoration.italic}.
   */
  static italic(t) {
    return o.apply(t, s.decoration.italic);
  }
  /**
   * Underlines text using {@link ANSI.decoration.underline}.
   */
  static underline(t) {
    return o.apply(t, s.decoration.underline);
  }
  /**
   * Inverts foreground and background colors using {@link ANSI.decoration.invert}.
   */
  static invert(t) {
    return o.apply(t, s.decoration.invert);
  }
  /**
   * Makes text strike through using {@link ANSI.decoration.strike}.
   */
  static strike(t) {
    return o.apply(t, s.decoration.strike);
  }
  static apply(t, e) {
    return t = t.replaceAll(s.reset, s.reset + e), e + t + s.reset;
  }
  /**
   * Removes all ANSI escape sequences.
   */
  static strip(t) {
    return t.replace(/\u001b\[[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
  }
  /**
   * Removes ANSI escape sequences for colors and background colors (SGR).
   */
  static stripColors(t) {
    return t.replace(/\u001b\[[0-9;]*m/g, "");
  }
}
const B = /* @__PURE__ */ Symbol("inspectionContext"), D = /* @__PURE__ */ Symbol.for("react.element"), R = /* @__PURE__ */ Symbol.for("react.fragment"), m = {
  depth: 2,
  maxArrayLength: 100,
  maxStringLength: 80,
  breakLength: 60,
  compact: !0,
  sortKeys: !1,
  singleQuotes: !1,
  spaceAfterComma: !0,
  plugins: [],
  colors: {
    string: s.fg.green,
    number: s.fg.yellow,
    boolean: s.fg.yellow,
    null: s.decoration.dim + s.fg.yellow,
    undefined: s.decoration.dim + s.fg.yellow,
    bigint: s.fg.yellow,
    symbol: s.fg.green,
    function: s.fg.blue,
    key: s.fg.white,
    date: s.fg.magenta,
    regExp: s.fg.cyan,
    error: s.fg.red,
    htmlTag: s.fg.red,
    reactComponent: s.fg.yellow,
    delimiter: s.fg.cyan
  }
};
function p(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  if (r === null)
    return e.token("null", "null");
  if (r === void 0)
    return e.token("undefined", "undefined");
  if (typeof r == "boolean")
    return e.token(String(r), "boolean");
  if (typeof r == "number") {
    let n;
    return Number.isNaN(r) ? n = "NaN" : Number.isFinite(r) ? n = String(r) : n = r > 0 ? "Infinity" : "-Infinity", e.token(n, "number");
  }
  if (typeof r == "bigint")
    return e.token(r + "n", "bigint");
  if (typeof r == "string")
    return F(r, e);
  if (typeof r == "symbol")
    return e.token(r.toString(), "symbol");
  if (typeof r == "function")
    return P(r, e);
  if (E(r))
    return w(r, e);
  if (Array.isArray(r))
    return j(r, e);
  if (r instanceof Date)
    return e.token(r.toISOString(), "date");
  if (r instanceof RegExp)
    return e.token(r.toString(), "regExp");
  if (r instanceof Error)
    return O(r, e);
  if (r instanceof Map)
    return M(r, e);
  if (r instanceof Set)
    return K(r, e);
  if (r instanceof Promise)
    return e.token("Promise { <pending> }", "function");
  if (x(r))
    return I(r, e);
  for (const n of e.plugins)
    if (n.fallback) {
      const i = n.fallback(r, e);
      if (i !== void 0)
        return i;
    }
  return Object.prototype.toString.call(r);
}
function J(r, t, e, n) {
  const i = u(r, n);
  if (typeof i == "string")
    return i;
  const a = i.token(r.name || "(anonymous)", "function"), c = t.map((g) => p(g, i.fork())).join(i.separator()), f = p(e, i.fork()), l = i.colors ? o.dim("→") : "→";
  return `${a}(${c}) ${l} ${f}`;
}
function w(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  let n, i = !1;
  if (typeof r.type == "string")
    n = e.token(r.type, "htmlTag");
  else if (r.type === R)
    n = "", i = !0;
  else {
    if (x(r.type) || typeof r.type == "function") {
      let y = r.type.name;
      "displayName" in r.type && r.type.displayName && (y = r.type.displayName), n = String(y);
    } else
      n = String(r.type);
    n = e.token(n, "reactComponent");
  }
  const a = [];
  let c = [];
  if (r.props && x(r.props)) {
    const y = Object.keys(r.props);
    e.sortKeys && y.sort();
    for (const $ of y) {
      const d = r.props[$];
      $ === "children" ? c = (Array.isArray(d) ? d : [d]).map((T) => z(T, e)) : a.push(A($, d, e));
    }
  }
  const f = e.delimiter("<"), l = e.delimiter(">"), g = e.delimiter("/"), h = a.length ? " " + a.join(" ") : "";
  return c.length || i ? `${f}${n}${h}${l}${c.join("")}${f}${g}${n}${l}` : `${f}${n}${h}${g}${l}`;
}
function z(r, t) {
  return r == null || typeof r == "boolean" ? "" : typeof r == "string" ? r : typeof r == "number" ? r.toString() : E(r) ? w(r, t.fork()) : "";
}
function A(r, t, e) {
  return `${e.token(r, "key")}={${p(t, e.fork())}}`;
}
function F(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = r.length > e.maxStringLength, i = n ? r.slice(0, e.maxStringLength) : r;
  let a = JSON.stringify(i);
  e.singleQuotes && (a = a.replace(/\\"/g, '"').replace(/'/g, "\\'"));
  const c = e.token(a.slice(1, -1), "string"), f = e.delimiter(e.singleQuotes ? "'" : '"'), l = f + c + f;
  return n ? l + e.token("...", "null") : l;
}
function P(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = r.name || "(anonymous)";
  return e.token(`[Function: ${n}]`, "function");
}
function j(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = b(r, e, `[Array(${r.length})]`);
  if (n !== null)
    return n;
  const i = [], a = Math.min(r.length, e.maxArrayLength);
  for (let c = 0; c < a; c++)
    i.push(p(r[c], e.fork()));
  if (r.length > e.maxArrayLength) {
    const c = r.length - e.maxArrayLength;
    i.push(e.token(`... ${c} more item${c !== 1 ? "s" : ""}`, "null"));
  }
  return k(i, e, "[", "]");
}
function I(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = b(r, e, "[Object]");
  if (n !== null)
    return n;
  let i = Object.keys(r);
  if (e.sortKeys && (i = i.sort()), !i.length)
    return e.delimiter("{}");
  const a = i.map((l) => {
    const g = e.token(l, "key"), h = p(r[l], e.fork());
    return `${g}${e.delimiter(":")} ${h}`;
  }), c = e.delimiter("{") + " ", f = " " + e.delimiter("}");
  return k(a, e, c, f);
}
function M(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = b(r, e, `Map(${r.size})`);
  if (n !== null)
    return n;
  if (r.size === 0)
    return "Map(0) {}";
  const i = [];
  for (const [a, c] of r) {
    const f = e.fork();
    i.push(`${p(a, f)} => ${p(c, f)}`);
  }
  return k(i, e, `Map(${r.size}) { `, " }");
}
function K(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = b(r, e, `Set(${r.size})`);
  if (n !== null)
    return n;
  if (r.size === 0)
    return "Set(0) {}";
  const i = [];
  for (const a of r)
    i.push(p(a, e.fork()));
  return k(i, e, `Set(${r.size}) { `, " }");
}
function O(r, t) {
  const e = u(r, t);
  if (typeof e == "string")
    return e;
  const n = r.name || "Error";
  return e.token(r.message ? `${n}: ${r.message}` : n, "error");
}
function b(r, t, e) {
  return t.seen.has(r) ? t.token("[Circular]", "null") : t.currentDepth > t.depth ? t.token(e, "null") : (t.seen.add(r), null);
}
function k(r, t, e, n) {
  const i = `${e}${r.join(t.separator())}${n}`;
  if (!t.compact && o.strip(i).length > t.breakLength) {
    const a = "	".repeat(t.currentDepth + 1), c = "	".repeat(t.currentDepth), f = e.replace(/\s+$/, ""), l = r.map((h) => `${a}${h}`).join(`,
`), g = n.replace(/^\s+/, "");
    return `${f}
${l}
${c}${g}`;
  }
  return i;
}
function u(r, t) {
  let e;
  if (t && H(t))
    e = t;
  else {
    e = {
      // TODO: Fix mergeDeep so plugins and colors don't have to be duplicated here
      ...t ? N(m, { plugins: m.plugins, colors: m.colors, ...t }) : m,
      [B]: !0,
      currentDepth: 0,
      seen: /* @__PURE__ */ new WeakSet(),
      color: (n, i) => e.colors && i ? o.apply(n, i) : n,
      token: (n, i) => i !== void 0 && e.colors ? e.color(n, e.colors[i]) : n,
      delimiter: (n) => e.token(n, "delimiter"),
      separator: () => e.spaceAfterComma ? e.delimiter(",") + " " : e.delimiter(","),
      fork: () => S(e)
    };
    for (const n of e.plugins)
      n.config && n.config(e);
  }
  for (const n of e.plugins)
    if (n.first) {
      const i = n.first(r, e);
      if (i !== void 0)
        return i;
    }
  return e;
}
function S(r) {
  const t = { ...r, currentDepth: r.currentDepth + 1 };
  return t.fork = () => S(t), t;
}
function H(r) {
  return B in r;
}
function E(r) {
  return x(r) && "$$typeof" in r && r.$$typeof === D;
}
var Q = /* @__PURE__ */ ((r) => (r[r.Debug = 0] = "Debug", r[r.Info = 1] = "Info", r[r.Success = 2] = "Success", r[r.Warning = 3] = "Warning", r[r.Error = 4] = "Error", r))(Q || {});
class C {
  /**
   * The minimum log level or an array of log levels to enable.
   * 
   * `undefined` enables all log levels. An array enables all log levels in that array. A single level enables that log level and the ones above.
   * @default LogLevel.Debug
   */
  level;
  /**
   * The current level of indentation.
   * @default 0
   */
  indent = 0;
  /**
   * The string to use for indentation.
   * @default "\t"
   */
  indentString;
  /**
   * The function to use when highlighting text.
   * @default Ansi.cyan
   * @see {@link Ansi.cyan}
   */
  highlight = o.cyan;
  /**
   * The function to use when emphasizing text.
   * @default Ansi.bold
   * @see {@link Ansi.bold}
   */
  emphasize = o.bold;
  /**
  	 * The prefixes to prepend to logs.
  	 * @default {
  	[LogLevel.Info]: Ansi.cyan("[info]"),
  	[LogLevel.Success]: Ansi.green("[success]"),
  	[LogLevel.Warning]: Ansi.yellow("[warning]"),
  	[LogLevel.Error]: Ansi.red("[error]"),
  }
  	 */
  prefix = {};
  /**
   * The function to use to turn values into strings.
   * @see {@link createStringifier}
   * @default Logger.createStringifier("pretty")
   */
  stringify = C.createStringifier("pretty");
  #t = 0;
  #e = 0;
  get errorCount() {
    return this.#t;
  }
  set errorCount(t) {
    this.#t = t;
  }
  get warningCount() {
    return this.#e;
  }
  set warningCount(t) {
    this.#e = t;
  }
  constructor(t) {
    this.reset(), t !== void 0 && (Array.isArray(t) || typeof t == "number" ? this.level = t : (t.level !== void 0 && (this.level = t.level), t.prefix && (typeof t.prefix == "string" ? this.prefix.global = t.prefix : this.prefix = {
      ...this.prefix,
      ...t.prefix
    })));
  }
  // ===== Modifying state =====
  /**
   * Resets all properties to their default values.
   */
  reset() {
    return this.level = 0, this.indent = 0, this.indentString = "	", this.highlight = o.cyan, this.emphasize = o.bold, this.prefix = {
      1: o.cyan("[info]"),
      2: o.green("[success]"),
      3: o.yellow("[warning]"),
      4: o.red("[error]")
    }, this.#t = 0, this.#e = 0, this;
  }
  indented(t, e = 1, n) {
    return n !== void 0 && !this.isLevelEnabled(n) ? this : (this.indent + e < 0 && (e = -this.indent), this.tab(e), typeof t == "function" ? t() : Array.isArray(t) ? this.lines(t, n) : this.log(t, n), this.shiftTab(e), this);
  }
  /**
   * Increases the level of indentation.
   * @param amount - The amount to increase the level of indentation with.
   */
  tab(t = 1) {
    return this.indent += t, this.indent < 0 && (this.indent = 0), this;
  }
  /**
   * Decreases the level of indentation.
   * @param amount - The amount to decrease the level of indentation with.
   */
  shiftTab(t = 1) {
    return this.indent -= t, this.indent < 0 && (this.indent = 0), this;
  }
  setPrefix(t, e) {
    return typeof t == "string" ? this.prefix = {
      global: t
    } : typeof t == "object" ? this.prefix = t : this.prefix[t] = e, this;
  }
  // ===== Logging status messages =====
  /**
   * Logs an info message about a URL being fetched.
   * @param url - The URL being fetched.
   */
  fetching(t) {
    return this.pending(`Fetching: ${this.highlight(t)}`);
  }
  /**
   * Logs an info message that implies a pending state.
   * @param message - The status message.
   */
  pending(t) {
    return this.info(o.yellow(t));
  }
  /**
   * Logs an error message.
   * @param message - The error message or reason.
   * @param details - The details of the error message.
   */
  error(t, ...e) {
    return this.#t++, this.isLevelEnabled(
      4
      /* Error */
    ) ? (typeof t == "string" ? this.statusMessage(
      o.red(t),
      e,
      4
      /* Error */
    ) : console.error(t, ...e), this) : this;
  }
  /**
   * Logs a warning message.
   * @param message - The warning message.
   * @param details - The details of the warning message.
   */
  warn(t, ...e) {
    return this.#e++, this.statusMessage(
      o.yellow(t),
      e,
      3
      /* Warning */
    );
  }
  /**
   * Logs a success message.
   * @param message - The success message.
   * @param details - The details of the success message.
   */
  success(t, ...e) {
    return this.statusMessage(
      o.green(t),
      e,
      2
      /* Success */
    );
  }
  /**
   * Logs an info message.
   * @param message - The info message.
   * @param details - The details of the info message.
   */
  info(t, ...e) {
    return this.statusMessage(
      t,
      e,
      1
      /* Info */
    );
  }
  /**
   * Logs a status message.
   * @param message - The status message.
   * @param details - The details of the status message.
   * @param level - The log level.
   */
  statusMessage(t, e, n) {
    let i = t;
    if (e.length) {
      const a = this.indentString ? this.indentString.repeat(this.indent + 1) : "	";
      i += `
` + e.map((c) => a + this.stringify(c)).join(`
`);
    }
    return this.text(i, n);
  }
  /**
   * Logs the amount of errors and warnings that have been logged since the previous call to this function or the creation of this logger.
   */
  summary() {
    const t = `${this.#t} error${this.#t != 1 ? "s" : ""}`, e = `${this.#e} warning${this.#e != 1 ? "s" : ""}`;
    let n = `Found ${t} and ${e}`;
    return this.#t > 0 ? n = o.red(n) : this.#e > 0 ? n = o.yellow(n) : n = o.green(n), this.text(n), this.#t = 0, this.#e = 0, this;
  }
  // ===== Logging text =====
  /**
   * Logs a labeled parameter.
   * 
   * The value is emphasized using {@link emphasize}.
   * @param label - The label of the parameter.
   * @param value - The value of the parameter.
   * @param level - The log level.
   */
  parameter(t, e, n) {
    return this.text(`${t}: ${this.emphasize(this.stringify(e))}`, n);
  }
  /**
   * Logs properties as a list of key-value pairs.
   * @param properties - The properties to log.
   * @param level - The log level.
   * @see {@link value()}
   */
  properties(t, e) {
    for (const [n, i] of Object.entries(t))
      this.value(`- ${n}`, i, e);
    return this;
  }
  /**
   * Logs a labeled value.
   * 
   * The value is highlighted using {@link highlight}.
   * @param label - The label of the value.
   * @param value - The value.
   * @param level - The log level.
   */
  value(t, e, n) {
    return this.text(`${t}: ${this.highlight(this.stringify(e))}`, n);
  }
  /**
   * Logs emphasized text.
   * @param text - The text to log.
   * @param level - The log level.
   */
  emphasized(t, e) {
    return this.text(this.emphasize(t), e);
  }
  /**
   * Logs highlighted text.
   * @param text - The text to log.
   * @param level - The log level.
   */
  highlighted(t, e) {
    return this.text(this.highlight(t), e);
  }
  /**
   * Logs each item on a new line.
   * @param lines - The items to log.
   * @param level - The log level.
   */
  lines(t, e) {
    return t.map(this.stringify.bind(this)).forEach((n) => this.text(n, e)), this;
  }
  /**
   * Logs a message.
   * @param message - The message to log.
   * @param level - The log level.
   */
  log(t, e) {
    return this.text(this.stringify(t), e);
  }
  /**
   * Logs text using this logger's format.
   * @param text - The text to log.
   * @param level - The log level.
   */
  text(t, e = 0) {
    if (!this.isLevelEnabled(e))
      return this;
    const n = this.format(this.applyPrefix(t, e));
    switch (e) {
      case 1:
        console.info(n);
        break;
      case 3:
        console.warn(n);
        break;
      case 4:
        console.error(n);
        break;
      default:
        console.log(n);
        break;
    }
    return this;
  }
  /**
   * Logs an newline character.
   */
  newLine() {
    return console.log(`
`), this;
  }
  /**
   * Checks if the given log level is enabled.
   * @param level - The log level to check.
   */
  isLevelEnabled(t) {
    return this.level === void 0 ? !0 : Array.isArray(this.level) ? this.level.includes(t) : this.level <= t;
  }
  // ===== Formatting strings =====
  /**
   * Formats text using this logger's formatting properties.
   * @param text - The text to format.
   */
  format(t) {
    return this.indentString ? this.applyPrefix(this.indentString.repeat(this.indent) + t) : this.applyPrefix(t);
  }
  /**
   * Prepends a prefix to text.
   * @param text - The text to apply the prefix to.
   * @param level - The log level.
   */
  applyPrefix(t, e) {
    const n = e ? this.prefix[e] : this.prefix.global;
    return n ? `${n} ${t}` : t;
  }
  static createStringifier(t = "basic", e) {
    return t === "basic" ? String : (n) => typeof n == "string" ? n : p(n, e);
  }
}
export {
  s as A,
  Q as L,
  o as a,
  C as b,
  j as c,
  O as d,
  P as e,
  J as f,
  M as g,
  I as h,
  p as i,
  w as j,
  K as k,
  F as l
};
//# sourceMappingURL=index-CdCI8E9D.js.map
