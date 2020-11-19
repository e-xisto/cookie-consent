import en from './locales/en.js'

(function (win) {


	class CookieConsent {

		strictlyNecessaryCookies = 'strictlyNecessaryCookies';
		functionalityCookies = 'functionalityCookies';
		trackingCookies = 'trackingCookies';
		targetingCookies = 'targetingCookies';

		cookies = {};

		options = {
			text: en,
			color: { //TODO default colors
				textColor: "",
				linkColor: "",
				modalBackground: "",
				modalBorder: "",
				btnPrimaryText: "",
				btnPrimaryBackground: "",
				btnSecondaryText: "",
				btnSecondaryBackground: "",
				switchColor: ""
			},
			cookiesPolicylink: "",
			locale: 'en'
		};

		locales = {
			en: en,
		}

		manageCookiesShown = false;

		constructor () {

			this.initCookieIndex(this.strictlyNecessaryCookies);
			this.initCookieIndex(this.functionalityCookies);
			this.initCookieIndex(this.trackingCookies);
			this.initCookieIndex(this.targetingCookies);

			this.cookies[this.strictlyNecessaryCookies].mandatory = true;
		}

		initCookieIndex(cookieName) {
			this.cookies[cookieName] = {
				name: cookieName,
				event: new CustomEvent(cookieName, {}),
				checkboxId: 'cookies-' + cookieName + '-checkbox',
			};
		}


		config(options) {
			this.setOptions(options);
			if (!this.getCookie(this.strictlyNecessaryCookies)) {
				this.openPopup();
			}
		}

		setOptions(options) {

			if (options.locale && locales[options.locale]) this.options.text = locales[options.locale];
			for (var i in options.text) {
				this.options.text[i] = options.text[i];
			}
		}


		openPopup() {
			document.addEventListener("DOMContentLoaded", (event) => {
				document.body.insertAdjacentHTML('beforeend', this.render());
			});
		}

		closePopup() {
			document.getElementById('cookie-popup-cookies').remove();
		}

		checkCookie(category, callback) {

			if (this.getCookie(category)) callback();
			else document.addEventListener(category, callback);
		}


		acceptCookie(category) {
			this.setCookie(category, 1);
			if (this.cookies[category]) document.dispatchEvent(this.cookies[category].event);
		}


		acceptAll() {

			for (let category in this.cookies) {
				this.acceptCookie(category);
			}
			this.closePopup();
		}


		acceptSelection() {

			for (let category in this.cookies) {
				if (this.cookies[category].mandatory || document.getElementById(this.cookies[category].checkboxId).checked)
					this.acceptCookie(category);
			}
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


		manageCookies() {
			if (this.manageCookiesShown) {
				document.getElementById('cookie-manage-cookies').style.display = 'none';
				this.manageCookiesShown = false;
			} else {
				document.getElementById('cookie-manage-cookies').style.display = 'block';
				this.manageCookiesShown = true;
			}
		}

		render() {
			var options = this.options;
			return /*html*/ `
				<div id="cookie-popup-cookies">
					<h3>${options.text.modalTitle}</h3>
					<p>${options.text.noticeText}</p>
					<button type="button" id="btn-cookie-manage-cookies" onclick="CookieConsent.manageCookies()">${options.text.btnManageCookies}</button>
					<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
					<div id="cookie-manage-cookies" style="display: none;">
						<div id="cookie-privacy">
							<h4 id="cookie-privacy-title">${options.text.privacyTitle}</h4>
							<p id="cookie-privacy-text-definition">${options.text.privacyTextDefinition}</p>
							<p id="cookie-privacy-text-instructions">${options.text.privacyTextInstructions}</p>
						</div>
						<div id="cookie-strictly-necessary">
							<input type="checkbox" id="${this.cookies[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
							<h4 id="cookie-strictly-necessary-title">${options.text.strictlyNecessaryTitle}</h4>
							<p id="cookie-strictly-necessary-text">${options.text.strictlyNecessaryText}</p>
						</div>
						<div id="cookie-functionality">
							<input type="checkbox" id="${this.cookies[this.functionalityCookies].checkboxId}"/>
							<h4 id="cookie-functionality-title">${options.text.functionalityTitle}</h4>
							<p id="cookie-functionality-text">${options.text.functionalityText}</p>
						</div>
						<div id="cookie-tracking">
							<input type="checkbox" id="${this.cookies[this.trackingCookies].checkboxId}"/>
							<h4 id="cookie-tracking-title">${options.text.trackingTitle}</h4>
							<p id="cookie-tracking-text">${options.text.trackingText}</p>
						</div>
						<div id="cookie-targeting">
							<input type="checkbox" id="${this.cookies[this.targetingCookies].checkboxId}"/>
							<h4 id="cookie-targeting-title">${options.text.targetingTitle}</h4>
							<p id="cookie-targeting-text">${options.text.targetingText}</p>
						</div>

						<button type="button" id="btn-cookie-accept-selection" onclick="CookieConsent.acceptSelection()">${options.text.btnAcceptSelection}</button>
						<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
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