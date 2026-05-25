import { parseOptionalInteger as h } from "@prozilla-os/shared";
import { Command as d, EXIT_CODE as E, Shell as i, Stream as I } from "/assets/prozilla_os_core.js";
const O = new d().setManual({
  purpose: "Output the last part of files",
  usage: "tail [OPTION]... [FILE]...",
  description: "Print the last 10 lines of each FILE to standard output. With no FILE, or when FILE is -, read standard input.",
  options: {
    "-n NUM": "Print the last NUM lines instead of the last 10"
  }
}).addOption({ short: "n", long: "lines", isInput: !0 }).setExecute(async function(a, { workingDirectory: f, inputs: p, stdout: o, stderr: r, stdin: s }) {
  const w = h(p.n, 10);
  async function l(t) {
    const n = t.split(`
`);
    await i.printLn(o, n.slice(-w).join(`
`));
  }
  async function c() {
    let t = "";
    s.on(I.DATA_EVENT, (n) => {
      t += n;
    }), await s.wait(), await l(t);
  }
  if (!a.length)
    return await c();
  let e = E.success;
  for (const t of a) {
    if (t === "-") {
      await c();
      continue;
    }
    const n = f.navigate(t);
    if (!n) {
      e = await i.writeError(r, this.name, [t, i.INVALID_PATH_ERROR]);
      continue;
    }
    if (n.isFolder()) {
      e = await i.writeError(r, this.name, [t, "Is a directory"]);
      continue;
    }
    a.length > 1 && await i.printLn(o, `==> ${t} <==`);
    const u = await n.read();
    u != null && await l(u);
  }
  return e;
});
export {
  O as tail
};
//# sourceMappingURL=tail-BLlaoTxA.js.map
