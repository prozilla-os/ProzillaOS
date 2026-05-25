import { Command as e, EXIT_CODE as t } from "/assets/prozilla_os_core.js";
const n = new e().setName("true").setManual({
  purpose: "Do nothing, successfully",
  usage: "true [ignored command line arguments]",
  description: "Exit with a status code indicating success."
}).setExecute(function() {
  return t.success;
});
export {
  n as trueCommand
};
//# sourceMappingURL=true-j1Uf2Nz9.js.map
