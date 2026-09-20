document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });

    });

  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =====================================================
     LIGHTBOX
  ===================================================== */

  const galleryItems =
    [...document.querySelectorAll(".gallery-item")];

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImg =
    document.getElementById("lightboxImg");

  const closeButton =
    document.getElementById("lightboxClose");

  const previousButton =
    document.getElementById("lightboxPrev");

  const nextButton =
    document.getElementById("lightboxNext");

  let currentIndex = 0;


  function showImage(index) {

    if (!galleryItems.length) return;

    currentIndex =
      (index + galleryItems.length) %
      galleryItems.length;

    const item =
      galleryItems[currentIndex];

    const image =
      item.querySelector("img");

    const fullImage =
      item.dataset.full;

    if (lightboxImg) {

      lightboxImg.src =
        fullImage || image.src;

      lightboxImg.alt =
        image.alt || "Ảnh cưới";

    }

  }


  function openLightbox(index) {

    showImage(index);

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("locked");

  }


  function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("locked");

  }


  galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

      openLightbox(index);

    });

  });


  closeButton.addEventListener(
    "click",
    closeLightbox
  );


  previousButton.addEventListener(
    "click",
    () => {
      showImage(currentIndex - 1);
    }
  );


  nextButton.addEventListener(
    "click",
    () => {
      showImage(currentIndex + 1);
    }
  );


  lightbox.addEventListener(
    "click",
    event => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );


  /* =====================================================
     KEYBOARD
  ===================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (!lightbox.classList.contains("open")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
      }

    }
  );


  /* =====================================================
     MOBILE SWIPE
  ===================================================== */

  let touchStartX = 0;
  let touchEndX = 0;


  lightbox.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  lightbox.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;

      const distance =
        touchEndX - touchStartX;

      if (Math.abs(distance) < 50) {
        return;
      }

      if (distance < 0) {
        showImage(currentIndex + 1);
      } else {
        showImage(currentIndex - 1);
      }

    },
    {
      passive: true
    }
  );


  /* =====================================================
     COUNTDOWN
  ===================================================== */

  // Ngày cưới:
  // 20/10/2026 - 10:00 sáng

  const weddingDate =
    new Date("2026-11-28T10:00:00").getTime();


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  function updateCountdown() {

    const now =
      new Date().getTime();

    const distance =
      weddingDate - now;


    if (distance <= 0) {

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      return;
    }


    const days =
      Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );


    const minutes =
      Math.floor(
        (distance %
          (1000 * 60 * 60)) /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (distance %
          (1000 * 60)) /
        1000
      );


    daysElement.textContent =
      String(days).padStart(2, "0");

    hoursElement.textContent =
      String(hours).padStart(2, "0");

    minutesElement.textContent =
      String(minutes).padStart(2, "0");

    secondsElement.textContent =
      String(seconds).padStart(2, "0");

  }


  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* =====================================================
     BACKGROUND MUSIC
  ===================================================== */

  const music =
    document.getElementById("bgMusic");
    music.play();
music.pause();
  
const button = document.getElementById("globalMusicBtn");
const icon = document.getElementById("globalMusicIcon");
const text = document.getElementById("globalMusicText");

if (music && button) {
  button.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();

        button.classList.add("playing");
        icon.textContent = "❚❚";
        text.textContent = "Tắt nhạc";

      } catch (error) {
        console.error("Không thể phát nhạc:", error);
      }

    } else {
      music.pause();

      button.classList.remove("playing");
      icon.textContent = "▶";
      text.textContent = "Nhạc";
    }
  });
}

  /* =====================================================
     PREVENT IMAGE DRAG
  ===================================================== */

  document
    .querySelectorAll("img")
    .forEach(img => {

      img.addEventListener(
        "dragstart",
        event => {
          event.preventDefault();
        }
      );

    });


  /* =====================================================
     CONSOLE
  ===================================================== */

  console.log(
    "💍 Minh & Linh — Wedding Album"
  );

});