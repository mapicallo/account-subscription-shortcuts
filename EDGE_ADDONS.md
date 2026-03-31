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

### Graphic assets (Partner Center)

Edge often asks for:

| Field | Spec | File (generated next to your `pantallazos` workflow) |
|------|------|--------------------------------------------------------|
| **Extension logo** | 300×300 px recommended (min 128×128), 1:1 | `C:\code\pantallazos\chrome-store-ready\edge-extension-logo-300x300.png` |
| **Small promotional icon** | 440×280 px | `C:\code\pantallazos\chrome-store-ready\promo-small-440x280.png` |

From `C:\code\pantallazos`, run:

```powershell
.\make-edge-store-assets.ps1
.\make-chrome-promo-tiles.ps1
```

(`make-chrome-promo-tiles.ps1` creates the 440×280 tile if missing; `make-edge-store-assets.ps1` builds the 300×300 logo from `account-subscription-shortcuts\icons\icon-master.png`.)

## Checklist

- [ ] ZIP named with version (from script output)
- [ ] Privacy URL reachable
- [ ] Store listing text and images (logo 300×300, small promo 440×280 if required)
- [ ] No extra permissions beyond what you declare (storage, windows)

## Search terms (English)

Partner Center: **up to 7 terms**, **≤30 characters** each, **≤21 words total** across all terms.

Suggested set (18 words total):

1. `account shortcuts`
2. `subscription shortcuts`
3. `billing shortcuts`
4. `google microsoft apple`
5. `amazon paypal netflix`
6. `official page links`
7. `personal link shortcuts`

## After publication

Update `README.md` with the Edge Add-ons URL when you have it.
