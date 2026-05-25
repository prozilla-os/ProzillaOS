import { Command as n } from "/assets/prozilla_os_core.js";
const u = new n().setManual({
  purpose: "Create a directory"
}).setRequireArgs(!0).setExecute(function(t, { workingDirectory: e }) {
  const r = t[0];
  e.findSubFolder(r) || e.createFolder(r);
});
export {
  u as mkdir
};
//# sourceMappingURL=mkdir-BdEywO2H.js.map
