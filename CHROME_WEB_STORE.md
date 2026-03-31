# Chrome Web Store — submission guide

Prepared for **Account & Subscription Shortcuts** (Manifest V3).

Repository: https://github.com/mapicallo/account-subscription-shortcuts

---

## 1. Privacy policy URL (required)

Host a public `privacy` page. Step-by-step: **`docs/GITHUB_PAGES.md`**. After enabling **GitHub Pages** (Settings → Pages → branch `main`, folder `/root`), typical URLs:

- English (recommended for the listing):  
  `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html`
- Spanish (optional second link or for users):  
  `https://mapicallo.github.io/account-subscription-shortcuts/privacy.html`

Use the English URL in the Chrome Web Store developer dashboard unless you standardize on one page with both languages.

---

## 2. Store copy

### Short description (max 132 characters)

**English (primary listing):**
```
Quick links to official account & subscription pages—Google, Microsoft, Apple, PayPal, Netflix, Spotify, Amazon, and more.
```
(117 characters)

**Spanish (if you add a localized listing later):**
```
Enlaces rápidos a páginas oficiales de cuentas y suscripciones: Google, Microsoft, Apple, PayPal, Netflix, Spotify, Amazon y más.
```
(125 characters)

### Detailed description (min 250 characters)

**English:**
```
Account & Subscription Shortcuts opens official account, billing, and subscription pages in a new tab—no sign-in inside the extension. Use the same websites you already trust; we only save your UI language on your device.

What you get:
• Shortcuts to Google Account, Google & Play subscriptions, Microsoft account, Apple ID
• PayPal automatic payments, Netflix and Spotify account pages
• Amazon Your Account (US and Spain)—add more TLDs via `shortcuts-data.js` if you fork the list

Privacy:
• No analytics, no remote servers from this extension
• `storage` for UI language, optional personal shortcuts you add (label + URL + section), all on-device; `windows` only to open or focus the shortcut panel window (not for reading your browsing history)

This extension does not cancel subscriptions or move money for you. It is a navigator to official sites only.
```

**Spanish:**
```
Accesos a cuenta y suscripciones abre en una pestaña nueva las páginas oficiales de cuentas, facturación y suscripciones. No inicias sesión dentro de la extensión: usas los mismos sitios de siempre. Solo guardamos el idioma de la interfaz en tu dispositivo.

Incluye:
• Google Mi cuenta, suscripciones de Google y Google Play, cuenta Microsoft, Apple ID
• PayPal (pagos automáticos), cuentas de Netflix y Spotify
• Amazon Tu cuenta (EE. UU. y España); más regiones vía `shortcuts-data.js`

Privacidad:
• Sin analítica ni servidores propios
• `storage` para idioma y atajos que añadas tú (solo en el dispositivo); `windows` solo para el panel de atajos

La extensión no cancela suscripciones ni gestiona pagos por ti: solo enlaza a sitios oficiales.
```

---

## 3. Screenshots

**Size:** 1280×800 or 640×400 px (PNG or JPEG)

**Suggested shots:**
1. Shortcut **panel window** in **English** (movable window, all sections visible)
2. Same window in **Spanish** (language selector visible)
3. (Optional) Browser tab open on an official account page (no personal data visible)

---

## 4. Promotional images (optional)

| Type | Size |
|------|------|
| Small tile | 440×280 px |
| Marquee | 1400×560 px |

You can design these in Figma or similar; no bundled generator in this repo yet.

---

## 5. Suggested category

**Productivity** or **Tools**

---

## 6. Pre-upload checklist

- [ ] ZIP built with `create-chrome-package.ps1` (or equivalent) — includes `shortcuts-data.js`
- [ ] Privacy policy URL live and reachable without login
- [ ] Short + detailed descriptions pasted
- [ ] At least one screenshot (two recommended)
- [ ] `icons/icon128.png` present in ZIP

---

## 7. Build the upload ZIP

From the project folder:

```powershell
.\create-chrome-package.ps1
```

This creates `account-subscription-shortcuts-chrome.zip` containing:

- `manifest.json`
- `background.js`
- `panel.html`, `panel.css`, `panel.js`
- `shortcuts-data.js`
- `icons/` (all PNG sizes)

**Exclude** from the ZIP: `.git`, `docs/`, `scripts/`, `*.md`, `privacy*.html`, `LICENSE`, store WIP files. The script only adds the files above.
