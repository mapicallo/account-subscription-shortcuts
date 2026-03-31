# Account & Subscription Shortcuts — Plan de implementación

**Repositorio:** https://github.com/mapicallo/account-subscription-shortcuts  
**Nombre del producto:** Account & Subscription Shortcuts  
**Referencia de patrón:** extensión tipo [Find my phone](https://github.com/mapicallo/find-my-phone) — MV3, popup, i18n ES/EN, permisos mínimos, `storage` para preferencias.

---

## Objetivo del MVP

Extensión de navegador que ofrece **atajos a páginas oficiales** de cuentas, facturación y suscripciones que el usuario **ya utilizaría** (sin agregar credenciales ni “gestionar” servicios por API). UX: **un solo popup** con secciones agrupadas; **selector de idioma** (ES / EN) como en Find my phone.

**Idioma de la Chrome Web Store:** inglés. **UI:** inglés por defecto + español.

---

## Fase 0 — Alineación previa al código

| Paso | Acción |
|------|--------|
| 0.1 | Redactar **una frase de propósito único** para la tienda (single purpose), coherente con “shortcuts only”. |
| 0.2 | Definir **lista congelada del MVP**: 6–12 enlaces con etiqueta visible, URL, agrupación (p. ej. “Pagos”, “Tiendas grandes”, “OS / suites”), y nota si abre en **pestaña** o **ventana popup** (si aplica el patrón Find my phone). |
| 0.3 | Elegir **hosting de la política de privacidad** (p. ej. `https://mapicallo.github.io/account-subscription-shortcuts/privacy.html`) y dominio estable. |
| 0.4 | Decidir si los enlaces son **estáticos en código** (recomendado MVP) o **lista versionada** en JSON remoto (actualización sin publicar nueva versión; más complejidad y posible fricción en review). |

---

## Fase 1 — Esqueleto de extensión (Manifest V3)

| Paso | Acción |
|------|--------|
| 1.1 | Crear `manifest.json`: `manifest_version: 3`, `name`, `version`, `description` (inglés), `action.default_popup`, íconos. |
| 1.2 | Permisos mínimos: típicamente `storage` (idioma / preferencias). Evitar `host_permissions` amplios; los enlaces son `https://` normales abiertos con `chrome.tabs.create` o ventanas. |
| 1.3 | Añadir `default_locale` o estructura `_locales` si usas `chrome.i18n` para nombre/descripción del manifest (opcional; se puede mantener manifest en EN fijo). |
| 1.4 | Iconos 16/32/48/128 y un **icono distinguible** del resto de tus extensiones. |

**Criterio de salida:** carga sin errores en `chrome://extensions` (Developer mode), popup abre HTML vacío o placeholder.

---

## Fase 2 — Popup UI y agrupación

| Paso | Acción |
|------|--------|
| 2.1 | Maquetar `popup.html` + CSS: cabecera (nombre + selector idioma), bloques por categoría, lista de botones/enlaces. |
| 2.2 | Comportamiento al click: `chrome.tabs.create({ url })` (patrón simple) o ventana popup con tamaño fijo si quieres paridad con Find my phone; documentar decisión. |
| 2.3 | Opcional MVP: **búsqueda filtro** dentro del popup si la lista crece (post-MVP). |
| 2.4 | Accesibilidad básica: foco visible, `button` o `a` semánticos, contraste legible. |

**Criterio de salida:** todos los enlaces del MVP abren el destino correcto desde el popup.

---

## Fase 3 — Internacionalización (ES / EN)

| Paso | Acción |
|------|--------|
| 3.1 | Extraer cadenas a `_locales/en/messages.json` y `_locales/es/messages.json` (o mismo esquema que Find my phone). |
| 3.2 | Persistir idioma con `chrome.storage.sync` o `local` al cambiar selector; aplicar en `popup` al cargar. |
| 3.3 | Fallback si falta clave: inglés. |

**Criterio de salida:** cambiar idioma y ver etiquetas de secciones y botones traducidas sin recargar manualmente la extensión (salvo si tu implementación requiere un reload menor del popup, idealmente no).

---

## Fase 4 — Datos de enlaces (mantenible)

| Paso | Acción |
|------|--------|
| 4.1 | Centralizar definición de atajos en un solo módulo (p. ej. `shortcuts.js` / `shortcuts.ts` export o array en `data/links.json` empaquetado). |
| 4.2 | Cada entrada: `id`, `url`, `i18nLabelKey`, `categoryKey`, opcional `icon` o `externalIcon` (cuidado con derechos). |
| 4.3 | Comentario en código o `MAINTENANCE.md` con **cómo actualizar URLs** cuando un proveedor cambie ruta (como `find` de Google). |

**Criterio de salida:** añadir un enlace nuevo = editar datos + mensajes i18n, sin tocar la lógica del popup.

---

## Fase 5 — Calidad y compatibilidad

| Paso | Acción |
|------|--------|
| 5.1 | Probar en **Chrome** y **Edge** (mismo paquete MV3 en la mayoría de casos). |
| 5.2 | Probar resolución mínima del popup (ancho/alto) y truncado de textos. |
| 5.3 | Verificar que ningún permiso sobra (auditoría en la página de la extensión). |

---

## Fase 6 — Publicación Chrome Web Store

| Paso | Acción |
|------|--------|
| 6.1 | Redactar `privacy.html`: qué se almacena (idioma), sin analytics si no las hay; sin recolección de historial. |
| 6.2 | Capturas de pantalla (1280×800 u orientaciones que exija la tienda), texto corto, categoría adecuada. |
| 6.3 | Empaquetar ZIP sin fuentes innecesarias; `README.md` en GitHub con **build** y **estructura**. |
| 6.4 | Primera versión sugerida: `0.1.0` o `1.0.0` según tu convención; changelog breve. |

---

## Fase 7 — Post-MVP (orden sugerido)

1. Tercer locale (p. ej. `pt_BR`) si hay tracción o mercado objetivo.  
2. Sección “Descargas / archivos del navegador” con **límites claros** (no todo `chrome://` es accesible desde extensiones).  
3. Rotación o A/B de enlaces por región (solo si aporta valor real; evita complejidad prematura).  
4. Tiles o material promocional alineados con la marca.

---

## Riesgos a vigilar

| Riesgo | Mitigación |
|--------|------------|
| Nombre/ descripción sugiere **automatización** de cancelaciones o pagos | Lenguaje “shortcuts / official pages only” en tienda y en UI. |
| Enlaces rotos por cambios del proveedor | Lista centralizada + revisión periódica; versión menor en tienda. |
| Review por “demasiadas utilidades” | Un propósito claro: **acceso rápido a gestión de cuenta y suscripciones**. |

---

## Dependencias entre fases

```text
0 → 1 → 2 → 3 → 4 (4 puede solaparse con 2–3)
         ↘ 5 → 6
5 puede empezar en paralelo con 3–4 en cuanto haya enlaces reales.
```

---

## Checklist rápido “release 1.0”

- [ ] `manifest.json` y permisos revisados  
- [ ] Popup + todos los enlaces MVP  
- [ ] ES + EN + persistencia de idioma  
- [ ] `privacy.html` publicada y URL en la tienda  
- [ ] README en GitHub + licencia  
- [ ] ZIP probado en Chrome y Edge  
- [ ] Subida a Chrome Web Store + respuesta a posibles preguntas del reviewer  

---

*Documento vivo: actualizar fechas y alcance del MVP cuando congeles la lista de URLs.*

## Estado de implementación (marzo 2026)

- [x] MVP enlaces documentados: `docs/MVP-LINKS.md`
- [x] `shortcuts-data.js` + popup dinámico + i18n ES/EN (predeterminado EN)
- [x] `privacy.html` / `privacy-en.html`
- [x] Iconos PNG (`scripts/generate-icons.ps1`)
- [x] `LICENSE` (MIT), `CHROME_WEB_STORE.md`, `create-chrome-package.ps1`
- [ ] Publicar política en GitHub Pages (`docs/GITHUB_PAGES.md`) y enlace en Chrome Web Store
- [ ] Primer ZIP y envío a la tienda
