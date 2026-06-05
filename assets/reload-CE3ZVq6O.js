import { Command as e, ExecutableResolver as t } from "/assets/main.js";
const o = new e().setManual({
  purpose: "Reload the terminal"
}).setExecute(async function() {
  await t.loadBuiltins();
});
export {
  o as reload
};
//# sourceMappingURL=reload-CE3ZVq6O.js.map
