#!/bin/bash

mkdir -p ~/.ssh
ssh-keyscan github.com >> ~/.ssh/known_hosts
ssh-agent -a $SSH_AUTH_SOCK > /dev/null
ssh-add - <<< $GH_SSH_PRIVATE_KEY # ${{ secrets.SSH_PRIVATE_KEY }} not available in .sh. Need to be from yml env

git submodule init
git submodule update

cd gh-page
git checkout main && git pull # Submodule has no branch. Need to checkout main

# Build
rm -r *
yarn build
cp -r ../dist/* .

git config --global user.email "changbobbyliu@gmail.com"
git config --global user.name "Chang <GitHub Action>"
git add .
git commit -m "new build @ $(date +"%s")"
git push

echo "✨ Done!"
