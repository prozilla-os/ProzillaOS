import { ANSI as g, Ansi as r } from "@prozilla-os/shared";
import { Command as x, ExecutableResolver as w, Shell as p } from "/assets/prozilla_os_core.js";
const N = 5, E = new x().setRequireArgs(!0).setManual({
  purpose: "Show system reference manuals",
  usage: `man [options] page
man -k [options] regexp`,
  description: `Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,
  options: {
    "-k": "Search for manual page using regexp"
  }
}).addOption({
  short: "k",
  long: "apropos"
}).setExecute(async function(l, { options: S, stdout: c, stderr: d }) {
  if (S.includes("k")) {
    const a = w.builtins.filter((n) => n.name.match(l[0].toLowerCase())).map((n) => n.manual?.purpose ? `${n.name} - ${n.manual.purpose}` : n.name).sort().join(`
`);
    await p.printLn(c, a);
    return;
  }
  const i = l[0].toLowerCase(), u = w.getBuiltin(i);
  if (!u)
    return p.writeError(d, this.name, `${i}: Command not found`);
  const o = u.manual;
  if (!o)
    return p.writeError(d, this.name, `${i}: No manual found`);
  const s = (e) => e.split(`
`).map((n) => " ".repeat(N) + n).join(`
`), t = [["NAME"]];
  o.purpose ? t[0].push(s(`${i} - ${g.decoration.dim}${r.yellow(o.purpose)}`)) : t[0].push(s(i)), o.usage && t.push([
    "SYNOPSIS",
    s(o.usage)
  ]), o.description && t.push([
    "DESCRIPTION",
    s(o.description)
  ]), o.options && t.push([
    "OPTIONS",
    s(Object.entries(o.options).map(([e, a]) => {
      let n = e.split(" ");
      const f = n[0].slice(1);
      n = n.slice(1);
      let m = "-" + f;
      const h = u.options.find((y) => y.short == f);
      return h !== void 0 && (m += ", --" + h.long), n.length && (m += " " + r.dim(n.join(" "))), `${m} ${g.decoration.dim}${r.yellow(String(a))}`;
    }).join(`
`))
  ]);
  const $ = t.map((e) => (e[0] = r.yellow(e[0]), e.join(`
`))).join(`

`);
  await p.printLn(c, $);
});
export {
  E as man
};
//# sourceMappingURL=man-E9nMmKZ1.js.map
