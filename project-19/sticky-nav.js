document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById("main");
const navTop = nav.offsetTop;

function stickyNav() {
  if (window.scrollY >= navTop) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
    document.body.classList.add("fixed-nav");
  } else {
    document.body.classList.remove("fixed-nav");
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener("scroll", stickyNav);

});