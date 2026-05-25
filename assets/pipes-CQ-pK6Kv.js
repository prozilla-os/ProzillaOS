import { parseOptionalInteger as x, parseOptionalFloat as w, ANSI as m, Vector2 as p, randomRange as y, randomFromArray as E } from "@prozilla-os/shared";
import { Command as _, Shell as P } from "/assets/prozilla_os_core.js";
const T = 60 / 40, A = 10, D = 20, M = 15e-4, I = [
  new p(1, 0),
  new p(-1, 0),
  new p(0, 1),
  new p(0, -1)
], S = {
  "1,0|1,0": "━",
  "-1,0|-1,0": "━",
  "0,1|0,1": "┃",
  "0,-1|0,-1": "┃",
  "0,1|1,0": "┏",
  "0,1|-1,0": "┓",
  "0,-1|1,0": "┗",
  "0,-1|-1,0": "┛",
  "1,0|0,1": "┛",
  "1,0|0,-1": "┓",
  "-1,0|0,1": "┗",
  "-1,0|0,-1": "┏"
};
function $(i, t, u, g) {
  const s = [m.fg.blue, m.fg.cyan, m.fg.green, m.fg.magenta, m.fg.red, m.fg.yellow], r = new p(y(0, i.x - 1), y(0, i.y - 1)).round(), a = E(I), l = u * 1e3 / t, n = g * 1e3 / t;
  return {
    position: r,
    direction: a,
    color: E(s),
    dead: !1,
    segments: [],
    deathTimer: y(l, n),
    removing: !1
  };
}
function O(i, t, u, g, s, r) {
  const a = /* @__PURE__ */ new Set();
  i.forEach((n) => n.segments.forEach((o) => {
    a.add(`${o.position.x},${o.position.y}`);
  }));
  for (let n = i.length - 1; n >= 0; n--) {
    const o = i[n];
    if (o.dead)
      o.removing ? (o.segments.shift(), o.segments.length === 0 && i.splice(n, 1)) : (o.deathTimer--, o.deathTimer <= 0 && (o.removing = !0));
    else {
      const c = o.direction;
      if (Math.random() < 0.2) {
        const d = E(I);
        d.x === -c.x && d.y === -c.y || (o.direction = d);
      }
      const f = `${c.x},${c.y}|${o.direction.x},${o.direction.y}`, h = S[f] ?? (o.direction.x !== 0 ? "━" : "┃");
      o.segments.push({ position: new p(o.position.x, o.position.y), char: h }), a.add(`${o.position.x},${o.position.y}`);
      const e = o.position.add(o.direction);
      e.x < 0 || e.x >= t.x || e.y < 0 || e.y >= t.y || a.has(`${e.x},${e.y}`) ? o.dead = !0 : o.position = e;
    }
  }
  const l = Math.max(1, Math.floor(t.x * t.y * g));
  i.filter((n) => !n.dead).length < l && i.push($(t, u, s, r));
}
const v = new _().setManual({
  purpose: "Displays animated colorful pipes",
  usage: "pipes [-s <speed>] [-r <float>] [-m <int>] [-M <int>]",
  options: {
    "-s speed": `Speed of the animation (Defaults to ${T})`,
    "-r float": `Spawn rate of pipes (Defaults to ${M})`,
    "-m int": `Minimum life time in seconds (Defaults to ${A})`,
    "-M int": `Maximum life time in seconds (Defaults to ${D})`
  }
}).addOption({ short: "s", long: "speed", isInput: !0 }).addOption({ short: "r", long: "rate", isInput: !0 }).addOption({ short: "m", long: "min", isInput: !0 }).addOption({ short: "M", long: "max", isInput: !0 }).setExecute(function(i, { size: t, stdin: u, stdout: g, inputs: s }) {
  const r = 60 / x(s.s, T), a = w(s.r, M), l = x(s.m, A), n = x(s.M, D), o = [$(t, r, l, n)];
  return P.animate({
    stdin: u,
    stdout: g,
    delay: r,
    render: () => {
      O(o, t, r, a, l, n);
      const c = Array.from({ length: t.y }, () => Array(t.x).fill(" "));
      return o.forEach((f) => {
        f.segments.forEach((h) => {
          const { x: e, y: d } = h.position;
          d >= 0 && d < t.y && e >= 0 && e < t.x && (c[d][e] = f.color + h.char + m.reset);
        });
      }), c.map((f) => f.join("")).reverse().join(`
`);
    }
  });
});
export {
  v as pipes
};
//# sourceMappingURL=pipes-CQ-pK6Kv.js.map
