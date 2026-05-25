import { parseOptionalFloat as S, randomRange as u, Vector2 as y, removeFromArray as d, ANSI as e } from "@prozilla-os/shared";
import { Command as x, Shell as A } from "/assets/prozilla_os_core.js";
const g = 2, w = "|", f = [".", "v", "V", "w", "W", "v", "."], E = 2, m = {
  spawnRate: 40,
  fallSpeed: 1
};
function l(i) {
  return Array.from(
    { length: i.y },
    () => Array.from({ length: i.x }, () => " ")
  );
}
function F(i, s, t, a) {
  const h = Math.round(5e3 / (m.spawnRate * a.x));
  return (h === 0 || i % h === 0) && t.push({
    position: new y(u(0, a.x - 1), a.y - 1).round(),
    isSplashing: !1,
    splashFrame: 0,
    inBackground: Math.random() > 0.5,
    length: Math.round(u(1, E))
  }), t.forEach((n) => {
    for (let o = 0; o < m.fallSpeed; o++) {
      const r = n.position.y + n.length + o - 1;
      r < s.length && (s[r][n.position.x] = " ");
    }
    if (n.isSplashing) {
      if (n.splashFrame >= f.length) {
        s[0][n.position.x] = " ", d(n, t);
        return;
      }
      const o = f[n.splashFrame], r = n.inBackground || n.splashFrame > f.length / 2 ? e.fg.cyan + e.decoration.dim : e.fg.cyan;
      s[0][n.position.x] = r + o + e.reset, n.splashFrame++;
    } else if (n.position.y -= m.fallSpeed, n.position.y <= 0)
      n.position.y = 0, n.isSplashing = !0, n.splashFrame = 0;
    else if (n.position.y < a.y) {
      const o = n.inBackground ? e.fg.blue + e.decoration.dim : e.fg.blue;
      s[n.position.y][n.position.x] = o + w + e.reset;
    } else
      d(n, t);
  }), s.map((n) => n.join("")).reverse().join(`
`);
}
const C = new x().setManual({
  purpose: "Show an animated rain effect with splashes",
  usage: "rain [-s <speed>]",
  options: {
    "-s speed": `Speed of the animation (Defaults to ${g})`
  }
}).addOption({ short: "s", long: "speed", isInput: !0 }).setExecute(function(i, { size: s, stdin: t, stdout: a, inputs: h }) {
  const n = [];
  let o = l(s);
  const r = 60 / S(h.s, g);
  return A.animate({
    stdin: t,
    stdout: a,
    delay: r,
    render: (p) => ((o.length !== s.y || (o.length !== 0 ? o[0].length : 0) !== s.x) && (o = l(s)), F(p, o, n, s))
  });
});
export {
  C as rain
};
//# sourceMappingURL=rain-DT-V01dD.js.map
