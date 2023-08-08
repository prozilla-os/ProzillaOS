#!/bin/bash

# Edit these variables before deploying
DOMAIN=os.prozilla.dev
COMMIT_MESSAGE="Deployed build to GitHub Pages"
REPO_URL="https://github.com/Prozilla/Prozilla-OS"

# You don't have to edit anything below this line

echo Domain: $DOMAIN
echo Commit message: $COMMIT_MESSAGE
echo -e "Repository: $REPO_URL\n"

echo $DOMAIN > build/CNAME
echo Deploying to GitHub Pages...
if gh-pages -d build -m $COMMIT_MESSAGE -r $REPO_URL ; then
	echo Successfully deployed to https://$DOMAIN/
else
	echo Failed to deploy
fi