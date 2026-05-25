import { Command as c, Shell as i } from "/assets/prozilla_os_core.js";
const h = new c().setManual({
  purpose: "Change the current directory",
  usage: "cd [PATH]",
  description: "Change working directory to given path (the home directory by default)."
}).setExecute(function(n, { workingDirectory: o, shell: a, stderr: r }) {
  const t = n[0] ?? "~";
  let e = o.navigate(t);
  if (!e)
    return i.writeError(r, this.name, `${t}: No such file or directory`);
  if (e.isFile()) {
    if (e.parent == null)
      return i.writeError(r, this.name, `${t}: Invalid path`);
    e = e.parent;
  }
  a.setWorkingDirectory(e);
});
export {
  h as cd
};
//# sourceMappingURL=cd-DGILEGTs.js.map
