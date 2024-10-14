# Contributing guide

Thank you for considering contributing to ProzillaOS! Most of the information you need, can be found on the official [documentation site](https://os.prozilla.dev/docs/). If you have any questions, feel free to reach out on [Discord](https://discord.gg/JwbyQP4tdz).

## Repository setup

See [Self-hosting guide](https://os.prozilla.dev/docs/guides/self-hosting) for more information.

## Project structure

ProzillaOS is a monorepo with multiple packages. See [packages/README.md](packages/README.md) for more information about how ProzillaOS is structured.

### Tech stack

- **Vite** - Building packages and websites
- **TypeScript** - Type safety
- **React** - UI
- **Eslint** - Code linting
- **pnpm** - Package management
- **VitePress** - Documentation

### Code style

| Category | Case | Example | Name should match |
| ---: | --- | --- | --- |
| Folders | kebab-case | `virtual-drive` | |
| `.ts` files | camelCase | `virtualRoot.ts` | |
| `.tsx` files | PascalCase | `Desktop.tsx` | React component |
| `.css` files & static assets | kebab-case | `global.css` | |
| Local `.module.css` files | PascalCase | `Desktop.module.css` | React component |
| Global `.module.css` files | kebab-case | `utils.module.css` | |
| CSS class names | PascalCase | ```.WindowsView``` | React component |
| Variables | camelCase | ```const fooBar = true;``` | |
| Global constant variables | MACRO_CASE | ```export const NAME = "ProzillaOS";``` | |
| Classes | PascalCase | ```class WindowsManager { }``` | |
| React components | PascalCase | ```export function WindowsView({ }) { }``` | |
| Functions | camelCase | ```function focusWindow() { }``` | |
| Types | PascalCase | ```type FooBar = boolean;``` | |
