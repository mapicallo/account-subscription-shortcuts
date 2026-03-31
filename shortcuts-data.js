/**
 * Central list of shortcut targets. Edit URLs here only (see docs/MVP-LINKS.md).
 * labelKey / categoryKey map to TRANSLATIONS in panel.js.
 */
const SHORTCUT_GROUPS = [
  {
    categoryKey: 'cat_accounts',
    items: [
      { id: 'google_account', url: 'https://myaccount.google.com/', labelKey: 'link_google_account' },
      { id: 'microsoft_account', url: 'https://account.microsoft.com/', labelKey: 'link_microsoft_account' },
      { id: 'apple_id', url: 'https://appleid.apple.com/', labelKey: 'link_apple_id' }
    ]
  },
  {
    categoryKey: 'cat_subscriptions',
    items: [
      { id: 'google_subscriptions', url: 'https://myaccount.google.com/subscriptions', labelKey: 'link_google_subscriptions' },
      { id: 'play_subscriptions', url: 'https://play.google.com/store/account/subscriptions', labelKey: 'link_play_subscriptions' },
      { id: 'paypal_autopay', url: 'https://www.paypal.com/myaccount/autopay/', labelKey: 'link_paypal_autopay' },
      { id: 'netflix_account', url: 'https://www.netflix.com/account', labelKey: 'link_netflix_account' },
      { id: 'spotify_account', url: 'https://www.spotify.com/account/', labelKey: 'link_spotify_account' }
    ]
  },
  {
    categoryKey: 'cat_shopping',
    items: [
      { id: 'amazon_account', url: 'https://www.amazon.com/your-account', labelKey: 'link_amazon_account' },
      { id: 'amazon_account_es', url: 'https://www.amazon.es/your-account', labelKey: 'link_amazon_account_es' }
    ]
  }
];
