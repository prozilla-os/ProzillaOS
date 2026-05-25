import { Command as a, Shell as u, EXIT_CODE as i } from "/assets/prozilla_os_core.js";
const h = (t) => t ? i.success : i.generalError, n = {
  "-z": (t) => t.length === 0,
  "-n": (t) => t.length > 0,
  "-f": (t, e) => e.navigate(t)?.isFile() ?? !1,
  "-d": (t, e) => e.navigate(t)?.isFolder() ?? !1,
  "-e": (t, e) => e.navigate(t) != null
}, o = {
  "=": (t, e) => t === e,
  "==": (t, e) => t === e,
  "!=": (t, e) => t !== e,
  "-eq": (t, e) => Number(t) === Number(e),
  "-ne": (t, e) => Number(t) !== Number(e),
  "-lt": (t, e) => Number(t) < Number(e),
  "-le": (t, e) => Number(t) <= Number(e),
  "-gt": (t, e) => Number(t) > Number(e),
  "-ge": (t, e) => Number(t) >= Number(e)
};
class l {
  tokens;
  index = 0;
  workingDirectory;
  constructor(e, s) {
    this.tokens = e, this.workingDirectory = s;
  }
  parse() {
    return this.parseOr();
  }
  parseOr() {
    let e = this.parseAnd();
    for (; this.tokens[this.index] === "||"; )
      this.index++, e = this.parseAnd() || e;
    return e;
  }
  parseAnd() {
    let e = this.parsePrimary();
    for (; this.tokens[this.index] === "&&"; )
      this.index++, e = this.parsePrimary() && e;
    return e;
  }
  parsePrimary() {
    const e = this.tokens[this.index++];
    if (e === "!") return !this.parsePrimary();
    if (e === "(") {
      const r = this.parseOr();
      return this.index++, r;
    }
    if (e in n) {
      const r = this.tokens[this.index++];
      return n[e](r, this.workingDirectory);
    }
    const s = this.tokens[this.index];
    if (s in o) {
      this.index++;
      const r = this.tokens[this.index++];
      return o[s](e, r);
    }
    return e.length > 0;
  }
}
const m = new a().setName("[[").setRequireArgs(!0).setManual({
  purpose: "Evaluate a conditional expression",
  usage: "[[ expression ]]"
}).setExecute(function(t, { stderr: e, workingDirectory: s }) {
  if (t.at(-1) !== "]]")
    return u.writeError(e, this.name, "missing `]]'");
  const r = t.slice(0, -1);
  if (r.length === 0) return i.generalError;
  try {
    return h(new l(r, s).parse());
  } catch {
    return i.misuseOfBuiltins;
  }
});
export {
  m as doubleBracket
};
//# sourceMappingURL=doubleBracket-B5nqIccY.js.map
