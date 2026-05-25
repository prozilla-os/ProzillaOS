import { Command as a, EXIT_CODE as i, Shell as u } from "/assets/prozilla_os_core.js";
const l = new a().setRequireArgs(!0).setManual({
  purpose: "Evaluate and execute JavaScript code",
  usage: "eval [input]",
  description: "Executes JavaScript code with access to the shell."
}).setExecute(async function(n, r) {
  const { stdout: s, stderr: o } = r, c = n.join(" ");
  try {
    const e = new Function("context", `
				with(context) { 
					return (${c}); 
				}
			`)(r);
    return e !== void 0 && await s.write(String(e)), i.success;
  } catch (t) {
    const e = t instanceof Error ? t.message : "Execution error";
    return u.writeError(o, this.name, e);
  }
});
export {
  l as eval,
  l as evalCommand
};
//# sourceMappingURL=eval-4uLqmhXl.js.map
