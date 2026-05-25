import { Command as i, Shell as l } from "/assets/prozilla_os_core.js";
const u = new i().setManual({
  purpose: "Output a string repeatedly until killed",
  usage: "yes [STRING]...",
  description: "Repeatedly output a line with all specified STRING(s), or 'y'."
}).setExecute(async function(e, { stdout: t, stdin: n }) {
  const o = (e.length > 0 ? e.join(" ") : "y") + `
`;
  return await l.loop({
    stdout: t,
    stdin: n,
    task: () => o
  });
});
export {
  u as yes
};
//# sourceMappingURL=yes-ilM2l2xq.js.map
