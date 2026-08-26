/* M.TUNG Studio — image protection
   Add this script to the website once, before </body>.
*/
(function () {
  function protectedImage(el) {
    return el && el.tagName === "IMG" &&
      (el.closest(".project-gallery, .project-page, .project-media, .project-cover") ||
       el.classList.contains("portfolio-image-protected"));
  }

  document.addEventListener("contextmenu", function (e) {
    if (protectedImage(e.target)) e.preventDefault();
  }, true);

  document.addEventListener("dragstart", function (e) {
    if (protectedImage(e.target)) e.preventDefault();
  }, true);

  function protectImages() {
    document.querySelectorAll(
      ".project-gallery img, .project-page img, .project-media img, .project-cover img"
    ).forEach(function (img) {
      img.classList.add("portfolio-image-protected");
      img.setAttribute("draggable", "false");
    });
  }

  protectImages();

  new MutationObserver(protectImages).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
