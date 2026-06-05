import { Command as r, HistoryFlags as s } from "/assets/main.js";
const o = new r().setManual({
  purpose: "Clear terminal screen"
}).setExecute(function(a, { shell: e }) {
  e.pushHistory({
    flags: s.Clear
  });
});
export {
  o as clear
};
//# sourceMappingURL=clear-C8xhqHmC.js.map
