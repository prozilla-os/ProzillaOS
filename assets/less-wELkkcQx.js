import { Command as p, Shell as o } from "/assets/prozilla_os_core.js";
import { ANSI as t } from "@prozilla-os/shared";
import { T as n } from "/assets/terminalUIApp-Bmiaqvd9.js";
class u extends n {
  lines = [];
  scrollIndex = 0;
  fileName;
  constructor(i, e) {
    super(
      i,
      0
      /* Viewer */
    ), this.fileName = e[0] ?? "stdin", this.on(n.RENDER_EVENT, async () => {
      await this.render();
    }), this.on(n.INPUT_EVENT, async (s) => {
      await this.handleInput(s);
    });
  }
  /**
   * Reads the file or stream content.
   */
  async init(i) {
    if (!i.length)
      return "No file specified";
    const e = this.context.workingDirectory.navigate(this.fileName);
    if (!e)
      return `${this.fileName}: ${o.INVALID_PATH_ERROR}`;
    if (e.isFolder())
      return `${this.fileName}: Is a directory`;
    const s = await e.read();
    return this.lines = s?.split(`
`) ?? [""], null;
  }
  async render() {
    const i = this.size.y, e = i - 1;
    let s = t.screen.home + t.screen.clear;
    const a = this.lines.slice(
      this.scrollIndex,
      this.scrollIndex + e
    );
    if (s += a.join(`
`) + `
`, a.length < e)
      for (let l = 0; l < e - a.length; l++)
        s += `~
`;
    const c = i, h = Math.round((this.scrollIndex + e) / this.lines.length * 100), d = Math.min(100, h);
    s += t.cursor.position(c, 1) + t.decoration.invert, s += ` ${this.fileName} (line ${this.scrollIndex + 1}/${this.lines.length}) ${d}% `, s += t.reset, await this.stdout.write(s + t.cursor.hide);
  }
  async handleInput(i) {
    const e = this.size.y - 1;
    switch (i) {
      case "q":
      case t.input.ctrlC:
      case t.input.escape:
        await this.stdout.write(t.cursor.show), this.exit();
        return;
      case "j":
      case t.input.arrowDown:
        this.scrollIndex + e < this.lines.length && this.scrollIndex++;
        break;
      case "k":
      case t.input.arrowUp:
        this.scrollIndex > 0 && this.scrollIndex--;
        break;
      case " ":
      case t.input.pageDown:
        this.scrollIndex = Math.min(
          this.lines.length - e,
          this.scrollIndex + e
        ), this.scrollIndex < 0 && (this.scrollIndex = 0);
        break;
      case "b":
      case t.input.pageUp:
        this.scrollIndex = Math.max(0, this.scrollIndex - e);
        break;
      case "g":
        this.scrollIndex = 0;
        break;
      case "G":
        this.scrollIndex = Math.max(0, this.lines.length - e);
        break;
    }
    await this.emitAsync(n.RENDER_EVENT);
  }
}
const f = new p().setManual({
  purpose: "Display the contents of a file in a terminal",
  usage: "less [FILE]",
  description: "Less is a program similar to more, but it has many more features."
}).setExecute(async function(r, i) {
  const e = new u(i, r), s = await e.init(r);
  return s ? await o.writeError(i.stderr, this.name, s) : await e.run();
});
export {
  f as less
};
//# sourceMappingURL=less-wELkkcQx.js.map
