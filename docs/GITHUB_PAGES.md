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

### “There isn’t a GitHub Pages site here” / 404 on `mapicallo.github.io/account-subscription-shortcuts/...`

The HTML files can exist in the repo and you will still get **404** until Pages **Build and deployment** is configured.

**Fastest fix (recommended if Actions never ran):**

1. GitHub repo → **Settings** → **Pages**.
2. **Build and deployment** → **Source:** choose **Deploy from a branch** (not *None*).
3. **Branch:** `main`, **Folder:** `/ (root)` → **Save**.
4. Wait 1–5 minutes, then open in a private window:  
   `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html`  
   and `.../privacy.html`.

If you previously chose **GitHub Actions**, either complete the first deployment (approve the `github-pages` environment if asked) or switch to **Deploy from a branch** and avoid running two sources at once.

- **404 after config:** Confirm **Source** is not *None*; branch is `main` and folder is `/ (root)` (or Actions job succeeded).
- **Workflow failed:** **Actions** tab → open the failed run log.
- **Old content:** Hard-refresh or incognito.
