import { Command as n, Shell as a } from "/assets/prozilla_os_core.js";
const m = new n().setManual({
  purpose: "Display the hostname"
}).setExecute(async function(o, { hostname: t, stdout: e }) {
  await a.printLn(e, t);
});
export {
  m as hostname
};
//# sourceMappingURL=hostname-B-lPyRps.js.map
