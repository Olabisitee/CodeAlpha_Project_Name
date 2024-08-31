document.addEventListener("DOMContentLoaded", function () {
  const imageWrap = document.getElementById("image-link");
  const videoContainer = document.getElementById("video-container");
  const clinicVideo = document.getElementById("clinic-video");
  const loadingSpinner = document.getElementById("loading-spinner");
  const muteButton = document.getElementById("mute-button");
  const skipButton = document.getElementById("skip-button");
  const prevButton = document.querySelector(".carousel-arrow.prev");
  const nextButton = document.querySelector(".carousel-arrow.next");
  const carouselInner = document.querySelector(".carousel-inner");

  imageWrap.addEventListener("click", function () {
    imageWrap.style.display = "none";
    videoContainer.style.display = "block";
    loadingSpinner.style.display = "block";

    clinicVideo.addEventListener("canplay", function () {
      loadingSpinner.style.display = "none";
      clinicVideo.play();
    });
    setTimeout(function () {
      if (clinicVideo.paused) {
        clinicVideo.play();
      }
    }, 500);
  });

  muteButton.addEventListener("click", function () {
    if (clinicVideo.muted) {
      clinicVideo.muted = false;
      muteButton.textContent = "Mute";
    } else {
      clinicVideo.muted = true;
      muteButton.textContent = "Unmute";
    }
  });
  skipButton.addEventListener("click", function () {
    clinicVideo.pause();
    clinicVideo.currentTime = 0;
    videoContainer.style.display = "none";
    imageWrap.style.display = "block";
  });

  let currentIndex = 0;

  function updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const itemWidth = items[0].clientWidth;

    carouselInner.style.transform = `translateX(-${
      currentIndex * itemWidth
    }px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalItems - 1;
  }
  nextButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    if (currentIndex < totalItems - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  const images = document.querySelectorAll(".equipment-item img");

  images.forEach(function (image) {
    image.addEventListener("click", function () {
      // images.forEach((img) => img.classList.remove("clicked"));

      this.parentElement.classList.add("clicked");
    });
  });
});
updateCarousel();
