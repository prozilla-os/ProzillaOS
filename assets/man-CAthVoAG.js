import { ANSI as g, Ansi as r } from "@prozilla-os/shared";
import { Command as x, ExecutableResolver as w, Shell as p } from "/assets/main.js";
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
}).setExecute(async function(c, { options: S, stdout: d, stderr: f }) {
  if (S.includes("k")) {
    const s = w.builtins.filter((n) => n.name.match(c[0].toLowerCase())).map((n) => n.manual?.purpose ? `${n.name} - ${n.manual.purpose}` : n.name).sort().join(`
`);
    await p.printLn(d, s);
    return;
  }
  const m = c[0].toLowerCase(), i = w.getBuiltin(m);
  if (!i)
    return p.writeError(f, this.name, `${m}: Command not found`);
  const o = i.manual;
  if (!o)
    return p.writeError(f, this.name, `${m}: No manual found`);
  const a = (e) => e.split(`
`).map((n) => " ".repeat(N) + n).join(`
`), t = [["NAME"]];
  o.purpose ? t[0].push(a(`${i.name} - ${g.decoration.dim}${r.yellow(o.purpose)}`)) : t[0].push(a(i.name)), o.usage && t.push([
    "SYNOPSIS",
    a(o.usage)
  ]), o.description && t.push([
    "DESCRIPTION",
    a(o.description)
  ]), o.options && t.push([
    "OPTIONS",
    a(Object.entries(o.options).map(([e, s]) => {
      let n = e.split(" ");
      const h = n[0].slice(1);
      n = n.slice(1);
      let u = "-" + h;
      const l = i.options.find((y) => y.short == h);
      return l !== void 0 && l.long !== void 0 && (u += ", --" + l.long), n.length && (u += " " + r.dim(n.join(" "))), `${u} ${g.decoration.dim}${r.yellow(String(s))}`;
    }).join(`
`))
  ]);
  const $ = t.map((e) => (e[0] = r.yellow(e[0]), e.join(`
`))).join(`

`);
  await p.printLn(d, $);
});
export {
  E as man
};
//# sourceMappingURL=man-CAthVoAG.js.map
