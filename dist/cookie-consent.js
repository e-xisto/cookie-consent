parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"CFpv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={modalTitle:"We use cookies",noticeText:"We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.",btnAcceptAll:"Accept all cookies",btnManageCookies:"Manage cookies",btnAcceptSelection:"Accept selected cookies",privacyTitle:"Your privacy is important to us",privacyTextDefinition:"Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).",privacyTextInstructions:"You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.",strictlyNecessaryTitle:"Strictly necessary cookies",strictlyNecessaryText:"These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website. Without these cookies, we cannot provide you certain services on our website.",functionalityTitle:"Functionality cookies",functionalityText:"These cookies are used to provide you with a more personalized experience on our website and to remember choices you make when you use our website. For example, we may use functionality cookies to remember your language preferences or remember your login details.",trackingTitle:"Tracking and performance cookies",trackingText:"These cookies are used to collect information to analyze the traffic to our website and how visitors are using our website. For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website site for you.",targetingTitle:"Targeting and advertising cookies",targetingText:"These cookies are used to show advertising that is likely to be of interest to you based on your browsing habits. These cookies, as served by our content and/or advertising providers, may combine information they collected from our website with other information they have independently collected relating to your web browser's activities across their network of websites. If you choose to remove or disable these targeting or advertising cookies, you will still see adverts but they may not be relevant to you."};exports.default=e;
},{}],"BhAw":[function(require,module,exports) {
"use strict";var t=e(require("./locales/en.js"));function e(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}!function(e){var i=function(){function e(){o(this,e),c(this,"strictlyNecessaryCookies","strictlyNecessaryCookies"),c(this,"functionalityCookies","functionalityCookies"),c(this,"trackingCookies","trackingCookies"),c(this,"targetingCookies","targetingCookies"),c(this,"cookies",{}),c(this,"options",{text:t.default,color:{textColor:"",linkColor:"",modalBackground:"",modalBorder:"",btnPrimaryText:"",btnPrimaryBackground:"",btnSecondaryText:"",btnSecondaryBackground:"",switchColor:""},cookiesPolicylink:"",locale:"en"}),c(this,"locales",{en:t.default}),c(this,"manageCookiesShown",!1),this.initCookieIndex(this.strictlyNecessaryCookies),this.initCookieIndex(this.functionalityCookies),this.initCookieIndex(this.trackingCookies),this.initCookieIndex(this.targetingCookies),this.cookies[this.strictlyNecessaryCookies].mandatory=!0}return n(e,[{key:"initCookieIndex",value:function(t){this.cookies[t]={name:t,event:new CustomEvent(t,{}),checkboxId:"cookies-"+t+"-checkbox"}}},{key:"config",value:function(t){this.setOptions(t),this.getCookie(this.strictlyNecessaryCookies)||this.openPopup()}},{key:"setOptions",value:function(t){for(var e in t.locale&&locales[t.locale]&&(this.options.text=locales[t.locale]),t.text)this.options.text[e]=t.text[e]}},{key:"openPopup",value:function(){var t=this;document.addEventListener("DOMContentLoaded",function(e){document.body.insertAdjacentHTML("beforeend",t.render())})}},{key:"closePopup",value:function(){document.getElementById("cookie-popup-cookies").remove()}},{key:"checkCookie",value:function(t,e){this.getCookie(t)?e():document.addEventListener(t,e)}},{key:"acceptCookie",value:function(t){this.setCookie(t,1),this.cookies[t]&&document.dispatchEvent(this.cookies[t].event)}},{key:"acceptAll",value:function(){for(var t in this.cookies)this.acceptCookie(t);this.closePopup()}},{key:"acceptSelection",value:function(){for(var t in this.cookies)(this.cookies[t].mandatory||document.getElementById(this.cookies[t].checkboxId).checked)&&this.acceptCookie(t);this.closePopup()}},{key:"setCookie",value:function(t,e,o){var i="";if(o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3),i="; expires="+n.toUTCString()}document.cookie=t+"="+(e||"")+i+"; path=/"}},{key:"getCookie",value:function(t){for(var e=t+"=",o=document.cookie.split(";"),i=0;i<o.length;i++){for(var n=o[i];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return null}},{key:"eraseCookie",value:function(t){document.cookie=t+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}},{key:"manageCookies",value:function(){this.manageCookiesShown?(document.getElementById("cookie-manage-cookies").style.display="none",this.manageCookiesShown=!1):(document.getElementById("cookie-manage-cookies").style.display="block",this.manageCookiesShown=!0)}},{key:"render",value:function(){var t=this.options;return'\n\t\t\t\t<div id="cookie-popup-cookies">\n\t\t\t\t\t<h3>'.concat(t.text.modalTitle,"</h3>\n\t\t\t\t\t<p>").concat(t.text.noticeText,'</p>\n\t\t\t\t\t<button type="button" id="btn-cookie-manage-cookies" onclick="CookieConsent.manageCookies()">').concat(t.text.btnManageCookies,'</button>\n\t\t\t\t\t<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">').concat(t.text.btnAcceptAll,'</button>\n\t\t\t\t\t<div id="cookie-manage-cookies" style="display: none;">\n\t\t\t\t\t\t<div id="cookie-privacy">\n\t\t\t\t\t\t\t<h4 id="cookie-privacy-title">').concat(t.text.privacyTitle,'</h4>\n\t\t\t\t\t\t\t<p id="cookie-privacy-text-definition">').concat(t.text.privacyTextDefinition,'</p>\n\t\t\t\t\t\t\t<p id="cookie-privacy-text-instructions">').concat(t.text.privacyTextInstructions,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="cookie-strictly-necessary">\n\t\t\t\t\t\t\t<input type="checkbox" id="').concat(this.cookies[this.strictlyNecessaryCookies].checkboxId,'" checked disabled/>\n\t\t\t\t\t\t\t<h4 id="cookie-strictly-necessary-title">').concat(t.text.strictlyNecessaryTitle,'</h4>\n\t\t\t\t\t\t\t<p id="cookie-strictly-necessary-text">').concat(t.text.strictlyNecessaryText,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="cookie-functionality">\n\t\t\t\t\t\t\t<input type="checkbox" id="').concat(this.cookies[this.functionalityCookies].checkboxId,'"/>\n\t\t\t\t\t\t\t<h4 id="cookie-functionality-title">').concat(t.text.functionalityTitle,'</h4>\n\t\t\t\t\t\t\t<p id="cookie-functionality-text">').concat(t.text.functionalityText,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="cookie-tracking">\n\t\t\t\t\t\t\t<input type="checkbox" id="').concat(this.cookies[this.trackingCookies].checkboxId,'"/>\n\t\t\t\t\t\t\t<h4 id="cookie-tracking-title">').concat(t.text.trackingTitle,'</h4>\n\t\t\t\t\t\t\t<p id="cookie-tracking-text">').concat(t.text.trackingText,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="cookie-targeting">\n\t\t\t\t\t\t\t<input type="checkbox" id="').concat(this.cookies[this.targetingCookies].checkboxId,'"/>\n\t\t\t\t\t\t\t<h4 id="cookie-targeting-title">').concat(t.text.targetingTitle,'</h4>\n\t\t\t\t\t\t\t<p id="cookie-targeting-text">').concat(t.text.targetingText,'</p>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<button type="button" id="btn-cookie-accept-selection" onclick="CookieConsent.acceptSelection()">').concat(t.text.btnAcceptSelection,'</button>\n\t\t\t\t\t\t<button type="button" id="btn-cookie-accept-all" onclick="CookieConsent.acceptAll()">').concat(t.text.btnAcceptAll,"</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t")}}]),e}();e.CookieConsent=new i}(window);
},{"./locales/en.js":"CFpv"}]},{},["BhAw"], null)