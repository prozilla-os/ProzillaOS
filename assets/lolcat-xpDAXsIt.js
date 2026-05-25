import { parseOptionalFloat as f, ANSI as e } from "@prozilla-os/shared";
import { Command as O, Stream as x, EXIT_CODE as y } from "/assets/prozilla_os_core.js";
const d = [
  e.fg.red,
  e.fg.yellow,
  e.fg.green,
  e.fg.cyan,
  e.fg.blue,
  e.fg.magenta
], F = new O().setManual({
  purpose: "Display text with a rainbow effect",
  usage: "lolcat [ -p spread ] [ -F freq ] [ -S seed ]",
  options: {
    "-p spread": "Rainbow spread (default: 3.0)",
    "-F freq": "Rainbow frequency (default: 0.1)",
    "-S seed": "Rainbow seed (default: 0)"
  }
}).addOption({
  short: "p",
  long: "spread",
  isInput: !0
}).addOption({
  short: "F",
  long: "freq",
  isInput: !0
}).addOption({
  short: "S",
  long: "seed",
  isInput: !0
}).setExecute(function(S, { timestamp: g, stdout: h, stdin: p, inputs: i }) {
  const m = f(i.p, 3), w = f(i.F, 0.1), b = f(i.S);
  let l = 0;
  const I = async (o) => {
    let s = "", a = 0, r = 0;
    const q = g / 1e3;
    for (; a < o.length; ) {
      const t = o[a];
      if (t === "\x1B") {
        const c = o.substring(a).match(/^\u001b\[[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/);
        if (c) {
          const n = c[0];
          s += n, (n === e.screen.home || n === e.screen.clear) && (l = 0, r = 0), a += n.length;
          continue;
        }
      }
      if (t === `
`)
        s += `
`, l++, r = 0;
      else if (t === "\r" || t === "	" || t === " ")
        s += t, r++;
      else {
        const u = w * (b + l + r / m + q), c = Math.floor(Math.abs(u) * d.length), n = d[c % d.length];
        s += n + t + e.reset, r++;
      }
      a++;
    }
    await h.write(s);
  };
  return p.on(x.DATA_EVENT, (o) => {
    I(o);
  }), p.wait(y.success);
});
export {
  F as lolcat
};
//# sourceMappingURL=lolcat-xpDAXsIt.js.map
