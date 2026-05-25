import { Command as u, Shell as r } from "/assets/prozilla_os_core.js";
const l = new u().setManual({
  purpose: "Execute a shell script"
}).setRequireArgs(!0).setExecute(async function(n, { stdout: i, stderr: e, workingDirectory: s, shell: a }) {
  const o = n[0], t = s.navigateToFile(o);
  return t ? await a.interpreter.execute(t, { stdout: i, stderr: e }) : r.writeError(e, this.name, r.INVALID_PATH_ERROR);
});
export {
  l as sh
};
//# sourceMappingURL=sh-CIyBHb8C.js.map
