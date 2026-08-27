
/* M.TUNG Studio — place logo immediately beside the M.TUNG wordmark */
(function () {
  "use strict";

  function addLogoBesideWordmark() {
    if (document.querySelector(".mtung-wordmark-logo")) return;

    var candidates = document.querySelectorAll("a, .brand, .logo, [class*='brand'], [class*='logo']");
    var target = null;

    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      var t = (el.textContent || "").trim().replace(/\s+/g, " ").toUpperCase();
      if (t === "M.TUNG" || t === "MTUNG" || t.indexOf("M.TUNG") === 0 || t.indexOf("MTUNG") === 0) {
        target = el;
        break;
      }
    }

    if (!target) return;

    var img = document.createElement("img");
    img.className = "mtung-wordmark-logo";
    img.src = "/mtung-logo.png";
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    img.draggable = false;

    if (target.tagName === "A") {
      target.classList.add("mtung-wordmark-link");
    }

    target.appendChild(img);
  }

  function start() {
    addLogoBesideWordmark();

    // The site renders parts of the header dynamically.
    new MutationObserver(function () {
      addLogoBesideWordmark();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
