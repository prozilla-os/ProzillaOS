import { Command as _, Shell as p, MAX_WIDTH as u } from "/assets/prozilla_os_core.js";
const w = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
function m(f) {
  const a = f.trim().split(/\s/), s = [];
  let n = "", i = 0;
  const c = (e) => {
    e = e.trimEnd(), s.push(e), e.length > i && (i = e.length);
  }, l = (e) => {
    c(n), n = e ? e + " " : "";
  };
  a.forEach((e) => {
    if (e === "") {
      n += " ";
      return;
    }
    const t = e.split(`
`);
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (o > 0 && l(), (n + r).length <= u)
        n += r + " ";
      else if (r.length > u) {
        const h = u - n.length;
        h >= 2 ? (c(n + r.substring(0, h - 1) + "-"), n = r.substring(h - 1) + " ") : l(r);
      } else
        l(r);
    }
  }), n.length > 0 && c(n);
  const g = [` ${"_".repeat(i + 2)} `];
  for (let e = 0; e < s.length; e++) {
    let t = s[e];
    const o = i - t.length;
    o > 0 && (t += " ".repeat(o)), s.length > 1 ? e === 0 ? t = `/ ${t} \\` : e === s.length - 1 ? t = `\\ ${t} /` : t = `| ${t} |` : t = `< ${t} >`, g.push(t);
  }
  return g.push(` ${"-".repeat(i + 2)} `), g.join(`
`) + w + `
`;
}
const y = new _().setRequireArgs(!0).setManual({
  purpose: "Show a cow saying something",
  usage: "cowsay text",
  description: "Show ASCII art of a cow saying something."
}).setExecute(async function(f, { rawLine: a, stdout: s, stdin: n }) {
  return await p.readInput(a, n, async (i) => {
    await p.printLn(s, m(i));
  });
});
export {
  y as cowsay
};
//# sourceMappingURL=cowsay-CTLxUPtF.js.map
