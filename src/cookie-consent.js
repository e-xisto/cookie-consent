import locales from './locales.js'

(function (win) {

  win.dataLayer = win.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Google Consent Mode v2 — defaults must run before any Google tags (gtag/GTM)
  // Docs: https://developers.google.com/tag-platform/security/guides/consent
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  // Redact ad click identifiers when ad_storage is denied (Consent Mode advanced)
  gtag('set', 'ads_data_redaction', true);

	const defaultLocale = locales.en ? 'en' : Object.keys(locales)[0];

	class CookieConsent {

		strictlyNecessaryCookies = 'strictlyNecessaryCookies';
		functionalityCookies = 'functionalityCookies';
		trackingCookies = 'trackingCookies';
		targetingCookies = 'targetingCookies';

		categories = {};
		cookies = null;
		overflowbody = '';
		initial = false;

		options = {
			text: locales[defaultLocale],
			color: {
				textColor: "#6B7280",
				titleColor: "black",
				linkColor: "black",
				modalBackground: "white",
				modalBorder: "white",
				btnPrimaryText: "white",
				btnPrimaryBackground: "#30363c",
				btnPrimaryBorder: "#30363c",
				btnSecondaryText: "#2c2f31",
				btnSecondaryBackground: "#eaeff2",
				btnSecondaryBorder: "#eaeff2",
				switchColor: "green",
				switchBackground: "#D1D5DB",
				switchActiveBackground: "#059669"
			},
			cookiesPolicyLink: "",
			locale: defaultLocale,
			layout: 'box',
			position: 'bottom right',
			disablePageInteraction: false,
			hideFromBots: true,
		};

		manageCookiesShown = false;

		constructor () {
			this.initCookieIndex(this.strictlyNecessaryCookies);
			this.initCookieIndex(this.functionalityCookies);
			this.initCookieIndex(this.trackingCookies);
			this.initCookieIndex(this.targetingCookies); 

			this.categories[this.strictlyNecessaryCookies].mandatory = true;
      this.loadCookies()
		}

		initCookieIndex(cookieName) {
			this.categories[cookieName] = {
				name: cookieName,
				event: new CustomEvent(cookieName, {}),
				checkboxId: 'cookies-' + cookieName + '-checkbox',
			};
		}

		isBotDetected() {
			const nav = win.navigator;
			if (!nav) return false;
			return (nav.userAgent && /bot|crawl|spider|slurp|teoma/i.test(nav.userAgent)) || !!nav.webdriver;
		}

		config(options) {
			this.setOptions(options);
			if (this.options.hideFromBots && this.isBotDetected()) return;
			if (!win.localStorage.getItem('cookie_consent')) {
				this.initCookies();
				if (document.readyState !== 'loading') {
					this.openPopup();
				} else {
					document.addEventListener("DOMContentLoaded", (event) => {
						this.openPopup();
					});
				}
			}
		}

		initCookies() {
			this.cookies = {};
			this.initial = true;
		}

		setOptions(options) {

			this.options.locale = options.locale;
			if (options.locale && locales[options.locale]) this.options.text = locales[options.locale];
			for (var i in options.text) {
				this.options.text[i] = options.text[i];
			}
			for (var i in options.color) {
				this.options.color[i] = options.color[i];
			}
			if (options.cookiesPolicyLink) this.options.cookiesPolicyLink = options.cookiesPolicyLink;
			if (options.layout !== undefined) this.options.layout = options.layout;
			if (options.position !== undefined) this.options.position = options.position;
			if (options.disablePageInteraction !== undefined) this.options.disablePageInteraction = options.disablePageInteraction;
			if (options.hideFromBots !== undefined) this.options.hideFromBots = options.hideFromBots;
		}

		openPopup() {
			if (this.options.hideFromBots && this.isBotDetected()) return;
			let popup = document.getElementById('cookie-popup-cookies');
			if (!popup) {
				document.body.insertAdjacentHTML('beforeend', this.render());
				if (this.options.disablePageInteraction) {
					this.overflowbody = win.getComputedStyle(document.body, null).getPropertyValue("overflow");
					document.body.style.overflow = "hidden";
				}
			}
			this.initial = false;
		}

		closePopup() {
			let popup = document.getElementById('cookie-popup-cookies');
			if (popup) {
				popup.remove();
				if (this.overflowbody) {
					document.body.style.overflow = this.overflowbody;
					this.overflowbody = null;
				}
			}
		}

		checkCookie(category, callback) {

			if (!this.cookies) {
				this.loadCookies();
			}

			if (this.cookies && this.cookies[category]) {
				if (callback) callback();
				return true;
			} else document.addEventListener(category, callback);
			return false;
		}

		loadCookies() {
			let string = this.getCookie('cookie_consent');

			if (win.localStorage) {
				if (!win.localStorage.getItem('cookie_consent') && string) win.localStorage.setItem('cookie_consent', string);
				if (!string) string = win.localStorage.getItem('cookie_consent');
			}

			if (string) {
				this.cookies = JSON.parse(string);
				// Restore prior choices on subsequent pages (Consent Mode does not persist itself)
				this.updateGoogleTagManagerConsentMode();
				this.sendGoogleTagManagerEvents();
			} else {
				this.cookies = {};
				// First visit: keep gtag('consent','default',...) only — update after user interaction
			}
		}

		acceptCookies(cookies) {
      let stringify = JSON.stringify(cookies);

      this.eraseAllCookies();
			this.setCookie('cookie_consent', stringify);
			if (win.localStorage) win.localStorage.setItem('cookie_consent', stringify);

			for (let category in cookies) {
				if (cookies[category] && this.categories[category]) {
          document.dispatchEvent(this.categories[category].event);
        }
			}

      this.updateGoogleTagManagerConsentMode();
      this.sendGoogleTagManagerEvents();
		}

		acceptAll() {
			this.cookies = {};
			for (let category in this.categories) {
				this.cookies[category] = true;
			}
			this.manageCookiesShown = false;
			this.acceptCookies(this.cookies);
			this.closePopup();       
		}

		rejectAll() {
			this.cookies = {};
			for (let category in this.categories) {
				this.cookies[category] = false;
			}
			this.manageCookiesShown = false;
			this.acceptCookies(this.cookies);
			this.closePopup();  
		}

		acceptSelection() {
			this.cookies = {};
			for (let category in this.categories) {
				if (this.categories[category].mandatory || document.getElementById(this.categories[category].checkboxId).checked)
					this.cookies[category] = true;
			}
			this.manageCookiesShown = false;
			this.acceptCookies(this.cookies);
			this.closePopup();     
		}

		setCookie(name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		}

		getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}

		eraseCookie(name) {
			document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}

		eraseAllCookies() {
      const cookies = document.cookie.split(';');
      const currentDomain = window.location.hostname;
      const domainParts = currentDomain.split('.');
      const topLevelDomain = domainParts.slice(-2).join('.');

      cookies.forEach((cookie) => {
        const cookieName = cookie.trim().split('=')[0];
        const cookieDomain = topLevelDomain.startsWith('.') ? topLevelDomain : `.${topLevelDomain}`;
        let cookiePath = "/"; // Set the path to the root by default

        const cookiePathParts = cookie.trim().split('=');
        if (cookiePathParts.length > 1 && cookiePathParts[0].trim() === "path") {
          cookiePath = cookiePathParts[1].trim();
        }

        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; domain=${cookieDomain}`;
      });    
		}

		toggleCategory(header) {
			const body = header.nextElementSibling;
			const isOpen = header.classList.contains('cc-open');
			if (isOpen) {
				header.classList.remove('cc-open');
				header.setAttribute('aria-expanded', 'false');
				body.style.display = 'none';
			} else {
				header.classList.add('cc-open');
				header.setAttribute('aria-expanded', 'true');
				body.style.display = 'block';
			}
		}

		manageCookies() {
			if (this.manageCookiesShown) {
				document.getElementById('cookie-manage-cookies').style.display = 'none';
				document.getElementById('cookie-popup-cookies').classList.remove('cc-expanded');
				document.getElementById('cookie-popup-cookies').classList.remove('cc-manage-centered');
				this.manageCookiesShown = false;
			} else {
				document.getElementById('cookie-manage-cookies').style.display = 'block';
				document.getElementById('cookie-consent-btn').style.display = 'none';
				const layout = (this.options.layout || '').toLowerCase();
				if (layout !== 'bar') document.getElementById('cookie-popup-cookies').classList.add('cc-manage-centered');
				document.getElementById('cookie-popup-cookies').classList.add('cc-expanded');
				this.manageCookiesShown = true;
			}
		}

    sendGoogleTagManagerEvents(){
      
      let eventsList = {
        'cookieConsentUpdate': true,
        'cookieConsentAdStorage':  this.cookies[this.targetingCookies] ? true : false,
        'cookieConsentAdUserData':  this.cookies[this.targetingCookies] ? true : false,
        'cookieConsentAdPersonalization':  this.cookies[this.targetingCookies] ? true : false,
        'cookieConsentAnalyticsStorage': this.cookies[this.trackingCookies] ? true : false,
        'cookieConsentFunctionalityStorage': this.cookies[this.functionalityCookies] ? true : false,
        'cookieConsentPersonalizationStorage': true,
        'cookieConsentSecurityStorage': true,
      }

      for (let event in eventsList) {
        if (eventsList[event]) win.setTimeout(() => {win.dataLayer.push ({'event': event}) }, 500);
      }
    } 

    updateGoogleTagManagerConsentMode () {

      gtag('consent', 'update', {
        'ad_storage': this.cookies[this.targetingCookies] ? 'granted' : 'denied',
        'ad_user_data': this.cookies[this.targetingCookies] ? 'granted' : 'denied',
        'ad_personalization': this.cookies[this.targetingCookies] ? 'granted' : 'denied',
        'analytics_storage': this.cookies[this.trackingCookies] ? 'granted' : 'denied',
        'functionality_storage': this.cookies[this.functionalityCookies] ? 'granted' : 'denied',
        'personalization_storage': 'granted',
        'security_storage': 'granted'        
      }); 
    }

		replace(text, data) {
			for(let i in data) {
				var regex = new RegExp('{{' + i + '}}', 'g');
				text = text.replace(regex, data[i]);
			}
			return text;
		}

		getPositionStyle() {
			const pos = (this.options.position || 'bottom right').toLowerCase();
			const layout = (this.options.layout || 'box').toLowerCase();

			if (layout.startsWith('bar')) {
				const vert = pos.split(' ')[0];
				return vert === 'bottom'
					? 'bottom: 0; left: 0; right: 0;'
					: 'top: 0; left: 0; right: 0;';
			}

			const parts = pos.split(' ');
			const vert = parts[0] || 'bottom';
			const horiz = parts[1] || 'right';
			const transforms = [];
			let css = '';

			if (vert === 'top') css += 'top: 24px; ';
			else if (vert === 'middle') { css += 'top: 50%; '; transforms.push('translateY(-50%)'); }
			else { css += 'bottom: 24px; '; }

			if (horiz === 'left') css += 'left: 24px; ';
			else if (horiz === 'center') { css += 'left: 50%; '; transforms.push('translateX(-50%)'); }
			else { css += 'right: 24px; '; }

			if (transforms.length) css += `transform: ${transforms.join(' ')}; `;

			return css;
		}

		render() {
			var options = this.options;
			const layout = (options.layout || 'box').toLowerCase();
			const posVert = (options.position || 'bottom right').split(' ')[0];
			const positionStyle = this.getPositionStyle();
			const barShadow = posVert === 'bottom'
				? '0 -4px 12px rgba(0,0,0,0.1)'
				: '0 4px 12px rgba(0,0,0,0.1)';

			return /*html*/ `

			<style>

				.cookie-consent {
					position: fixed;
					font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Segoe UI Symbol";
					width: calc(100vw - 48px);
					max-width: 800px;
					height: auto;
					max-height: calc(100dvh - 48px);
					z-index: 9999999999;
				}

				/* When expanding "manage cookies", center the modal regardless of initial position */
				.cookie-consent.cc-manage-centered {
					top: 50% !important;
					left: 50% !important;
					right: auto !important;
					bottom: auto !important;
					transform: translate(-50%, -50%) !important;
				}

				.cookie-consent[data-layout="box"]              { max-width: 400px; }
				.cookie-consent[data-layout="box"].cc-expanded   { max-width: 700px; }
				.cookie-consent[data-layout="cloud"]             { max-width: 880px; }
				.cookie-consent[data-layout="cloud"].cc-expanded { max-width: 880px; }
				.cookie-consent[data-layout="bar"]               { max-width: none; width: auto; max-height: none; }

				.cookie-consent-modal {
					background-color: ${options.color.modalBackground};
					width: 100%;
					max-height: calc(100dvh - 48px);
					overflow-y: auto;
					border-radius: 6px;
					border: 1px solid #ccc;
					box-shadow: 0px 0px 70px -2px rgba(0,0,0,0.8);
				}

				.cookie-consent[data-layout="cloud"] .cookie-consent-modal {
					border-radius: 20px;
				}

				/* Cloud: texto a la izquierda, botones a la derecha */
				.cookie-consent[data-layout="cloud"] .cookie-consent-intro {
					display: flex;
					align-items: flex-start;
					gap: 18px;
				}

				.cookie-consent[data-layout="cloud"] .cookie-consent-intro-content {
					display: block;
					flex: 1;
				}

				.cookie-consent[data-layout="cloud"] .cookie-consent-btn {
					flex-direction: column;
					gap: 8px;
					padding-top: 0;
					align-items: flex-end;
				}

				.cookie-consent[data-layout="cloud"] .cookie-consent-btn button {
					width: 220px;
					max-width: 100%;
				}

				.cookie-consent[data-layout="cloud"] .cookie-consent-btn-manage {
					margin-right: 0;
				}

				.cookie-consent[data-layout="cloud"].cc-expanded .cookie-consent-intro {
					flex-direction: column;
					align-items: stretch;
				}

				.cookie-consent[data-layout="cloud"] #cookie-manage-cookies {
					width: 100%;
					min-width: 0;
				}

				.cookie-consent[data-layout="cloud"] #cookie-manage-cookies .cookie-consent-btn {
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					width: 100%;
					padding-top: 15px;
				}

				.cookie-consent[data-layout="cloud"] #cookie-manage-cookies .cookie-consent-btn button {
					width: auto;
				}

				.cookie-consent[data-layout="bar"] .cookie-consent-modal {
					border-radius: 0;
					max-height: none;
					overflow-y: visible;
					box-shadow: ${barShadow};
				}

				.cookie-consent-intro { padding: 20px; }

				.cookie-consent[data-layout="bar"] .cookie-consent-intro {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 25px;
					padding: 25px 30px;
					max-width: 1200px;
					margin-left: auto;
					margin-right: auto;
				}

				.cookie-consent-intro-content { display: contents; }

				.cookie-consent[data-layout="bar"] .cookie-consent-intro-content {
					display: flex;
					flex-direction: column;
					width: 100%;
					min-width: 0;
				}

				.cookie-consent-modal h3 {
					font-size: 18px;
					margin-top: 0;
					margin-bottom: 16px;
				}

				.cookie-consent[data-layout="bar"] .cookie-consent-intro-content h3 {
					margin-bottom: 2px;
				}

				.cookie-consent-modal p {
					font-size: 14px;
					line-height: 20px;
				}

				.cookie-consent[data-layout="bar"] .cookie-consent-intro-content p {
					line-height: 18px;
					margin-top: 10px;
					margin-bottom: 0;
					margin-left: 0;
					margin-right: 0;
				}

				.cookie-consent-intro p a {
					color: ${options.color.linkColor};
					text-decoration: underline;
					font-weight: 500;
					text-transform: lowercase;
				}

				.cookie-consent-modal a { text-decoration: none; }

				.cookie-consent-btn {
					display: flex;
					justify-content: flex-end;
					padding-top: 15px;
				}

				.cookie-consent[data-layout="box"] .cookie-consent-btn {
					flex-direction: column;
					gap: 8px;
				}

				/* box wide: aceptar + rechazar a la izquierda, gestionar a la derecha */
				.cookie-consent[data-layout="box wide"] #cookie-consent-btn {
					display: flex;
					flex-direction: row;
					gap: 10px;
					justify-content: flex-start;
					width: 100%;
				}

				.cookie-consent[data-layout="box wide"] .cookie-consent-btn {
					gap: 10px;
				}

				.cookie-consent[data-layout="box wide"] .cookie-consent-btn-manage {
					margin-right: 0;
				}

				.cookie-consent[data-layout="box wide"] #btn-cookie-manage-cookies,
				.cookie-consent[data-layout="bar"] #btn-cookie-manage-cookies {
					margin-left: auto;
					margin-right: 0;
				}

				.cookie-consent[data-layout="box"] .cookie-consent-btn button {
					width: 100%;
				}

				.cookie-consent[data-layout="bar"] #cookie-consent-btn {
					flex-shrink: 0;
					padding-top: 0;
					flex-direction: row;
					gap: 10px;
					width: 100%;
					flex-wrap: nowrap;
					justify-content: flex-start;
				}

				.cookie-consent[data-layout="bar"] .cookie-consent-btn {
					justify-content: flex-start;
				}

				.cookie-consent[data-layout="bar"] #cookie-manage-cookies {
					flex-basis: 100%;
					border-top: 1px solid #e5e7eb;
					padding-top: 16px;
					margin-top: 4px;
					max-width: 1200px;
					margin-left: auto;
					margin-right: auto;
				}

				.cookie-consent-btn button {
					padding: 10px 30px;
					font-size: 14px;
					font-weight: 700;
					border-radius: 4px;
					cursor: pointer;
				}

				.cookie-consent-btn button:focus { outline: none !important }
				#btn-cookie-accept-all { order: 1; }
				#btn-cookie-reject-all { order: 2; }
				#btn-cookie-manage-cookies { order: 3; }
				#btn-cookie-accept-selection { order: 1; }
				#btn-cookie-accept-all-config { order: 2; }

				#cookie-manage-cookies .cookie-consent-btn {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center;
					gap: 10px;
					width: 100%;
				}

				#cookie-manage-cookies .cookie-consent-btn button {
					width: auto;
					margin-right: 0;
					margin-bottom: 0;
				}
				.cookie-consent-btn-manage { margin-right: 20px; }
				.cookie-consent[data-layout="bar"] .cookie-consent-btn-manage { margin-right: 0; }
				.cookie-consent[data-layout="box"] .cookie-consent-btn-manage { margin-right: 0; }

				.cookie-consent-options-item {
					border: 1px solid #e5e7eb;
					border-radius: 6px;
					margin-bottom: 8px;
					overflow: hidden;
				}

				.cc-item-header {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 14px 16px;
					cursor: pointer;
					width: 100%;
					background: transparent;
					border: none;
					text-align: left;
				}

				.cc-item-header:focus { outline: none; }

				.cc-item-chevron {
					flex-shrink: 0;
					display: flex;
					align-items: center;
					color: #9ca3af;
					transition: transform 0.2s;
				}

				.cc-item-header.cc-open .cc-item-chevron {
					transform: rotate(180deg);
				}

				.cc-item-title {
					flex: 1;
					font-size: 14px;
					font-weight: 600;
				}

				.cc-item-controls {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-shrink: 0;
				}

				.cc-item-always-enabled {
					font-size: 12px;
					color: #6b7280;
					white-space: nowrap;
				}

				.cc-item-body {
					display: none;
					padding: 0 16px 14px;
					border-top: 1px solid #e5e7eb;
				}

				.cc-item-body p {
					margin: 12px 0 0;
				}

				.cookie-consent-switch {
					position: relative;
					display: inline-block;
					width: 34px;
					height: 20px;
				}

				.cookie-consent-switch input {
					width: 0;
					height: 0;
					visibility: hidden;
				}

				.cookie-consent-switch-slider {
					position: absolute;
					cursor: pointer;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					-webkit-transition: .4s;
					transition: .4s;
				}

				.cookie-consent-switch-slider:before {
					position: absolute;
					content: "";
					height: 14px;
					width: 14px;
					left: 3px;
					bottom: 3px;
					background-color: white;
					-webkit-transition: .4s;
					transition: .4s;
				}

				input:checked + .cookie-consent-switch-slider { background-color: ${options.color.switchActiveBackground} !important; }

				input:checked + .cookie-consent-switch-slider:before {
					-webkit-transform: translateX(14px);
					-ms-transform: translateX(14px);
					transform: translateX(14px);
				}

				.cookie-consent-switch-slider.round { border-radius: 30px; }
				.cookie-consent-switch-slider.round:before { border-radius: 50%; }
				#cookie-privacy-text-instructions { margin-bottom: 30px; }

				@media (max-width: 768px) {

					.cookie-consent p {
						font-size: 14px;
						line-height: 20px;
					}

					.cookie-consent:not([data-layout="bar"]) {
						max-height: calc(100dvh - 48px);
					}

					.cookie-consent:not([data-layout="bar"]) .cookie-consent-modal {
						max-height: calc(100dvh - 48px);
					}

					.cookie-consent-intro { padding: 20px; }

					.cookie-consent[data-layout="cloud"] .cookie-consent-intro {
						flex-direction: column;
					}

					.cookie-consent[data-layout="cloud"] .cookie-consent-btn {
						width: 100%;
						align-items: stretch;
					}

					.cookie-consent[data-layout="cloud"] .cookie-consent-btn button {
						width: 100%;
					}

					.cookie-consent[data-layout="bar"] #cookie-consent-btn {
						display: flex;
						flex-direction: column;
						width: 100%;
					}

					.cookie-consent[data-layout="bar"] .cookie-consent-intro {
						flex-direction: column;
						align-items: flex-start;
					}

					.cookie-consent[data-layout="box"] .cookie-consent-btn,
					.cookie-consent[data-layout="box wide"] .cookie-consent-btn,
					.cookie-consent[data-layout="box wide"] #cookie-consent-btn {
						flex-direction: column;
						justify-content: flex-start;
						gap: 8px;
					}

					.cookie-consent[data-layout="box wide"] #btn-cookie-manage-cookies,
					.cookie-consent[data-layout="bar"] #btn-cookie-manage-cookies {
						margin-left: 0;
					}

					/* When stacking buttons with gap, don't add extra spacing per-button */
					.cookie-consent[data-layout="box"] .cookie-consent-btn-manage,
					.cookie-consent[data-layout="box wide"] .cookie-consent-btn-manage {
						margin-bottom: 0;
					}

					/* Same issue in responsive: when the parent uses gap, avoid per-button margins */
					.cookie-consent[data-layout="cloud"] .cookie-consent-btn-manage {
						margin-bottom: 0;
						margin-right: 0;
					}

					.cookie-consent[data-layout="bar"] #cookie-consent-btn .cookie-consent-btn-manage,
					.cookie-consent[data-layout="bar"] .cookie-consent-btn-manage {
						margin-bottom: 0;
						margin-right: 0;
					}

					.cookie-consent-switch {
						width: 28px;
						height: 17px;
					}

					.cookie-consent-switch-slider:before {
						width: 11px;
						height: 11px;
					}

					input:checked + .cookie-consent-switch-slider:before {
						-webkit-transform: translateX(14px);
						-ms-transform: translateX(14px);
						transform: translateX(14px);
					}

					.cookie-consent-btn button { width: 100% }

					#cookie-manage-cookies .cookie-consent-btn {
						flex-direction: row;
						justify-content: flex-start;
					}

					#cookie-manage-cookies .cookie-consent-btn button {
						width: auto;
					}

					.cookie-consent-btn-manage {
						margin-bottom: 10px;
						margin-right: 0;
					}

					.cookie-consent-btn-accept { min-height: 50px }
					.cookie-consent-manage { padding: 15px 20px; }
					.cookie-consent-options { padding: 0; }
				}
			</style>


				<div class="cookie-consent" id="cookie-popup-cookies" data-layout="${layout}" style="${positionStyle} color: ${options.color.textColor};">
					<div class="cookie-consent-modal" style="border: 1px solid ${options.color.modalBorder}; background-color: ${options.color.modalBackground};">
						<div class="cookie-consent-intro">
							<div class="cookie-consent-intro-content">
								<h3 style="color: ${options.color.titleColor}">${options.text.modalTitle}</h3>
								<p>${this.replace(options.text.noticeText, {cookiesPolicyLink: options.cookiesPolicyLink})}</p>
							</div>
							<div class="cookie-consent-btn" id="cookie-consent-btn">
								<button type="button" class="cookie-consent-btn-accept" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}; border: 1px solid ${options.color.btnPrimaryBorder};" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-reject-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}; border: 1px solid ${options.color.btnPrimaryBorder}" onclick="CookieConsent.rejectAll()">${options.text.btnRejectAll}</button>
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-manage-cookies" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnSecondaryBorder}" onclick="CookieConsent.manageCookies()">${options.text.btnManageCookies}</button>
							</div>
							<div id="cookie-manage-cookies" style="display: none;">
								<div class="cookie-consent-cookie-consent-manage">
									<div id="cookie-privacy">
										<h3 style="color: ${options.color.titleColor}; margin-top: 16px" id="cookie-privacy-title">${options.text.privacyTitle}</h3>
										<p id="cookie-privacy-text-definition">${options.text.privacyTextDefinition}</p>
										<p id="cookie-privacy-text-instructions">${options.text.privacyTextInstructions}</p>
									</div>
								</div>
								<div class="cookie-consent-options">
									<div class="cookie-consent-options-item" id="cookie-strictly-necessary">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${options.color.titleColor}" id="cookie-strictly-necessary-title">${options.text.strictlyNecessaryTitle}</span>
											<div class="cc-item-controls">
												<span class="cc-item-always-enabled">${options.text.alwaysEnabled}</span>
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}; opacity: .5;"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-strictly-necessary-text">
											<p>${options.text.strictlyNecessaryText}</p>
										</div>
									</div>
									<div id="cookie-functionality" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${options.color.titleColor}" id="cookie-functionality-title">${options.text.functionalityTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.functionalityCookies].checkboxId}" ${this.cookies.functionalityCookies ? 'checked' : ''}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-functionality-text">
											<p>${options.text.functionalityText}</p>
										</div>
									</div>
									<div id="cookie-tracking" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${options.color.titleColor}" id="cookie-tracking-title">${options.text.trackingTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.trackingCookies].checkboxId}" ${this.cookies.trackingCookies ? 'checked' : ''}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-tracking-text">
											<p>${options.text.trackingText}</p>
										</div>
									</div>
									<div id="cookie-targeting" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${options.color.titleColor}" id="cookie-targeting-title">${options.text.targetingTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.targetingCookies].checkboxId}" ${this.cookies.targetingCookies ? 'checked' : ''}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-targeting-text">
											<p>${options.text.targetingText}</p>
										</div>
									</div>
									<div class="cookie-consent-btn">
										<button class="cookie-consent-btn-accept" type="button" id="btn-cookie-accept-selection" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}; border: 1px solid ${options.color.btnPrimaryBorder};" onclick="CookieConsent.acceptSelection()">${options.text.btnAcceptSelection}</button>
										<button class="cookie-consent-btn-accept" type="button" id="btn-cookie-accept-all-config" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}; border: 1px solid ${options.color.btnPrimaryBorder};" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	}

	win.CookieConsent = new CookieConsent();


	///////////////////////////////////////////
	///////////////////////////////////////////
	///////////////////////////////////////////
	///////////////////////////////////////////

})(window);