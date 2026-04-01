const STORAGE_LANGUAGE_KEY = 'account-subscription-shortcuts-language';
const STORAGE_USER_LINKS_KEY = 'account-subscription-shortcuts-user-links';

/** @typedef {{ id: string, label: string, url: string, categoryKey: string }} UserLink */

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
    addPersonal: 'Add my shortcut',
    editPersonal: 'Edit shortcut',
    savePersonal: 'Save',
    cancelForm: 'Cancel',
    formLabel: 'Name',
    formUrl: 'URL',
    formCategory: 'Section',
    invalidUrl: 'Enter a valid http(s) URL.',
    emptyLabel: 'Enter a name.',
    confirmDelete: 'Remove this shortcut?',
    editBtn: 'Edit',
    deleteBtn: 'Del',
    link_google_account: 'Google — My Account',
    link_google_subscriptions: 'Google — Subscriptions',
    link_play_subscriptions: 'Google Play — Subscriptions',
    link_microsoft_account: 'Microsoft account',
    link_apple_id: 'Apple ID',
    link_paypal_autopay: 'PayPal — Automatic payments',
    link_netflix_account: 'Netflix — Account',
    link_spotify_account: 'Spotify — Account',
    link_amazon_account: 'Amazon — Your account (US)',
    link_amazon_account_es: 'Amazon — Your account (Spain)',
    brandFooterAria: 'AI4Context — open website',
    brandByPrefix: 'by'
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
    addPersonal: 'Añadir mi atajo',
    editPersonal: 'Editar atajo',
    savePersonal: 'Guardar',
    cancelForm: 'Cancelar',
    formLabel: 'Nombre',
    formUrl: 'URL',
    formCategory: 'Sección',
    invalidUrl: 'Introduce una URL http(s) válida.',
    emptyLabel: 'Escribe un nombre.',
    confirmDelete: '¿Quitar este atajo?',
    editBtn: 'Editar',
    deleteBtn: 'Borrar',
    link_google_account: 'Google — Mi cuenta',
    link_google_subscriptions: 'Google — Suscripciones',
    link_play_subscriptions: 'Google Play — Suscripciones',
    link_microsoft_account: 'Cuenta Microsoft',
    link_apple_id: 'Apple ID',
    link_paypal_autopay: 'PayPal — Pagos automáticos',
    link_netflix_account: 'Netflix — Cuenta',
    link_spotify_account: 'Spotify — Cuenta',
    link_amazon_account: 'Amazon — Tu cuenta (EE. UU.)',
    link_amazon_account_es: 'Amazon — Tu cuenta (España)',
    brandFooterAria: 'AI4Context — abrir sitio web',
    brandByPrefix: 'por'
  }
};

const languageSelect = document.getElementById('languageSelect');
const shortcutsRoot = document.getElementById('shortcuts-root');
const btnClose = document.getElementById('btnClose');
const btnAddPersonal = document.getElementById('btnAddPersonal');
const personalForm = document.getElementById('personalForm');
const personalFormTitle = document.getElementById('personalFormTitle');
const personalLabel = document.getElementById('personalLabel');
const personalUrl = document.getElementById('personalUrl');
const personalCategory = document.getElementById('personalCategory');
const personalFormError = document.getElementById('personalFormError');
const btnSavePersonal = document.getElementById('btnSavePersonal');
const btnCancelPersonal = document.getElementById('btnCancelPersonal');

const CATEGORY_KEYS = ['cat_accounts', 'cat_subscriptions', 'cat_shopping'];

let currentLang = 'en';
/** @type {UserLink[]} */
let userLinks = [];
let editingUserId = null;

function t(key) {
  const pack = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return pack[key] ?? TRANSLATIONS.en[key] ?? key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t(key)) el.textContent = t(key);
  });
  const brandFooter = document.getElementById('a4c-brand-footer');
  if (brandFooter) brandFooter.setAttribute('aria-label', t('brandFooterAria'));
  const byPrefix = document.getElementById('a4c-brand-by-prefix');
  if (byPrefix) byPrefix.textContent = t('brandByPrefix');
  document.documentElement.lang = currentLang === 'es' ? 'es' : 'en';
  fillCategorySelect();
  if (personalForm && !personalForm.classList.contains('hidden') && personalFormTitle) {
    personalFormTitle.textContent = editingUserId ? t('editPersonal') : t('addPersonal');
  }
}

function newUserLinkId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * @param {string} raw
 * @returns {string|null}
 */
function normalizeUserUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.href;
  } catch {
    return null;
  }
}

function fillCategorySelect() {
  if (!personalCategory) return;
  const current = personalCategory.value;
  personalCategory.innerHTML = '';
  CATEGORY_KEYS.forEach((key) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = t(key);
    personalCategory.appendChild(opt);
  });
  if (current && CATEGORY_KEYS.includes(current)) {
    personalCategory.value = current;
  }
}

function showFormError(msg) {
  if (!personalFormError) return;
  personalFormError.textContent = msg;
  personalFormError.hidden = false;
}

