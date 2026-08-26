/* M.TUNG Studio — image protection v2
   Designed for the current portfolio's dynamically-rendered project pages.
   This protects ALL raster <img> elements, including project images loaded
   after the page has opened. It does not affect SVG/CSS icons.
*/
(function () {
  "use strict";

  function isImage(el) {
    return !!(el && (el.tagName === "IMG" || (el.closest && el.closest("img"))));
  }

  function protect(img) {
    if (!img || img.tagName !== "IMG") return;
    img.setAttribute("draggable", "false");
    img.setAttribute("oncontextmenu", "return false");
    img.setAttribute("ondragstart", "return false");
    img.classList.add("portfolio-image-protected");
  }

  function protectAll() {
    document.querySelectorAll("img").forEach(protect);
  }

  /* Block the common browser image-copy actions. */
  document.addEventListener("contextmenu", function (e) {
    if (isImage(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  document.addEventListener("dragstart", function (e) {
    if (isImage(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  document.addEventListener("selectstart", function (e) {
    if (isImage(e.target)) {
      e.preventDefault();
      return false;
    }
  }, true);

  document.addEventListener("mousedown", function (e) {
    if (e.button === 2 && isImage(e.target)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* Protect images already present and images inserted by React/JS later. */
  protectAll();

  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.tagName === "IMG") protect(node);
        if (node.querySelectorAll) node.querySelectorAll("img").forEach(protect);
      });
    }
  });

  function startObserver() {
    if (document.documentElement) {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      protectAll();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }

  /* Re-apply protection after lazy-loaded images change their src. */
  window.addEventListener("load", protectAll);
  setTimeout(protectAll, 500);
  setTimeout(protectAll, 1500);
})();
