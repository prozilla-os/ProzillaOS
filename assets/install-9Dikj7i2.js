import { Command as l, Shell as t } from "/assets/prozilla_os_core.js";
const m = new l().setManual({
  purpose: "Install an app from a URL or npm package",
  usage: "install [--export <name>] <npm-package | url>",
  description: "Dynamically install an app from an npm package name (e.g. @scope/package) or a direct URL to an ES module that exports an App instance.",
  options: {
    "-e, --export <name>": "Name of the export that contains the App instance (default: checks `app` then `default`)"
  }
}).addOption({ short: "e", long: "export", isInput: !0 }).setRequireArgs(!0).setExecute(async function(i, { stdout: n, stderr: r, systemManager: s, inputs: p }) {
  const e = i[0];
  if (!e)
    return await t.writeError(r, "install", "expected a package name or URL"), 1;
  await n.write(`Installing "${e}"...
`);
  try {
    const a = {};
    p.e && (a.exportName = p.e);
    const o = await s.appsConfig.installApp(e, a);
    await t.printLn(n, `Successfully installed "${o.name}" (${o.id})`);
  } catch (a) {
    return await t.writeError(r, "install", a instanceof Error ? a.message : String(a)), 1;
  }
});
export {
  m as install
};
//# sourceMappingURL=install-9Dikj7i2.js.map
