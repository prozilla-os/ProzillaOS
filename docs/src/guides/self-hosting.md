---
outline: deep
description: "Learn how to host ProzillaOS locally on your own device"
image: "https://os.prozilla.dev/docs/thumbnails/self-hosting-guide-thumbnail.png"
---

# Self-hosting ProzillaOS

This guide explains how to host ProzillaOS locally on your own device or on your own server.

## Installation

<!--@include: ../../../README.md#getting-started{3,}-->

## Development

Once you have completed the installation process, you can use any of the following scripts to develop ProzillaOS:

```bash
# Build packages using Vite lib mode
pnpm run packages:build

# Start the Vite development server of the demo website
pnpm run demo:start

# Start the VitePress development server of the docs website
pnpm run docs:start
```

## Deploying website

Before deploying the website, you will need to update `demo/src/config/deploy.config.ts` with the appropriate configuration. Remember to make sure your domain settings and output/build directory, in whatever tool you choose to use, matches the configurations in `deploy.config.ts`. Otherwise, deployment might fail or your website will not be indexable by search engines. Most tools will only allow you to adjust these settings after your intitial setup (and first deployment).

### Deploying to GitHub Pages

On your GitHub repository, go to **Settings > Pages**. Adjust your settings, if necessary, to match your configuration in `deploy.config.ts`. Set **Source** to **Deploy from a branch** and set the branch to **gh-pages**.

Once your [installation](#installation) and configurations are complete and you have verified that the site works in a development environment, run the following commands in the given order:

```bash
pnpm run build # Builds all packages and websites
pnpm run deploy # Stages the websites and deploys them to GitHub Pages
```

The Vite config for the website includes a plugin that will automatically generate a sitemap, robots.txt file, cname file and other metadata to facilitate deployment and improve SEO. More information about this step can be found [here](../reference/dev-tools/functions/vite#stagesiteplugin-options).

> [!TIP]
> To make sure each website works correctly after building them and before deploying them, you may use the `pnpm run demo:preview` and `pnpm run docs:preview` scripts.

> [!NOTE]
> The `pnpm run build` script runs the build script for each and every package in the entire project. If you only want to build the packages, demo website or documentation website, use `pnpm run packages:build`, `pnpm run demo:build` and `pnpm run docs:build` respectively. In the deployment process described above, you may substitute `pnpm run build` with any of these scripts. Make sure you have already built the packages once before building the demo or documentation website or the build will fail.

### Deploying to Vercel

Create a new Vercel project and import your GitHub repository. Then configure your project with the values below:

| Option | Value |
| ---: | :--- |
| Build command: | pnpm run build |
| Output directory: | demo/dist |
| Install command: | pnpm install |
| Development command: | pnpm run start |

### Deploying to Cloudflare Pages

Create a new Cloudflare Pages application and import your GitHub repository. Then configure your build settings with the values below:

| Option | Value |
| ---: | :--- |
| Build command: | pnpm run build |
| Output directory: | demo/dist |

## Releasing packages

To create a new release, run the following commands in the given order:

```bash
pnpm run packages:build # Builds all packages
pnpm run packages:update # Creates a new changelog entry
pnpm run packages:release # Releases the latest version of each package along with their changelogs
```

## Troubleshooting

### Module not found

In a local environment, ProzillaOS packages will try to import uncompiled versions of other ProzillaOS packages from their respective `src` directory. If this does not happen correctly and a package tries to import a compiled version of another package from its respective `dist` directory, you might run into an error message saying `module not found`. Executing the command `pnpm run packages:build` will compile each package into their `dist` directories and resolve this error.

### "Only URLs with a scheme in: file, data, and node are supported by the default ESM loader."

This error may be caused by faulty installations of dependencies and can be fixed by running in the following commands in that case:

```bash
pnpm install --fix-lockfile
pnpm run build
```

## Support

Feel free to reach out in our [Discord server](https://discord.gg/JwbyQP4tdz) if you need help with ProzillaOS.
