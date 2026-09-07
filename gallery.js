document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const stage = gallery.querySelector("[data-gallery-stage]");
  const track = gallery.querySelector("[data-gallery-track]");
  const slides = [...gallery.querySelectorAll("[data-gallery-slide]")];
  const thumbs = [...gallery.querySelectorAll("[data-gallery-thumb]")];
  const counter = gallery.querySelector("[data-gallery-counter]");

  let current = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let moved = false;

  function update(index, animate = true) {
    if (!slides.length) return;

    current = Math.max(0, Math.min(index, slides.length - 1));

    track.style.transition = animate
      ? "transform 420ms cubic-bezier(.2,.7,.2,1)"
      : "none";

    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;

    thumbs.forEach((thumb, i) => {
      const active = i === current;
      thumb.classList.toggle("is-active", active);
      thumb.setAttribute("aria-current", active ? "true" : "false");
    });

    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => update(index));
  });

  stage.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    isDragging = true;
    moved = false;
    stage.setPointerCapture?.(event.pointerId);
  });

  stage.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) > 8) {
      moved = true;
      stage.classList.add("is-dragging");
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault();
    }
  });

  stage.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    isDragging = false;
    stage.classList.remove("is-dragging");

    if (Math.abs(dx) > 60) {
      if (dx < 0) {
        update(current + 1);
      } else {
        update(current - 1);
      }
    }
  });

  stage.addEventListener("pointercancel", () => {
    isDragging = false;
    stage.classList.remove("is-dragging");
  });

  stage.addEventListener("click", (event) => {
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!gallery.matches(":hover")) return;

    if (event.key === "ArrowRight") {
      update(current + 1);
    }

    if (event.key === "ArrowLeft") {
      update(current - 1);
    }
  });

  update(0, false);
});