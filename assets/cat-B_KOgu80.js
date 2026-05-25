import { Command as l } from "/assets/prozilla_os_core.js";
const m = new l().setManual({
  purpose: "Concatenate files and display on the terminal screen",
  usage: "cat [OPTION]... [FILE]...",
  description: "Concatenate FILE(s) to standard output. With no FILE, or when FILE is -, read standard input.",
  options: {
    "-e": "Display $ at end of each line"
  }
}).addOption({ short: "e", long: "show-ends", isInput: !1 }).setExecute(async function(s, { workingDirectory: i, options: e, stdout: t, stderr: o, stdin: r, shell: c }) {
  const d = (n) => {
    if (!e.includes("e"))
      return n;
    const a = n.split(`
`).join(`$
`);
    return n.endsWith(`
`) ? a : a + "$";
  };
  return await c.readFiles({
    paths: s,
    workingDirectory: i,
    stdin: r,
    stderr: o,
    commandName: this.name,
    onContent: async (n) => {
      await t.write(d(n));
    },
    onStdinData: async (n) => {
      await t.write(e.includes("e") ? n.replace(/\n/g, `$
`) : n);
    }
  });
});
export {
  m as cat
};
//# sourceMappingURL=cat-B_KOgu80.js.map
