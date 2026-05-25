import { Command as s } from "/assets/prozilla_os_core.js";
const u = new s().setManual({
  purpose: "Display a line of text",
  usage: "echo [option] [string ...]",
  description: "Write arguments to the standard output.",
  options: {
    "-n": "Do not output the trailing newline"
  }
}).addOption({ short: "n", long: "no-newline", isInput: !1 }).setExecute(async function(n, { stdout: t, options: o }) {
  const e = n.join(" "), i = o.includes("n") ? "" : `
`;
  await t.write(e + i);
});
export {
  u as echo
};
//# sourceMappingURL=echo-_hDVbupR.js.map
