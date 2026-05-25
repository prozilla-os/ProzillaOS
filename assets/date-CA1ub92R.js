import { Command as S, Shell as p } from "/assets/prozilla_os_core.js";
const f = new S().setManual({
  purpose: "Display or set the date and time",
  usage: "date [option] [+format]",
  description: "Display the current time in the given FORMAT.",
  options: {
    "-u": "Display UTC (Coordinated Universal Time)"
  }
}).addOption({ short: "u", long: "utc" }).setExecute(async function(m, { stdout: i, options: T }) {
  const t = /* @__PURE__ */ new Date(), n = T.includes("u"), r = m.find((o) => o.startsWith("+"));
  if (!r) {
    await p.printLn(i, n ? t.toUTCString() : t.toString());
    return;
  }
  const e = (o) => o.toString().padStart(2, "0"), a = n ? t.getUTCFullYear() : t.getFullYear(), c = (n ? t.getUTCMonth() : t.getMonth()) + 1, u = n ? t.getUTCDate() : t.getDate(), g = n ? t.getUTCHours() : t.getHours(), l = n ? t.getUTCMinutes() : t.getMinutes(), d = n ? t.getUTCSeconds() : t.getSeconds(), h = {
    "%Y": a.toString(),
    "%m": e(c),
    "%d": e(u),
    "%H": e(g),
    "%M": e(l),
    "%S": e(d),
    "%T": `${e(g)}:${e(l)}:${e(d)}`,
    "%D": `${e(c)}/${e(u)}/${a.toString().slice(-2)}`
  };
  let s = r.substring(1);
  for (const [o, C] of Object.entries(h))
    s = s.replaceAll(o, C);
  await p.printLn(i, s);
});
export {
  f as date
};
//# sourceMappingURL=date-CA1ub92R.js.map
