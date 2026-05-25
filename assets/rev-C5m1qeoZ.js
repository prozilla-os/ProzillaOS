import { Command as o, Shell as i } from "/assets/prozilla_os_core.js";
const l = new o().setManual({
  purpose: "Display the reverse of a text"
}).setExecute(async function(p, { rawLine: e, stdin: t, stdout: r }) {
  return i.readInput(e, t, async (n) => {
    const s = n.split(`
`).map((a) => a.split("").reverse().join("")).join(`
`);
    await r.write(s);
  });
});
export {
  l as rev
};
//# sourceMappingURL=rev-C5m1qeoZ.js.map
