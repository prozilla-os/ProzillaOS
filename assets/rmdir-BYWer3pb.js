import { Command as i, Shell as s } from "/assets/prozilla_os_core.js";
const u = new i().setRequireArgs(!0).setManual({
  purpose: "Remove a directory"
}).setExecute(function(o, { workingDirectory: t, stderr: n }) {
  const e = o[0], r = t.findSubFolder(e);
  if (!r)
    return s.writeError(n, this.name, `${e}: No such directory`);
  r.delete();
});
export {
  u as rmdir
};
//# sourceMappingURL=rmdir-BYWer3pb.js.map
