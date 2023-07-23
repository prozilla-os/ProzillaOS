#!/bin/bash

DOMAIN=os.prozilla.dev
COMMIT_MESSAGE="Deployed build to GitHub Pages"
REPO_URL="https://github.com/Prozilla/Prozilla-OS"

echo $DOMAIN > build/CNAME
echo Deploying to GitHub Pages...
gh-pages -d build -m $COMMIT_MESSAGE -r $REPO_URL