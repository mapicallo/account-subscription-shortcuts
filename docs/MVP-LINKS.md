# MVP — Lista de atajos (congelada v0)

Todas las URLs son **páginas oficiales** abiertas con `chrome.tabs.create`. El usuario inicia sesión en el sitio correspondiente; la extensión no accede a credenciales.

| # | Id interno | Destino | URL |
|---|--------------|---------|-----|
| 1 | `google_account` | Google · Mi cuenta | https://myaccount.google.com/ |
| 2 | `google_subscriptions` | Google · Suscripciones y servicios | https://myaccount.google.com/subscriptions |
| 3 | `play_subscriptions` | Google Play · Suscripciones | https://play.google.com/store/account/subscriptions |
| 4 | `microsoft_account` | Cuenta Microsoft | https://account.microsoft.com/ |
| 5 | `apple_id` | Apple ID | https://appleid.apple.com/ |
| 6 | `paypal_autopay` | PayPal · Pagos automáticos | https://www.paypal.com/myaccount/autopay/ |
| 7 | `netflix_account` | Netflix · Cuenta | https://www.netflix.com/account |
| 8 | `spotify_account` | Spotify · Cuenta | https://www.spotify.com/account/ |
| 9 | `amazon_account` | Amazon · Tu cuenta (US) | https://www.amazon.com/your-account |
| 10 | `amazon_account_es` | Amazon · Tu cuenta (España) | https://www.amazon.es/your-account |

## Notas de mantenimiento

- **Amazon:** incluidos `.com` (US) y `.es` (España). Otras regiones (`amazon.de`, `amazon.co.uk`, …): añadir filas en `shortcuts-data.js` y claves en `panel.js`, o un selector de región en `storage` en el futuro.
- **PayPal / Netflix / Spotify:** pueden redirigir al dominio local según cookie o IP.
- **Cambios de ruta:** los proveedores alteran URLs; actualizar `shortcuts-data.js` y publicar nueva versión si hace falta.
