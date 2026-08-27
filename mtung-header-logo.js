
/* M.TUNG Studio — place "M.Tung + logo" in the existing top-right header */
(function () {
  "use strict";

  function findWordmark() {
    var els = document.querySelectorAll("a, button, span, div, p, h1, h2");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el || el.children.length > 1) continue;
      var text = (el.textContent || "").trim().replace(/\s+/g, " ");
      if (/^M\.?\s*Tung$/i.test(text) || /^MTung$/i.test(text)) return el;
    }
    return null;
  }

  function placeIdentity() {
    var existing = document.querySelector(".mtung-header-identity");
    if (existing) return;

    var wordmark = findWordmark();
    if (!wordmark) return;

    var identity = document.createElement("a");
    identity.className = "mtung-header-identity";
    identity.href = "/";
    identity.setAttribute("aria-label", "M.Tung — Home");
    identity.title = "M.Tung — Home";

    // Preserve the existing wordmark text.
    var text = document.createElement("span");
    text.textContent = (wordmark.textContent || "M.Tung").trim();
    identity.appendChild(text);

    var img = document.createElement("img");
    img.className = "mtung-header-logo";
    img.src = "/mtung-logo.png";
    img.alt = "";
    img.draggable = false;
    identity.appendChild(img);

    wordmark.replaceWith(identity);
  }

  function start() {
    placeIdentity();
    new MutationObserver(placeIdentity).observe(document.documentElement, {
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
