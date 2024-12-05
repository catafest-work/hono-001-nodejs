@echo off
git init
git add .
git commit -m "Initial commit: Hono NodeJS REST API"
git branch -M main
git remote add origin https://github.com/catafest-work/hono-001-nodejs.git
git push -u origin main
pause
