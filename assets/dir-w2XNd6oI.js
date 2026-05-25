import { Command as i, Shell as s } from "/assets/prozilla_os_core.js";
const c = new i().setManual({
  purpose: "List all directories in the current directory"
}).setExecute(async function(a, { workingDirectory: t, stdout: o }) {
  const r = t.subFolders.map((e) => e.id);
  r.length !== 0 && await s.printLn(o, r.sort((e, n) => e.localeCompare(n)).join(" "));
});
export {
  c as dir
};
//# sourceMappingURL=dir-w2XNd6oI.js.map
