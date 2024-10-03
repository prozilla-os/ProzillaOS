# Packages

This is an overview of all packages related to ProzillaOS.

<!-- #region libraries -->

## Libraries (public)

These libraries are different modules of ProzillaOS that can be installed separately or via the bundle package `prozilla-os`. Each library is published to the npm registry.

- [`prozilla-os`](./prozilla-os/): A bundle containing the core packages and all standard applications of ProzillaOS
- [`@prozilla-os/core`](./core/): Core functionality, React components and hooks
- [`@prozilla-os/skins`](./skins/): Customizable skins for ProzillaOS
- [`@prozilla-os/shared`](./shared/): Shared functions and utilities
- [`@prozilla-os/dev-tools`](./dev-tools/): Tools for development of ProzillaOS packages

### Standard applications

These applications are included in the `prozilla-os` bundle.

- [`@prozilla-os/file-explorer`](./apps/file-explorer/): File explorer app
- [`@prozilla-os/terminal`](./apps/terminal/): Terminal/shell app
- [`@prozilla-os/text-editor`](./apps/text-editor/): Text editor app
- [`@prozilla-os/settings`](./apps/settings/): Settings app
- [`@prozilla-os/media-viewer`](./apps/media-viewer/): Media viewer app
- [`@prozilla-os/browser`](./apps/browser/): Browser app
- [`@prozilla-os/calculator`](./apps/calculator/): Calculator app

### Non-standard applications

- [`@prozilla-os/logic-sim`](./apps/logic-sim/): Logic simulator app

<!-- #endregion libraries -->

<!-- #region sites -->

## Sites (private)

These packages contains the source code of parts of the ProzillaOS website. They are published to GitHub pages.

- [`@prozilla-os/demo`](./demo/): Demo site - **[os.prozilla.dev](https://os.prozilla.dev/)**
- [`@prozilla-os/docs`](./docs/): Documentation site - **[os.prozilla.dev/docs](https://os.prozilla.dev/docs/)**

<!-- #endregion sites -->

<!-- #region external -->

## External applications

These applications are related to ProzillaOS and used in the website, but their source code is hosted in a separate repository on GitHub.

- [`@prozilla-os/minesweeper`][minesweeper]: Minesweeper clone
- [`@prozilla-os/wordle`][wordle]: Wordle clone
- [`@prozilla-os/ball-maze`][ball-maze]: 3D wooden ball maze game
- [`@prozilla-os/bliss-radio`][bliss-radio]: Radio app

[minesweeper]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/minesweeper
[wordle]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/wordle
[ball-maze]: https://github.com/prozilla-os/ProzillaOS-games/blob/main/packages/games/ball-maze
[bliss-radio]: https://github.com/prozilla-os/Bliss-radio-app

<!-- #endregion external -->
