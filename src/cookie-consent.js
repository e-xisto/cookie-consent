import locales from './locales.js'

(function (win) {


	class CookieConsent {

		strictlyNecessaryCookies = 'strictlyNecessaryCookies';
		functionalityCookies = 'functionalityCookies';
		trackingCookies = 'trackingCookies';
		targetingCookies = 'targetingCookies';

		categories = {};
		cookies = null;

		options = {
			text: locales.en,
			color: { //TODO default colors
				textColor: "black",
				linkColor: "",
				modalBackground: "grey",
				modalBorder: "black",
				btnPrimaryText: "black",
				btnPrimaryBackground: "green",
				btnSecondaryText: "black",
				btnSecondaryBackground: "white",
				switchColor: "green",
				switchBackground: "blue",
			},
			cookiesPolicyLink: "",
			locale: 'en'
		};

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
			this.loadCookies();
			if (!document.getElementById('cookie-popup-cookies')) {
				if (document.readyState !== 'loading') {
					document.body.insertAdjacentHTML('beforeend', this.render());
				} else {
					document.addEventListener("DOMContentLoaded", (event) => {
						document.body.insertAdjacentHTML('beforeend', this.render());
					});
				}
			}
		}

		closePopup() {
			document.getElementById('cookie-popup-cookies').remove();
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

			if (string) this.cookies = JSON.parse(string);
			else this.cookies = {};
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
				this.cookies[category] = true;
			}
			this.acceptCookies(this.cookies);
			this.closePopup();
		}


		acceptSelection() {

			this.cookies = {};
			for (let category in this.categories) {
				if (this.categories[category].mandatory || document.getElementById(this.categories[category].checkboxId).checked)
					this.cookies[category] = true;
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
				<div class="cookie-consent" id="cookie-popup-cookies" style="color: ${options.color.textColor}; background-color: ${options.color.modalBackground};">
					<div class="cookie-consent-modal" style="border: 1px solid ${options.color.modalBorder};">
						<div class="cookie-consent-intro">
							<h3>${options.text.modalTitle}</h3>
							<p>${this.replace(options.text.noticeText, {cookiesPolicyLink: options.cookiesPolicyLink})}</p>
							<div class="cookie-consent-btn">
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-manage-cookies" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnPrimaryBackground}" onclick="CookieConsent.manageCookies()">${options.text.btnManageCookies}</button>
								<button type="button" class="cookie-consent-btn-accept" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground};  border: 1px solid ${options.color.btnPrimaryBackground};" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
							</div>
							<div id="cookie-manage-cookies" style="display: none;">
								<div class="cookie-consent-cookie-consent-manage">
									<div id="cookie-privacy">
										<h3 id="cookie-privacy-title">${options.text.privacyTitle}</h3>
										<p id="cookie-privacy-text-definition">${options.text.privacyTextDefinition}</p>
										<p id="cookie-privacy-text-instructions">${options.text.privacyTextInstructions}</p>
									</div>
								</div>
								<div class="cookie-consent-options">
									<div class="cookie-consent-options-item" id="cookie-strictly-necessary">
										<div class="cookie-consent-options-item-left">
											<label class="cookie-consent-switch">
												<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
												<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
											</label>
										</div>
										<div class="cookie-consent-options-item-right">
											<label for="${this.categories[this.strictlyNecessaryCookies].checkboxId}" id="cookie-strictly-necessary-title">${options.text.strictlyNecessaryTitle}</label>
											<p id="cookie-strictly-necessary-text">${options.text.strictlyNecessaryText}</p>
										</div>
									</div>
									<div id="cookie-functionality" class="cookie-consent-options-item">
										<div class="cookie-consent-options-item-left">
											<label class="cookie-consent-switch">
												<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.functionalityCookies].checkboxId}" ${this.cookies.functionalityCookies ? 'checked' : ''}/>
												<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
											</label>
										</div>
										<div class="cookie-consent-options-item-right">
											<label for="${this.categories[this.functionalityCookies].checkboxId}" id="cookie-functionality-title">${options.text.functionalityTitle}</label>
											<p id="cookie-functionality-text">${options.text.functionalityText}</p>
										</div>
									</div>
									<div id="cookie-tracking" class="cookie-consent-options-item">
										<div class="cookie-consent-options-item-left">
											<label class="cookie-consent-switch">
												<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.trackingCookies].checkboxId}" ${this.cookies.trackingCookies ? 'checked' : ''}/>
												<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
											</label>
										</div>
										<div class="cookie-consent-options-item-right">
											<label for="${this.categories[this.trackingCookies].checkboxId}" id="cookie-tracking-title">${options.text.trackingTitle}</label>
											<p id="cookie-tracking-text">${options.text.trackingText}</p>
										</div>
									</div>
									<div id="cookie-targeting" class="cookie-consent-options-item">
										<div class="cookie-consent-options-item-left">
											<label class="cookie-consent-switch">
												<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.targetingCookies].checkboxId}" ${this.cookies.targetingCookies ? 'checked' : ''}/>
												<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}"></span>
											</label>
										</div>
										<div class="cookie-consent-options-item-right">
											<label for="${this.categories[this.targetingCookies].checkboxId}" id="cookie-targeting-title">${options.text.targetingTitle}</label>
											<p id="cookie-targeting-text">${options.text.targetingText}</p>
										</div>
									</div>
									<div class="cookie-consent-btn" style="padding-bottom: 40px">
										<button class="cookie-consent-btn-manage" type="button" id="btn-cookie-accept-selection" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnPrimaryBackground};" onclick="CookieConsent.acceptSelection()">${options.text.btnAcceptSelection}</button>
										<button class="cookie-consent-btn-accept" type="button" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground}; border: 1px solid ${options.color.btnPrimaryBackground};" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
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