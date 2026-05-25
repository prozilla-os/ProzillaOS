import { Command as l, VirtualFile as u, Shell as f } from "/assets/prozilla_os_core.js";
const a = new l().setRequireArgs(!0).setManual({
  purpose: "Remove a file"
}).setExecute(function(i, { workingDirectory: n, stderr: r }) {
  const e = i[0], { name: o, extension: s } = u.splitId(e), t = n.findFile(o, s);
  if (!t)
    return f.writeError(r, this.name, `${e}: No such file`);
  t.delete();
});
export {
  a as rm
};
//# sourceMappingURL=rm-Uxuv-dEz.js.map
