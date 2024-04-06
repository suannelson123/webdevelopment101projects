document.addEventListener("DOMContentLoaded", () => {
  const speedBar = document.querySelector(".speed-bar");
  const speed = document.querySelector(".speed");
  const speedRange = document.querySelector(".bar-range");
  const video = document.querySelector("video");
  let isDown = false;
  speedRange.style.height = "50%";

  function eventHandlerMouseMove(event) {
    if (isDown) {
      const y = event.pageY - this.offsetTop;
      const percent = y / this.offsetHeight;

      const min = 0.5;
      const max = 2;
      const height = Math.round(percent * 100) + "%";
      speedRange.style.height = height;
      const playBackRate = percent * (max - min) + min;
      speed.textContent = playBackRate.toFixed(2) + "x";
      video.playbackRate = playBackRate;
      console.log(height);
    }
  }

  function eventHandlerMouseDown(event) {
    isDown = true;
  }

  function eventHandlerMouseUp() {
    isDown = false;
  }

  function eventHandlerMouseLeave() {
    isDown = false;
  }

  speedBar.addEventListener("mousemove", eventHandlerMouseMove);
  speedBar.addEventListener("mousedown", eventHandlerMouseDown);
  speedBar.addEventListener("mouseup", eventHandlerMouseUp);
  speedBar.addEventListener("mouseleave", eventHandlerMouseLeave);
});
