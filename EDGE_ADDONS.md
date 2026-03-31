# Microsoft Edge Add-ons — submission

The **same ZIP** as for the Chrome Web Store is valid for Edge: Manifest V3, Chromium APIs. Build it with:

```powershell
.\create-chrome-package.ps1
```

Output: **`account-subscription-shortcuts-{version}.zip`** (version read from `manifest.json`).

## Portal

- [Partner Center — Edge extensions](https://partner.microsoft.com/dashboard/microsoftedge/overview)

Sign in with a Microsoft account, register as a developer if required, then **Create new extension** and upload the ZIP.

## What to reuse from Chrome prep

| Item | Notes |
|------|--------|
| ZIP contents | Identical to Chrome package (see `CHROME_WEB_STORE.md`) |
| Privacy policy URL | Same hosted page, e.g. `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html` |
| Description | You can reuse English (and Spanish) copy from `CHROME_WEB_STORE.md` |
| Screenshots | Same captures work; follow Edge’s current size requirements in the dashboard |

## Checklist

- [ ] ZIP named with version (from script output)
- [ ] Privacy URL reachable
- [ ] Store listing text and images
- [ ] No extra permissions beyond what you declare (storage, windows)

## After publication

Update `README.md` with the Edge Add-ons URL when you have it.
