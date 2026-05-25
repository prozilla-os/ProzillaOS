import { Command as a, Shell as n } from "/assets/prozilla_os_core.js";
const i = new a().setManual({
  purpose: "Display path of the current directory"
}).setExecute(async function(r, { workingDirectory: t, stdout: o }) {
  let e = t.absolutePath;
  t.root && (e = "/"), await n.printLn(o, e);
});
export {
  i as pwd
};
//# sourceMappingURL=pwd-CZ9IWAfu.js.map
