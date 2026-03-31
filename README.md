# Account & Subscription Shortcuts

Browser extension (Manifest V3) that opens **official** account, billing, and subscription pages in a new tab. English-first store listing; **English / Spanish** UI with language selector.

Repository: https://github.com/mapicallo/account-subscription-shortcuts

**License:** MIT — see `LICENSE`.

**Store submission:** see `CHROME_WEB_STORE.md`. **GitHub Pages:** see `docs/GITHUB_PAGES.md`. Build production ZIP with `.\create-chrome-package.ps1`.

## GitHub Pages (Chrome Web Store privacy URL)

1. Enable **Source: GitHub Actions**: [Repository **Settings → Pages**](https://github.com/mapicallo/account-subscription-shortcuts/settings/pages) (one-time).
2. After the workflow runs: [Actions](https://github.com/mapicallo/account-subscription-shortcuts/actions) — approve the `github-pages` environment if GitHub asks.
3. Use this URL in the store: **https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html**

Full steps and alternatives: `docs/GITHUB_PAGES.md`.

## Install (development)

1. Open `chrome://extensions` or `edge://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select this folder (`account-subscription-shortcuts`)

## Usage

1. Click the **toolbar icon** — a **movable, resizable window** opens with the shortcut list (if it is already open, the same window is focused).
2. Click any shortcut; the site opens in a **new browser tab**. The list window **stays open** so you can use several links without reopening the extension.
3. Use **Close** / **Cerrar** or the window’s own close control when finished.
4. Sign in on each website as you normally would.

The extension does not access your accounts—it only opens URLs listed in `shortcuts-data.js` (see `docs/MVP-LINKS.md`).

## Privacy

- Stored locally: **UI language** only (`chrome.storage.local`)
- **`windows` permission:** used only to open/focus the extension’s shortcut panel window, not to read your browsing data
- Hosted policy (when published): use `privacy.html` / `privacy-en.html` on GitHub Pages or your chosen host; URL goes in the Chrome Web Store listing

## Project layout

| Path | Purpose |
|------|---------|
| `manifest.json` | MV3 manifest |
| `background.js` | Opens or focuses the shortcut panel window |
| `panel.html` / `panel.js` / `panel.css` | Panel UI (floating window) and i18n |
| `shortcuts-data.js` | Shortcut groups and URLs |
| `icons/` | Toolbar icons (PNG) |
| `docs/MVP-LINKS.md` | Human-readable MVP link table |
| `docs/IMPLEMENTATION_PLAN.md` | Step-by-step plan |
| `docs/GITHUB_PAGES.md` | Deploy privacy policy to Pages |
| `.github/workflows/pages.yml` | Pages deploy on push to `main` |
| `index.html` | Landing on Pages (links to privacy + repo) |

## Icons

PNGs are generated with the repo script (Windows PowerShell + `System.Drawing`):

```powershell
.\scripts\generate-icons.ps1
```

