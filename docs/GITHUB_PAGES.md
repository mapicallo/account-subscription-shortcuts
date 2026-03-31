# GitHub Pages — privacy policy for the Chrome Web Store

The Chrome Web Store needs a **public, stable URL** for your privacy policy. This repo includes `privacy-en.html`, `privacy.html`, and a small `index.html` landing at the root.

## Recommended: GitHub Actions (already in the repo)

The workflow **`.github/workflows/pages.yml`** publishes the **repository root** on every push to `main`.

### One-time setup on GitHub

1. Open the repo: **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**).

On the first run, GitHub may ask you to **approve** the `github-pages` deployment environment; approve it so the site can go live.

### URLs to use

| Page | URL |
|------|-----|
| Site root (links) | `https://mapicallo.github.io/account-subscription-shortcuts/` |
| English (store) | `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html` |
| Spanish | `https://mapicallo.github.io/account-subscription-shortcuts/privacy.html` |

Use the **English privacy** URL in the Chrome Web Store listing.

## Alternative: deploy from branch

If you prefer not to use Actions:

1. **Settings** → **Pages** → Source: **Deploy from a branch**.
2. Branch: `main`, folder: **`/ (root)`**.

Do not use both Actions and branch deploy for the same site; pick one.

## After editing HTML

Commit and push to `main`. With Actions, the workflow redeploys automatically.

## Custom domain (optional)

**Settings** → **Pages** → **Custom domain**. Update store URLs if you change the domain.

## Troubleshooting

- **404:** Confirm **Source** is correct (Actions workflow finished successfully, or branch/folder is `/root`).
- **Workflow failed:** Check **Actions** tab logs; ensure Pages **Source** is **GitHub Actions** when using the bundled workflow.
- **Old content:** Hard-refresh or open in a private window.
