#!/bin/bash

# Edit these variables before deploying
COMMIT_MESSAGE="Deployed build to GitHub Pages"
REPO_URL="https://github.com/Prozilla/ProzillaOS"

# ------- You don't need to edit anything below this line -------

echo -e "\e[0;33mDeploying to GitHub Pages...\e[0m"

domain=$(cat dist/CNAME)

echo -e "Domain: \e[0;36m$domain\e[0m"
echo -e "Commit message: \e[0;36m$COMMIT_MESSAGE\e[0m"
echo -e "Repository: \e[0;36m$REPO_URL\e[0m"
echo ""

if gh-pages -x -d dist -m "$COMMIT_MESSAGE" -r "$REPO_URL" ; then
	echo -e "\e[0;32m✓ Successfully deployed to \e[0;36mhttps://$domain/\e[0m"
else
	echo -e "\e[0;31mFailed to deploy\e[0m"
fi