import { Command as e, ExecutableResolver as t } from "/assets/prozilla_os_core.js";
const o = new e().setManual({
  purpose: "Reload the terminal"
}).setExecute(async function() {
  await t.loadBuiltins();
});
export {
  o as reload
};
//# sourceMappingURL=reload-CE3ZVq6O.js.map
