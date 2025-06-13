
  let currentIndex = 0;
  const track = document.getElementById("carouselTrack");
  const cards = document.querySelectorAll(".carousel-card");
  const dotsContainer = document.getElementById("dotsContainer");
  const wrapper = document.querySelector('.carousel-wrapper');

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  // Update carousel position and dot states
  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");

    // Adjust wrapper height based on current card's image
    const currentImage = cards[currentIndex].querySelector("img");
    if (currentImage && wrapper) {
      wrapper.style.height = currentImage.offsetHeight + "px";
    }
  };

  // Navigation functions
  const moveSlide = (step) => {
    currentIndex = (currentIndex + step + cards.length) % cards.length;
    updateCarousel();
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateCarousel();
  };

  // Initialize carousel
  window.addEventListener('load', () => {
    // Wait for all images to load to get accurate height
    const allImages = document.querySelectorAll('.carousel-card img');
    let loadedCount = 0;

    allImages.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === allImages.length) {
            updateCarousel();
          }
        };
      }
    });

    // If all were already loaded
    if (loadedCount === allImages.length) {
      updateCarousel();
    }

    // Adjust on window resize
    window.addEventListener('resize', updateCarousel);
  });

