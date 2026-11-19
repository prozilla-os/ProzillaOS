import { ANSI as n } from "@prozilla-os/shared";
import { Command as E, Settings as _, ANSI_LOGO_COLOR as b, Shell as F, ANSI_ASCII_LOGO as H } from "/assets/main.js";
import { Theme as c } from "@prozilla-os/skins";
const T = new E().setManual({
  purpose: "Fetch system information"
}).setExecute(async function(U, { username: p, hostname: u, app: A, systemManager: x, settingsManager: M, stdout: N, size: S }) {
  const s = H.split(`
`), y = p.length + u.length + 1, r = (await M.getSettings(_.THEME).get("theme")).value;
  let I = c[c.Dark];
  r != null && !isNaN(parseInt(r)) && (I = c[parseInt(r)]);
  const i = navigator.userAgent;
  let o;
  i.match(/Firefox\//) ? o = "Mozilla Firefox" : i.match(/Edg\//) ? o = "Microsoft Edge" : i.match(/Chrome\//) ? o = "Google Chrome" : i.match(/Safari\//) ? o = "Apple Safari" : o = "Unknown";
  const t = (e, a) => n.fg.cyan + e.toUpperCase() + n.reset + ": " + a, d = [
    `${n.fg.cyan + p + n.reset}@${n.fg.cyan + u + n.reset}`,
    "-".repeat(y),
    t("os", x.systemName),
    t("uptime", x.getUptime(2)),
    t("size", S.x + "x" + S.y),
    t("theme", I),
    t("icons", "Font Awesome"),
    t("terminal", A?.name ?? "Unknown"),
    t("browser", o),
    t("platform", navigator.platform),
    t("language", navigator.language),
    "",
    Object.values(n.fg).map((e) => e + "███").join("") + n.reset
  ], l = s.length, m = d.length, g = Math.max(l, m), L = Math.floor((g - l) / 2), v = Math.floor((g - m) / 2), C = Math.max(...s.map((e) => e.length)), O = [];
  for (let e = 0; e < g; e++) {
    let a = "";
    const f = e - L;
    if (f >= 0 && f < l) {
      const w = s[f];
      a += `${b + w + n.reset}${" ".repeat(C - w.length + 2)}`;
    } else
      a += " ".repeat(C + 2);
    const h = e - v;
    h >= 0 && h < m && (a += d[h]), O.push(a);
  }
  await F.printLn(N, O.join(`
`));
});
export {
  T as neofetch
};
//# sourceMappingURL=neofetch-CgwDNr-T.js.map
