import { randomRange as p, Vector2 as l, removeFromArray as d, randomFromArray as g, ANSI as m } from "@prozilla-os/shared";
import { Command as h, Shell as y } from "/assets/prozilla_os_core.js";
const w = 1.25, A = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.*\\/()#@&$!?%°:<>[]", c = {
  spawnRate: 30,
  fallSpeed: 1,
  minSize: 5,
  maxSize: 25
};
function S(a) {
  const o = [];
  for (let r = 0; r < a.y; r++) {
    const e = [];
    for (let i = 0; i < a.x; i++)
      e.push(" ");
    o.push(e);
  }
  return o;
}
function E(a, o, r, e) {
  const i = Math.round(5e3 / (c.spawnRate * e.x));
  if (i === 0 || a % i === 0) {
    const n = {
      position: new l(p(0, e.x - 1), e.y).round(),
      size: Math.round(p(c.minSize, c.maxSize))
    };
    r.push(n);
  }
  return r.forEach((n) => {
    n.position.y -= c.fallSpeed;
    for (let t = 0; t < c.fallSpeed; t++) {
      const f = n.position.x, s = n.position.y + t + n.size;
      s < e.y && s >= 0 && (o[s][f] = " ");
    }
    if (n.position.y + n.size <= 0 || n.position.x >= e.x)
      return d(n, r);
    for (let t = 0; t < n.size; t++) {
      const f = g(A.split(""));
      let s = t == 0 ? m.fg.white : m.fg.green;
      t > n.size / 2 && (s = m.fg.green + m.decoration.dim);
      const x = n.position.x, u = n.position.y + t;
      x < e.x && u < e.y && u >= 0 && (o[u][x] = s + f + m.reset);
    }
  }), [...o.map((n) => n.join(""))].reverse().join(`
`);
}
const C = new h().setManual({
  purpose: "Show a scrolling 'Matrix' like screen",
  usage: "cmatrix"
}).setExecute(function(a, { size: o, stdin: r, stdout: e }) {
  const i = [];
  let n = S(o);
  const t = 100 / w;
  return y.animate({
    stdin: r,
    stdout: e,
    delay: t,
    render: (f) => ((n.length !== o.y || (n.length !== 0 ? n[0].length : 0) !== o.x) && (n = S(o)), E(f, n, i, o))
  });
});
export {
  C as cmatrix
};
//# sourceMappingURL=cmatrix-DvaWzvRn.js.map
