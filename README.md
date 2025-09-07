# Fortune Cookie Easter Egg Game

A tiny, responsive web game with 12 colorful Easter eggs. Click/tap (or swipe on mobile) to crack an egg and reveal a fortune. Includes a rare Golden Fortune, typing effect, share button, and optional crack sound.

## Features
- 12 clickable eggs in a grid (responsive)
- Hover/click on desktop, swipe to select on mobile
- Crack animation and fortune reveal with typing effect
- Randomized egg positions each load
- Rare golden egg that reveals a special fortune
- Share (Web Share API or copy-to-clipboard fallback)
- Optional synthesized crack sound toggle

## Tech
- HTML + CSS + Vanilla JS
- No build step required

## Run locally
Open `index.html` in your browser.

## Deploy to GitHub Pages
1. Create a new GitHub repository (e.g., `fortune-cookie-easter-egg`).
2. Initialize git and push:

```bash
git init && git add . && git commit -m "Initial commit: Fortune Cookie Easter Egg Game"

git branch -M main
# Replace <YOUR_USERNAME> and <REPO_NAME>
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git

git push -u origin main
```

3. Enable Pages:
   - Repo Settings → Pages → Build and deployment
   - Source: Deploy from a branch
   - Branch: `main` and folder: `/ (root)`
   - Your site: `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

(Optional) Use a `gh-pages` branch instead:
```bash
git checkout --orphan gh-pages
rm -rf * .* 2>/dev/null || true
git checkout main -- index.html styles.css app.js README.md

git add index.html styles.css app.js README.md
git commit -m "Deploy to gh-pages"
git push -u origin gh-pages
```
Then set Pages to use the `gh-pages` branch.

## Customize
- Fortunes: edit `FORTUNES` in `app.js`
- Colors/designs: edit `EGG_GRADIENTS` in `app.js` and `styles.css`
- Animation timings: keyframes and transitions in `styles.css`

## License
MIT