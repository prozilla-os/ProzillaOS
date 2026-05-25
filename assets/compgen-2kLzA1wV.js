import { Command as s, Shell as a, ExecutableResolver as o } from "/assets/prozilla_os_core.js";
const r = new s().setManual({
  purpose: "Display a list of all commands"
}).setRequireOptions(!0).setExecute(async function(i, { options: e, stdout: n }) {
  e.includes("c") && await a.printLn(n, o.builtins.map((t) => t.name).sort().join(`
`));
});
export {
  r as compgen
};
//# sourceMappingURL=compgen-2kLzA1wV.js.map
