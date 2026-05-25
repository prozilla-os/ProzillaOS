import { Command as o, VirtualFile as a } from "/assets/prozilla_os_core.js";
const r = new o().setRequireArgs(!0).setManual({
  purpose: "Change file timestamps",
  usage: "touch [options] files",
  description: `Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`
}).setExecute(function(n, { workingDirectory: e }) {
  const s = n[0], { name: t, extension: i } = a.splitId(s);
  e.findFile(t, i) || e.createFile(t, i);
});
export {
  r as touch
};
//# sourceMappingURL=touch-BReUyL_z.js.map
