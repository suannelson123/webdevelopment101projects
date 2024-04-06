document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".cool > li");
  const background = document.querySelector(".dropdownBackground");
  const nav = document.querySelector(".top");

  function eventHandler() {
    this.classList.add("trigger-enter");
    setTimeout(() => {
      this.classList.contains("trigger-enter")
        ? this.classList.add("trigger-enter-active")
        : "";
    }, 150);
    background.classList.add("open");
    const dropDownBackground = this.querySelector(".dropdown");
    const dropDownCoordinates = dropDownBackground.getBoundingClientRect();
    const navCoordinates = nav.getBoundingClientRect();
    const coords = {
      height: dropDownCoordinates.height,
      width: dropDownCoordinates.width,
      top: dropDownCoordinates.top - navCoordinates.top,
      left: dropDownCoordinates.left - navCoordinates.left,
    };

    background.style.setProperty(`width`, `${coords.width}px`);
    background.style.setProperty(`height`, `${coords.height}px`);
    background.style.setProperty(
      "transform",
      `translate(${coords.left}px, ${coords.top}px)`
    );
  }

  function leaveHandler() {
    this.classList.remove("trigger-enter", "trigger-enter-active");
    background.classList.remove("open");
  }

  triggers.forEach((trigger) =>
    trigger.addEventListener("mouseenter", eventHandler)
  );
  triggers.forEach((trigger) =>
    trigger.addEventListener("mouseleave", leaveHandler)
  );
});
