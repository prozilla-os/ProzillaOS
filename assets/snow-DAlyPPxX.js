import { randomRange as i, ANSI as s, Vector2 as k } from "@prozilla-os/shared";
import { Command as B, Shell as S } from "/assets/prozilla_os_core.js";
function p(h) {
  return Array.from({ length: h.y }, () => Array(h.x).fill(0));
}
const F = new B().setManual({
  purpose: "Let it snow"
}).setExecute(function(h, { size: n, stdin: d, stdout: x }) {
  let r = p(n);
  const l = [], u = ["*", "·", "•", "."], g = (a) => a[Math.floor(Math.random() * a.length)], M = () => {
    const a = Math.random() > 0.6;
    l.push({
      position: new k(i(0, n.x - 1), n.y - 1),
      speed: a ? i(0.1, 0.3) : i(0.4, 0.8),
      char: a ? "." : g(u),
      opacity: a ? 0.5 : 1
    });
  };
  return S.animate({
    stdin: d,
    stdout: x,
    delay: 50,
    render: () => {
      (r.length !== n.y || r.length > 0 && r[0].length !== n.x) && (r = p(n), l.length = 0);
      for (let t = 0; t < 2; t++)
        for (let o = 1; o < n.y; o++)
          for (let e = 0; e < n.x; e++)
            r[o][e] >= 0.1 && r[o - 1][e] === 0 && (r[o - 1][e] = r[o][e], r[o][e] = 0);
      if (Math.random() < n.x / 100) {
        const t = Math.floor(i(0, n.x - 1));
        for (let o = 0; o < n.y; o++)
          if (r[o][t] > 0) {
            r[o][t] -= 0.25, r[o][t] < 0.1 && (r[o][t] = 0);
            break;
          }
      }
      Math.random() < n.x / 12 && M();
      const a = Array.from({ length: n.y }, () => Array(n.x).fill(" "));
      for (let t = 0; t < n.y; t++)
        for (let o = 0; o < n.x; o++) {
          const e = r[t][o];
          if (e > 0) {
            const c = e < 0.6 ? s.decoration.dim : "";
            a[t][o] = c + "*" + s.reset;
          }
        }
      for (let t = l.length - 1; t >= 0; t--) {
        const o = l[t];
        o.position.y -= o.speed;
        const e = Math.floor(o.position.x), c = Math.floor(o.position.y);
        if (c < 0) {
          l.splice(t, 1);
          continue;
        }
        const f = c === 0, w = !f && c < n.y && r[c - 1][e] >= 0.9;
        if (f || w) {
          const y = !f && e > 0 && r[c - 1][e - 1] < 0.1, m = !f && e < n.x - 1 && r[c - 1][e + 1] < 0.1;
          if (y || m)
            o.position.x += y && m ? Math.random() < 0.5 ? -1 : 1 : y ? -1 : 1;
          else {
            (o.opacity === 1 || Math.random() > 0.5) && (r[c][e] = 1), l.splice(t, 1);
            continue;
          }
        }
        const A = o.opacity < 1 ? s.decoration.dim : "";
        a[c][e] = A + o.char + s.reset;
      }
      return a.map((t) => t.join("")).reverse().join(`
`);
    }
  });
});
export {
  F as snow
};
//# sourceMappingURL=snow-DAlyPPxX.js.map
