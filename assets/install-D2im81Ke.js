import { Command as l, Shell as t } from "/assets/prozilla_os_core.js";
const m = new l().setManual({
  purpose: "Install an app from a URL or npm package",
  usage: "install [--export <name>] <npm-package | url>",
  description: "Dynamically install an app from an npm package name (e.g. @scope/package) or a direct URL to an ES module that exports an App instance.",
  options: {
    "-e, --export <name>": "Name of the export that contains the App instance (default: checks `app` then `default`)"
  }
}).addOption({ short: "e", long: "export", isInput: !0 }).setRequireArgs(!0).setExecute(async function(s, { stdout: n, stderr: r, systemManager: p, inputs: o }) {
  const e = s[0];
  if (!e)
    return await t.writeError(r, "install", "expected a package name or URL"), 1;
  await n.write(`Installing "${e}"...
`);
  try {
    const a = {};
    o.e && (a.exportName = o.e);
    const i = await p.appsConfig.installApp(e, p, a);
    await t.printLn(n, `Successfully installed "${i.name}" (${i.id})`);
  } catch (a) {
    return await t.writeError(r, "install", a instanceof Error ? a.message : String(a)), 1;
  }
});
export {
  m as install
};
//# sourceMappingURL=install-D2im81Ke.js.map
