import { Ansi as m } from "@prozilla-os/shared";
import { Command as i, ExecutableResolver as u, Shell as e } from "/assets/prozilla_os_core.js";
const p = new i().setRequireArgs(!0).setManual({
  purpose: "Show information about a command"
}).setExecute(async function(r, { stdout: a, stderr: t }) {
  const o = r[0].toLowerCase(), n = u.getBuiltin(o);
  if (!n)
    return e.writeError(t, this.name, `${o}: Command not found`);
  if (!n.manual?.purpose)
    return e.writeError(t, this.name, `${o}: No information found`);
  await e.printLn(a, `${o} - ${m.green(n.manual.purpose)}
`);
});
export {
  p as whatis
};
//# sourceMappingURL=whatis-BPKA-MNF.js.map
