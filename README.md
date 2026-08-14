# Cookie Consent

Lightweight cookie consent banner with Google Consent Mode v2, GTM integration, multiple layouts and full i18n support.

---

## Table of contents

- [Quick start](#quick-start)
- [CDN (jsDelivr)](#cdn-jsdelivr)
- [Google Consent Mode v2](#google-consent-mode-v2)
- [Google Tag Manager](#google-tag-manager)
- [API](#api)
  - [`CookieConsent.config(options)`](#cookieconsentconfigoptions)
  - [`CookieConsent.checkCookie(category, callback)`](#cookieconsentcheckcookiecategory-callback)
- [Configuration reference](#configuration-reference)
  - [Layout](#layout)
  - [Position](#position)
  - [`disablePageInteraction`](#disablepageinteraction)
  - [`hideFromBots`](#hidefrombots)
  - [Colors](#colors)
  - [Text & locale](#text--locale)
- [Cookie categories](#cookie-categories)
- [Full config example](#full-config-example)

---

## Quick start

```html
<head>
  <!-- 1. Load the script -->
  <script src="https://cdn.jsdelivr.net/gh/e-xisto/cookie-consent@v3.0.0/dist/cookie-consent.js"></script>

  <!-- 2. Call config() — the banner opens automatically on the first visit -->
  <script>
    CookieConsent.config({
      locale: 'es',
      cookiesPolicyLink: '/politica-de-cookies'
    });
  </script>
</head>
```

The banner is shown only when the user has not yet given their consent. On subsequent page loads the stored choice is restored automatically and the Google Consent Mode state is updated accordingly.

---

## CDN (jsDelivr)

### Full build (all locales, ~53 KB)

Drop-in for any integration. Supports all 8 languages via the `locale` option.

```html
<script src="https://cdn.jsdelivr.net/gh/e-xisto/cookie-consent@v3.0.0/dist/cookie-consent.js"></script>
```

### Per-locale build (~29 KB)

Use this when only one language is needed. The locale is already embedded — no need to set `locale` in `config()`.

```html
<script src="https://cdn.jsdelivr.net/gh/e-xisto/cookie-consent@v3.0.0/dist/cookie-consent.es.js"></script>
```

Available locale files: `cookie-consent.en.js`, `cookie-consent.es.js`, `cookie-consent.de.js`, `cookie-consent.fr.js`, `cookie-consent.ca.js`, `cookie-consent.it.js`, `cookie-consent.nl.js`, `cookie-consent.pt.js`.

---

## Google Consent Mode v2

The library initialises Google Consent Mode v2 **automatically and synchronously**, before any Google tag (gtag / GTM) runs. No manual setup is required.

**Default state (before user interaction):**

| Signal | Default |
|---|---|
| `ad_storage` | `denied` |
| `ad_user_data` | `denied` |
| `ad_personalization` | `denied` |
| `analytics_storage` | `denied` |
| `functionality_storage` | `denied` |
| `personalization_storage` | `granted` |
| `security_storage` | `granted` |
| `wait_for_update` | `500` ms |

`ads_data_redaction` is also set to `true` when `ad_storage` is denied (Consent Mode advanced).

After the user accepts or rejects cookies, `gtag('consent', 'update', {...})` is called automatically with the correct values based on their choices. This update is also replayed on every subsequent page load so Google tags always receive accurate consent state.

**Category → Consent Mode signal mapping:**

| Cookie category | Consent Mode signals |
|---|---|
| `targetingCookies` | `ad_storage`, `ad_user_data`, `ad_personalization` |
| `trackingCookies` | `analytics_storage` |
| `functionalityCookies` | `functionality_storage` |
| *(always)* | `personalization_storage`, `security_storage` → `granted` |

---

## Google Tag Manager

### Events dispatched to `dataLayer`

After the user interacts with the banner (or on subsequent page loads with an existing consent), the following events are pushed to `window.dataLayer` with a 500 ms delay:

| Event name | Fired when |
|---|---|
| `cookieConsentUpdate` | Always (any consent action) |
| `cookieConsentAdStorage` | `targetingCookies` accepted |
| `cookieConsentAdUserData` | `targetingCookies` accepted |
| `cookieConsentAdPersonalization` | `targetingCookies` accepted |
| `cookieConsentAnalyticsStorage` | `trackingCookies` accepted |
| `cookieConsentFunctionalityStorage` | `functionalityCookies` accepted |
| `cookieConsentPersonalizationStorage` | Always |
| `cookieConsentSecurityStorage` | Always |

### GTM template

A ready-to-use GTM container template is available at [`docs/GTM-Cookie-Conset-Events-Template.json`](./docs/GTM-Cookie-Conset-Events-Template.json). Import it into your GTM workspace to get pre-configured triggers for all consent events.

### Loading GTM only when tracking is accepted

Use `checkCookie()` to guard the GTM snippet:

```html
<script>
  CookieConsent.config({ locale: 'es' });
</script>

<script>
  CookieConsent.checkCookie('trackingCookies', function () {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  });
</script>
```

The callback runs immediately if consent was already granted, or is deferred until the user accepts that category.

---

## API

### `CookieConsent.config(options)`

Initialises the banner with the given options. Must be called once, after loading the script.

- If the user has **not** yet consented, the banner opens automatically (after `DOMContentLoaded` if the DOM is not ready yet).
- If the user **has already** consented, the banner is not shown and the stored consent is restored.

```js
CookieConsent.config({
  locale: 'es',
  cookiesPolicyLink: '/politica-de-cookies',
  layout: 'cloud',
  position: 'bottom right',
  disablePageInteraction: false,
  hideFromBots: true,
});
```

### `CookieConsent.checkCookie(category, callback)`

Runs `callback` if the given category has been accepted, or registers it as a listener for when the user accepts it.

```js
CookieConsent.checkCookie('trackingCookies', function () {
  // load analytics, GTM, etc.
});
```

Returns `true` if consent was already granted, `false` otherwise.

Available categories: [`strictlyNecessaryCookies`](#cookie-categories), [`functionalityCookies`](#cookie-categories), [`trackingCookies`](#cookie-categories), [`targetingCookies`](#cookie-categories).

---

## Configuration reference

### Layout

Controls the shape and structure of the banner. Set via `layout`.

| Value | Description |
|---|---|
| `'box'` | Narrow box (max 400 px), buttons stacked vertically — **default** |
| `'box wide'` | Wide box (max 800 px), buttons in a row |
| `'cloud'` | Wide card with rounded corners; text left, buttons right |
| `'bar'` | Full-width horizontal strip pinned to top or bottom |

When the user opens the "manage cookies" panel, non-`bar` layouts automatically re-center themselves.

### Position

Controls where the banner appears on screen. Set via `position` as `'<vertical> <horizontal>'`.

| Vertical | Horizontal | Example |
|---|---|---|
| `top` | `left` / `center` / `right` | `'top left'` |
| `middle` | `left` / `center` / `right` | `'middle center'` |
| `bottom` | `left` / `center` / `right` | `'bottom right'` *(default)* |

For `bar` layouts only the vertical component is used (the bar always spans full width). A `bottom` bar has a shadow pointing upward; a `top` bar has a shadow pointing downward.

### `disablePageInteraction`

Type: `boolean` — Default: `false`

When `true`, the page scroll is locked (`body { overflow: hidden }`) while the banner is visible.

```js
CookieConsent.config({
  disablePageInteraction: true,
});
```

> **Breaking change from v2:** page scroll is **not** locked by default since v3.0.0. If your integration relied on the implicit scroll-lock, set `disablePageInteraction: true`.

### `hideFromBots`

Type: `boolean` — Default: `true`

Stops the plugin's execution when a bot/crawler is detected, to prevent them from indexing the modal's content. Detection uses the user agent (`bot`, `crawl`, `spider`, `slurp`, `teoma`) and `navigator.webdriver`.

Set to `false` if you need the banner to render in automated browsers (Playwright, Cypress, Selenium).

```js
CookieConsent.config({
  hideFromBots: false,
});
```

### Colors

All color values accept any valid CSS color string.

```js
CookieConsent.config({
  color: {
    textColor: '#6B7280',
    titleColor: 'black',
    linkColor: 'black',
    modalBackground: 'white',
    modalBorder: 'white',
    btnPrimaryText: 'white',
    btnPrimaryBackground: '#30363c',
    btnPrimaryBorder: '#30363c',
    btnSecondaryText: '#2c2f31',
    btnSecondaryBackground: '#eaeff2',
    btnSecondaryBorder: '#eaeff2',
    switchColor: 'green',
    switchBackground: '#D1D5DB',
    switchActiveBackground: '#059669',
  },
});
```

| Key | Default | Applies to |
|---|---|---|
| `textColor` | `#6B7280` | Body text |
| `titleColor` | `black` | Modal headings |
| `linkColor` | `black` | Links in notice text |
| `modalBackground` | `white` | Banner background |
| `modalBorder` | `white` | Banner border |
| `btnPrimaryText` | `white` | Accept all / Reject all / Accept selected button text |
| `btnPrimaryBackground` | `#30363c` | Accept all / Reject all / Accept selected button background |
| `btnPrimaryBorder` | `#30363c` | Accept all / Reject all / Accept selected button border |
| `btnSecondaryText` | `#2c2f31` | Manage cookies button text |
| `btnSecondaryBackground` | `#eaeff2` | Manage cookies button background |
| `btnSecondaryBorder` | `#eaeff2` | Manage cookies button border |
| `switchColor` | `green` | Toggle switch colour |
| `switchBackground` | `#D1D5DB` | Toggle switch track (off) |
| `switchActiveBackground` | `#059669` | Toggle switch track (on) |

### Text & locale

Set `locale` to one of the supported language codes. The library ships with built-in translations for all locales.

| Code | Language |
|---|---|
| `en` | English *(default)* |
| `es` | Spanish |
| `de` | German |
| `fr` | French |
| `ca` | Catalan |
| `it` | Italian |
| `nl` | Dutch |
| `pt` | Portuguese |

Individual strings can be overridden via the `text` object. Use `{{cookiesPolicyLink}}` as a placeholder in `noticeText` — it will be replaced with the value of `cookiesPolicyLink`.

```js
CookieConsent.config({
  locale: 'es',
  cookiesPolicyLink: '/politica-de-cookies',
  text: {
    // Override any built-in string:
    modalTitle: 'Usamos cookies',
    noticeText: 'Usamos cookies propias y de terceros. Consulta nuestra <a href="{{cookiesPolicyLink}}">política de cookies</a>.',
    btnAcceptAll: 'Aceptar todas',
    btnRejectAll: 'Rechazar todas',
    btnManageCookies: 'Gestionar cookies',
    btnAcceptSelection: 'Aceptar selección',
    alwaysEnabled: 'Siempre activas',
    privacyTitle: 'Tu privacidad es importante',
    privacyTextDefinition: '...',
    privacyTextInstructions: '...',
    strictlyNecessaryTitle: 'Cookies estrictamente necesarias',
    strictlyNecessaryText: '...',
    functionalityTitle: 'Cookies de funcionalidad',
    functionalityText: '...',
    trackingTitle: 'Cookies de seguimiento y rendimiento',
    trackingText: '...',
    targetingTitle: 'Cookies publicitarias',
    targetingText: '...',
  },
});
```

---

## Cookie categories

| Category | Consent Mode signals | Mandatory |
|---|---|---|
| `strictlyNecessaryCookies` | — | Yes (always on) |
| `functionalityCookies` | `functionality_storage` | No |
| `trackingCookies` | `analytics_storage` | No |
| `targetingCookies` | `ad_storage`, `ad_user_data`, `ad_personalization` | No |

---

## Full config example

```js
CookieConsent.config({
  locale: 'es',
  cookiesPolicyLink: '/politica-de-cookies',

  layout: 'cloud',
  position: 'bottom right',
  disablePageInteraction: false,
  hideFromBots: true,

  color: {
    btnPrimaryBackground: '#1d4ed8',
    btnPrimaryBorder: '#1d4ed8',
    switchActiveBackground: '#1d4ed8',
  },

  text: {
    modalTitle: 'Usamos cookies',
  },
});
```


### Script loading example

Replace ID_GOOGLETAGMANAGER with your google analytics id

```html
<head>

[...]

<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=<ID_GOOGLETAGMANAGER>"></script> -->
<script>
	CookieConsent.checkCookie('trackingCookies', function() {
		var script = document.createElement('script');
		script.src = 'https://www.googletagmanager.com/gtag/js?id=<ID_GOOGLETAGMANAGER>';
		script.async = true;
		document.head.appendChild(script);
	});

	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	CookieConsent.checkCookie('trackingCookies', function() {
		gtag('js', new Date());

		gtag('config', '<ID_GOOGLETAGMANAGER>', {
			'currency': 'EUR',
		});
	});
</script>

[...]

</head>

````
