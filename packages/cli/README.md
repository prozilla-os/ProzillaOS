<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.svg?v=2" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/prozilla-os/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/prozilla-os/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/prozilla-os/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About

`@prozilla-os/cli` is a Unix-like shell emulator powered by ProzillaOS.

## Installation

```sh
npm install @prozilla-os/cli
yarn add @prozilla-os/cli
pnpm add @prozilla-os/cli
```

## Usage

```ts
const shell = new HeadlessShell();
const input = process.argv.slice(2).map(Shell.quote).join(" ");

const exitCode = await shell.start(input);
process.exit(exitCode);
```

## Links

- [Demo][demo]
- [Docs][docs]
- [GitHub][github]
- [npm][npm]
- [Discord][discord]
- [Ko-fi][ko-fi]

[demo]: https://os.prozilla.dev/
[docs]: https://os.prozilla.dev/docs/reference/cli
[github]: https://github.com/prozilla-os/ProzillaOS/tree/main/packages/cli
[npm]: https://www.npmjs.com/package/@prozilla-os/cli
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla
