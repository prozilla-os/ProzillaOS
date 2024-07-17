<div align="center">
  <br />
  <p>
    <a href="https://os.prozilla.dev/"><img src="https://os.prozilla.dev/assets/logo.svg?v=2" height="200" alt="ProzillaOS" /></a>
  </p>
  <p>
    <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/Prozilla/ProzillaOS?style=flat-square&color=FF4D5B&label=License"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Stars" src="https://img.shields.io/github/stars/Prozilla/ProzillaOS?style=flat-square&color=FED24C&label=%E2%AD%90"></a>
    <a href="https://github.com/prozilla-os/ProzillaOS"><img alt="Forks" src="https://img.shields.io/github/forks/Prozilla/ProzillaOS?style=flat-square&color=4D9CFF&label=Forks&logo=github"></a>
    <a href="https://www.npmjs.com/package/prozilla-os"><img alt="NPM Version" src="https://img.shields.io/npm/v/prozilla-os?logo=npm&style=flat-square&label=prozilla-os&color=FF4D5B"></a>
  </p>
</div>

## About 

**🔗 [os.prozilla.dev](https://os.prozilla.dev/)**

`@prozilla-os/demo` is a React Vite website that demonstrates the features of ProzillaOS.

## Scripts

| Script | Description |
| --- | --- |
| <pre>pnpm&nbsp;run&nbsp;start</pre> | Start Vite dev server at [localhost:3000](http://localhost:3000/). Changes to module will dynamically be hot-reloaded, so normally there is no need for hard-refreshes. VSCode is configured to run this script whenever the project is opened.
| <pre>pnpm&nbsp;run&nbsp;build</pre> | Compile project using TypeScript and bundle all files into the `dist` directory, or the directory specified in config file. This directory can be uploaded to a web server.
| <pre>pnpm&nbsp;run&nbsp;preview</pre> | Start web server with preview of build at [localhost:8080](http://localhost:8080/). Can be useful for validating build before deploying.
| <pre>pnpm&nbsp;run&nbsp;stage</pre> | Execute [stage.ts](./scripts/stage.ts), which stages the build and prepares it for deployment. Script will generate a sitemap, robots.txt and all other necessary files.
| <pre>pnpm&nbsp;run&nbsp;deploy</pre> | Run `pnpm run build && pnpm run stage`, then execute [deploy.ts](../scripts/deploy.ts), which uploads the staged build to GitHub Pages on branch called `gh-pages`. This should then trigger a GitHub Action that deploys the build to production.
| <pre>pnpm&nbsp;run&nbsp;fetch</pre> | Fetch the repository tree using GitHub's API and store it as a JSON file that will be used to populate the virtual drive. More information can be found on the [virtual drive](./features/virtual-drive/README.md) page.

## Links

- [Website][website]
- [GitHub][github]
- [Discord][discord]
- [Ko-fi][ko-fi]

[demo]: https://os.prozilla.dev/
[github]: https://github.com/prozilla-os/ProzillaOS/tree/main/packages/demo
[discord]: https://discord.gg/JwbyQP4tdz
[ko-fi]: https://ko-fi.com/prozilla