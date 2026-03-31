# Account & Subscription Shortcuts — Plan de implementación

**Repositorio:** https://github.com/mapicallo/account-subscription-shortcuts  
**Nombre del producto:** Account & Subscription Shortcuts  
**Referencia de patrón:** [Find my phone](https://github.com/mapicallo/find-my-phone) — MV3, i18n; aquí la lista de atajos va en **ventana fija** (movible/redimensionable), no en popup de toolbar.

**Versión actual del manifiesto:** `0.1.1` (revisar al publicar en tienda: puede ser `1.0.0` si prefieres primer release “estable”).

---

## Visión general del roadmap

| Bloque | Descripción | Estado |
|--------|-------------|--------|
| **A — Producto y código MVP** | Manifiesto, panel en ventana, datos centralizados, ES/EN, enlaces oficiales | **Hecho** |
| **B — Cumplimiento y assets** | Privacidad, README, ZIP de tienda, GitHub Pages | **Casi hecho** (falta: Pages activado en GitHub y URL verificada en navegador) |
| **C — Chrome Web Store** | Cuenta desarrollador, listing, capturas, envío, respuesta al revisor | **Pendiente** |
| **D — Post-lanzamiento** | Changelog, más locales/enlaces, Edge Add-ons, métricas | **Opcional / backlog** |

---

## Objetivo del MVP (sin cambios)

Extensión que ofrece **atajos a páginas oficiales** de cuentas y suscripciones (sin credenciales ni APIs de terceros). La UI es una **ventana propia** (movible, redimensionable, se puede volver a enfocar desde el icono); **selector EN / ES** (predeterminado EN). Clic en atajo: **`chrome.tabs.create`** (nueva pestaña; la ventana del panel sigue abierta).

**Propósito único (single purpose)** para copy y review: *acceso rápido a páginas oficiales de cuenta, facturación y suscripciones; solo enlaces; el usuario inicia sesión en cada sitio.*

---

## Fase 0 — Alineación previa al código

| Paso | Acción | Estado |
|------|--------|--------|
| 0.1 | Frase de propósito único (tienda + coherente con “shortcuts only”) | Hecho — alineado con `manifest.json` descripción + `CHROME_WEB_STORE.md` |
| 0.2 | Lista MVP enlaces + agrupación | Hecho — `docs/MVP-LINKS.md`, `shortcuts-data.js` (10 atajos incl. Amazon US/ES) |
| 0.3 | Hosting política de privacidad | Hecho — `privacy-en.html` / `privacy.html` + Pages vía `docs/GITHUB_PAGES.md` + workflow |
| 0.4 | Enlaces estáticos vs JSON remoto | Decidido: **estáticos empaquetados** (MVP) |

---

## Fase 1 — Esqueleto MV3

| Paso | Acción | Estado |
|------|--------|--------|
| 1.1 | `manifest.json` completo | Hecho |
| 1.2 | Permisos: `storage`, `windows` (abrir/enfocar panel) | Hecho |
| 1.3 | `default_locale` / `_locales` | No aplicado — i18n en `panel.js`; opcional migrar a `_locales` |
| 1.4 | Iconos 16 / 32 / 48 / 128 | Hecho — `scripts/generate-icons.ps1` |
| 1.5 | `background.js`: clic en icono → `panel.html` en ventana tipo `popup`; evitar duplicados | Hecho |

---

## Fase 2 — Panel (ventana)

| Paso | Acción | Estado |
|------|--------|--------|
| 2.1 | Cabecera, secciones, lista de botones | Hecho — render dinámico desde datos |
| 2.2 | Clic en atajo → nueva pestaña | Hecho — `chrome.tabs.create`; panel no se cierra |
| 2.3 | Búsqueda / filtro en panel | Pendiente — post-MVP si la lista crece |
| 2.4 | Accesibilidad básica | Parcial — foco en botones; sin auditoría formal |
| 2.5 | Botón cerrar + texto de ayuda ventana | Hecho |

**Mejora opcional (Fase 2b):** probar panel con zoom del OS al 125 % / 150 % y revisar scroll.

---

## Fase 3 — Internacionalización

| Paso | Acción | Estado |
|------|--------|--------|
| 3.1 | Cadenas ES / EN | Hecho — objeto `TRANSLATIONS` en `panel.js` |
| 3.2 | Persistencia idioma | Hecho — `chrome.storage.local` |
| 3.3 | Fallback inglés | Hecho — función `t()` |

---

## Fase 4 — Datos mantenibles

| Paso | Acción | Estado |
|------|--------|--------|
| 4.1 | Módulo central de atajos | Hecho — `shortcuts-data.js` |
| 4.2 | Campos id, url, labelKey, categoryKey | Hecho |
| 4.3 | Guía de mantenimiento URLs | Hecho — `docs/MVP-LINKS.md` (notas) |

**Opcional:** `docs/MAINTENANCE.md` solo con tabla “proveedor → dónde buscar URL nueva” si el equipo lo encuentra útil.

---

## Fase 5 — Calidad y compatibilidad (QA pre-tienda)

Ejecutar antes del primer envío a la tienda y tras cada cambio grande de UI.

| Paso | Acción | Estado |
|------|--------|--------|
| 5.1 | Chrome: cargar unpacked, probar cada atajo | Pendiente — checklist manual |
| 5.2 | Edge: mismo ZIP o carpeta unpacked | Pendiente |
| 5.3 | Revisar permisos en `chrome://extensions` | Pendiente — **Storage** + **Windows** (motivo documentado en privacidad) |
| 5.4 | Cambiar EN ↔ ES en el panel, comprobar textos | Pendiente |
| 5.5 | Probar ZIP generado por `create-chrome-package.ps1` (no solo desarrollo) | Pendiente |

**Registro sugerido:** anotar fecha y versión en `docs/QA.md` o en la sección inferior de este plan cuando se complete el primer QA.

---

## Fase 6 — Publicación Chrome Web Store

| Paso | Acción | Estado |
|------|--------|--------|
| 6.1 | Textos `privacy` publicados y URL accesible | Pendiente — GitHub Pages + comprobar `privacy-en.html` |
| 6.2 | Cuenta desarrollador Chrome Web Store (pago único) | Pendiente |
| 6.3 | Nuevo ítem: subir ZIP, rellenar nombre, descripción corta/larga | Textos en `CHROME_WEB_STORE.md` |
| 6.4 | Capturas 1280×800 (mín. 1, recomendado 2–3) | Pendiente |
| 6.5 | Categoría (p. ej. Productividad / Herramientas) | Pendiente |
| 6.6 | Declaración de permisos / Data safety acorde a “solo storage, idioma” | Pendiente |
| 6.7 | Enviar a revisión; responder dudas del revisor | Pendiente |
| 6.8 | Tras aprobación: mismo paquete o bump de versión para fixes | Proceso continuo |

**Versión sugerida para el primer listing público:** si el QA está completo, puedes publicar como **`1.0.0`**; si quieres dejar claro “beta”, mantén `0.x` hasta el primer QA cerrado (`CHROME_WEB_STORE.md` / `README` pueden mencionarlo).

---

## Fase 7 — Post-MVP (prioridad sugerida)

1. **`CHANGELOG.md`** (Keep a Changelog) + bump semver en `manifest.json` en cada envío a la tienda.  
2. **Locales extra:** `pt_BR` u otros según analytics / feedback.  
3. **Más TLDs Amazon / retailers** — solo datos + i18n, mismo patrón.  
4. **Filtro de búsqueda** en el panel si hay &gt; ~15 entradas.  
5. **Descargas / `chrome://`:** documentar límites MV3 antes de implementar cualquier botón.  
6. **Tiles** 440×280 / 1400×560 para destacar en la tienda.  
7. **Microsoft Edge Add-ons:** mismo código; proceso de publicación paralelo si compensa.

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Copy sugiere automatización | “Shortcuts / official pages only” en tienda y UI |
| URLs rotas | Revisión trimestral o al reporte usuario; nueva versión en tienda |
| Review “demasiadas utilidades” | Mensaje único: gestión de cuenta y suscripciones mediante enlaces |

---

## Dependencias entre fases

```text
0–4 (código) → 5 QA → 6 tienda → 7 evolución
       ↘ GitHub / Pages en paralelo con 5–6
```

---

## Checklist “release 1.0” para la tienda

- [x] `manifest.json` y permisos (`storage`, `windows`)  
- [x] Popup + enlaces MVP (`shortcuts-data.js`)  
- [x] ES + EN + persistencia de idioma  
- [x] `privacy.html` / `privacy-en.html` en repo  
- [x] README, LICENSE, guía tienda, script ZIP  
- [x] Repo GitHub + workflow Pages (falta confirmar sitio publicado en el navegador)  
- [ ] QA Chrome + Edge + ZIP de producción  
- [ ] Capturas y listing completos  
- [ ] URL de privacidad **HTTPS** accesible sin login  
- [ ] Publicado en Chrome Web Store  

---

## Próximos pasos concretos (orden recomendado)

1. En GitHub: **Settings → Pages** → fuente **GitHub Actions**; comprobar que despliega y abrir `privacy-en.html` en una ventana privada.  
2. Ejecutar **Fase 5** (tabla QA) y anotar el resultado.  
3. Generar ZIP: `.\create-chrome-package.ps1`.  
4. Hacer **capturas** de la ventana del panel (EN y ES) según `CHROME_WEB_STORE.md`.  
5. Crear / usar ítem en **Chrome Web Store Developer Dashboard**, pegar textos, privacidad, subir ZIP.  
6. (Opcional) Subir `1.0.0` en `manifest.json` en el commit que etiquetes como “store release”.  
7. Tras publicar: añadir **CHANGELOG** y enlace a la tienda en `README.md`.

---

*Documento vivo. Última revisión del plan: marzo 2026.*

## Historial breve de implementación

- [x] MVP enlaces: `docs/MVP-LINKS.md`, Amazon US + ES  
- [x] Código: `shortcuts-data.js`, `panel.*`, `background.js`, `manifest.json`  
- [x] Privacidad ES/EN, `index.html`, workflow GitHub Pages  
- [x] `LICENSE`, `CHROME_WEB_STORE.md`, `create-chrome-package.ps1`, `docs/GITHUB_PAGES.md`  
- [x] README con enlaces a Settings/Actions de GitHub  
- [ ] Pages verificado en producción + primera publicación en tienda  
