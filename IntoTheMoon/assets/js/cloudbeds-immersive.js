"use strict";
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
const STYLE_SHEET =
  "\n button[data-be-url] {\n background-color: black;\n border-radius: 40px;\n border: none;\n color: white;\n cursor: pointer;\n font-family: Poppins, sans-serif;\n font-weight: 500;\n padding: 12px 24px;\n }\n\n .be-immersive-experience-overlay,\n .be-immersive-experience-overlay * {\n box-sizing: border-box\n }\n\n .be-immersive-experience-overlay {\n background-color: rgba(47, 43, 43, 0.8);\n height: 100%;\n padding: 24px;\n position: fixed;\n right: 0;\n top: 0;\n width: 100vw;\n z-index: 1000;\n }\n\n @media screen and (max-width: 640px) {\n .be-immersive-experience-overlay {\n padding: 0;\n }\n }\n\n .be-immersive-experience-overlay:not(.open) {\n display: none;\n }\n\n .be-immersive-experience-overlay.open {\n display: flex;\n }\n\n body:has(.be-immersive-experience-overlay.open) {\n overflow: hidden;\n }\n\n .be-immersive-experience-wrapper {\n border-radius: 8px;\n display: flex;\n flex-direction: column;\n height: min(100%, 800px);\n margin-left: auto;\n margin-top: auto;\n max-width: 460px;\n overflow: hidden;\n width: 100%;\n }\n \n @media screen and (max-width: 640px) {\n .be-immersive-experience-wrapper {\n border-radius: 0;\n max-width: unset;\n }\n }\n\n .be-immersive-experience-header {\n color: black;\n display: flex;\n }\n \n @media screen and (max-width: 640px) {\n .be-immersive-experience-header {\n background-color: white;\n }\n }\n \n .be-immersive-experience-header button.close-button {\n background-color: white;\n border-radius: 0;\n border-top-left-radius: 8px;\n border: none;\n color: black;\n cursor: pointer;\n font-family: Poppins, sans-serif;\n font-weight: 500;\n margin-left: auto;\n padding: 8px 16px;\n }\n\n .be-immersive-experience-container {\n background-color: white;\n border-top-left-radius: 8px;\n height: 100%;\n position: relative;\n overflow: hidden;\n }\n \n .be-immersive-experience-footer {\n align-items: center;\n background-color: #f8f9fa;\n border-top: 1px solid #dfe1e5;\n display: flex;\n gap: 8px;\n justify-content: center;\n padding: 12px;\n }\n\n .be-immersive-experience-footer > span {\n color: #586174;\n font-family: Poppins, sans-serif;\n font-size: 12px;\n }\n\n .be-immersive-experience-cloudbeds-logo {\n height: 20px;\n width: auto;\n }\n\n @media screen and (max-width: 640px) {\n .be-immersive-experience-container {\n border-top-left-radius: 0;\n }\n }\n\n .be-iframe {\n background-color: white;\n height: 100%;\n position: relative;\n width: 100%;\n }\n";
const CLOSE_LABEL =
  document.currentScript.getAttribute("close-label") || "CLOSE";
const IMM_EXP_OVERLAY_ID = "immersive-experience-overlay";
const RESET_ON_CLOSE = true;
const MESSAGES = { CLOSE_IFRAME: "CLOSE_IFRAME", OPEN_IFRAME: "OPEN_IFRAME" };
const styleSheet = document.createElement("style");
styleSheet.innerText = STYLE_SHEET;
document.head.appendChild(styleSheet);
const utmParameters = [
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_source_platform",
  "utm_term",
  "utm_content",
  "gclid",
  "dclid",
  "clientId",
  "sessionId",
  "referrer",
];
const loc = new URL(window.location);
const referrer = loc.searchParams.get("referrer") || document.referrer;
const isBookNowPage =
  document.querySelectorAll("button[data-be-url]").length > 0;
const storeQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  utmParameters.forEach((param) => {
    const value = params.get(param);
    if (value) sessionStorage.setItem("cb_".concat(param), value);
  });
};
const appendUTMParams = (url) => {
  if (!url) {
    console.log("Cannot find url to append UTM parameters");
    return;
  }
  const urlObj = new URL(url);
  utmParameters.forEach((param) => {
    const value = sessionStorage.getItem("cb_".concat(param));
    if (value) urlObj.searchParams.set(param, value);
  });
  return urlObj.toString();
};
const setGAParams = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { debug_mode: true });
  gtag("get", MEASUREMENT_ID, "client_id", (id) => {
    sessionStorage.setItem("cb_clientId", id);
  });
  gtag("get", MEASUREMENT_ID, "session_id", (id) => {
    sessionStorage.setItem("cb_sessionId", id);
  });
  let originalReferrer = sessionStorage.getItem("cb_referrer");
  if (
    !originalReferrer &&
    referrer &&
    new URL(referrer).hostname !== loc.hostname
  ) {
    sessionStorage.setItem("cb_referrer", referrer);
    originalReferrer = referrer;
    gtag("set", { page_referrer: originalReferrer });
  }
  storeQueryParams();
};
class IframeController {
  constructor() {
    let { resetOnClose = false } =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _defineProperty(this, "iframe", null);
    _defineProperty(this, "init", false);
    _defineProperty(this, "resetOnClose", false);
    _defineProperty(this, "createIframe", () => {
      this.iframe = document.createElement("iframe");
      this.iframe.classList.add("be-iframe");
      this.iframe.width = "100%";
      this.iframe.height = "100%";
      this.iframe.setAttribute("frameBorder", "no");
      this.iframe.setAttribute("srolling", "yes");
      window.addEventListener("open-iframe", this.handleOpen);
      window.addEventListener("close-iframe", this.handleClose);
    });
    _defineProperty(this, "handleOpen", (_ref) => {
      let { detail } = _ref;
      const url =
        typeof MEASUREMENT_ID !== "undefined"
          ? appendUTMParams(detail.url)
          : detail.url;
      if (!this.init) {
        this.iframe.src = url;
        this.init = true;
      } else {
        this.postMessage(MESSAGES.OPEN_IFRAME);
      }
    });
    _defineProperty(this, "handleClose", () => {
      this.postMessage(MESSAGES.CLOSE_IFRAME);
      if (this.resetOnClose) {
        this.iframe.src = "";
        this.init = false;
      }
    });
    _defineProperty(this, "postMessage", (message) => {
      this.iframe.contentWindow.postMessage(message, "*");
    });
    _defineProperty(this, "updateUrl", (url) => {
      this.iframe.src = url;
    });
    this.resetOnClose = resetOnClose;
    this.createIframe();
  }
}
const openIframe = (url) => {
  window.dispatchEvent(new CustomEvent("open-iframe", { detail: { url } }));
  immExpOverlay.classList.add("open");
};
const iframeOpener = (url) => () => openIframe(url);
const closeIframe = () => {
  immExpOverlay.classList.remove("open");
  window.dispatchEvent(new CustomEvent("close-iframe"));
};
const handleOverlayClick = (e) =>
  e.target.id === IMM_EXP_OVERLAY_ID && closeIframe();
const processMessage = (e) => {
  console.log("New message from BE App", e.data);
};
const changeProperty = (url) => controller.updateUrl(url);
const controller = new IframeController({ resetOnClose: RESET_ON_CLOSE });
const immExpOverlay = document.createElement("div");
immExpOverlay.id = IMM_EXP_OVERLAY_ID;
immExpOverlay.classList.add("be-immersive-experience-overlay");
immExpOverlay.addEventListener("click", handleOverlayClick);
const immExpWrapper = document.createElement("div");
immExpWrapper.classList.add("be-immersive-experience-wrapper");
const immExpHeader = document.createElement("div");
immExpHeader.classList.add("be-immersive-experience-header");
const immExpContainer = document.createElement("div");
immExpContainer.classList.add("be-immersive-experience-container");
const immExpFooter = document.createElement("div");
immExpFooter.classList.add("be-immersive-experience-footer");
const footerLink = document.createElement("a");
footerLink.setAttribute("href", "https://www.cloudbeds.com");
footerLink.setAttribute("target", "_blank");
const footerLogo = document.createElement("img");
footerLogo.classList.add("be-immersive-experience-cloudbeds-logo");
footerLogo.src =
  "https://static1.cloudbeds-dev.com/booking-engine/latest/cb-logo.svg";
const footerLegend = document.createElement("span");
footerLegend.textContent = "Powered by";
const closeButton = document.createElement("button");
closeButton.textContent = CLOSE_LABEL;
closeButton.addEventListener("click", closeIframe);
closeButton.classList.add("close-button");
immExpHeader.appendChild(closeButton);
immExpWrapper.appendChild(immExpHeader);
immExpWrapper.appendChild(immExpContainer);
immExpFooter.appendChild(footerLegend);
footerLink.appendChild(footerLogo);
immExpFooter.appendChild(footerLink);
immExpWrapper.appendChild(immExpFooter);
immExpContainer.appendChild(controller.iframe);
immExpOverlay.appendChild(immExpWrapper);
window.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(immExpOverlay);
  const bookNowButtons = document.querySelectorAll("button[data-be-url]");
  bookNowButtons.forEach((button) =>
    button.addEventListener(
      "click",
      iframeOpener(button.getAttribute("data-be-url"))
    )
  );
});
window.addEventListener("open-immersive-experience", (e) => {
  openIframe(e.detail.url);
});
if (typeof MEASUREMENT_ID !== "undefined") {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=".concat(
    MEASUREMENT_ID
  );
  gtagScript.onload = setGAParams;
  document.head.appendChild(gtagScript);
}
