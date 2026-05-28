---
outline: deep
description: "Learn how to host ProzillaOS locally on your own device"
image: "https://os.prozilla.dev/docs/thumbnails/self-hosting-guide-thumbnail.png"
---

# Self-hosting ProzillaOS

This guide explains how to host ProzillaOS locally on your own device or on your own server.

<!--@include: ../../../README.md#development-->

## Development

Once you have completed the installation process, refer to the [Development guide](./development) for detailed instructions and a full list of available commands.

### Quick start

```bash
# Build all packages
pnpm run packages:build

# Start the Vite development server of the demo website
pnpm run demo:start

# Start the VitePress development server of the docs website
pnpm run docs:start
```

## Deploying website

Before deploying the website, you will need to update `demo/src/config/deploy.config.ts` with the appropriate configuration. Remember to make sure your domain settings and output/build directory, in whatever tool you choose to use, matches the configurations in `deploy.config.ts`. Otherwise, deployment might fail or your website will not be indexable by search engines. Most tools will only allow you to adjust these settings after your initial setup (and first deployment).

### Deploying to GitHub Pages

On your GitHub repository, go to **Settings > Pages**. Adjust your settings, if necessary, to match your configuration in `deploy.config.ts`. Set **Source** to **Deploy from a branch** and set the branch to **gh-pages**.

Once your setup and configurations are complete and you have verified that the site works in a development environment, run the following command:

```bash
pnpm run deploy # Build all packages and websites, stage them and deploy them to GitHub Pages
```

The Vite config for the website includes a plugin that will automatically generate a sitemap, robots.txt file, cname file and other metadata to facilitate deployment and improve SEO. More information about this step can be found on the [reference page](../reference/dev-tools/Functions/stageSitePlugin#options).

::: tip

To make sure each website works correctly before deploying them, you can use the preview scripts to start the preview servers:

```bash
pnpm run demo:preview # Preview the demo website build
pnpm run docs:preview # Preview the docs website build
pnpm run preview # Preview the combined website build
```

:::

### Deploying to Vercel

Create a new Vercel project and import your GitHub repository. Then configure your project with the values below:

| Option | Value |
| ---: | :--- |
| Build command: | pnpm run build |
| Output directory: | dist |
| Install command: | pnpm install |
| Development command: | pnpm run start |

### Deploying to Cloudflare Pages

Create a new Cloudflare Pages application and import your GitHub repository. Then configure your build settings with the values below:

| Option | Value |
| ---: | :--- |
| Build command: | pnpm run build |
| Output directory: | dist |

## Releasing packages

To create a new release using [Changesets](https://changesets.dev/), run the following commands in the given order:

```bash
pnpm run packages:build # Build all packages
pnpm run packages:update # Add a new changeset
pnpm run packages:version # Update versions and write changelogs based on changesets
pnpm run packages:release # Releases the latest version of each package along with their changelogs
```

## Troubleshooting

::: details Module not found

In a local environment, ProzillaOS packages will try to import uncompiled versions of other ProzillaOS packages from their respective `src` directory. If this does not happen correctly and a package tries to import a compiled version of another package from its respective `dist` directory, you might run into an error message saying `module not found`. Executing the command `pnpm run packages:build` will compile each package into their `dist` directories and resolve this error.

:::

::: details "Only URLs with a scheme in: file, data, and node are supported by the default ESM loader."

This error may be caused by faulty installations of dependencies and can be fixed by running in the following commands in that case:

```bash
pnpm install --fix-lockfile
pnpm run build
```

:::

## Support

If you have questions or need help, reach out to the community on [Discord](https://discord.gg/JwbyQP4tdz).
