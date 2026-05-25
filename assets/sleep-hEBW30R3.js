import { parseOptionalFloat as r } from "@prozilla-os/shared";
import { Command as c } from "/assets/prozilla_os_core.js";
const f = {
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24
}, p = new c().setManual({
  purpose: "Delay for a specified amount of time",
  usage: "sleep NUMBER[SUFFIX]..."
}).setExecute(function(s) {
  let o = 0;
  for (const e of s) {
    const t = e.at(-1), a = r(e.slice(0, -1)), n = t ? f[t] : 0;
    o += a * n;
  }
  return new Promise((e) => {
    setTimeout(() => {
      e();
    }, o);
  });
});
export {
  p as sleep
};
//# sourceMappingURL=sleep-hEBW30R3.js.map
