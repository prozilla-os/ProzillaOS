import { Command as d, Shell as r } from "/assets/prozilla_os_core.js";
import { ANSI as s } from "@prozilla-os/shared";
const p = new d().setManual({
  purpose: "List directory contents",
  usage: "ls [options] [files]",
  description: "List information about directories or files (the current directory by default)."
}).setExecute(async function(t, { workingDirectory: i, stdout: c, stderr: a }) {
  let e = i;
  if (t.length && (e = i.navigateToFolder(t[0])), !e)
    return r.writeError(a, this.name, `Cannot access '${t[0]}': No such file or directory`);
  const l = e.subFolders.map((o) => `${s.fg.blue}${o.id}${s.reset}`), f = e.files.map((o) => o.id), n = l.concat(f);
  n.length && await r.printLn(c, n.sort().join("  "));
});
export {
  p as ls
};
//# sourceMappingURL=ls-D2Ln7mue.js.map
