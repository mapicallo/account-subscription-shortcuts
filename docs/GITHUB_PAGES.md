# GitHub Pages — privacy policy for the Chrome Web Store

The Chrome Web Store requires a **public, stable URL** for your privacy policy. This repo ships `privacy-en.html` and `privacy.html` at the root so they work with **GitHub Pages** without extra build steps.

## One-time setup

1. Push this repository to GitHub (e.g. `mapicallo/account-subscription-shortcuts`).
2. On GitHub: **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch)
   - **Folder:** `/ (root)`
4. Save. After a minute or two, the site is available at:

   `https://mapicallo.github.io/account-subscription-shortcuts/`

## URLs to use

| Page | Typical URL |
|------|-------------|
| English (recommended for store) | `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html` |
| Spanish | `https://mapicallo.github.io/account-subscription-shortcuts/privacy.html` |

Paste the **English** URL into the Chrome Web Store listing unless you use a single combined page.

## After editing privacy files

Commit and push to the branch configured for Pages. GitHub rebuilds the site automatically; wait briefly and hard-refresh if you do not see updates.

## Custom domain (optional)

In the same Pages settings, you can set a **Custom domain** and follow GitHub’s DNS instructions. Update the privacy URLs in the store if you switch domains.

## Troubleshooting

- **404:** Confirm Pages is enabled, branch/folder are correct, and the file names match exactly (`privacy-en.html`, `privacy.html`).
- **Old content:** Clear cache or open the URL in a private window.
