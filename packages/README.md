# Packages

This is an overview of all packages related to ProzillaOS. Each package is published to the npm registry.

## Bundle

This bundle lets you quickly get started with ProzillaOS without the hassle of installing all packages individually.

- [`prozilla-os`](./prozilla-os/): A bundle containing `@prozilla-os/core` and all primary applications of ProzillaOS

## Libraries

These libraries are different modules of ProzillaOS that can be installed separately or via the bundle package `prozilla-os`.

- [`@prozilla-os/core`](./core/): Core functionality, React components and hooks
- [`@prozilla-os/skins`](./skins/): Customizable skins for ProzillaOS
- [`@prozilla-os/shared`](./shared/): Shared functions and utilities
- [`@prozilla-os/dev-tools`](./dev-tools/): Tools for development of ProzillaOS packages

## Applications

### Primary applications

These applications are included in the `prozilla-os` bundle.

- [`@prozilla-os/file-explorer`](./apps/file-explorer/): File explorer app
- [`@prozilla-os/terminal`](./apps/terminal/): Terminal/shell app
- [`@prozilla-os/text-editor`](./apps/text-editor/): Text editor app
- [`@prozilla-os/settings`](./apps/settings/): Settings app
- [`@prozilla-os/media-viewer`](./apps/media-viewer/): Media viewer app
- [`@prozilla-os/browser`](./apps/browser/): Browser app
- [`@prozilla-os/calculator`](./apps/calculator/): Calculator app

### Secondary applications

- [`@prozilla-os/logic-sim`](./apps/logic-sim/): Logic simulator app

### External applications

These applications are related to ProzillaOS and used in the demo, but their source code is hosted in a separate repository on GitHub.

- [`@prozilla-os/minesweeper`][minesweeper]: Minesweeper clone
- [`@prozilla-os/wordle`][wordle]: Wordle clone
- [`@prozilla-os/ball-maze`][ball-maze]: 3D wooden ball maze game
- [`@prozilla-os/bliss-radio`][bliss-radio]: Radio app

[minesweeper]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/minesweeper
[wordle]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/wordle
[ball-maze]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/ball-maze
[bliss-radio]: https://github.com/prozilla-os/Bliss-radio-app
