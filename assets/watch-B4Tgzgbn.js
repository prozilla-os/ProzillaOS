import { Command as x, Stream as s, EXIT_CODE as I, Shell as p } from "/assets/prozilla_os_core.js";
import { parseOptionalFloat as S, ANSI as t, Ansi as O } from "@prozilla-os/shared";
const M = new x().setRequireArgs(!0).setManual({
  purpose: "Execute a program periodically, showing output fullscreen",
  usage: "watch [-n <seconds>] [-t] <command>",
  options: {
    "-n seconds": "Set the interval (defaults to 2)",
    "-t": "Turn off the header showing the interval and command name"
  }
}).addOption({
  long: "interval",
  short: "n",
  isInput: !0
}).addOption({
  long: "no-title",
  short: "t",
  isInput: !1
}).setExecute(async function(m, { inputs: f, options: h, shell: w, stdout: n, stdin: c, stderr: E }) {
  const l = S(f.n, 2), v = Math.max(0.1, l) * 1e3, g = h.includes("t"), r = m.join(" ");
  let a = !1, o = !1;
  await n.write(t.screen.enterAltBuffer);
  const u = async () => {
    if (a || o)
      return;
    a = !0;
    const i = new s();
    let d = "";
    i.on(s.DATA_EVENT, (e) => {
      d += e;
    });
    try {
      if (await w.interpreter.execute(r, { stdout: i }), !o) {
        const e = g ? "" : O.white(`Every ${l.toFixed(1)}s: ${r}

`);
        await n.write(t.screen.clear + t.screen.home + e + d);
      }
    } catch (e) {
      console.error(e), await p.writeError(E, this.name, [p.COMMAND_FAILED_ERROR, r]);
    } finally {
      a = !1, i.end();
    }
  }, A = setInterval(() => {
    u();
  }, v);
  return c.on(s.END_EVENT, () => {
    o = !0, clearInterval(A), n.write(t.screen.exitAltBuffer);
  }), u(), c.wait(I.success);
});
export {
  M as watch
};
//# sourceMappingURL=watch-B4Tgzgbn.js.map
