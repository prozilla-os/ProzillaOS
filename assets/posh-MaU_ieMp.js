import { Command as m, Shell as r } from "/assets/main.js";
const p = new m().setManual({
  purpose: "ProzillaOS shell",
  usage: "posh [options] [command_string | file]",
  description: "Posh is a bash-like command interpreter that executes commands read from a string or from a file.",
  options: {
    "-c": "Execute the first argument as a command"
  }
}).addAlias("sh").addAlias("bash").addOption({
  short: "c"
}).setRequireArgs(!0).setExecute(async function(a, { stdout: i, stderr: e, workingDirectory: s, shell: n, options: c }) {
  if (c.includes("c")) {
    const t = a[0];
    return t ? await n.interpreter.execute(t, { stdout: i, stderr: e }) : r.writeError(e, this.name, "-c: Option requires an argument");
  } else {
    const t = a[0], o = s.navigateToFile(t);
    return o ? await n.interpreter.execute(o, { stdout: i, stderr: e }) : r.writeError(e, this.name, r.INVALID_PATH_ERROR);
  }
});
export {
  p as posh
};
//# sourceMappingURL=posh-MaU_ieMp.js.map
