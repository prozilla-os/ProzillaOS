import { Command as n, Shell as t } from "/assets/prozilla_os_core.js";
const r = new n().setManual({
  purpose: "Display the username"
}).setExecute(async function(o, { username: e, stdout: a }) {
  await t.printLn(a, e);
});
export {
  r as whoami
};
//# sourceMappingURL=whoami-BS3xdQEI.js.map
