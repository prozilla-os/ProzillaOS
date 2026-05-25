import { Command as P, Shell as o, EXIT_CODE as g } from "/assets/prozilla_os_core.js";
const E = new P().setManual({
  purpose: "Report or omit repeated lines",
  usage: "uniq [OPTION]... [INPUT [OUTPUT]]",
  description: "Filter adjacent matching lines from INPUT, writing to OUTPUT.",
  options: {
    "-c": "Prefix lines by the number of occurrences",
    "-d": "Only print duplicate lines, one for each group",
    "-u": "Only print unique lines",
    "-i": "Ignore differences in case when comparing"
  }
}).addOption({ short: "c", long: "count" }).addOption({ short: "d", long: "repeated" }).addOption({ short: "u", long: "unique" }).addOption({ short: "i", long: "ignore-case" }).setExecute(async function(w, { stdout: h, stderr: l, stdin: O, workingDirectory: m, options: s }) {
  const d = async (n) => {
    if (!n.length) return;
    const t = n.split(`
`), p = s.includes("i"), y = s.includes("c"), I = s.includes("d"), T = s.includes("u");
    let i = t[0], a = 0;
    const f = async (r, c) => {
      const u = c > 1;
      if (I && !u || T && u) return;
      const U = y ? `${c.toString().padStart(7, " ")} ` : "";
      await o.printLn(h, U + r);
    };
    for (const r of t) {
      const c = p ? r.toLowerCase() : r, u = p ? i.toLowerCase() : i;
      c === u ? a++ : (await f(i, a), i = r, a = 1);
    }
    await f(i, a);
  }, e = w[0];
  if (e && e !== "-") {
    const n = m.navigate(e);
    if (!n)
      return o.writeError(l, this.name, `${e}: ${o.INVALID_PATH_ERROR}`);
    if (n.isFolder())
      return o.writeError(l, this.name, `${e}: Is a directory`);
    const t = await n.read();
    return t != null && await d(t), g.success;
  }
  return await o.readInput("", O, async (n) => (await d(n), g.success));
});
export {
  E as uniq
};
//# sourceMappingURL=uniq-LncLpnFY.js.map
