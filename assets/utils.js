import { i as k, m as q } from "/assets/object.utils-xiWGUq8N.js";
function d(e, t) {
  const r = t.indexOf(e);
  r !== -1 && t.splice(r, 1);
}
function y(e) {
  return e[b(e)];
}
function b(e) {
  return Math.floor(Math.random() * e.length);
}
function A(e) {
  return e.filter((t, r) => e.indexOf(t) === r);
}
function g(e, t) {
  return t.flatMap((r) => [e, r]).slice(1);
}
function v(e, t, r) {
  return e.map((n) => n === t ? r : n);
}
const p = {
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24,
  w: 1e3 * 60 * 60 * 24 * 7,
  n: 1e3 * 60 * 60 * 24 * 31,
  y: 1e3 * 60 * 60 * 24 * 365,
  c: 1e3 * 60 * 60 * 24 * 365 * 100
};
function M(e, t = 3, r = !1) {
  const n = [], o = (s, i) => {
    if (!r)
      return s.join(", ");
    let u = "", c = "";
    return i ? c = "ago" : u = "in", [u, s.join(", "), c].join(" ").trim();
  };
  let f = !1;
  if (e < 0 && (e = -e, f = !0), Math.abs(e) < p.s)
    return o(["less than a second"], f);
  const a = [], l = {
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    n: "month",
    y: "year"
  };
  for (const [s, i] of Object.entries(p).reverse()) {
    if (s === "w" || s === "c")
      continue;
    const u = Math.floor(e / i);
    e -= u * i, u > 0 && a.push({ amount: u, label: u != 1 ? l[s] + "s" : l[s] });
  }
  for (let s = 0; s < t; s++)
    if (s < a.length) {
      const i = a[s];
      n.push(`${i.amount} ${i.label}`);
    }
  return n.length === 0 ? o(["less than a second"], f) : o(n, f);
}
function x(e, t = 3, r = !1) {
  const n = e.valueOf() - Date.now();
  return M(n, t, r);
}
class C {
  #e = {};
  /**
   * Starts listening to an event.
   * @param event - The event to listen to.
   * @param listener - The function to call when the event is emitted.
   * @returns The listener.
   */
  on(t, r) {
    return this.#e[t] === void 0 ? this.#e[t] = [r] : this.#e[t].push(r), r;
  }
  /**
   * Registers an event listener that is automatically removed when called.
   * @param event - The event to listen to.
   * @param listener - The function to call once the event is emitted.
   * @returns The wrapped listener.
   */
  once(t, r) {
    const n = (...o) => (this.off(t, n), r(...o));
    return this.on(t, n);
  }
  /**
   * Removes an event listener.
   * @param event - The event to remove the listener from.
   * @param listener - The listener to remove.
   */
  off(t, r) {
    const n = this.#e[t];
    n !== void 0 && d(r, n);
  }
  /**
   * Emits an event to all its listeners.
   * @param event - The event to emit.
   * @param args - The arguments to pass to the listeners.
   */
  emit(t, ...r) {
    const n = this.#e[t];
    if (n !== void 0)
      for (const o of n)
        o(...r);
  }
  /**
   * Emits an event and waits for all listeners to resolve.
   * @param event - The event to emit.
   * @param args - The arguments to pass to the listeners.
   */
  async emitAsync(t, ...r) {
    const n = this.#e[t];
    if (n === void 0)
      return;
    const o = n.map((f) => f(...r));
    await Promise.all(o);
  }
}
function I(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
function N(e, t) {
  return Math.random() * (t - e) + e;
}
function U(e, t) {
  return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e)) + e;
}
function $(e, t = 0) {
  const r = Math.pow(10, t);
  return Math.round(e * r) / r;
}
function O(e) {
  return typeof e == "number" ? !0 : e.trim() === "" ? !1 : Number.isInteger(Number(e));
}
function j(e) {
  return typeof e == "number" ? !0 : e.trim() === "" ? !1 : !isNaN(Number(e));
}
function T(e, t = 0) {
  return e !== void 0 && O(e) ? Number(e) : t;
}
function z(e, t = 0) {
  return e !== void 0 && j(e) ? parseFloat(e) : t;
}
function F(e) {
  return e.trim().toLowerCase() === "true";
}
function R(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function D(e) {
  if (!e.length) return "";
  let t = e[0];
  for (let r = 1; r < e.length; r++)
    for (; e[r].indexOf(t) !== 0; )
      if (t = t.substring(0, t.length - 1), t === "") return "";
  return t;
}
function m(e, t) {
  return t < 0 || t >= e.length ? [e, ""] : [e.slice(0, t), e.slice(t + 1)];
}
function L(e, t, r = {}) {
  const { join: n = !0 } = r, o = {}, f = Object.keys(t);
  function a(i) {
    return i in o || (o[i] = `{${i}}`, o[i] = l([t[i]]).join("")), o[i];
  }
  function l(i) {
    for (const u of f) {
      const c = `{${u}}`;
      i.some((h) => h.includes(c)) && (i = v(
        i.flatMap((h) => w(h, c)),
        c,
        a(u)
      ));
    }
    return i;
  }
  const s = l([e]);
  return typeof n == "string" ? s.join(n) : n ? s.join("") : s;
}
function w(e, t) {
  return e === "" ? [""] : g(t, e.split(t)).filter((r) => r.length);
}
function P(e) {
  return e.length <= 1 ? e.toUpperCase() : e.charAt(0).toUpperCase() + e.slice(1);
}
function S(e) {
  return e.replace(/^https?:\/\/|\/$/g, "");
}
function E(e) {
  return e.replace(/^https?:\/\/[a-z]+(\.[0-9a-z-]+)+/g, "");
}
function _(e) {
  try {
    return new URL(e), !0;
  } catch {
    return !1;
  }
}
function B(...e) {
  let t = "";
  const r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const [o, f] = m(n, n.indexOf("?"));
    if (o.length && (t.length ? t.endsWith("/") ? t += o.replace(/^\//, "") : (o.startsWith("/") || (t += "/"), t += o) : t += o), f.length)
      for (const a of f.split(/[?&]/)) {
        const [l, s] = m(a, a.indexOf("="));
        r.set(l, s);
      }
  }
  return r.size && (t += "?" + r.entries().map(([n, o]) => `${n}=${o}`).toArray().join("&")), t;
}
export {
  C as EventEmitter,
  P as capitalize,
  I as clamp,
  L as fillTemplate,
  x as formatRelativeTime,
  M as formatTime,
  D as getLongestCommonPrefix,
  g as interleave,
  k as isObject,
  O as isValidInteger,
  j as isValidNumber,
  _ as isValidUrl,
  w as isolateSubstring,
  R as kebabToCamelCase,
  q as mergeDeep,
  F as parseBool,
  z as parseOptionalFloat,
  T as parseOptionalInteger,
  y as randomFromArray,
  b as randomIndex,
  U as randomInt,
  N as randomRange,
  E as removeBaseUrl,
  A as removeDuplicatesFromArray,
  d as removeFromArray,
  S as removeUrlProtocol,
  v as replaceAll,
  B as resolveUrl,
  $ as round,
  m as splitAt
};
//# sourceMappingURL=utils.js.map
