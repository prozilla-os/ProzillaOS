import { A as _, a as j, L as P, b as V, i as X, c as Y, d as Z, e as G, f as H, g as J, h as K, j as Q, k as W, l as R } from "/assets/index-CdCI8E9D.js";
import { EventEmitter as tr, capitalize as er, clamp as nr, fillTemplate as ir, formatRelativeTime as sr, formatTime as or, getLongestCommonPrefix as ar, interleave as ur, isValidInteger as cr, isValidNumber as lr, isValidUrl as hr, isolateSubstring as fr, kebabToCamelCase as pr, parseBool as dr, parseOptionalFloat as mr, parseOptionalInteger as gr, randomFromArray as yr, randomIndex as vr, randomInt as xr, randomRange as Er, removeBaseUrl as kr, removeDuplicatesFromArray as Or, removeFromArray as $r, removeUrlProtocol as br, replaceAll as wr, resolveUrl as Sr, round as Ar, splitAt as Fr } from "/assets/utils.js";
import { i as qr, m as Dr } from "/assets/object.utils-xiWGUq8N.js";
const I = "https://os.prozilla.dev/";
function O(n) {
  return `# ${n}`;
}
function $(n) {
  return `## ${n}`;
}
function b(n) {
  return `### ${n}`;
}
function w(n) {
  return `#### ${n}`;
}
function S(n) {
  return `##### ${n}`;
}
function A(n) {
  return `###### ${n}`;
}
function F(n) {
  return `**${n}**`;
}
function z(n) {
  return `*${n}*`;
}
function q(n) {
  return `\`${n}\``;
}
function D(n) {
  return `\`\`\`${n}\`\`\``;
}
function L(n) {
  return `~~${n}~~`;
}
function M(n, r) {
  return `[${n}](${r})`;
}
function N(n) {
  return `> ${n}`;
}
function B() {
  return "---";
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bold: F,
  code: q,
  codeBlock: D,
  heading1: O,
  heading2: $,
  heading3: b,
  heading4: w,
  heading5: S,
  heading6: A,
  horizontalRule: B,
  italic: z,
  link: M,
  quote: N,
  strikethrough: L
}, Symbol.toStringTag, { value: "Module" }));
class c {
  x;
  y;
  constructor(r, e) {
    this.x = r, this.y = e ?? r;
  }
  static get ZERO() {
    return new c(0, 0);
  }
  get clone() {
    return new c(this.x, this.y);
  }
  get magnitude() {
    return this.getDistance(this);
  }
  setX(r) {
    return this.x = r, this;
  }
  setY(r) {
    return this.y = r, this;
  }
  set(r, e) {
    return this.x = r, this.y = e, this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  normalize() {
    const r = this.magnitude;
    return this.scale(r === 0 ? 0 : 1 / r);
  }
  scale(r) {
    return this.multiply(r);
  }
  getDistanceSquared(r, e) {
    const i = c.parseVector(r, e), a = this.x - i.x, h = this.y - i.y;
    return a * a + h * h;
  }
  getDistance(r, e) {
    const i = c.parseVector(r, e);
    return Math.sqrt(this.getDistanceSquared(i.x, i.y));
  }
  add(r, e) {
    const i = c.parseVector(r, e);
    return this.x += i.x, this.y += i.y, this;
  }
  subtract(r, e) {
    const i = c.parseVector(r, e);
    return this.x -= i.x, this.y -= i.y, this;
  }
  multiply(r, e) {
    const i = c.parseVector(r, e);
    return this.x *= i.x, this.y *= i.y, this;
  }
  divide(r, e) {
    const i = c.parseVector(r, e);
    return this.x /= i.x, this.y /= i.y, this;
  }
  lerp(r, e) {
    return this.x += (r.x - this.x) * e, this.y += (r.y - this.y) * e, this;
  }
  static sum(r, e) {
    return r.clone.add(e);
  }
  static difference(r, e) {
    return r.clone.subtract(e);
  }
  static product(r, e) {
    return r.clone.multiply(e);
  }
  static division(r, e) {
    return r.clone.divide(e);
  }
  static scale(r, e) {
    return r.clone.scale(e);
  }
  static normalize(r) {
    return r.clone.normalize();
  }
  static lerp(r, e, i) {
    return r.clone.lerp(e, i);
  }
  static from({ x: r, y: e }) {
    return new c(r, e);
  }
  static parseVector(r, e) {
    return r instanceof c ? (e = r.y, r = r.x) : e === void 0 && (e = r), { x: r, y: e };
  }
}
class p {
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
  ifOk(r) {
    return this.isOk() && r(this.value), this;
  }
  /**
   * Executes a callback for side effects if this result is a {@link Result.Failure}.
   */
  ifError(r) {
    return this.isError() && r(this.error), this;
  }
}
var d;
((n) => {
  class r extends p {
    constructor(t) {
      super(), this.value = t;
    }
    value;
    isOk() {
      return !0;
    }
    map(t) {
      return i(t(this.value));
    }
    mapError(t) {
      return i(this.value);
    }
    next(t) {
      return t(this.value);
    }
    orElse(t) {
      return this;
    }
    unwrapOr(t) {
      return this.value;
    }
    match(t, o) {
      return t(this.value);
    }
    filter(t, o) {
      return t(this.value) ? i(this.value) : a(o(this.value));
    }
  }
  n.Success = r;
  class e extends p {
    constructor(t) {
      super(), this.error = t;
    }
    error;
    isError() {
      return !0;
    }
    map(t) {
      return a(this.error);
    }
    mapError(t) {
      return a(t(this.error));
    }
    next(t) {
      return a(this.error);
    }
    orElse(t) {
      return t(this.error);
    }
    unwrapOr(t) {
      return t;
    }
    match(t, o) {
      return o(this.error);
    }
    filter(t, o) {
      return a(this.error);
    }
  }
  n.Failure = e;
  function i(s) {
    return new r(s);
  }
  n.ok = i;
  function a(s) {
    return new e(s);
  }
  n.error = a;
  function h(s, t) {
    try {
      return i(s());
    } catch (o) {
      return a(t ? t(o) : o);
    }
  }
  n.wrap = h;
  function m(s, t) {
    return s != null ? i(s) : a(t);
  }
  n.nonNullOr = m;
  function g(s, t) {
    return s != null ? i(s) : t();
  }
  n.nonNullOrElse = g;
  function y(s, t, o) {
    let u = s;
    for (; t(u); ) {
      const l = o(u);
      if (l.isError())
        return l;
      u = l.value;
    }
    return i(u);
  }
  n.repeat = y;
  function v(s, t, o) {
    let u = o;
    for (const l of s) {
      const f = t(u, l);
      if (f.isError())
        return f;
      u = f.value;
    }
    return i(u);
  }
  n.reduce = v;
  function x(s) {
    const t = [];
    for (const o of s) {
      if (o.isError())
        return a(o.error);
      t.push(o.value);
    }
    return i(t);
  }
  n.all = x;
  function E(s, t, o) {
    for (const u of s) {
      const l = t(u);
      if (l.isOk())
        return l;
    }
    return o;
  }
  n.any = E;
  function k(s, t, o, u) {
    return t(s) ? i(o(s)) : a(u(s));
  }
  n.require = k;
})(d || (d = {}));
export {
  _ as ANSI,
  j as Ansi,
  I as BASE_URL,
  p as BaseResult,
  tr as EventEmitter,
  P as LogLevel,
  V as Logger,
  T as Markdown,
  d as Result,
  c as Vector2,
  er as capitalize,
  nr as clamp,
  ir as fillTemplate,
  sr as formatRelativeTime,
  or as formatTime,
  ar as getLongestCommonPrefix,
  X as inspect,
  Y as inspectArray,
  Z as inspectError,
  G as inspectFunction,
  H as inspectFunctionCall,
  J as inspectMap,
  K as inspectObject,
  Q as inspectReactElement,
  W as inspectSet,
  R as inspectString,
  ur as interleave,
  qr as isObject,
  cr as isValidInteger,
  lr as isValidNumber,
  hr as isValidUrl,
  fr as isolateSubstring,
  pr as kebabToCamelCase,
  Dr as mergeDeep,
  dr as parseBool,
  mr as parseOptionalFloat,
  gr as parseOptionalInteger,
  yr as randomFromArray,
  vr as randomIndex,
  xr as randomInt,
  Er as randomRange,
  kr as removeBaseUrl,
  Or as removeDuplicatesFromArray,
  $r as removeFromArray,
  br as removeUrlProtocol,
  wr as replaceAll,
  Sr as resolveUrl,
  Ar as round,
  Fr as splitAt
};
//# sourceMappingURL=main.js.map
