@echo off
echo Building Nuxt App...
call npm run build

echo Preparing Server for Firebase deployment...
node fix-deploy.cjs

echo Backing up package-lock.json...
if exist package-lock.json move package-lock.json package-lock.json.bak

echo Deploying to Firebase...
call npx firebase-tools deploy --only hosting,functions,firestore,storage

echo Restoring package-lock.json...
if exist package-lock.json.bak move package-lock.json.bak package-lock.json

echo Deploy Complete!

