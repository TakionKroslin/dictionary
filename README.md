# Dictionary Project (Main Branch)

This branch (`main`) is the source branch for development.
It contains the editable source files, build configuration, static data chunks, and deployment scripts.

## What this project is

A static dictionary web app with:
- chunk-based content loading for large datasets
- in-page search and chunk navigation
- fixed header/footer UI with frosted-glass style
- desktop and mobile responsive behavior
- GitHub Pages deployment from `gh-pages`

## Branch strategy

- `main`: source of truth for development
- `gh-pages`: deploy-only branch (built/static output at repository root)

Do not develop directly in `gh-pages`.

## Repository layout

- `intex.html`: main app entry page
- `汉语古音手册.css`: primary stylesheet
- `public/`: static assets copied into build output
  - `public/chunks/`: chunk files used by lazy loading
  - `public/search-index.json`: search index
  - `public/s2t_map.js`: conversion map
- `chunks/`: local runtime chunk set (for local indexing/runtime checks)
- `vite.config.js`: build pipeline configuration
- `package.json`: npm scripts and dependencies
- `_redirects`: routing rules for static hosting
- `wrangler.toml`: optional Cloudflare Pages/Wrangler config

## Local development

1) Install dependencies

```bash
npm install
```

2) Build

```bash
npm run build
```

3) Preview static output (optional)

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Build output

`npm run build` creates `dist/`.

Expected key files:
- `dist/index.html`
- `dist/intex.html`
- `dist/汉语古音手册.css`
- `dist/s2t_map.js`
- `dist/search-index.json`
- `dist/chunks/index.json`
- `dist/chunks/part-*.html`

## Deployment workflow

### Main branch update

```bash
git add .
git commit -m "your message"
git push origin main
```

### GitHub Pages update (`gh-pages`)

Build from `main`, then publish **contents of `dist/` at branch root** (not nested under `dist/`).

High-level process:
1. `npm run build`
2. switch to `gh-pages` worktree/branch
3. replace branch root files with files from `dist/`
4. commit and push `gh-pages`

## Release checklist (integrated)

Before pushing `main`:
- build succeeds (`npm run build`)
- no broken links for chunk/index paths
- desktop and mobile basic checks complete
- footer/header fixed layout does not block controls

Before pushing `gh-pages`:
- branch root contains built files directly
- `chunks/` exists in root and has `index.json`
- `intex.html` and `index.html` are both present
- styles and scripts referenced by relative paths exist

After deployment:
- open production page and hard refresh
- verify search, paging, chunk loading, scroll buttons
- verify mobile viewport behavior and bottom safe spacing

## Troubleshooting

If chunk content does not load:
- confirm `chunks/index.json` exists on deployed branch
- confirm `chunks/part-*.html` files are deployed
- open browser network panel for 404s

If push fails over HTTPS 443:
- use SSH-over-443 remote:
  - `ssh://git@ssh.github.com:443/TakionKroslin/dictionary.git`

## Notes

- This README replaces previous deployment markdown docs and centralizes operations.
- Keep documentation updates in `main` when workflow changes.
