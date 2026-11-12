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
