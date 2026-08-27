
/* M.TUNG Studio — add logo home button to every page */
(function () {
  function addLogoButton() {
    if (document.querySelector(".mtung-logo-button")) return;
    if (!document.body) return;

    var a = document.createElement("a");
    a.className = "mtung-logo-button";
    a.href = "/";
    a.setAttribute("aria-label", "M.TUNG Studio — Home");
    a.title = "M.TUNG Studio — Home";

    var img = document.createElement("img");
    img.src = "/mtung-logo.png";
    img.alt = "M.TUNG Studio";
    img.draggable = false;

    a.appendChild(img);
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLogoButton, { once: true });
  } else {
    addLogoButton();
  }
})();
