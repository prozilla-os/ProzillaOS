[← Back](../README.md)

# Configuration

ProzillaOS can be configured in numerous ways. The most important one being via the application itself, by going to the Settings app or directly changing the config files in the virtual `~/.config` folder.

For developers, these are the methods of configuring ProzillaOS:

- `src/config`
	
	This directory contains the main configurations for ProzillaOS.

- `styles`

	Everything related to styles can be configured in this directory. The stylesheets inside `styles/global` contain CSS variables, font declarations, etc.

- `public/config`

	This directory has XML files that serve as the default data for config files used by the app in the virtual drive. These can be edited by the user once they're loaded during initialisation.

## Deployment

-  [deploy.config.ts](../../src/config/deploy.config.ts)

Before starting the deployment process, you will need to make sure these parts of your configuration are set up correctly.

### Domain

Set the `DOMAIN` variable to the domain you wish to deploy the website to. You may also want to adjust the `BASE_URL` in case your domain does not have an SSL certificate. If you are using GitHub Pages, go to your Pages settings on GitHub and make sure the domain option there matches this variable.

> [!WARNING]  
> This configuration is also required before starting the staging process.

### Branch

If you are deploying to GitHub Pages, go to your Pages settings on GitHub, navigate to "Build and deployment" and set the source to "Deploy from a branch". Then select the `gh-pages` branch and select the `/ (root)` folder.

If you would like to use a different branch, also set the `REPO.branch` to that same branch.

### Repository URL & commit message

If you are deploying to GitHub Pages, set `REPO.owner` and `REPO.name` to your GitHub username and your repository's name respectively. You may also want to customize the `COMMIT_MESSAGE` variable, which will be used by the `deploy` script to commit the build to the `gh-pages` branch.

## Branding

-  [branding.config.ts](../../src/config/branding.config.ts)

### Name & tag line

Set the `NAME` and `TAG_LINE` variables to the name and tag line or short description you wish to use for the website respectively.