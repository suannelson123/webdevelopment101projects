document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelector(".items");
  let isMouseDown = false;
  let startX;
  let scrollLeft;

  function mouseDown(e) {
    isMouseDown = true;
    items.classList.add("active");
    startX = e.pageX - items.offsetLeft;
    scrollLeft = items.scrollLeft;
  }

  function mouseLeave() {
    isMouseDown = false;
    items.classList.remove("active");
  }

  function mouseUp() {
    isMouseDown = false;
    items.classList.remove("active");
  }

  function mouseMove(e) {
    if (!isMouseDown) return;
    e.preventDefault();

    const x = e.pageX - items.offsetLeft;
    const slide = (e.pageX - startX) * 2;
    items.scrollLeft = scrollLeft - slide;
  }

  items.addEventListener("mousedown", mouseDown);
  items.addEventListener("mouseleave", mouseLeave);
  items.addEventListener("mouseup", mouseUp);
  items.addEventListener("mousemove", mouseMove);
});
