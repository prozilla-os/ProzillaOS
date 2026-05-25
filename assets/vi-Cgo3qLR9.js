import { Command as m, Shell as d } from "/assets/prozilla_os_core.js";
import { ANSI as t, Ansi as l } from "@prozilla-os/shared";
import { T as u } from "/assets/terminalUIApp-Bmiaqvd9.js";
import { T as f } from "/assets/textEditorApp-BM3EiMoV.js";
class p extends f {
  commandBuffer = "";
  constructor(e, s) {
    super(e, 0, { args: s, defaultFileName: "[No Name]" });
  }
  async render() {
    const e = this.size.y, s = e - 1;
    let i = t.screen.home + t.screen.clear;
    for (let n = 0; n < s; n++)
      n < this.lines.length ? i += this.lines[n] + `
` : i += l.blue("~") + `
`;
    const o = e;
    if (i += t.cursor.position(o, 1), this.mode === 1)
      i += l.bold("-- INSERT --");
    else if (this.mode === 2)
      i += ":" + this.commandBuffer;
    else {
      const n = this.statusMessage.length ? ` ${this.statusMessage}` : "";
      i += `"${this.fileName}" ${this.lines.length}L${n}`;
    }
    let r = this.rowIndex + 1, h = this.columnIndex + 1;
    this.mode === 2 && (r = o, h = this.commandBuffer.length + 2);
    const c = t.cursor.position(r, h);
    await this.stdout.write(i + c);
  }
  async handleInput(e) {
    switch (this.statusMessage = "", this.mode) {
      case 0:
        await this.handleCommandMode(e);
        break;
      case 2:
        await this.handleCommandLineMode(e);
        break;
      case 1:
        await this.handleInsertMode(e);
        break;
    }
    await this.emitAsync(u.RENDER_EVENT);
  }
  async handleCommandMode(e) {
    switch (e) {
      case ":":
        this.commandBuffer = "", await this.setMode(
          2
          /* CommandLine */
        );
        break;
      case "i":
        await this.setMode(
          1
          /* Insert */
        );
        break;
      case "h":
        this.columnIndex = Math.max(0, this.columnIndex - 1);
        break;
      case "j":
        this.rowIndex = Math.min(this.lines.length - 1, this.rowIndex + 1), this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
        break;
      case "k":
        this.rowIndex = Math.max(0, this.rowIndex - 1), this.columnIndex = Math.min(this.columnIndex, this.lines[this.rowIndex].length);
        break;
      case "l":
        this.columnIndex = Math.min(this.lines[this.rowIndex].length, this.columnIndex + 1);
        break;
      case t.input.ctrlC:
        this.exit();
        break;
    }
  }
  async handleCommandLineMode(e) {
    e === t.input.escape ? (this.commandBuffer = "", await this.setMode(
      0
      /* Command */
    )) : e === t.input.carriageReturn || e === t.input.lineFeed ? await this.executeCommand() : e === t.input.backspace || e === t.input.delete ? this.commandBuffer.length ? this.commandBuffer = this.commandBuffer.slice(0, -1) : await this.setMode(
      0
      /* Command */
    ) : this.commandBuffer += e;
  }
  async handleInsertMode(e) {
    const s = this.lines[this.rowIndex];
    e === t.input.escape ? await this.setMode(
      0
      /* Command */
    ) : e === t.input.carriageReturn || e === t.input.lineFeed ? (this.lines[this.rowIndex] = s.slice(0, this.columnIndex), this.lines.splice(this.rowIndex + 1, 0, s.slice(this.columnIndex)), this.rowIndex++, this.columnIndex = 0) : e === t.input.backspace || e === t.input.delete ? this.deleteCharacter(s) : e.length === 1 && e.charCodeAt(0) >= 32 && (this.lines[this.rowIndex] = s.slice(0, this.columnIndex) + e + s.slice(this.columnIndex), this.columnIndex++);
  }
  async executeCommand() {
    const e = this.commandBuffer.trim(), s = e.includes("w") || e === "x", i = e.includes("q") || e === "x";
    if (s && this.saveFile(), i) {
      this.exit();
      return;
    }
    !s && e.length && (this.statusMessage = `Not an editor command: ${e}`), this.commandBuffer = "", await this.setMode(
      0
      /* Command */
    );
  }
  saveFile() {
    if (!this.args.length || this.fileName === "[No Name]")
      return this.statusMessage = "No file name", !1;
    const e = super.saveFile();
    return e && (this.statusMessage = "written"), e;
  }
}
const M = new m().setManual({
  purpose: "Vi IMproved, a programmers text editor ",
  usage: "vi [FILE]",
  description: "Vim is a text editor that is upwards compatible to Vi. It can be used to edit all kinds of plain text. It is especially useful for editing programs."
}).setExecute(async function(a, e) {
  const s = new p(e, a), i = await s.init();
  return i.isError() ? await d.writeError(e.stderr, this.name, i.error) : await s.run();
});
export {
  M as vi
};
//# sourceMappingURL=vi-Cgo3qLR9.js.map
