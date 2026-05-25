import { Command as c, Shell as u } from "/assets/prozilla_os_core.js";
import { ANSI as e, Ansi as n } from "@prozilla-os/shared";
import { T as d } from "/assets/terminalUIApp-Bmiaqvd9.js";
import { T as m } from "/assets/textEditorApp-BM3EiMoV.js";
class p extends m {
  constructor(t, i) {
    super(t, 0, { args: i });
  }
  async render() {
    const t = this.size.y, i = t - 4;
    let s = e.screen.home + e.screen.clear;
    s += e.cursor.position(1, 1) + n.invert(` GNU nano 2.0.6             File: ${this.fileName} `) + `
`;
    for (let r = 0; r < i; r++)
      r < this.lines.length ? s += this.lines[r] + `
` : s += `
`;
    const h = t - 2;
    s += e.cursor.position(h, 1) + (this.statusMessage.length ? this.statusMessage : "");
    const a = t - 1;
    s += e.cursor.position(a, 1) + n.invert("^G") + " Get Help  " + n.invert("^O") + " Write Out " + n.invert("^R") + " Read File " + n.invert("^Y") + " Prev Pg" + e.cursor.position(a + 1, 1) + n.invert("^X") + " Exit      " + n.invert("^J") + " Justify   " + n.invert("^W") + " Where Is  " + n.invert("^V") + " Next Pg";
    const l = e.cursor.position(this.rowIndex + 2, this.columnIndex + 1);
    await this.stdout.write(s + l);
  }
  async handleInput(t) {
    this.statusMessage = "";
    const i = this.lines[this.rowIndex];
    switch (t) {
      case e.input.ctrlO:
        this.saveFile();
        break;
      case e.input.ctrlX:
        this.exit();
        return;
      case e.input.carriageReturn:
      case e.input.lineFeed:
        this.lines[this.rowIndex] = i.slice(0, this.columnIndex), this.lines.splice(this.rowIndex + 1, 0, i.slice(this.columnIndex)), this.rowIndex++, this.columnIndex = 0;
        break;
      case e.input.backspace:
      case e.input.delete:
        this.deleteCharacter(i);
        break;
      case e.input.arrowUp:
        this.rowIndex = Math.max(0, this.rowIndex - 1), this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
        break;
      case e.input.arrowDown:
        this.rowIndex = Math.min(this.lines.length - 1, this.rowIndex + 1), this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
        break;
      case e.input.arrowLeft:
        this.columnIndex = Math.max(0, this.columnIndex - 1);
        break;
      case e.input.arrowRight:
        this.columnIndex = Math.min(this.lines[this.rowIndex].length, this.columnIndex + 1);
        break;
      default:
        t.length === 1 && t.charCodeAt(0) >= 32 && (this.lines[this.rowIndex] = i.slice(0, this.columnIndex) + t + i.slice(this.columnIndex), this.columnIndex++);
        break;
    }
    await this.emitAsync(d.RENDER_EVENT);
  }
  saveFile() {
    if (!this.args.length)
      return this.statusMessage = "File Name to Write: " + this.fileName, !1;
    const t = super.saveFile();
    return t && (this.statusMessage = `[ Wrote ${this.lines.length} lines ]`), t;
  }
}
const f = new c().setManual({
  purpose: "Nano's ANOther editor, an enhanced free Pico clone",
  usage: "nano [FILE]",
  description: `nano is a small, free and friendly editor which aims to replace Pico, the default editor included in the non-free Pine package. Rather than just copying Pico's look and feel, nano also implements some missing (or disabled by default) features in Pico, such as "search and replace" and "go to line and column number"`
}).setExecute(async function(o, t) {
  const i = new p(t, o), s = await i.init();
  return s.isError() ? await u.writeError(t.stderr, this.name, s.error) : await i.run();
});
export {
  f as nano
};
//# sourceMappingURL=nano-DsRjsQ-k.js.map
