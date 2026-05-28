---
outline: deep
description: "Learn how to develop ProzillaOS locally"
image: "https://os.prozilla.dev/docs/thumbnails/development-guide-thumbnail.png"
---

# Development guide

This guide covers everything you need to contribute to ProzillaOS or create your own virtual operating system. For instructions on deploying the project to a server, see the [Self-hosting guide](./self-hosting#deploying-website).

<!--@include: ../../../README.md#development-->

## Project structure

ProzillaOS is a monorepo managed with pnpm workspaces. See [packages/README.md](../reference/packages) for a full overview of the package structure.

### Tech stack

- [**Vite**](https://vite.dev/) - Building packages and websites
- [**TypeScript**](https://www.typescriptlang.org/) - Type safety
- [**React**](https://react.dev/) - UI
- [**ESLint**](https://eslint.org/) - Code linting
- [**pnpm**](https://pnpm.io/) - Package management
- [**Turborepo**](https://turbo.build/) - Build system
- [**VitePress**](https://vitepress.dev/) - Documentation
- [**Vitest**](https://vitest.dev/) - Testing

## Commands

| Command | Description |
| --- | --- |
| `pnpm run build` | Build all packages, demo and docs |
| `pnpm run packages:build` | Build only packages (not websites) |
| `pnpm run start` | Start the demo development server |
| `pnpm run lint` | Lint all files with ESLint (auto-fix) |
| `pnpm run lint:nofix` | Lint all files with ESLint (no auto-fix) |
| `pnpm run test` | Run all tests with Vitest |
| `pnpm run deploy` | Deploy the built site to GitHub Pages |
| `pnpm run deploy:dry` | Preview deployment without publishing |
| `pnpm run clean` | Remove all build artifacts |
| `pnpm run demo:start` | Start the demo development server |
| `pnpm run demo:build` | Build the demo website for production |
| `pnpm run docs:start` | Start the docs development server |
| `pnpm run docs:build` | Build the docs website for production |
| `pnpm run docs:api` | Generate API reference docs via TypeDoc |
| `pnpm run docs:api:libs` | Generate API docs for libraries only |
| `pnpm run docs:api:apps` | Generate API docs for apps only |

Thanks to Turborepo, all tasks will automatically run in the correct order, run in parallel whenever possible and cache their builds to save time.

## Code style

Most conventions are enforced by ESLint. ESLint is configured with TypeScript-aware rules. Run `pnpm run lint` to check and auto-fix all files. The configuration is in `eslint.config.js` at the project root.

### Naming conventions

| Category | Case | Example | Name should match |
| ---: | --- | --- | --- |
| Folders | kebab-case | `virtual-drive` | |
| `.ts` files | camelCase | `virtualRoot.ts` | |
| `.tsx` files | PascalCase | `Desktop.tsx` | React component |
| `.css` files & static assets | kebab-case | `global.css` | |
| Local `.module.css` files | PascalCase | `Desktop.module.css` | React component |
| Global `.module.css` files | kebab-case | `utils.module.css` | |
| CSS class names | PascalCase | `.WindowsView` | React component |
| Variables | camelCase | `const fooBar = true;` | |
| Global constant variables | MACRO_CASE | `export const NAME = "ProzillaOS";` | |
| Classes | PascalCase | `class WindowsManager { }` | |
| React components | PascalCase | `export function WindowsView({ }) { }` | |
| Functions | camelCase | `function focusWindow() { }` | |
| Types | PascalCase | `type FooBar = boolean;` | |

### Other conventions

- **Indentation:** Tabs
- **Quotes:** Double quotes
- **Semicolons:** Required
- **Imports:** Use `type` prefix for type-only imports (`import type { Foo } from "..."`)
- **React components:** One component per file, no other exports
- **JSDoc:** Checked by `eslint-plugin-jsdoc`, complete sentences and hyphens before parameter descriptions

## Branching

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `release` - Release preparation

## Commits

Commit messages use descriptive English sentences. An optional scope prefix (the package name) can be used for clarity. The scope of the package itself (e.g., `@prozilla-os/`) is omitted for brevity. Commit message subjects should be at most 50 characters long, unless that is not enough to cover all the changes, in which case it might be worth considering splitting up your commit.

### Examples

```txt
core: Added virtual drive support
demo: Updated wordle
Fixed build error
Refactored shell + updated documentation
```

## Pull requests

- PRs should target the `main` branch
- The title should clearly describe the change
- Keep PRs focused on a single concern when possible

## Testing

Tests use [Vitest](https://vitest.dev/). Run `pnpm run test` to execute all test suites across the monorepo.

```bash
pnpm run test
```

## Documentation

The documentation is built with [VitePress](https://vitepress.dev/) and lives in the `docs/` directory.

### Running locally

```bash
pnpm run docs:start
```

The documentation website will be available at [localhost:3000/docs](http://localhost:3000/docs/).

### API reference

The API reference pages under `docs/src/reference/` are auto-generated by [TypeDoc](https://typedoc.org/) using `typedoc-plugin-markdown`. To regenerate them:

```bash
pnpm run docs:api # All packages
pnpm run docs:api:libs # Libraries only (core, shared, skins, dev-tools)
pnpm run docs:api:apps # Applications only
```

API reference generation runs automatically before `pnpm run docs:build`.

### Navigation

The docs sidebar is configured in `docs/.vitepress/nav.config.ts`. Package reference items are generated dynamically from `packages.config.ts`.

## Releasing packages

See the [Self-hosting guide](./self-hosting#releasing-packages) for instructions on publishing packages to npm.

## Support

If you have questions or need help, reach out to the community on [Discord](https://discord.gg/JwbyQP4tdz).
