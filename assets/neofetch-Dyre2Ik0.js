import { ANSI as n } from "@prozilla-os/shared";
import { Command as y, Settings as E, ANSI_LOGO_COLOR as H, Shell as _, ANSI_ASCII_LOGO as b } from "/assets/prozilla_os_core.js";
import { Theme as c } from "@prozilla-os/skins";
const G = new y().setManual({
  purpose: "Fetch system information"
}).setExecute(async function(F, { username: p, hostname: u, app: O, systemManager: d, settingsManager: A, stdout: M }) {
  const s = b.split(`
`), N = p.length + u.length + 1, r = (await A.getSettings(E.THEME).get("theme")).value;
  let w = c[c.Dark];
  r != null && !isNaN(parseInt(r)) && (w = c[parseInt(r)]);
  const a = navigator.userAgent;
  let o;
  a.match(/Firefox\//) ? o = "Mozilla Firefox" : a.match(/Edg\//) ? o = "Microsoft Edge" : a.match(/Chrome\//) ? o = "Google Chrome" : a.match(/Safari\//) ? o = "Apple Safari" : o = "Unknown";
  const t = (e, i) => n.fg.cyan + e.toUpperCase() + n.reset + ": " + i, x = [
    `${n.fg.cyan + p + n.reset}@${n.fg.cyan + u + n.reset}`,
    "-".repeat(N),
    t("os", d.systemName),
    t("uptime", d.getUptime(2)),
    t("resolution", window.innerWidth + "x" + window.innerHeight),
    t("theme", w),
    t("icons", "Font Awesome"),
    t("terminal", O?.name ?? "Unknown"),
    t("browser", o),
    t("platform", navigator.platform),
    t("language", navigator.language),
    "",
    Object.values(n.fg).map((e) => e + "███").join("") + n.reset
  ], l = s.length, m = x.length, g = Math.max(l, m), L = Math.floor((g - l) / 2), v = Math.floor((g - m) / 2), S = Math.max(...s.map((e) => e.length)), I = [];
  for (let e = 0; e < g; e++) {
    let i = "";
    const h = e - L;
    if (h >= 0 && h < l) {
      const C = s[h];
      i += `${H + C + n.reset}${" ".repeat(S - C.length + 2)}`;
    } else
      i += " ".repeat(S + 2);
    const f = e - v;
    f >= 0 && f < m && (i += x[f]), I.push(i);
  }
  await _.printLn(M, I.join(`
`));
});
export {
  G as neofetch
};
//# sourceMappingURL=neofetch-Dyre2Ik0.js.map