function hideFormError() {
  if (!personalFormError) return;
  personalFormError.textContent = '';
  personalFormError.hidden = true;
}

function openAddForm() {
  editingUserId = null;
  personalFormTitle.textContent = t('addPersonal');
  personalLabel.value = '';
  personalUrl.value = '';
  personalCategory.value = 'cat_accounts';
  hideFormError();
  personalForm.classList.remove('hidden');
  personalLabel.focus();
}

function openEditForm(link) {
  editingUserId = link.id;
  personalFormTitle.textContent = t('editPersonal');
  personalLabel.value = link.label;
  personalUrl.value = link.url;
  personalCategory.value = CATEGORY_KEYS.includes(link.categoryKey) ? link.categoryKey : 'cat_accounts';
  hideFormError();
  personalForm.classList.remove('hidden');
  personalLabel.focus();
}

function closePersonalForm() {
  editingUserId = null;
  personalForm.classList.add('hidden');
  hideFormError();
}

async function loadUserLinks() {
  const { [STORAGE_USER_LINKS_KEY]: raw } = await chrome.storage.local.get(STORAGE_USER_LINKS_KEY);
  if (!Array.isArray(raw)) {
    userLinks = [];
    return;
  }
  userLinks = raw.filter(
    (x) => x && typeof x.id === 'string' && typeof x.label === 'string' && typeof x.url === 'string' && typeof x.categoryKey === 'string'
  );
}

async function saveUserLinks() {
  await chrome.storage.local.set({ [STORAGE_USER_LINKS_KEY]: userLinks });
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

function appendUserShortcutRow(list, link) {
  const row = document.createElement('div');
  row.className = 'user-shortcut-row';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-shortcut btn-shortcut-user';
  btn.textContent = link.label;
  btn.addEventListener('click', () => openShortcutInBackground(link.url));

  const actions = document.createElement('div');
  actions.className = 'user-shortcut-actions';

  const btnEdit = document.createElement('button');
  btnEdit.type = 'button';
  btnEdit.className = 'btn-icon-tiny';
  btnEdit.textContent = t('editBtn');
  btnEdit.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditForm(link);
  });

  const btnDel = document.createElement('button');
  btnDel.type = 'button';
  btnDel.className = 'btn-icon-tiny danger';
  btnDel.textContent = t('deleteBtn');
  btnDel.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!confirm(t('confirmDelete'))) return;
    userLinks = userLinks.filter((x) => x.id !== link.id);
    await saveUserLinks();
    closePersonalForm();
    renderShortcuts();
  });

  actions.appendChild(btnEdit);
  actions.appendChild(btnDel);
  row.appendChild(btn);
  row.appendChild(actions);
  list.appendChild(row);
}

async function renderShortcuts() {
  await loadUserLinks();
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

    userLinks
      .filter((u) => u.categoryKey === group.categoryKey)
      .sort((a, b) => a.label.localeCompare(b.label, currentLang === 'es' ? 'es' : 'en'))
      .forEach((link) => appendUserShortcutRow(list, link));

    section.appendChild(list);
    shortcutsRoot.appendChild(section);
  });
}

async function savePersonalFromForm() {
  hideFormError();
  const label = personalLabel.value.trim();
  if (!label) {
    showFormError(t('emptyLabel'));
    return;
  }
  const url = normalizeUserUrl(personalUrl.value);
  if (!url) {
    showFormError(t('invalidUrl'));
    return;
  }
  const categoryKey = personalCategory.value;
  if (!CATEGORY_KEYS.includes(categoryKey)) {
    showFormError(t('invalidUrl'));
    return;
  }

  if (editingUserId) {
    const idx = userLinks.findIndex((x) => x.id === editingUserId);
    if (idx >= 0) {
      userLinks[idx] = { id: editingUserId, label, url, categoryKey };
    } else {
      closePersonalForm();
      await renderShortcuts();
      return;
    }
  } else {
    userLinks.push({ id: newUserLinkId(), label, url, categoryKey });
  }

  await saveUserLinks();
  closePersonalForm();
  renderShortcuts();
}

async function changeLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  await chrome.storage.local.set({ [STORAGE_LANGUAGE_KEY]: lang });
  applyTranslations();
  await renderShortcuts();
}

async function init() {
  btnClose.addEventListener('click', () => window.close());
  btnAddPersonal.addEventListener('click', () => openAddForm());
  btnCancelPersonal.addEventListener('click', () => closePersonalForm());
  btnSavePersonal.addEventListener('click', () => savePersonalFromForm());

  const verEl = document.getElementById('extensionVersion');
  if (verEl) {
    try {
      verEl.textContent = `v${chrome.runtime.getManifest().version}`;
    } catch {
      verEl.textContent = '';
    }
  }

  const stored = await chrome.storage.local.get(STORAGE_LANGUAGE_KEY);
  const lang = stored[STORAGE_LANGUAGE_KEY];
  if (lang && TRANSLATIONS[lang]) {
    currentLang = lang;
    languageSelect.value = lang;
  } else {
    languageSelect.value = currentLang;
  }
  applyTranslations();
  await renderShortcuts();
}

languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

init();
