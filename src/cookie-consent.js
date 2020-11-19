import en from './locales/en.js'

(function (win) {


	class CookieConsent {

		strictlyNecessaryCookies = 'strictlyNecessaryCookies';
		functionalityCookies = 'functionalityCookies';
		trackingCookies = 'trackingCookies';
		targetingCookies = 'targetingCookies';

		categories = {};
		cookies = null;

		options = {
			text: en,
			color: { //TODO default colors
				textColor: "black",
				linkColor: "",
				modalBackground: "grey",
				modalBorder: "black",
				btnPrimaryText: "black",
				btnPrimaryBackground: "green",
				btnSecondaryText: "black",
				btnSecondaryBackground: "white",
				switchColor: "green"
			},
			cookiesPolicyLink: "",
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

			this.categories[this.strictlyNecessaryCookies].mandatory = true;
		}


		initCookieIndex(cookieName) {
			this.categories[cookieName] = {
				name: cookieName,
				event: new CustomEvent(cookieName, {}),
				checkboxId: 'cookies-' + cookieName + '-checkbox',
			};
		}


		config(options) {
			this.setOptions(options);
			if (!this.checkCookie(this.strictlyNecessaryCookies)) {
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

			if (!this.cookies) {
				let string = this.getCookie('cookie_consent');
				if (!string && win.localStorage) string = win.localStorage.getItem('cookie_consent');

				if (string) this.cookies = JSON.parse(string);
				else this.cookies = null;
			}

			if (this.cookies && this.cookies[category]) {
				if (callback) callback();
				return true;
			} else document.addEventListener(category, callback);
			return false;
		}

		acceptCookies(cookies) {

			let stringify = JSON.stringify(cookies);

			this.setCookie('cookie_consent', stringify);
			if (win.localStorage) win.localStorage.setItem('cookie_consent', stringify);

			for (let category in cookies) {
				if (cookies[category] && this.categories[category]) document.dispatchEvent(this.categories[category].event);
			}
		}


		acceptAll() {
			this.cookies = {};
			for (let category in this.categories) {
				this.cookies[category] = 1;
			}
			this.acceptCookies(this.cookies);
			this.closePopup();
		}


		acceptSelection() {

			this.cookies = {};
			for (let category in this.categories) {
				if (this.categories[category].mandatory || document.getElementById(this.categories[category].checkboxId).checked)
					this.cookies[category] = 1;
			}
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


		manageCookies() {
			if (this.manageCookiesShown) {
				document.getElementById('cookie-manage-cookies').style.display = 'none';
				this.manageCookiesShown = false;
			} else {
				document.getElementById('cookie-manage-cookies').style.display = 'block';
				this.manageCookiesShown = true;
			}
		}


		replace(text, data) {
			for(let i in data) {
				var regex = new RegExp('{{' + i + '}}', 'g');
				text = text.replace(regex, data[i]);
			}
			return text;
		}


		render() {
			var options = this.options;
			return /*html*/ `
				<div id="cookie-popup-cookies" style="color: ${options.color.textColor}; background-color: ${options.color.modalBackground}; border: 1px solid ${options.color.modalBorder};">
					<h3>${options.text.modalTitle}</h3>
					<p>${this.replace(options.text.noticeText, {cookiesPolicyLink: options.cookiesPolicyLink})}</p>
					<button type="button" id="btn-cookie-manage-cookies" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}" onclick="CookieConsent.manageCookies()">${options.text.btnManageCookies}</button>
					<button type="button" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
					<div id="cookie-manage-cookies" style="display: none;">
						<div id="cookie-privacy">
							<h4 id="cookie-privacy-title">${options.text.privacyTitle}</h4>
							<p id="cookie-privacy-text-definition">${options.text.privacyTextDefinition}</p>
							<p id="cookie-privacy-text-instructions">${options.text.privacyTextInstructions}</p>
						</div>
						<div id="cookie-strictly-necessary">
							<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
							<h4 id="cookie-strictly-necessary-title">${options.text.strictlyNecessaryTitle}</h4>
							<p id="cookie-strictly-necessary-text">${options.text.strictlyNecessaryText}</p>
						</div>
						<div id="cookie-functionality">
							<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.functionalityCookies].checkboxId}"/>
							<h4 id="cookie-functionality-title">${options.text.functionalityTitle}</h4>
							<p id="cookie-functionality-text">${options.text.functionalityText}</p>
						</div>
						<div id="cookie-tracking">
							<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.trackingCookies].checkboxId}"/>
							<h4 id="cookie-tracking-title">${options.text.trackingTitle}</h4>
							<p id="cookie-tracking-text">${options.text.trackingText}</p>
						</div>
						<div id="cookie-targeting">
							<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.targetingCookies].checkboxId}"/>
							<h4 id="cookie-targeting-title">${options.text.targetingTitle}</h4>
							<p id="cookie-targeting-text">${options.text.targetingText}</p>
						</div>

						<button type="button" id="btn-cookie-accept-selection" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}" onclick="CookieConsent.acceptSelection()">${options.text.btnAcceptSelection}</button>
						<button type="button" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
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