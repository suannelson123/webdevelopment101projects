document.addEventListener("DOMContentLoaded", () => {
  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const imageSlider = document.querySelectorAll(".slide-in");
  /* console.log(imageSlider); */

  function checkSlideIn(e) {
    imageSlider.forEach((slider) => {
      const slideAt = window.scrollY + window.innerHeight - slider.height / 2;
      console.log(slideAt);
      const bottomImage = slider.offsetTop + slider.height;
      const isHalf = slideAt > slider.offsetTop;
      const isnotPast = slideAt < bottomImage;

            if (isHalf && isnotPast) {
                slider.classList.add("active");
            } 
      
    });
  }

  window.addEventListener("scroll", debounce(checkSlideIn));
});
