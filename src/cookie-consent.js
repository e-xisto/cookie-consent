import locales from './locales.js'

(function (win) {

  win.dataLayer = win.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'granted',
    'security_storage': 'granted'        
  });   

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
			text: locales.en,
			color: { //TODO default colors
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
      this.loadCookies()
		}

		initCookieIndex(cookieName) {
			this.categories[cookieName] = {
				name: cookieName,
				event: new CustomEvent(cookieName, {}),
				checkboxId: 'cookies-' + cookieName + '-checkbox',
			};
		}

		config(options) {
			this.setOptions(options);
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
		}

		openPopup() {
			let popup = document.getElementById('cookie-popup-cookies');
			if (!popup) {
				document.body.insertAdjacentHTML('beforeend', this.render());
				this.overflowbody = win.getComputedStyle(document.body, null).getPropertyValue("overflow");
				document.body.style.overflow = "hidden";
			}
			this.initial = false;
		}

		closePopup() {
			let popup = document.getElementById('cookie-popup-cookies');
			if (popup) {
				popup.remove();
				if (this.overflowbody) document.body.style.overflow = this.overflowbody;
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

			if (string) this.cookies = JSON.parse(string);
			else this.cookies = {};        
      
      this.updateGoogleTagManagerConsentMode();
      this.sendGoogleTagManagerEvents();      
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
        const cookiePath = "/"; // Set the path to the root by default

        const cookiePathParts = cookie.trim().split('=');
        if (cookiePathParts.length > 1 && cookiePathParts[0].trim() === "path") {
          cookiePath = cookiePathParts[1].trim();
        }

        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; domain=${cookieDomain}`;
      });    
		}

		manageCookies() {
			if (this.manageCookiesShown) {
				document.getElementById('cookie-manage-cookies').style.display = 'none';
				this.manageCookiesShown = false;
			} else {
				document.getElementById('cookie-manage-cookies').style.display = 'block';
				document.getElementById('cookie-consent-btn').style.display = 'none'
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

		render() {
			var options = this.options;
			return /*html*/ `

			<style>

				.cookie-consent {
					position: fixed;
					top: 50%;
					left: 50%;       
          transform: translate(-50%, -50%);
					font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Segoe UI Symbol";
					width: 100%;
          max-width: 800px;
					height: auto;
          max-height: calc(100dvh - 48px);       
					z-index: 9999999999;
				}

				.cookie-consent-modal {
					background-color: ${options.color.modalBackground};
					width: 100%;
          max-height: calc(100dvh - 48px);
					overflow-y: auto;
					border-radius: 6px;
          border: 1px solid #ccc;
          box-shadow: 0px 0px 70px -2px rgba(0,0,0,0.8);
				}

				.cookie-consent-intro { padding: 25px 30px; }

				.cookie-consent-modal h3 {
					font-size: 28px;
					margin-top: 0;
					margin-bottom: 16px;
				}

				.cookie-consent-intro p a {
					color: ${options.color.linkColor};
					text-decoration: underline;
					font-weight: 500;
					text-transform: lowercase;
				}

				.cookie-consent-modal p { line-height: 22px; }

				.cookie-consent-modal a { text-decoration: none; }

				.cookie-consent-btn {
					display: flex;
					justify-content: flex-end;
					padding-top: 15px;
				}

				.cookie-consent-btn button {
					padding: 10px 30px;
					font-size: 14px;
					border-radius: 4px;
					cursor: pointer;
				}

				.cookie-consent-btn button:focus { outline: none !important }
				.cookie-consent-btn-manage { margin-right: 20px; }
				.cookie-consent-btn-accept { text-transform: uppercase; }

				.cookie-consent-options-item {
					display: flex;
					margin-bottom: 20px;
				}

				.cookie-consent-options-item-right { margin-left: 15px; }

				.cookie-consent-options-item-right label {
					font-size: 20px;
					font-weight: bold;
					cursor: pointer;
				}

				.cookie-consent-options-item-right label + p {
					margin-top: 10px;
					font-size: 14px;
					line-height: 20px;
				}

				.cookie-consent-switch {
					position: relative;
					display: inline-block;
					width: 40px;
					height: 24px;
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
					height: 18px;
					width: 18px;
					left: 4px;
					bottom: 3px;
					background-color: white;
					-webkit-transition: .4s;
					transition: .4s;
				}

				input:checked + .cookie-consent-switch-slider { background-color: ${options.color.switchActiveBackground} !important; }

				input:checked + .cookie-consent-switch-slider:before {
					-webkit-transform: translateX(15px);
					-ms-transform: translateX(15px);
					transform: translateX(15px);
				}

				.cookie-consent-switch-slider.round { border-radius: 30px; }
				.cookie-consent-switch-slider.round:before { border-radius: 50%; }
				#cookie-privacy-text-instructions { margin-bottom: 30px; }

				@media (max-width: 768px) {

					.cookie-consent p {
						font-size: 14px;
						line-height: 20px;
					}

          .cookie-consent {
						max-width: calc(100% - 48px);
            max-height: calc(100dvh - 48px);
					}

					.cookie-consent-modal {
						max-height: calc(100dvh - 48px);
					}

					.cookie-consent-intro { padding: 15px; }

					.cookie-consent-btn {
						display: block;
					}

					.cookie-consent-switch {
						width: 32px;
						height: 20px;
					}

					.cookie-consent-switch-slider:before {
						width: 14px;
						height: 14px;
					}

					input:checked + .cookie-consent-switch-slider:before {
						-webkit-transform: translateX(11px);
						-ms-transform: translateX(11px);
						transform: translateX(11px);
					}

					.cookie-consent-btn button { width: 100% }

					.cookie-consent-btn-manage {
						margin-bottom: 10px;
						margin-right: 0;
					}

					.cookie-consent-btn-accept { min-height: 50px }
					.cookie-consent-options-item-right label { font-size: 16px; }
					.cookie-consent-manage { padding: 15px 20px; }
					.cookie-consent-options { padding: 0; }
				}
			</style>


				<div class="cookie-consent" id="cookie-popup-cookies" style="color: ${options.color.textColor};">
					<div class="cookie-consent-modal" style="border: 1px solid ${options.color.modalBorder}; background-color: ${options.color.modalBackground};">
						<div class="cookie-consent-intro">
							<h3 style="color: ${options.color.titleColor}">${options.text.modalTitle}</h3>
							<p>${this.replace(options.text.noticeText, {cookiesPolicyLink: options.cookiesPolicyLink})}</p>
							<div class="cookie-consent-btn" id="cookie-consent-btn">
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-manage-cookies" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnSecondaryBorder}" onclick="CookieConsent.manageCookies()">${options.text.btnManageCookies}</button>
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-reject-all" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnSecondaryBorder}" onclick="CookieConsent.rejectAll()">${options.text.btnRejectAll}</button>
								<button type="button" class="cookie-consent-btn-accept" id="btn-cookie-accept-all" style="color: ${options.color.btnPrimaryText}; background-color: ${options.color.btnPrimaryBackground};  border: 1px solid ${options.color.btnPrimaryBorder};" onclick="CookieConsent.acceptAll()">${options.text.btnAcceptAll}</button>
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
										<div class="cookie-consent-options-item-left">
											<label class="cookie-consent-switch">
												<input type="checkbox" style="color: ${options.color.switchColor}" id="${this.categories[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
												<span class="cookie-consent-switch-slider round" style="background-color: ${options.color.switchBackground}; opacity: .5;"></span>
											</label>
										</div>
										<div class="cookie-consent-options-item-right">
											<label style="color: ${options.color.titleColor}" for="${this.categories[this.strictlyNecessaryCookies].checkboxId}" id="cookie-strictly-necessary-title">${options.text.strictlyNecessaryTitle}</label>
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
											<label style="color: ${options.color.titleColor}" for="${this.categories[this.functionalityCookies].checkboxId}" id="cookie-functionality-title">${options.text.functionalityTitle}</label>
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
											<label style="color: ${options.color.titleColor}" for="${this.categories[this.trackingCookies].checkboxId}" id="cookie-tracking-title">${options.text.trackingTitle}</label>
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
											<label style="color: ${options.color.titleColor}" for="${this.categories[this.targetingCookies].checkboxId}" id="cookie-targeting-title">${options.text.targetingTitle}</label>
											<p id="cookie-targeting-text">${options.text.targetingText}</p>
										</div>
									</div>
									<div class="cookie-consent-btn">
										<button class="cookie-consent-btn-manage" type="button" id="btn-cookie-accept-selection" style="color: ${options.color.btnSecondaryText}; background-color: ${options.color.btnSecondaryBackground}; border: 1px solid ${options.color.btnSecondaryBorder};" onclick="CookieConsent.acceptSelection()">${options.text.btnAcceptSelection}</button>
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