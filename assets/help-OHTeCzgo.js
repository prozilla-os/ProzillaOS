import { ANSI as o } from "@prozilla-os/shared";
import { Command as p, ExecutableResolver as m, Shell as n, EXIT_CODE as l } from "/assets/prozilla_os_core.js";
const $ = new p().setExecute(async function(a, { stdout: u, stderr: i }) {
  if (a.length === 0) {
    const s = m.builtins.map((e) => e.manual?.purpose ? `${e.name} - ${o.fg.green}${o.decoration.dim}${e.manual.purpose}${o.reset}` : e.name).sort().join(`
`);
    return await n.printLn(u, s), l.success;
  }
  const r = a[0].toLowerCase(), t = m.getBuiltin(r);
  if (!t)
    return n.writeError(i, this.name, `${r}: Command not found`);
  if (!t.manual?.purpose)
    return n.writeError(i, this.name, `${r}: No manual found`);
  await n.printLn(u, t.manual.purpose);
});
export {
  $ as help
};
//# sourceMappingURL=help-OHTeCzgo.js.map
