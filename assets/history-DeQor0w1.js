import { Command as a, HistoryFlags as u, EXIT_CODE as e, Shell as c } from "/assets/prozilla_os_core.js";
const h = new a().setManual({
  purpose: "Display the command history list with line numbers",
  usage: "history",
  description: "Display the list of commands typed since the shell session started."
}).setExecute(async function(l, { stdout: n, shell: i }) {
  const s = i.state.history.filter(({ flags: t }) => t & u.Command);
  if (s.length === 0)
    return e.success;
  const r = s.map((t, o) => `${(o + 1).toString().padStart(5, " ")}  ${t.input}`).join(`
`);
  return await c.printLn(n, r), e.success;
});
export {
  h as history
};
//# sourceMappingURL=history-DeQor0w1.js.map
