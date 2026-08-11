/*! @e-xisto/cookie-consent v2.6.0 */
(()=>{var m=Object.defineProperty;var b=(t,a,l)=>a in t?m(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;var r=(t,a,l)=>(b(t,typeof a!="symbol"?a+"":a,l),l);var g={modalTitle:"Fem servir cookies",noticeText:'Fem servir cookies i altres tecnologies de seguiment per millorar la teva experi\xE8ncia de navegaci\xF3 al nostre lloc web, per mostrar-te contingut personalitzat i anuncis interessants per a tu, per analitzar el nostre tr\xE0fic i entendre d\u2019on venen els nostres visitants. En navegar pel nostre lloc web, consentiu l\u2019\xFAs que fem de cookies i altres tecnologies de seguiment. Per obtenir m\xE9s informaci\xF3 sobre aquestes cookies, com i per qu\xE8 les fem servir i com podeu canviar la configuraci\xF3, consulteu la nostra <a href="{{cookiesPolicyLink}}" target="_blank">Pol\xEDtica de cookies</a>. ',btnAcceptAll:"Accepta totes les cookies",btnRejectAll:"Rebutjar totes les galetes",btnManageCookies:"Gestiona les cookies",btnAcceptSelection:"Accepta les cookies seleccionades",alwaysEnabled:"Sempre actives",privacyTitle:"La vostra privacitat \xE9s important per nosaltres",privacyTextDefinition:"Les cookies s\xF3n uns arxius de text molt petits que es guarden al vostre ordinador quan visiteu un lloc web. Fem servir cookies per una varietat de finalitats i millorar la vostra experi\xE8ncia al nostre lloc web (per exemple, per recordar les vostres credencials).",privacyTextInstructions:"Pot canviar les vostres prefer\xE8ncies i rebutjar l\u2019emmagatzematge al vostre ordinador de certs tipus de cookies mentres navega pel nostre. Pot eliminar qualsevol cookie ja emmagatzemada al vostre ordinador, per\xF2 tingui en compte que eliminar cookies pot impedir que faci servir parts del nostre lloc web.",strictlyNecessaryTitle:"Cookies estrictament necess\xE0ries",strictlyNecessaryText:"Aquestes cookies s\xF3n essencials per oferir-vos el nostres serveis i funcionalitats al nostre lloc web. Sense aquestes cookies, no us podem oferir alguns serveis.",functionalityTitle:"Cookies de funcionalitat",functionalityText:"Aquestes cookies ens permeten oferir-vos una experi\xE8ncia personalitzada i recordar la vostra configuraci\xF3 quan feu servir el nostre lloc web. Per exemple, podem fer servir funcionalitat per recordar el vostre idioma o les vostres credencials.",trackingTitle:"Cookies de seguiment i rendiment",trackingText:"Aquestes cookies es fan servir per recollir informaci\xF3, analitzar el tr\xE0fic i veure com es fa servir el nostre lloc web. Per exemple, aquestes cookies podrien fer el seguiment de quant de temps visiteu el nostre web o quines p\xE0gines visiteu les quals ens poden ajudar a entendre com millorar el lloc web per vosaltres. La informaci\xF3 recollida gr\xE0cies a aquestes cookies de seguiment i rendiment no us identifiquen de forma individual.",targetingTitle:"Cookies de publicitat i focalitzaci\xF3",targetingText:"Aquestes cookies es fan servir per mostrar anuncis que poden ser del vostre inter\xE8s basats en els vostres h\xE0bits d\u2019us. Aquestes cookies, servides tal i com ho fan els nostres prove\xEFdors de publicitat i contingut, poden combinar informaci\xF3 recollida al nostre lloc web amb altra informaci\xF3 que hagin recollit independentment relacionada amb activitat a la seva xarxa de llocs web.Si vost\xE8 decideix eliminar o deshabilitat aquestes cookies, encara veur\xE0 publicitat per\xF2 aquesta pot no ser rellevant per vost\xE8."};var p={ca:g};(function(t){t.dataLayer=t.dataLayer||[];function a(){dataLayer.push(arguments)}a("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",functionality_storage:"denied",personalization_storage:"granted",security_storage:"granted",wait_for_update:500}),a("set","ads_data_redaction",!0);let l=p.en?"en":Object.keys(p)[0];class h{constructor(){r(this,"strictlyNecessaryCookies","strictlyNecessaryCookies");r(this,"functionalityCookies","functionalityCookies");r(this,"trackingCookies","trackingCookies");r(this,"targetingCookies","targetingCookies");r(this,"categories",{});r(this,"cookies",null);r(this,"overflowbody","");r(this,"initial",!1);r(this,"options",{text:p[l],color:{textColor:"#6B7280",titleColor:"black",linkColor:"black",modalBackground:"white",modalBorder:"white",btnPrimaryText:"white",btnPrimaryBackground:"#059669",btnPrimaryBorder:"#059669",btnSecondaryText:"#6B7280",btnSecondaryBackground:"white",btnSecondaryBorder:"#D1D5DB",switchColor:"green",switchBackground:"#D1D5DB",switchActiveBackground:"#059669"},cookiesPolicyLink:"",locale:l,layout:"box wide",position:"middle center"});r(this,"manageCookiesShown",!1);this.initCookieIndex(this.strictlyNecessaryCookies),this.initCookieIndex(this.functionalityCookies),this.initCookieIndex(this.trackingCookies),this.initCookieIndex(this.targetingCookies),this.categories[this.strictlyNecessaryCookies].mandatory=!0,this.loadCookies()}initCookieIndex(o){this.categories[o]={name:o,event:new CustomEvent(o,{}),checkboxId:"cookies-"+o+"-checkbox"}}config(o){this.setOptions(o),t.localStorage.getItem("cookie_consent")||(this.initCookies(),document.readyState!=="loading"?this.openPopup():document.addEventListener("DOMContentLoaded",e=>{this.openPopup()}))}initCookies(){this.cookies={},this.initial=!0}setOptions(o){this.options.locale=o.locale,o.locale&&p[o.locale]&&(this.options.text=p[o.locale]);for(var e in o.text)this.options.text[e]=o.text[e];for(var e in o.color)this.options.color[e]=o.color[e];o.cookiesPolicyLink&&(this.options.cookiesPolicyLink=o.cookiesPolicyLink),o.layout!==void 0&&(this.options.layout=o.layout),o.position!==void 0&&(this.options.position=o.position)}openPopup(){document.getElementById("cookie-popup-cookies")||(document.body.insertAdjacentHTML("beforeend",this.render()),(this.options.layout||"").includes("inline")||(this.overflowbody=t.getComputedStyle(document.body,null).getPropertyValue("overflow"),document.body.style.overflow="hidden")),this.initial=!1}closePopup(){let o=document.getElementById("cookie-popup-cookies");o&&(o.remove(),this.overflowbody&&(document.body.style.overflow=this.overflowbody))}checkCookie(o,e){return this.cookies||this.loadCookies(),this.cookies&&this.cookies[o]?(e&&e(),!0):(document.addEventListener(o,e),!1)}loadCookies(){let o=this.getCookie("cookie_consent");t.localStorage&&(!t.localStorage.getItem("cookie_consent")&&o&&t.localStorage.setItem("cookie_consent",o),o||(o=t.localStorage.getItem("cookie_consent"))),o?(this.cookies=JSON.parse(o),this.updateGoogleTagManagerConsentMode(),this.sendGoogleTagManagerEvents()):this.cookies={}}acceptCookies(o){let e=JSON.stringify(o);this.eraseAllCookies(),this.setCookie("cookie_consent",e),t.localStorage&&t.localStorage.setItem("cookie_consent",e);for(let i in o)o[i]&&this.categories[i]&&document.dispatchEvent(this.categories[i].event);this.updateGoogleTagManagerConsentMode(),this.sendGoogleTagManagerEvents()}acceptAll(){this.cookies={};for(let o in this.categories)this.cookies[o]=!0;this.manageCookiesShown=!1,this.acceptCookies(this.cookies),this.closePopup()}rejectAll(){this.cookies={};for(let o in this.categories)this.cookies[o]=!1;this.manageCookiesShown=!1,this.acceptCookies(this.cookies),this.closePopup()}acceptSelection(){this.cookies={};for(let o in this.categories)(this.categories[o].mandatory||document.getElementById(this.categories[o].checkboxId).checked)&&(this.cookies[o]=!0);this.manageCookiesShown=!1,this.acceptCookies(this.cookies),this.closePopup()}setCookie(o,e,i){var s="";if(i){var n=new Date;n.setTime(n.getTime()+i*24*60*60*1e3),s="; expires="+n.toUTCString()}document.cookie=o+"="+(e||"")+s+"; path=/"}getCookie(o){for(var e=o+"=",i=document.cookie.split(";"),s=0;s<i.length;s++){for(var n=i[s];n.charAt(0)==" ";)n=n.substring(1,n.length);if(n.indexOf(e)==0)return n.substring(e.length,n.length)}return null}eraseCookie(o){document.cookie=o+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}eraseAllCookies(){let o=document.cookie.split(";"),s=window.location.hostname.split(".").slice(-2).join(".");o.forEach(n=>{let d=n.trim().split("=")[0],c=s.startsWith(".")?s:`.${s}`,k="/",u=n.trim().split("=");u.length>1&&u[0].trim()==="path"&&(k=u[1].trim()),document.cookie=`${d}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${k}; domain=${c}`})}toggleCategory(o){let e=o.nextElementSibling;o.classList.contains("cc-open")?(o.classList.remove("cc-open"),o.setAttribute("aria-expanded","false"),e.style.display="none"):(o.classList.add("cc-open"),o.setAttribute("aria-expanded","true"),e.style.display="block")}manageCookies(){this.manageCookiesShown?(document.getElementById("cookie-manage-cookies").style.display="none",document.getElementById("cookie-popup-cookies").classList.remove("cc-expanded"),document.getElementById("cookie-popup-cookies").classList.remove("cc-manage-centered"),this.manageCookiesShown=!1):(document.getElementById("cookie-manage-cookies").style.display="block",document.getElementById("cookie-consent-btn").style.display="none",(this.options.layout||"").toLowerCase().replace(" inline","").trim()!=="bar"&&document.getElementById("cookie-popup-cookies").classList.add("cc-manage-centered"),document.getElementById("cookie-popup-cookies").classList.add("cc-expanded"),this.manageCookiesShown=!0)}sendGoogleTagManagerEvents(){let o={cookieConsentUpdate:!0,cookieConsentAdStorage:!!this.cookies[this.targetingCookies],cookieConsentAdUserData:!!this.cookies[this.targetingCookies],cookieConsentAdPersonalization:!!this.cookies[this.targetingCookies],cookieConsentAnalyticsStorage:!!this.cookies[this.trackingCookies],cookieConsentFunctionalityStorage:!!this.cookies[this.functionalityCookies],cookieConsentPersonalizationStorage:!0,cookieConsentSecurityStorage:!0};for(let e in o)o[e]&&t.setTimeout(()=>{t.dataLayer.push({event:e})},500)}updateGoogleTagManagerConsentMode(){a("consent","update",{ad_storage:this.cookies[this.targetingCookies]?"granted":"denied",ad_user_data:this.cookies[this.targetingCookies]?"granted":"denied",ad_personalization:this.cookies[this.targetingCookies]?"granted":"denied",analytics_storage:this.cookies[this.trackingCookies]?"granted":"denied",functionality_storage:this.cookies[this.functionalityCookies]?"granted":"denied",personalization_storage:"granted",security_storage:"granted"})}replace(o,e){for(let s in e){var i=new RegExp("{{"+s+"}}","g");o=o.replace(i,e[s])}return o}getPositionStyle(){let o=(this.options.position||"middle center").toLowerCase();if((this.options.layout||"box wide").toLowerCase().startsWith("bar"))return o.split(" ")[0]==="bottom"?"bottom: 0; left: 0; right: 0;":"top: 0; left: 0; right: 0;";let i=o.split(" "),s=i[0]||"middle",n=i[1]||"center",d=[],c="";return s==="top"?c+="top: 24px; ":s==="middle"?(c+="top: 50%; ",d.push("translateY(-50%)")):c+="bottom: 24px; ",n==="left"?c+="left: 24px; ":n==="center"?(c+="left: 50%; ",d.push("translateX(-50%)")):c+="right: 24px; ",d.length&&(c+=`transform: ${d.join(" ")}; `),c}render(){var o=this.options;let i=(o.layout||"box wide").toLowerCase().replace(" inline","").trim(),s=(o.position||"middle center").split(" ")[0],n=this.getPositionStyle(),d=i==="bar",c=s==="bottom"?"0 -4px 12px rgba(0,0,0,0.1)":"0 4px 12px rgba(0,0,0,0.1)";return`

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

				.cookie-consent[data-layout="box"]              { max-width: 480px; }
				.cookie-consent[data-layout="box"].cc-expanded   { max-width: 700px; }
				.cookie-consent[data-layout="cloud"]             { max-width: 880px; }
				.cookie-consent[data-layout="cloud"].cc-expanded { max-width: 880px; }
				.cookie-consent[data-layout="bar"]               { max-width: none; width: auto; max-height: none; }

				.cookie-consent-modal {
					background-color: ${o.color.modalBackground};
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

				.cookie-consent[data-layout="bar"] .cookie-consent-modal {
					border-radius: 0;
					max-height: none;
					overflow-y: visible;
					box-shadow: ${c};
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
					color: ${o.color.linkColor};
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

				/* box wide: mantener el mismo gap horizontal que bar */
				.cookie-consent[data-layout="box wide"] #cookie-consent-btn {
					display: flex;
					flex-direction: row;
					gap: 10px;
					justify-content: flex-end;
				}

				.cookie-consent[data-layout="box wide"] .cookie-consent-btn {
					gap: 10px;
				}

				.cookie-consent[data-layout="box wide"] .cookie-consent-btn-manage {
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
					border-radius: 4px;
					cursor: pointer;
				}

				.cookie-consent-btn button:focus { outline: none !important }
				.cookie-consent-btn-manage { margin-right: 20px; }
				.cookie-consent[data-layout="bar"] .cookie-consent-btn-manage { margin-right: 0; }
				.cookie-consent[data-layout="box"] .cookie-consent-btn-manage { margin-right: 0; }
				.cookie-consent-btn-accept { text-transform: uppercase; }

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

				input:checked + .cookie-consent-switch-slider { background-color: ${o.color.switchActiveBackground} !important; }

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
					.cookie-consent[data-layout="box wide"] .cookie-consent-btn {
						flex-direction: column;
						justify-content: flex-start;
						gap: 8px;
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

					.cookie-consent-btn-manage {
						margin-bottom: 10px;
						margin-right: 0;
					}

					.cookie-consent-btn-accept { min-height: 50px }
					.cookie-consent-manage { padding: 15px 20px; }
					.cookie-consent-options { padding: 0; }
				}
			</style>


				<div class="cookie-consent" id="cookie-popup-cookies" data-layout="${i}" style="${n} color: ${o.color.textColor};">
					<div class="cookie-consent-modal" style="border: 1px solid ${o.color.modalBorder}; background-color: ${o.color.modalBackground};">
						<div class="cookie-consent-intro">
							<div class="cookie-consent-intro-content">
								<h3 style="color: ${o.color.titleColor}">${o.text.modalTitle}</h3>
								<p>${this.replace(o.text.noticeText,{cookiesPolicyLink:o.cookiesPolicyLink})}</p>
							</div>
							<div class="cookie-consent-btn" id="cookie-consent-btn">
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-manage-cookies" style="color: ${o.color.btnSecondaryText}; background-color: ${o.color.btnSecondaryBackground}; border: 1px solid ${o.color.btnSecondaryBorder}" onclick="CookieConsent.manageCookies()">${o.text.btnManageCookies}</button>
								<button type="button" class="cookie-consent-btn-manage" id="btn-cookie-reject-all" style="color: ${o.color.btnSecondaryText}; background-color: ${o.color.btnSecondaryBackground}; border: 1px solid ${o.color.btnSecondaryBorder}" onclick="CookieConsent.rejectAll()">${o.text.btnRejectAll}</button>
								<button type="button" class="cookie-consent-btn-accept" id="btn-cookie-accept-all" style="color: ${o.color.btnPrimaryText}; background-color: ${o.color.btnPrimaryBackground}; border: 1px solid ${o.color.btnPrimaryBorder};" onclick="CookieConsent.acceptAll()">${o.text.btnAcceptAll}</button>
							</div>
							<div id="cookie-manage-cookies" style="display: none;">
								<div class="cookie-consent-cookie-consent-manage">
									<div id="cookie-privacy">
										<h3 style="color: ${o.color.titleColor}; margin-top: 16px" id="cookie-privacy-title">${o.text.privacyTitle}</h3>
										<p id="cookie-privacy-text-definition">${o.text.privacyTextDefinition}</p>
										<p id="cookie-privacy-text-instructions">${o.text.privacyTextInstructions}</p>
									</div>
								</div>
								<div class="cookie-consent-options">
									<div class="cookie-consent-options-item" id="cookie-strictly-necessary">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${o.color.titleColor}" id="cookie-strictly-necessary-title">${o.text.strictlyNecessaryTitle}</span>
											<div class="cc-item-controls">
												<span class="cc-item-always-enabled">${o.text.alwaysEnabled}</span>
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${o.color.switchColor}" id="${this.categories[this.strictlyNecessaryCookies].checkboxId}" checked disabled/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${o.color.switchBackground}; opacity: .5;"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-strictly-necessary-text">
											<p>${o.text.strictlyNecessaryText}</p>
										</div>
									</div>
									<div id="cookie-functionality" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${o.color.titleColor}" id="cookie-functionality-title">${o.text.functionalityTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${o.color.switchColor}" id="${this.categories[this.functionalityCookies].checkboxId}" ${this.cookies.functionalityCookies?"checked":""}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${o.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-functionality-text">
											<p>${o.text.functionalityText}</p>
										</div>
									</div>
									<div id="cookie-tracking" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${o.color.titleColor}" id="cookie-tracking-title">${o.text.trackingTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${o.color.switchColor}" id="${this.categories[this.trackingCookies].checkboxId}" ${this.cookies.trackingCookies?"checked":""}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${o.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-tracking-text">
											<p>${o.text.trackingText}</p>
										</div>
									</div>
									<div id="cookie-targeting" class="cookie-consent-options-item">
										<div class="cc-item-header" onclick="CookieConsent.toggleCategory(this)" aria-expanded="false">
											<span class="cc-item-chevron"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 6 8 10 12 6"/></svg></span>
											<span class="cc-item-title" style="color: ${o.color.titleColor}" id="cookie-targeting-title">${o.text.targetingTitle}</span>
											<div class="cc-item-controls">
												<label class="cookie-consent-switch" onclick="event.stopPropagation()">
													<input type="checkbox" style="color: ${o.color.switchColor}" id="${this.categories[this.targetingCookies].checkboxId}" ${this.cookies.targetingCookies?"checked":""}/>
													<span class="cookie-consent-switch-slider round" style="background-color: ${o.color.switchBackground}"></span>
												</label>
											</div>
										</div>
										<div class="cc-item-body" id="cookie-targeting-text">
											<p>${o.text.targetingText}</p>
										</div>
									</div>
									<div class="cookie-consent-btn">
										<button class="cookie-consent-btn-manage" type="button" id="btn-cookie-accept-selection" style="color: ${o.color.btnSecondaryText}; background-color: ${o.color.btnSecondaryBackground}; border: 1px solid ${o.color.btnSecondaryBorder};" onclick="CookieConsent.acceptSelection()">${o.text.btnAcceptSelection}</button>
										<button class="cookie-consent-btn-accept" type="button" id="btn-cookie-accept-all-config" style="color: ${o.color.btnPrimaryText}; background-color: ${o.color.btnPrimaryBackground}; border: 1px solid ${o.color.btnPrimaryBorder};" onclick="CookieConsent.acceptAll()">${o.text.btnAcceptAll}</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`}}t.CookieConsent=new h})(window);})();
