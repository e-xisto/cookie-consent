(function (win) {

	class CookieConsent {

		strictlyNecessaryCookies = 'strictlyNecessaryCookies';
		strictlyNecessaryCookiesEvent = new CustomEvent(this.strictlyNecessaryCookies, {});
		functionalityCookies = 'functionalityCookies';
		functionalityCookiesEvent = new CustomEvent(this.functionalityCookies, {});
		trackingCookies = 'trackingCookies';
		trackingCookiesEvent = new CustomEvent(this.trackingCookies, {});
		targetingCookies = 'targetingCookies';
		targetingCookiesEvent = new CustomEvent(this.targetingCookies, {});

		cookieEvents = {};
		options = {
			text: require('./locales/en.js'),
			color: {
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
			cookiesPolicylink:"",
			locale: 'en'
		};

		locales = {
			en: require('./locales/en.js'),
		}

		constructor () {

			this.cookieEvents[this.strictlyNecessaryCookies] = this.strictlyNecessaryCookiesEvent;
			this.cookieEvents[this.functionalityCookies] = this.functionalityCookiesEvent;
			this.cookieEvents[this.trackingCookies] = this.trackingCookiesEvent;
			this.cookieEvents[this.targetingCookies] = this.targetingCookiesEvent;
		}


		config(options) {
			this.setOptions(options);
			if (!this.getCookie(this.strictlyNecessaryCookies)) {
				this.popup();
			}
		}

		setOptions(options) {

			if (options.locale && locales[options.locale]) this.text = locales[options.locale];
			for (var text in options.text) {
				this.options.text[text] = options.text[text];
			}
		}


		popup() {
			document.addEventListener("DOMContentLoaded", (event) => {
				document.body.insertAdjacentHTML('beforeend', this.render());
			});
		}


		checkCookie(category, callback) {

			if (this.getCookie(category)) callback();
			else document.addEventListener(category, callback);
		}


		acceptCookie(category) {
			this.setCookie(category, 1);
			if (this.cookieEvents[category]) document.dispatchEvent(this.cookieEvents[category]);
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


		render() {
			var options = this.options;
			console.log(options);
			return /*html*/ `
				<div id="cookie-popup-cookies">
					<h3>${options.modalTitle}</h3>
					<p>${options.noticeText}</p>
					<button type="button" id="btn-cookie-manage-cookies" onclick="CookieConsent.manageCookies()">${options.btnManageCookies}</button>
					<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">${options.btnAcceptAll}</button>
				</div>
				<div id="cookie-manage-cookies" style="display: none;">
					<div id="cookie-privacy">
						<h4 id="cookie-privacy-title">${options.privacyTitle}</h4>
						<p id="cookie-privacy-text-definition">${options.privacyTextDefinition}</p>
						<p id="cookie-privacy-text-instructions">${options.privacyTextInstructions}</p>
					</div>
					<div id="cookie-strictly-necessary">
						<input type="checkbox" id="cookie-strictly-necessary-title"/>
						<h4 id="cookie-strictly-necessary-title">${options.strictlyNecessaryTitle}</h4>
						<p id="cookie-strictly-necessary-text">${options.strictlyNecessaryText}</p>
					</div>
					<div id="cookie-functionality">
						<input type="checkbox" id="cookie-functionality-title"/>
						<h4 id="cookie-functionality-title">${options.functionalityTitle}</h4>
						<p id="cookie-functionality-text">${options.functionalityText}</p>
					</div>
					<div id="cookie-tracking">
						<input type="checkbox" id="cookie-tracking-title"/>
						<h4 id="cookie-tracking-title">${options.trackingTitle}</h4>
						<p id="cookie-tracking-text">${options.trackingText}</p>
					</div>
					<div id="cookie-targeting">
						<input type="checkbox" id="cookie-targeting-title"/>
						<h4 id="cookie-targeting-title">${options.targetingTitle}</h4>
						<p id="cookie-targeting-text">${options.targetingText}</p>
					</div>

					<button type="button" id="btn-cookie-accept-selection" onclick="CookieConsent.acceptSelection()" style="display:none;">${options.btnAcceptAll}</button>
					<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">${options.btnAcceptAll}</button>
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