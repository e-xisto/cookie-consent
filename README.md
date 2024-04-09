# Cookie consent


Plantilla Google Tag Manager: [GTM-Cookie-Conset-Events-Template.json](./docs/GTM-Cookie-Conset-Events-Template.json)

//TODO documentation

```html
<head>
<script src="cookie-consent.js"></script>
<script>
	CookieConsent.config({});
</script>

[...]

</head>
```

### All possible cookie consents

```
strictlyNecessaryCookies = 'strictlyNecessaryCookies';
functionalityCookies = 'functionalityCookies';
trackingCookies = 'trackingCookies';
targetingCookies = 'targetingCookies';
```

### This is an example for tag manager

```html

	<head>

	<script src="cookie-consent.js"></script>
	<script>
		CookieConsent.config({});
	</script>

	[...]

	<script>
		CookieConsent.checkCookie('trackingCookies', function() {
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-XXXXXXXXXXXXX');
		});
	</script>

	[...]

	</head>
```


```js
let config = {
	text: {
		modalTitle: "",
		noticeText: "", // {{cookiesPolicyLink}}
		btnAcceptAll: "",
		btnRejectAll: "",
		btnManageCookies: "",
		btnAcceptSelection: "",
		privacyTitle: "",
		privacyTextDefinition: "",
		privacyTextInstructions: "",
		strictlyNecessaryTitle: "",
		strictlyNecessaryText: "",
		functionalityTitle: "",
		functionalityText: "",
		trackingTitle: "",
		trackingText: "",
		targetingTitle: "",
		targetingText: "",
	},
	color: {
		textColor: "#6B7280",
		titleColor: "black",
		linkColor: "black",
		modalBackground: "white",
		modalBorder: "white",
		btnPrimaryText: "white",
		btnPrimaryBackground: "#059669",
		btnSecondaryText: "#6B7280",
		btnSecondaryBackground: "white",
		btnSecondaryBorder: "#D1D5DB",
		switchColor: "green",
		switchBackground: "#D1D5DB",
		switchActiveBackground: "#059669"
	},
	cookiesPolicyLink:"",
	locale: ""
}

```
