#!/bin/bash

# Edit these variables before deploying
DOMAIN="os.prozilla.dev"
COMMIT_MESSAGE="Deployed build to GitHub Pages"
REPO_URL="https://github.com/Prozilla/ProzillaOS"

# ------- You don't need to edit anything below this line -------

echo -e "Domain: \e[0;36m$DOMAIN\e[0m"
echo -e "Commit message: \e[0;36m$COMMIT_MESSAGE\e[0m"
echo -e "Repository: \e[0;36m$REPO_URL\e[0m\n"

echo -e "\e[0;33mConfiguring routing...\e[0m"
echo $DOMAIN > dist/CNAME
cp dist/index.html dist/404.html

# Use template and pages data to generate index.html files
input="tmp/pages.csv"
template="tmp/template.html"
while IFS=";" read -r app_id app_name app_description
do
	path="dist/$app_id/index.html"
	echo -e "- dist/\e[0;36m$app_id/index.html\e[0m"

	mkdir -p "dist/$app_id"
	cp $template $path

	# Fill template
	sed -i "s/_APP_NAME/$app_name/g" $path
	sed -i "s/_APP_DESCRIPTION/$app_description/g" $path
	sed -i "s/_APP_ID/$app_id/g" $path
done < <(tail -n +2 $input)
rm -r tmp
echo ""

echo -e "\e[0;33mDeploying to GitHub Pages...\e[0m"
if gh-pages -d dist -m $COMMIT_MESSAGE -r $REPO_URL ; then
	echo -e "\e[0;32m✓ Successfully deployed to \e[0;36mhttps://$DOMAIN/\e[0m"
else
	echo -e "\e[0;31mFailed to deploy\e[0m"
fi