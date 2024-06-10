[← Back](../README.md)

# Configuration

ProzillaOS can be configured in numerous ways. The most important one being via the application itself, by going to the Settings app or directly changing the config files in the virtual `~/.config` folder.

For developers, these are the methods of configuring ProzillaOS:

- `src/config` - The `src/config` directory holds all global variables used in the rest of the `src` directory, which are mostly string and number constants, but also includes some arrays and dictionaries that can be adjusted to configure ProzillaOS.
- `styles` - Everything related to styles, can be configured in `styles` directory. Most configurations will happen inside `styles/global`, where you can define the fonts, css variables/properties and other details.
- `public/config` - This directory has XML files that serve as the default data for config files used by the app in the virtual drive. These can be edited by the user once they're loaded during initialisation.

## Deployment

Before starting the deployment process, you will need to make sure these parts of your configuration are set up correctly.

### Domain

To change the domain that your website will be deployed to, go to [`branding.config.ts`](../../src/config/branding.config.ts) and set the `DOMAIN` variable to your own domain. You may also want to adjust the `BASE_URL` in case your domain does not have an SSL certificate. If you are using GitHub Pages, go to your Pages settings on GitHub and make sure the domain matches the one you just configured to deploy to.

> [!WARNING]  
> This configuration is also required before starting the staging process.

### Branch

If you are deploying to GitHub Pages, go to your Pages settings on GitHub, navigate to "Build and deployment" and set the source to "Deploy from a branch". Then select the `gh-pages` branch, select the `/ (root)` folder and click "Save". Make sure your domain matches the domain in your configuration, as described in the previous paragraph.

### Repository URL & commit message

If you are deploying to GitHub Pages, open [deploy.sh](../../deploy.sh) and set the `REPO_URL` variable to the URL of your GitHub repository. You may also want to customize the `COMMIT_MESSAGE` variable, which will be used to name commits made to the `gh-pages` branch.

## Branding

### Name

Change the variable called `NAME` in [`branding.config.ts`](../../src/config/branding.config.ts).