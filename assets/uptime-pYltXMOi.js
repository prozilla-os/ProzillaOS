import { Command as n, Shell as p } from "/assets/prozilla_os_core.js";
const s = new n().setManual({
  purpose: "Display the current uptime of the system"
}).setExecute(async function(i, { systemManager: t, stdout: e }) {
  await p.printLn(e, `Uptime: ${t.getUptime(2)}`);
});
export {
  s as uptime
};
//# sourceMappingURL=uptime-pYltXMOi.js.map
