/* TT Automotive — redesign preview: header menu and dropdowns (keyboard and touch friendly). */
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var panel = document.getElementById("site-nav");
  var subBtns = Array.prototype.slice.call(document.querySelectorAll(".nav-btn"));

  function closeSubs(except) {
    subBtns.forEach(function (b) { if (b !== except) b.setAttribute("aria-expanded", "false"); });
  }
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("open", open);
    if (!open) closeSubs();
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  subBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      closeSubs(b);
      b.setAttribute("aria-expanded", String(!open));
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openBtn = subBtns.filter(function (b) { return b.getAttribute("aria-expanded") === "true"; })[0];
    if (openBtn) { closeSubs(); openBtn.focus(); }
    else if (toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
  });

  // Close dropdowns when clicking elsewhere or tabbing out of the menu.
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-sub")) closeSubs();
  });
  document.addEventListener("focusin", function (e) {
    var li = e.target.closest(".has-sub");
    subBtns.forEach(function (b) { if (!li || li !== b.parentNode) b.setAttribute("aria-expanded", "false"); });
  });

  // Reset the mobile panel when widening past the breakpoint.
  window.matchMedia("(min-width: 1021px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
})();

/* WhatsApp add-on — demo explainer (preview only).
   On the live site, replace each [data-wa-open] button with a link to
   https://wa.me/44XXXXXXXXXX?text=Hi%20TT%2C%20I%20need%20help%20finding%20a%20part and delete the dialog. */
(function () {
  var dlg = document.getElementById("wa-dialog");
  if (!dlg || typeof dlg.showModal !== "function") return;
  var opener = null;
  document.querySelectorAll("[data-wa-open]").forEach(function (b) {
    b.addEventListener("click", function () { opener = b; dlg.showModal(); });
  });
  dlg.querySelector("[data-wa-close]").addEventListener("click", function () { dlg.close(); });
  // Click on the backdrop closes it.
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () { if (opener) opener.focus(); });
})();

/* ---------- Visit alerts (preview only; must not go onto the live site) ----------
   A short, anonymous note to Kev's phone via ntfy.sh when the published preview is opened or used,
   as on the Bensons, Legal Comfort and Vintage Pine previews. It sends only the page, the ?from= link
   tag (if any), the device type and browser, and the screen width. No cookies, no visitor IDs, and
   we don't log IP addresses. It runs only on the GitHub Pages copy, not on localhost.
   Visit any page with ?me once to stop your own device sending alerts (?me=0 to undo). */
(function () {
  "use strict";
  var TOPIC = "https://ntfy.sh/tt-preview-mqlwv55w1t";
  function store(kind, k, v) { try { var s = window[kind]; if (v === undefined) return s.getItem(k); if (v === null) s.removeItem(k); else s.setItem(k, v); } catch (e) { return null; } }
  var q = new URLSearchParams(location.search);
  if (q.has("me")) store("localStorage", "ttp-me", q.get("me") === "0" ? null : "1");
  var off = store("localStorage", "ttp-me") === "1" || location.hostname !== "kevsinfield.github.io";
  var tag = (q.get("from") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20);
  if (tag) store("sessionStorage", "ttp-from", tag); else tag = store("sessionStorage", "ttp-from") || "";

  function device() {
    var u = navigator.userAgent;
    var d = /iPhone/.test(u) ? "iPhone" : /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? "iPad"
      : /Android/.test(u) ? "Android" : /Macintosh/.test(u) ? "Mac" : /Windows/.test(u) ? "Windows PC" : "Other device";
    var b = /Edg\//.test(u) ? "Edge" : /CriOS|Chrome\//.test(u) ? "Chrome" : /FxiOS|Firefox\//.test(u) ? "Firefox" : /Safari\//.test(u) ? "Safari" : "";
    return d + (b ? " (" + b + ")" : "") + ", " + screen.width + "px screen";
  }
  function page() {
    if (/\/tt-automotive-preview\/?$/.test(location.pathname) || /\/index\.html$/.test(location.pathname) && location.pathname.split("/").length <= 3) return "Homepage";
    var t = document.title.split(" – ")[0];
    return document.querySelector(".stub-card") ? t + " (Coming soon page)" : t;
  }
  function send(title, icon) {
    if (off) return;
    var msg = page() + " · " + device() + (tag ? " · from: " + tag : "");
    try {
      fetch(TOPIC + "?title=" + encodeURIComponent(title) + "&tags=" + (icon || "eyes"),
        { method: "POST", body: msg, keepalive: true, mode: "cors" }).catch(function () {});
    } catch (e) {}
  }

  // Page opened (once per page per visit)
  var key = "ttp-seen-" + location.pathname;
  if (store("sessionStorage", key) !== "1") {
    store("sessionStorage", key, "1");
    var ref = "";
    try { if (document.referrer && new URL(document.referrer).hostname !== location.hostname) ref = " (came from " + new URL(document.referrer).hostname + ")"; } catch (e) {}
    send("TT preview opened: " + page() + ref, "eyes");
  }

  // Key actions, once each per page view
  var done = {};
  function once(k, title, icon) { if (done[k]) return; done[k] = 1; send(title, icon); }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var el;
    if (t.closest("[data-wa-open]")) once("wa", "Opened the WhatsApp explainer", "speech_balloon");
    else if (t.closest('a[href^="tel:"]')) once("tel", "Tapped the phone number", "telephone_receiver");
    else if (t.closest('a[href^="mailto:"]')) once("mail", "Tapped the email address", "email");
    else if (t.closest('a[href*="originsoftware"]')) once("trade", "Tapped Trade login", "key");
    else if (t.closest('a[href*="apply-for-a-trade-credit-account"]')) once("apply", "Tapped Apply for a trade account", "memo");
    else if ((el = t.closest('a[href^="https://ttauto.co.uk"]'))) once("live", "Followed a link to the live TT site", "link");
  });
})();
