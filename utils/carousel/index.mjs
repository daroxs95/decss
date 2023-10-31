/**
 * Creates a carousel with the specified configuration.
 * @param {Object} config - The configuration object.
 * @param {string} config.carouselClass - The class name of the carousel elements.
 * @param {number|undefined} [config.interval] - The time delay between each slide transition in milliseconds.
 * @param {number|undefined} [config.slidesToShow=1] - The number of slides to show at once.
 * @param {number|undefined} [config.slidesToScroll=1] - The number of slides to scroll at once.
 * @param {('scroll'|'legacy')} [config.type=scroll] - The type of carousel.
 * @param {boolean|undefined} [config.loop=false] - Whether to enable loop behavior or not.
 * @param {boolean|undefined} [config.swipe=false] - Whether to enable swipe behavior or not.
 * @param {boolean|undefined} [config.navigation=false] - Whether to enable prev and next buttons.
 * @param {boolean|undefined} [config.pagination=false] - Whether to enable prev and next buttons.
 *
 * Usage:
 *
 * 1. Include the following HTML structure in your page:
 *
 * <div class="my-carousel">
 *   <div class="carousel-content">
 *     <div class="slide">Slide 1</div>
 *     <div class="slide">Slide 2</div>
 *     <div class="slide">Slide 3</div>
 *   </div>
 *   <button class="prev">Previous</button>
 *   <div class="pagination"></div>
 *   <button class="next">Next</button>
 * </div>
 *
 * 2. Call the `createCarousel` function with the desired configuration:
 *
 * createCarousel({
 *   carouselClass: 'my-carousel',
 *   interval: 3000,
 *   slidesToShow: 2,
 *   slidesToScroll: 1
 * });
 *
 * This code creates a carousel with the class `carousel`, an interval of 3 seconds, showing 2 slides at once, and scrolling 1 slide at once.
 *
 * 3. To stylize pagination buttons, just add css to the `.pagination .page` selector.
 */
export function createCarousel(config) {
  const carousel = document.querySelector(`.${config.carouselClass}`);
  const carouselContent = carousel.querySelector(".carousel-content");
  const slides = carousel.querySelectorAll(".slide");
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");

  let currentSlide = 0;
  let startX;
  let startY;
  let diffX;
  let diffY;
  let isDragging = false;

  function showSlide(slideIndex) {
    const type = config.type || "scroll";

    if (type === "scroll") {
      carouselContent.scrollLeft = slideIndex * slides[0].offsetWidth;
      currentSlide = slideIndex;
    }

    if (type === "legacy") {
      slides.forEach((slide) => {
        slide.style.display = "none";
      });
      for (let i = slideIndex; i < slideIndex + config.slidesToShow; i++) {
        if (slides[i]) {
          slides[i].style.display = "block";
        }
      }
    }

    updateButtons();
  }

  function nextSlide() {
    currentSlide += config.slidesToScroll;
    if (currentSlide + config.slidesToScroll - 1 >= slides.length && config.loop) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide -= config.slidesToScroll;
    if (currentSlide < 0 && config.loop) {
      currentSlide = slides.length - config.slidesToShow;
    }
    showSlide(currentSlide);
  }

  function updateButtons() {
    if (!config.loop && config.navigation) {
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide + config.slidesToShow >= slides.length;
    }
  }

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    diffX = event.touches[0].clientX - startX;
    diffY = event.touches[0].clientY - startY;
    // TODO: make the carousel to move while swiping
    // carouselContent.scrollLeft = carouselContent.scrollLeft - diffX;
  }

  function handleTouchEnd(event) {
    if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
      prevSlide();
    } else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
      nextSlide();
    }
    diffX = 0;
  }

  function handleMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    event.preventDefault();
  }

  function handleMouseMove(event) {
    if (!isDragging) {
      return;
    }
    diffX = event.clientX - startX;
    diffY = event.clientY - startY;
    // TODO: make the carousel to move while swiping
    // const x = event.pageX - carouselContent.offsetLeft;
    // const walk = (x - startX) * 3; // scroll-fast
    // carouselContent.scrollLeft = carouselContent.scrollLeft - walk;
  }

  function handleMouseUp(event) {
    isDragging = false;
    if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
      prevSlide();
    } else if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
      nextSlide();
    }
    diffX = 0;
  }

  function createPagination() {
    const pagination = carousel.querySelector(".pagination");
    // const pagination = document.createElement("div");
    // pagination.classList.add("pagination");
    // carouselContent.parentNode.insertBefore(
    //   pagination,
    //   carouselContent.nextSibling
    // );

    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement("button");
      button.classList.add("page");
      button.textContent = i + 1;
      button.addEventListener("click", () => {
        showSlide(i);
      });
      pagination.appendChild(button);
    }
  }

  if (config.navigation) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  }
  if (config.swipe) {
    carouselContent.addEventListener("touchstart", handleTouchStart);
    carouselContent.addEventListener("touchmove", handleTouchMove);
    carouselContent.addEventListener("touchend", handleTouchEnd);
    carouselContent.addEventListener("mousedown", handleMouseDown);
    carouselContent.addEventListener("mousemove", handleMouseMove);
    carouselContent.addEventListener("mouseup", handleMouseUp);
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      prevSlide();
    } else if (event.code === "ArrowRight") {
      nextSlide();
    }
  });

  if (typeof config.interval === "number") {
    setInterval(nextSlide, config.interval);
  }

  showSlide(currentSlide);
  if (config.pagination) createPagination();

  carouselContent.style.display = "flex";
  carouselContent.style.overflowX = "hidden";
  carouselContent.style.scrollBehavior = "smooth";
  carouselContent.style.WebkitOverflowScrolling = "touch";
  carouselContent.style.flexWrap = "nowrap";
  carouselContent.style.scrollSnapType = "x mandatory";

  if (!config.allowSelect) {
    carouselContent.style.userSelect = "none";
    carouselContent.style.WebkitUserSelect = "none";
    carouselContent.style.MozUserSelect = "none";
    carouselContent.style.msUserSelect = "none";
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.flexShrink = "0";
    slides[i].style.width = `${100 / config.slidesToShow}%`;
    slides[i].style.scrollSnapAlign = "start";
    // slides[i].style.marginRight = `${100 / config.slidesToShow}%`;
    if (i === slides.length - 1) {
      slides[i].style.marginRight = "0";
    }
  }
}
