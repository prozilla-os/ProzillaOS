import { Command as E, Shell as i, EXIT_CODE as h } from "/assets/prozilla_os_core.js";
const I = new E().setManual({
  purpose: "Search for patterns in text",
  usage: "grep [option...] pattern [file...]",
  description: "Search for PATTERN in each FILE.",
  options: {
    "-i": "Ignore case distinctions",
    "-v": "Invert match: select non-matching lines",
    "-n": "Print line number with output lines"
  }
}).addOption({ short: "i", long: "ignore-case" }).addOption({ short: "v", long: "invert-match" }).addOption({ short: "n", long: "line-number" }).setExecute(async function(o, { stdout: p, stderr: c, stdin: f, workingDirectory: d, options: a }) {
  if (!o.length)
    return i.writeError(c, this.name, "Pattern is required");
  const [m, ...r] = o, g = new RegExp(m, a.includes("i") ? "i" : ""), l = async (t, e) => {
    await Promise.all(t.split(`
`).map(async (n, w) => {
      const u = g.test(n);
      if (a.includes("v") ? !u : u) {
        let s = "";
        e && r.length > 1 && (s += `${e}:`), a.includes("n") && (s += `${w + 1}:`), await i.printLn(p, s + n);
      }
    }));
  };
  if (r.length > 0) {
    for (const t of r) {
      const e = d.navigateToFile(t);
      if (!e) {
        await i.writeError(c, this.name, `${t}: No such file`);
        continue;
      }
      const n = await e.read();
      n != null && await l(n, t);
    }
    return h.success;
  }
  return i.readInput("", f, async (t) => (await l(t), h.success));
});
export {
  I as grep
};
//# sourceMappingURL=grep-DZO92KaH.js.map
