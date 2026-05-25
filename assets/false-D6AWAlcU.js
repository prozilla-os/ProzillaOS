import { Command as e, EXIT_CODE as n } from "/assets/prozilla_os_core.js";
const a = new e().setName("false").setManual({
  purpose: "Do nothing, unsuccessfully",
  usage: "false [ignored command line arguments]",
  description: "Exit with a status code indicating failure."
}).setExecute(function() {
  return n.generalError;
});
export {
  a as falseCommand
};
//# sourceMappingURL=false-D6AWAlcU.js.map
