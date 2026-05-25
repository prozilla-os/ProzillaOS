import { EventEmitter as a, ANSI as i } from "@prozilla-os/shared";
import { EXIT_CODE as r } from "/assets/prozilla_os_core.js";
class s extends a {
  context;
  shell;
  stdin;
  stdout;
  size;
  mode;
  isRunning = !1;
  useAltBuffer;
  static MODE_CHANGE_EVENT = "modeChange";
  static EXIT_EVENT = "exit";
  static RENDER_EVENT = "render";
  static INPUT_EVENT = "input";
  constructor(t, e, { useAltBuffer: n = !0 } = {}) {
    super(), this.context = t, this.shell = t.shell, this.stdin = t.stdin, this.stdout = t.stdout, this.size = t.size, this.mode = e, this.useAltBuffer = n;
  }
  /**
   * Starts the application and manages the lifecycle of the alternate buffer and input loop.
   */
  async run() {
    this.isRunning = !0;
    try {
      this.useAltBuffer && await this.stdout.write(i.screen.enterAltBuffer), await this.stdout.write(i.screen.clear + i.screen.home), await this.emitAsync(s.RENDER_EVENT), await this.shell.readRawInput(this.stdin, async (t) => {
        this.isRunning && await this.emitAsync(s.INPUT_EVENT, t);
      });
    } catch (t) {
      return console.error(t), r.generalError;
    } finally {
      await this.cleanUp();
    }
    return r.success;
  }
  /**
   * Transitions the application to a new mode and triggers a re-render.
   */
  async setMode(t) {
    if (this.mode === t)
      return;
    const e = this.mode;
    this.mode = t, await this.emitAsync(s.MODE_CHANGE_EVENT, { from: e, to: t }), await this.emitAsync(s.RENDER_EVENT);
  }
  /**
   * Signals the application to stop and closes the input stream.
   */
  exit() {
    this.isRunning = !1, this.stdin.end();
  }
  /**
   * Restores terminal state and signals completion.
   */
  async cleanUp() {
    this.useAltBuffer && await this.stdout.write(i.screen.exitAltBuffer), await this.emitAsync(s.EXIT_EVENT);
  }
  getMode() {
    return this.mode;
  }
}
export {
  s as T
};
//# sourceMappingURL=terminalUIApp-Bmiaqvd9.js.map
