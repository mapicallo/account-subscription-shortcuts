const STORAGE_LANGUAGE_KEY = 'account-subscription-shortcuts-language';

const TRANSLATIONS = {
  en: {
    title: 'Account & Subscription Shortcuts',
    subtitle: 'Official pages in a new tab—sign in on the site as usual.',
    language: 'Language',
    note: 'Shortcuts only. This extension does not access your accounts.',
    closeWindow: 'Close',
    windowHint: 'Links open in a new background tab in your browser—this window stays on top until you close or minimize it.',
    cat_accounts: 'Account hubs',
    cat_subscriptions: 'Subscriptions & payments',
    cat_shopping: 'Shopping',
    link_google_account: 'Google — My Account',
    link_google_subscriptions: 'Google — Subscriptions',
    link_play_subscriptions: 'Google Play — Subscriptions',
    link_microsoft_account: 'Microsoft account',
    link_apple_id: 'Apple ID',
    link_paypal_autopay: 'PayPal — Automatic payments',
    link_netflix_account: 'Netflix — Account',
    link_spotify_account: 'Spotify — Account',
    link_amazon_account: 'Amazon — Your account (US)',
    link_amazon_account_es: 'Amazon — Your account (Spain)'
  },
  es: {
    title: 'Accesos a cuenta y suscripciones',
    subtitle: 'Páginas oficiales en una pestaña nueva; inicia sesión en cada sitio.',
    language: 'Idioma',
    note: 'Solo atajos. La extensión no accede a tus cuentas.',
    closeWindow: 'Cerrar',
    windowHint: 'Los enlaces abren una pestaña nueva en segundo plano en el navegador; esta ventana sigue delante hasta que la cierres o minimices.',
    cat_accounts: 'Cuentas principales',
    cat_subscriptions: 'Suscripciones y pagos',
    cat_shopping: 'Compras',
    link_google_account: 'Google — Mi cuenta',
    link_google_subscriptions: 'Google — Suscripciones',
    link_play_subscriptions: 'Google Play — Suscripciones',
    link_microsoft_account: 'Cuenta Microsoft',
    link_apple_id: 'Apple ID',
    link_paypal_autopay: 'PayPal — Pagos automáticos',
    link_netflix_account: 'Netflix — Cuenta',
    link_spotify_account: 'Spotify — Cuenta',
    link_amazon_account: 'Amazon — Tu cuenta (EE. UU.)',
    link_amazon_account_es: 'Amazon — Tu cuenta (España)'
  }
};

const languageSelect = document.getElementById('languageSelect');
const shortcutsRoot = document.getElementById('shortcuts-root');
const btnClose = document.getElementById('btnClose');

let currentLang = 'en';

function t(key) {
  const pack = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return pack[key] ?? TRANSLATIONS.en[key] ?? key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t(key)) el.textContent = t(key);
  });
  document.documentElement.lang = currentLang === 'es' ? 'es' : 'en';
}

/**
 * Opens `url` in the main browser window without activating that tab, then
 * refocuses this panel so it does not end up behind Chrome or minimized in the taskbar.
 */
async function openShortcutInBackground(url) {
  const panelWin = await chrome.windows.getCurrent();

  let targetWindowId;
  try {
    const lastNormal = await chrome.windows.getLastFocused({ windowTypes: ['normal'] });
    if (lastNormal?.type === 'normal' && lastNormal.id !== panelWin.id) {
      targetWindowId = lastNormal.id;
    }
  } catch {
    /* ignore */
  }

  if (targetWindowId === undefined) {
    const normals = await chrome.windows.getAll({ windowTypes: ['normal'] });
    const other = normals.find((w) => w.id !== panelWin.id);
    if (other) targetWindowId = other.id;
  }

  if (targetWindowId !== undefined) {
    await chrome.tabs.create({ windowId: targetWindowId, url, active: false });
  } else {
    await chrome.tabs.create({ url, active: false });
  }

  await chrome.windows.update(panelWin.id, { focused: true });
}

function renderShortcuts() {
  shortcutsRoot.innerHTML = '';
  if (typeof SHORTCUT_GROUPS === 'undefined' || !Array.isArray(SHORTCUT_GROUPS)) {
    shortcutsRoot.innerHTML = '<p class="note">No shortcuts configured.</p>';
    return;
  }

  SHORTCUT_GROUPS.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'shortcut-section';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = t(group.categoryKey);
    section.appendChild(title);

    const list = document.createElement('div');
    list.className = 'shortcut-list';

    group.items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-shortcut';
      btn.textContent = t(item.labelKey);
      btn.addEventListener('click', () => {
        openShortcutInBackground(item.url);
      });
      list.appendChild(btn);
    });

    section.appendChild(list);
    shortcutsRoot.appendChild(section);
  });
}

async function changeLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  await chrome.storage.local.set({ [STORAGE_LANGUAGE_KEY]: lang });
  applyTranslations();
  renderShortcuts();
}

async function init() {
  btnClose.addEventListener('click', () => window.close());

  const stored = await chrome.storage.local.get(STORAGE_LANGUAGE_KEY);
  const lang = stored[STORAGE_LANGUAGE_KEY];
  if (lang && TRANSLATIONS[lang]) {
    currentLang = lang;
    languageSelect.value = lang;
  } else {
    languageSelect.value = currentLang;
  }
  applyTranslations();
  renderShortcuts();
}

languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

init();
