const o = {
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
    position: (e, t) => `\x1B[${e};${t}H`,
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
function E(e, t) {
  const r = t.indexOf(e);
  r !== -1 && t.splice(r, 1);
}
function Y(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function Z(e) {
  return e.filter((t, r) => e.indexOf(t) === r);
}
const w = {
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24,
  w: 1e3 * 60 * 60 * 24 * 7,
  n: 1e3 * 60 * 60 * 24 * 31,
  y: 1e3 * 60 * 60 * 24 * 365,
  c: 1e3 * 60 * 60 * 24 * 365 * 100
};
function S(e, t = 3, r = !1) {
  const n = [], u = (l, g) => {
    if (!r)
      return l.join(", ");
    let m = "", b = "";
    return g ? b = "ago" : m = "in", [m, l.join(", "), b].join(" ").trim();
  };
  let h = !1;
  if (e < 0 && (e = -e, h = !0), Math.abs(e) < w.s)
    return u(["less than a second"], h);
  const p = [], y = {
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    n: "month",
    y: "year"
  };
  for (const [l, g] of Object.entries(w).reverse()) {
    if (l === "w" || l === "c")
      continue;
    const m = Math.floor(e / g);
    e -= m * g, m > 0 && p.push({ amount: m, label: m != 1 ? y[l] + "s" : y[l] });
  }
  for (let l = 0; l < t; l++)
    if (l < p.length) {
      const g = p[l];
      n.push(`${g.amount} ${g.label}`);
    }
  return n.length === 0 ? u(["less than a second"], h) : u(n, h);
}
function J(e, t = 3, r = !1) {
  const n = e.valueOf() - Date.now();
  return S(n, t, r);
}
class K {
  #t = {};
  /**
   * Starts listening to an event.
   * @param event - The event to listen to.
   * @param listener - The function to call when the event is emitted.
   * @returns The listener.
   */
  on(t, r) {
    return this.#t[t] === void 0 ? this.#t[t] = [r] : this.#t[t].push(r), r;
  }
  /**
   * Registers an event listener that is automatically removed when called.
   * @param event - The event to listen to.
   * @param listener - The function to call once the event is emitted.
   * @returns The wrapped listener.
   */
  once(t, r) {
    const n = (...u) => (this.off(t, n), r(...u));
    return this.on(t, n);
  }
  /**
   * Removes an event listener.
   * @param event - The event to remove the listener from.
   * @param listener - The listener to remove.
   */
  off(t, r) {
    const n = this.#t[t];
    n !== void 0 && E(r, n);
  }
  /**
   * Emits an event to all its listeners.
   * @param event - The event to emit.
   * @param args - The arguments to pass to the listeners.
   */
  emit(t, ...r) {
    const n = this.#t[t];
    if (n !== void 0)
      for (const u of n)
        u(...r);
  }
  /**
   * Emits an event and waits for all listeners to resolve.
   * @param event - The event to emit.
   * @param args - The arguments to pass to the listeners.
   */
  async emitAsync(t, ...r) {
    const n = this.#t[t];
    if (n === void 0)
      return;
    const u = n.map((h) => h(...r));
    await Promise.all(u);
  }
}
function G(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
function Q(e, t) {
  return Math.random() * (t - e) + e;
}
function R(e, t) {
  const r = Math.pow(10, t ?? 0);
  return Math.round(e * r) / r;
}
function O(e) {
  return typeof e == "number" ? !0 : e.trim() === "" ? !1 : Number.isInteger(Number(e));
}
function M(e) {
  return typeof e == "number" ? !0 : e.trim() === "" ? !1 : !isNaN(Number(e));
}
function A(e, t = 0) {
  return e !== void 0 && O(e) ? Number(e) : t;
}
function L(e, t = 0) {
  return e !== void 0 && M(e) ? parseFloat(e) : t;
}
function _(e) {
  return e.trim().toLowerCase() === "true";
}
function tt(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function rt(e) {
  if (!e.length) return "";
  let t = e[0];
  for (let r = 1; r < e.length; r++)
    for (; e[r].indexOf(t) !== 0; )
      if (t = t.substring(0, t.length - 1), t === "") return "";
  return t;
}
class s {
  /**
   * Makes text black using {@link ANSI.fg.black}.
   */
  static black(t) {
    return s.#t(t, o.fg.black);
  }
  /**
   * Makes text red using {@link ANSI.fg.red}.
   */
  static red(t) {
    return s.#t(t, o.fg.red);
  }
  /**
   * Makes text green using {@link ANSI.fg.green}.
   */
  static green(t) {
    return s.#t(t, o.fg.green);
  }
  /**
   * Makes text yellow using {@link ANSI.fg.yellow}.
   */
  static yellow(t) {
    return s.#t(t, o.fg.yellow);
  }
  /**
   * Makes text blue using {@link ANSI.fg.blue}.
   */
  static blue(t) {
    return s.#t(t, o.fg.blue);
  }
  /**
   * Makes text magenta using {@link ANSI.fg.magenta}.
   */
  static magenta(t) {
    return s.#t(t, o.fg.magenta);
  }
  /**
   * Makes text cyan using {@link ANSI.fg.cyan}.
   */
  static cyan(t) {
    return s.#t(t, o.fg.cyan);
  }
  /**
   * Makes text white using {@link ANSI.fg.white}.
   */
  static white(t) {
    return s.#t(t, o.fg.white);
  }
  /**
   * Sets background to black using {@link ANSI.bg.black}.
   */
  static blackBackground(t) {
    return s.#t(t, o.bg.black);
  }
  /**
   * Sets background to red using {@link ANSI.bg.red}.
   */
  static redBackground(t) {
    return s.#t(t, o.bg.red);
  }
  /**
   * Sets background to green using {@link ANSI.bg.green}.
   */
  static greenBackground(t) {
    return s.#t(t, o.bg.green);
  }
  /**
   * Sets background to yellow using {@link ANSI.bg.yellow}.
   */
  static yellowBackground(t) {
    return s.#t(t, o.bg.yellow);
  }
  /**
   * Sets background to blue using {@link ANSI.bg.blue}.
   */
  static blueBackground(t) {
    return s.#t(t, o.bg.blue);
  }
  /**
   * Sets background to magenta using {@link ANSI.bg.magenta}.
   */
  static magentaBackground(t) {
    return s.#t(t, o.bg.magenta);
  }
  /**
   * Sets background to cyan using {@link ANSI.bg.cyan}.
   */
  static cyanBackground(t) {
    return s.#t(t, o.bg.cyan);
  }
  /**
   * Sets background to white using {@link ANSI.bg.white}.
   */
  static whiteBackground(t) {
    return s.#t(t, o.bg.white);
  }
  /**
   * Makes text bold using {@link ANSI.decoration.bold}.
   */
  static bold(t) {
    return s.#t(t, o.decoration.bold);
  }
  /**
   * Makes text dim using {@link ANSI.decoration.dim}.
   */
  static dim(t) {
    return s.#t(t, o.decoration.dim);
  }
  /**
   * Makes text italic using {@link ANSI.decoration.italic}.
   */
  static italic(t) {
    return s.#t(t, o.decoration.italic);
  }
  /**
   * Underlines text using {@link ANSI.decoration.underline}.
   */
  static underline(t) {
    return s.#t(t, o.decoration.underline);
  }
  /**
   * Inverts foreground and background colors using {@link ANSI.decoration.invert}.
   */
  static invert(t) {
    return s.#t(t, o.decoration.invert);
  }
  /**
   * Makes text strike through using {@link ANSI.decoration.strike}.
   */
  static strike(t) {
    return s.#t(t, o.decoration.strike);
  }
  static #t(t, r) {
    return t = t.replaceAll(o.reset, o.reset + r), r + t + o.reset;
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
var N = /* @__PURE__ */ ((e) => (e[e.Debug = 0] = "Debug", e[e.Info = 1] = "Info", e[e.Success = 2] = "Success", e[e.Warning = 3] = "Warning", e[e.Error = 4] = "Error", e))(N || {});
class et {
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
  highlight = s.cyan;
  /**
   * The function to use when emphasizing text.
   * @default Ansi.bold
   * @see {@link Ansi.bold}
   */
  emphasize = s.bold;
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
  #t = 0;
  #r = 0;
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
    return this.level = 0, this.indent = 0, this.indentString = "	", this.highlight = s.cyan, this.emphasize = s.bold, this.prefix = {
      1: s.cyan("[info]"),
      2: s.green("[success]"),
      3: s.yellow("[warning]"),
      4: s.red("[error]")
    }, this.#t = 0, this.#r = 0, this;
  }
  indented(t, r = 1, n) {
    return n !== void 0 && !this.isLevelEnabled(n) ? this : (this.indent + r < 0 && (r = -this.indent), this.tab(r), typeof t == "function" ? t() : Array.isArray(t) ? this.lines(t, n) : this.log(t, n), this.shiftTab(r), this);
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
  setPrefix(t, r) {
    return typeof t == "string" ? this.prefix = {
      global: t
    } : typeof t == "object" ? this.prefix = t : this.prefix[t] = r, this;
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
    return this.info(s.yellow(t));
  }
  /**
   * Logs an error message.
   * @param message - The error message or reason.
   * @param details - The details of the error message.
   */
  error(t, ...r) {
    return this.#t++, this.isLevelEnabled(
      4
      /* Error */
    ) ? (typeof t == "string" ? this.statusMessage(
      s.red(t),
      r,
      4
      /* Error */
    ) : console.error(t, ...r), this) : this;
  }
  /**
   * Logs a warning message.
   * @param message - The warning message.
   * @param details - The details of the warning message.
   */
  warn(t, ...r) {
    return this.#r++, this.statusMessage(
      s.yellow(t),
      r,
      3
      /* Warning */
    );
  }
  /**
   * Logs a success message.
   * @param message - The success message.
   * @param details - The details of the success message.
   */
  success(t, ...r) {
    return this.statusMessage(
      s.green(t),
      r,
      2
      /* Success */
    );
  }
  /**
   * Logs an info message.
   * @param message - The info message.
   * @param details - The details of the info message.
   */
  info(t, ...r) {
    return this.statusMessage(
      t,
      r,
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
  statusMessage(t, r, n) {
    let u = t;
    if (r.length) {
      const h = this.indentString ? this.indentString.repeat(this.indent + 1) : "	";
      u += `
` + r.map((p) => h + String(p)).join(`
`);
    }
    return this.text(u, n);
  }
  /**
   * Logs the amount of errors and warnings that have been logged since the previous call to this function or the creation of this logger.
   */
  summary() {
    const t = `${this.#t} error${this.#t != 1 ? "s" : ""}`, r = `${this.#r} warning${this.#r != 1 ? "s" : ""}`;
    let n = `Found ${t} and ${r}`;
    return this.#t > 0 ? n = s.red(n) : this.#r > 0 ? n = s.yellow(n) : n = s.green(n), this.text(n), this.#t = 0, this.#r = 0, this;
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
  parameter(t, r, n) {
    return this.text(`${t}: ${this.emphasize(String(r))}`, n);
  }
  /**
   * Logs properties as a list of key-value pairs.
   * @param properties - The properties to log.
   * @param level - The log level.
   * @see {@link value()}
   */
  properties(t, r) {
    for (const [n, u] of Object.entries(t))
      this.value(`- ${n}`, u, r);
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
  value(t, r, n) {
    return this.text(`${t}: ${this.highlight(String(r))}`, n);
  }
  /**
   * Logs emphasized text.
   * @param text - The text to log.
   * @param level - The log level.
   */
  emphasized(t, r) {
    return this.text(this.emphasize(t), r);
  }
  /**
   * Logs highlighted text.
   * @param text - The text to log.
   * @param level - The log level.
   */
  highlighted(t, r) {
    return this.text(this.highlight(t), r);
  }
  /**
   * Logs each item on a new line.
   * @param lines - The items to log.
   * @param level - The log level.
   */
  lines(t, r) {
    return t.map(String).forEach((n) => this.text(n, r)), this;
  }
  /**
   * Logs a message.
   * @param message - The message to log.
   * @param level - The log level.
   */
  log(t, r) {
    return this.text(String(t), r);
  }
  /**
   * Logs text using this logger's format.
   * @param text - The text to log.
   * @param level - The log level.
   */
  text(t, r = 0) {
    if (!this.isLevelEnabled(r))
      return this;
    const n = this.format(this.applyPrefix(t, r));
    switch (r) {
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
  applyPrefix(t, r) {
    const n = r ? this.prefix[r] : this.prefix.global;
    return n ? `${n} ${t}` : t;
  }
}
function D(e) {
  return `# ${e}`;
}
function T(e) {
  return `## ${e}`;
}
function z(e) {
  return `### ${e}`;
}
function F(e) {
  return `#### ${e}`;
}
function C(e) {
  return `##### ${e}`;
}
function P(e) {
  return `###### ${e}`;
}
function I(e) {
  return `**${e}**`;
}
function j(e) {
  return `*${e}*`;
}
function q(e) {
  return `\`${e}\``;
}
function U(e) {
  return `\`\`\`${e}\`\`\``;
}
function H(e) {
  return `~~${e}~~`;
}
function V(e, t) {
  return `[${e}](${t})`;
}
function W(e) {
  return `> ${e}`;
}
function X() {
  return "---";
}
const nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bold: I,
  code: q,
  codeBlock: U,
  heading1: D,
  heading2: T,
  heading3: z,
  heading4: F,
  heading5: C,
  heading6: P,
  horizontalRule: X,
  italic: j,
  link: V,
  quote: W,
  strikethrough: H
}, Symbol.toStringTag, { value: "Module" }));
class d {
  x;
  y;
  constructor(t, r) {
    this.x = t, this.y = r ?? t;
  }
  static get ZERO() {
    return new d(0, 0);
  }
  get clone() {
    return new d(this.x, this.y);
  }
  get magnitude() {
    return this.getDistance(this);
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  set(t, r) {
    return this.x = t, this.y = r, this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  normalize() {
    const t = this.magnitude;
    return this.scale(t === 0 ? 0 : 1 / t);
  }
  scale(t) {
    return this.multiply(t);
  }
  getDistanceSquared(t, r) {
    const n = d.parseVector(t, r), u = this.x - n.x, h = this.y - n.y;
    return u * u + h * h;
  }
  getDistance(t, r) {
    const n = d.parseVector(t, r);
    return Math.sqrt(this.getDistanceSquared(n.x, n.y));
  }
  add(t, r) {
    const n = d.parseVector(t, r);
    return this.x += n.x, this.y += n.y, this;
  }
  subtract(t, r) {
    const n = d.parseVector(t, r);
    return this.x -= n.x, this.y -= n.y, this;
  }
  multiply(t, r) {
    const n = d.parseVector(t, r);
    return this.x *= n.x, this.y *= n.y, this;
  }
  divide(t, r) {
    const n = d.parseVector(t, r);
    return this.x /= n.x, this.y /= n.y, this;
  }
  lerp(t, r) {
    return this.x += (t.x - this.x) * r, this.y += (t.y - this.y) * r, this;
  }
  static sum(t, r) {
    return t.clone.add(r);
  }
  static difference(t, r) {
    return t.clone.subtract(r);
  }
  static product(t, r) {
    return t.clone.multiply(r);
  }
  static division(t, r) {
    return t.clone.divide(r);
  }
  static scale(t, r) {
    return t.clone.scale(r);
  }
  static normalize(t) {
    return t.clone.normalize();
  }
  static lerp(t, r, n) {
    return t.clone.lerp(r, n);
  }
  static from({ x: t, y: r }) {
    return new d(t, r);
  }
  static parseVector(t, r) {
    return t instanceof d ? (r = t.y, t = t.x) : r === void 0 && (r = t), { x: t, y: r };
  }
}
class k {
  /**
   * Returns `true` if this result is a {@link Result.Success}.
   */
  isOk() {
    return !1;
  }
  /**
   * Returns `true` if this result is a {@link Result.Failure}.
   */
  isError() {
    return !1;
  }
  /**
   * Executes a callback for side effects if this result is a {@link Result.Success}.
   */
  ifOk(t) {
    return this.isOk() && t(this.value), this;
  }
  /**
   * Executes a callback for side effects if this result is a {@link Result.Failure}.
   */
  ifError(t) {
    return this.isError() && t(this.error), this;
  }
}
var v;
((e) => {
  class t extends k {
    constructor(i) {
      super(), this.value = i;
    }
    value;
    isOk() {
      return !0;
    }
    map(i) {
      return n(i(this.value));
    }
    mapError(i) {
      return n(this.value);
    }
    next(i) {
      return i(this.value);
    }
    orElse(i) {
      return this;
    }
    unwrapOr(i) {
      return this.value;
    }
    match(i, c) {
      return i(this.value);
    }
    filter(i, c) {
      return i(this.value) ? n(this.value) : u(c(this.value));
    }
  }
  e.Success = t;
  class r extends k {
    constructor(i) {
      super(), this.error = i;
    }
    error;
    isError() {
      return !0;
    }
    map(i) {
      return u(this.error);
    }
    mapError(i) {
      return u(i(this.error));
    }
    next(i) {
      return u(this.error);
    }
    orElse(i) {
      return i(this.error);
    }
    unwrapOr(i) {
      return i;
    }
    match(i, c) {
      return c(this.error);
    }
    filter(i, c) {
      return u(this.error);
    }
  }
  e.Failure = r;
  function n(a) {
    return new t(a);
  }
  e.ok = n;
  function u(a) {
    return new r(a);
  }
  e.error = u;
  function h(a, i) {
    try {
      return n(a());
    } catch (c) {
      return u(i ? i(c) : c);
    }
  }
  e.wrap = h;
  function p(a, i) {
    return a != null ? n(a) : u(i);
  }
  e.nonNullOr = p;
  function y(a, i) {
    return a != null ? n(a) : i();
  }
  e.nonNullOrElse = y;
  function l(a, i, c) {
    let f = a;
    for (; i(f); ) {
      const x = c(f);
      if (x.isError())
        return x;
      f = x.value;
    }
    return n(f);
  }
  e.repeat = l;
  function g(a, i, c) {
    let f = c;
    for (const x of a) {
      const B = i(f, x);
      if (B.isError())
        return B;
      f = B.value;
    }
    return n(f);
  }
  e.reduce = g;
  function m(a) {
    const i = [];
    for (const c of a) {
      if (c.isError())
        return u(c.error);
      i.push(c.value);
    }
    return n(i);
  }
  e.all = m;
  function b(a, i, c) {
    for (const f of a) {
      const x = i(f);
      if (x.isOk())
        return x;
    }
    return c;
  }
  e.any = b;
  function $(a, i, c, f) {
    return i(a) ? n(c(a)) : u(f(a));
  }
  e.require = $;
})(v || (v = {}));
export {
  o as ANSI,
  s as Ansi,
  k as BaseResult,
  K as EventEmitter,
  N as LogLevel,
  et as Logger,
  nt as Markdown,
  v as Result,
  d as Vector2,
  G as clamp,
  J as formatRelativeTime,
  S as formatTime,
  rt as getLongestCommonPrefix,
  O as isValidInteger,
  M as isValidNumber,
  tt as kebabToCamelCase,
  _ as parseBool,
  L as parseOptionalFloat,
  A as parseOptionalInteger,
  Y as randomFromArray,
  Q as randomRange,
  Z as removeDuplicatesFromArray,
  E as removeFromArray,
  R as round
};
//# sourceMappingURL=main.js.map
