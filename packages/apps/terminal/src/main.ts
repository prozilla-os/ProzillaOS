import { TerminalApp } from "./core/terminalApp";

const terminal = new TerminalApp();

export { terminal, TerminalApp };
export * from "./core/commands";
export * from "./core/command";
export * from "./core/stream";