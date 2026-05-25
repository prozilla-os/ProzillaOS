import { parseOptionalInteger as p, parseOptionalFloat as j, ANSI as c } from "@prozilla-os/shared";
import { Command as G, Shell as P } from "/assets/prozilla_os_core.js";
const m = " .:-=+*#%@".split(""), M = 256 * 5, X = 60, Y = 25, k = 8, u = 12, S = 1, g = 6, O = 2, H = 60 / 50, L = 1 / 1.5, N = 1200, R = 5, x = 255, K = new G().setManual({
  purpose: "Display burning ASCII art flames",
  usage: "afire [-s <speed>] [-i <float>] [-c <int>] [-d <int>] [-h <int>]",
  options: {
    "-s speed": `Speed of the animation (Defaults to ${H})`,
    "-i float": `Color intensity modifier (defaults to ${L})`,
    "-c int": `Height cooling factor (defaults to ${N})`,
    "-d int": `Heat dissipation rate (defaults to ${R})`,
    "-h int": `Maximum heat source (defaults to ${x})`
  }
}).addOption({ short: "s", long: "speed", isInput: !0 }).addOption({ short: "i", long: "intensity", isInput: !0 }).addOption({ short: "c", long: "cooling", isInput: !0 }).addOption({ short: "d", long: "dissipation", isInput: !0 }).addOption({ short: "h", long: "heat", isInput: !0 }).setExecute(function(v, { size: l, stdin: y, stdout: D, inputs: d }) {
  const F = 60 / p(d.s, H), E = 1 / j(d.i, L), C = p(d.c, N), w = p(d.d, R), U = p(d.h, x), b = E * X, $ = E * Y, V = E * k;
  let t = l.x, i = l.y, T = i + 4, n = new Uint8Array(t * T);
  const I = new Uint32Array(M), _ = () => {
    const o = Math.max(1, Math.floor(C / i));
    for (let e = 0; e < M; e++)
      e > o ? I[e] = Math.floor((e - o) / w) : I[e] = 0;
  }, W = () => {
    for (let o = 0; o < t * i; o++) {
      const e = I[(n[o + t - 1] || 0) + (n[o + t + 1] || 0) + (n[o + t] || 0) + (n[o + 2 * t - 1] || 0) + (n[o + 2 * t + 1] || 0)] || 0;
      n[o] = e > S ? e - S : 0;
    }
  }, B = () => {
    let o = 1, e = u * t + 1;
    const h = t * i;
    for (let a = 0; a < t; a++, o += u, e -= u) {
      let s = Math.floor(Math.random() * Math.min(o, e, U)), f = Math.floor(Math.random() * g);
      for (; a < t && f !== 0; ) {
        const A = h + a;
        n[A] = s, s += Math.floor(Math.random() * g) - O, A + t < n.length && (n[A + t] = s), s += Math.floor(Math.random() * g) - O, f--, f !== 0 && (a++, o += u, e -= u);
      }
      const r = h + a;
      r + 2 * t < n.length && (n[r + 2 * t] = s), s += Math.floor(Math.random() * g) - O;
    }
    W();
  };
  return _(), P.animate({
    stdin: y,
    stdout: D,
    delay: F,
    useAltBuffer: !0,
    render: () => {
      (t !== l.x || i !== l.y) && (t = l.x, i = l.y, T = i + 4, n = new Uint8Array(t * T), _()), B();
      const o = [];
      for (let e = 0; e < i; e++) {
        for (let h = 0; h < t; h++) {
          const a = n[e * t + h] || 0;
          if (a === 0)
            o.push(" ");
          else {
            const s = Math.floor(a / 63 * m.length), f = m[Math.min(s, m.length - 1)] || " ";
            let r = c.fg.red + c.decoration.dim;
            a > b ? r = c.fg.white : a > $ ? r = c.fg.yellow : a > V && (r = c.fg.red), o.push(r + f + c.reset);
          }
        }
        e < i - 1 && o.push(`
`);
      }
      return o.join("");
    }
  });
});
export {
  K as afire
};
//# sourceMappingURL=afire-DlRwSfiJ.js.map
