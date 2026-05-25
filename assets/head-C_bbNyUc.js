import { parseOptionalInteger as d } from "@prozilla-os/shared";
import { Command as w, EXIT_CODE as E, Shell as e, Stream as I } from "/assets/prozilla_os_core.js";
const O = new w().setManual({
  purpose: "Output the first part of files",
  usage: "head [OPTION]... [FILE]...",
  description: "Print the first 10 lines of each FILE to standard output. With no FILE, or when FILE is -, read standard input.",
  options: {
    "-n NUM": "Print the first NUM lines instead of the first 10"
  }
}).addOption({ short: "n", long: "lines", isInput: !0 }).setExecute(async function(a, { workingDirectory: p, inputs: h, stdout: s, stderr: c, stdin: f }) {
  const o = d(h.n, 10);
  async function l(t) {
    const n = t.split(`
`), i = o >= 0 ? n.slice(0, o) : n.slice(0, Math.max(n.length + o, 0));
    await e.printLn(s, i.join(`
`));
  }
  async function u() {
    let t = "";
    f.on(I.DATA_EVENT, (n) => {
      t += n;
    }), await f.wait(), await l(t);
  }
  if (!a.length)
    return await u();
  let r = E.success;
  for (const t of a) {
    if (t === "-") {
      await u();
      continue;
    }
    const n = p.navigate(t);
    if (!n) {
      r = await e.writeError(c, this.name, [t, e.INVALID_PATH_ERROR]);
      continue;
    }
    if (n.isFolder()) {
      r = await e.writeError(c, this.name, [t, "Is a directory"]);
      continue;
    }
    a.length > 1 && await e.printLn(s, `==> ${t} <==`);
    const i = await n.read();
    i != null && await l(i);
  }
  return r;
});
export {
  O as head
};
//# sourceMappingURL=head-C_bbNyUc.js.map
