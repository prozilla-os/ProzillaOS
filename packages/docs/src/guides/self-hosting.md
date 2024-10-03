---
outline: deep
---

# Self-hosting

This guide explains how to host ProzillaOS locally on your own device or on your own server.

## Installation

<!--@include: ../../../../README.md#getting-started{3,}-->

## Scripts

ProzillaOS uses the package manager [pnpm](https://pnpm.io/) to run scripts.

### General

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;start</pre> | Run [`pnpm run demo:start`](#package-prozilla-os-demo). VSCode is configured to run this script whenever the project is opened.
| <pre>pnpm&nbsp;run&nbsp;build</pre> | Build every package in sequential order.
| <pre>pnpm&nbsp;run&nbsp;stage</pre> | Copy and combine the build of each package that comprises the website in the `dist` directory at the root.
| <pre>pnpm&nbsp;run&nbsp;deploy</pre> | Clear the `dist` directory, stage each package that comprises the website, then deploy to GitHub pages. This should trigger a GitHub Action that deploys the build to production.

### Public packages

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;packages:build</pre> | Build all dependencies of the `prozilla-os` package in sequential order and output to respective `dist` directories.
| <pre>pnpm&nbsp;run&nbsp;packages:update</pre> | Create a new changeset for packages and update their version accordingly.
| <pre>pnpm&nbsp;run&nbsp;packages:release</pre> | Publish the latest versions of each package to the npm registry.

> [!TIP] 
> Use `pnpm --filter <package_selector> build` to build a sepecific subset of packages or a single package and output to respective `dist` directory/directories. For more information about selecting/filtering specific packages, read [pnpm's documentation on filtering](https://pnpm.io/filtering).

### Internal packages

#### `@prozilla-os/demo`

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;demo:start</pre> | Start Vite dev server at [localhost:3000](http://localhost:3000/). Changes to module will dynamically be hot-reloaded, so normally there is no need for hard-refreshes. VSCode is configured to run this script whenever the project is opened.
| <pre>pnpm&nbsp;run&nbsp;demo:build</pre> | Compile project using TypeScript and bundle all files into the `dist` directory, or the directory specified in config file. This directory can be uploaded to a web server.
| <pre>pnpm&nbsp;run&nbsp;demo:preview</pre> | Start web server with preview of build at [localhost:8080](http://localhost:8080/). Can be useful for validating build before deploying.
| <pre>pnpm&nbsp;run&nbsp;demo:stage</pre> | Execute staging script, which stages the build and prepares it for deployment. Script will generate a sitemap, robots.txt and all other necessary files.
| <pre>pnpm&nbsp;run&nbsp;demo:fetch</pre> | Fetch the repository tree using GitHub's API and store it as a JSON file that will be used to populate the virtual drive.

#### `@prozilla-os/docs`

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;docs:start</pre> | Start VitePress dev server at [localhost:3000](http://localhost:3000/). Changes to module will dynamically be hot-reloaded, so normally there is no need for hard-refreshes.
| <pre>pnpm&nbsp;run&nbsp;docs:build</pre> | Compile project using VitePress and output to the `dist` directory.
| <pre>pnpm&nbsp;run&nbsp;docs:preview</pre> | Start web server with preview of build at [localhost:8080](http://localhost:8080/). Can be useful for validating build before deploying.
| <pre>pnpm&nbsp;run&nbsp;docs:generate</pre> | Generate basic information files in JSON format to use as a base for writing the documentation and output to the `data` directory.