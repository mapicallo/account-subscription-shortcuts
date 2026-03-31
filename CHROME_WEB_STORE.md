# Chrome Web Store — submission guide

Prepared for **Account & Subscription Shortcuts** (Manifest V3).

Repository: https://github.com/mapicallo/account-subscription-shortcuts

**Manifest `description`:** Chrome requires **≤ 132 characters** (UTF-8/code units as reported by the dashboard). Longer text belongs in the store’s **Detailed description** only.

---

## 1. Privacy policy URL (required)

Host a public `privacy` page. Step-by-step: **`docs/GITHUB_PAGES.md`**. After enabling **GitHub Pages** (Settings → Pages → branch `main`, folder `/root`), typical URLs:

- English (recommended for the listing):  
  `https://mapicallo.github.io/account-subscription-shortcuts/privacy-en.html`
- Spanish (optional second link or for users):  
  `https://mapicallo.github.io/account-subscription-shortcuts/privacy.html`

Use the English URL in the Chrome Web Store developer dashboard unless you standardize on one page with both languages.

---

## 1b. Pestaña «Privacidad» en la consola del desarrollador

Rellena los textos con límites típicos (~1.000 caracteres). Si tu formulario aparece en **español**, usa los bloques ES; si pide **inglés**, usa EN.

### Una sola finalidad

**Español (pegar en «Descripción de la finalidad única»):**

```
Esta extensión ofrece atajos para abrir en el navegador páginas web oficiales de cuentas, facturación y suscripciones (por ejemplo centros de cuenta de servicios conocidos). No inicia sesión por el usuario, no recoge contraseñas, no modifica el contenido de sitios de terceros ni realiza gestiones bancarias o de pago en su nombre. Su función única es abrir en una pestaña las URLs seleccionadas desde un panel y mantener preferencias locales (idioma de la interfaz y atajos opcionales creados por el usuario).
```

**English (single purpose):**

```
This extension provides shortcuts to open official account, billing, and subscription web pages in the browser (for example vendor account hubs). It does not sign the user in, does not collect passwords, does not modify third-party sites, and does not perform banking or payments on the user’s behalf. Its sole purpose is to open selected URLs in a tab from a panel and to store local preferences (UI language and optional user-created shortcuts).
```

### Justificación del permiso `storage`

**Español:**

```
El permiso storage (chrome.storage.local) guarda únicamente en el dispositivo: (1) el idioma elegido para la interfaz del panel (inglés o español); (2) los atajos personales que el usuario añade de forma opcional (nombre visible, URL y sección). No se envían estos datos a servidores del desarrollador. Sin este permiso no se podrían recordar el idioma ni los atajos creados por el usuario entre sesiones del panel.
```

**English:**

```
The storage permission (chrome.storage.local) saves on the device only: (1) the selected UI language for the panel (English or Spanish); (2) optional user-added shortcuts (display name, URL, and section). This data is not sent to the developer’s servers. Without storage, the extension could not persist language or user-created shortcuts between panel sessions.
```

### Justificación del permiso `windows` (si el formulario lo pide)

**Español:**

```
Se usa solo para abrir o enfocar la ventana del panel de atajos cuando el usuario hace clic en el icono de la extensión. No se emplea para leer el historial de navegación ni el contenido de otras ventanas.
```

**English:**

```
Used only to open or focus the extension’s shortcut panel window when the user clicks the toolbar icon. It is not used to read browsing history or the contents of other windows.
```

### ¿Código remoto?

Selecciona **No** / **No estoy usando código remoto**. Toda la lógica está en el paquete (service worker `background.js` y página `panel.js`, etc.); no se cargan scripts externos ni WASM alojado fuera del ZIP.

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

### Detailed description — **paste into “Descripción” / Description** (English, up to 16,000 characters)

Use the block below as the full store description (user-facing; no code references):

```
Account & Subscription Shortcuts helps you open the official websites you already use for accounts, billing, and subscriptions—without hunting for bookmarks or retyping URLs.

HOW IT WORKS
Click the extension icon to open a movable panel you can resize and leave open on your desktop. Pick a shortcut: the page opens in a new background tab in Chrome, and the panel stays in front so you can open more links or close the panel when you’re done. You always sign in on the website itself, the same way you already trust those services. This extension does not read your passwords and does not see your activity on those sites.

WHAT’S INCLUDED
• Google: My Account, subscriptions, and Google Play subscriptions
• Microsoft account and Apple ID
• PayPal (automatic payments)
• Netflix and Spotify account pages
• Amazon: Your Account (United States and Spain)

YOUR OWN SHORTCUTS
Add personal links—for example your bank or utility—by choosing a name, pasting the full https address, and picking a section (accounts, subscriptions & payments, or shopping). Edit or delete your entries anytime. They are stored only on your device.

PRIVACY
• No analytics and no data is sent to the developer’s servers
• Local storage only: your interface language (English or Spanish) and the shortcuts you create yourself
• The extension uses the minimum permissions needed to show the panel and save those preferences

IMPORTANT
This extension does not cancel subscriptions, change plans, process refunds, or move money for you. It only opens public web pages; everything else happens between you and each provider.

If you often manage accounts from a laptop or PC, Account & Subscription Shortcuts keeps those entry points one click away.
```

### Detailed description — shorter variant (min 250 characters, legacy)

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

- [ ] ZIP built with `create-chrome-package.ps1` — `account-subscription-shortcuts-{version}.zip` — includes `shortcuts-data.js`
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

The script reads **`version`** from `manifest.json` and creates:

**`account-subscription-shortcuts-{version}.zip`** (e.g. `account-subscription-shortcuts-0.3.2.zip`)

Use this **same file** for the **Chrome Web Store** and for **Microsoft Edge Add-ons** — see `EDGE_ADDONS.md`.

The ZIP contains:

- `manifest.json`
- `background.js`
- `panel.html`, `panel.css`, `panel.js`
- `shortcuts-data.js`
- `icons/` (all PNG sizes)

**Exclude** from the ZIP: `.git`, `docs/`, `scripts/`, `*.md`, `privacy*.html`, `LICENSE`, store WIP files. The script only adds the files above.
