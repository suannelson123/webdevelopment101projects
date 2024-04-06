document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const playButton = document.querySelector(".play-button");
  const progressBar = document.querySelector(".progress-bar");
  const progressBarFilled = document.querySelector(".progressbar-filled");
  const ranges = document.querySelectorAll('[type="range"]');
  const playBack = document.querySelector(".playback");
  const fastForward = document.querySelector(".fastforward");
  let mousemove = false;

  function play() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    if (video.play) {
      playButton.innerHTML =
        '<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/pause--v1.png" alt="pause--v1" />';
    }
    if (video.paused) {
      playButton.innerHTML =
        '<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/play--v1.png" alt="play--v1" />';
    }
  }

  function updateButton() {
    if (video.play) {
      playButton.innerHTML =
        '<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/pause--v1.png" alt="pause--v1" />';
    }
    if (video.paused) {
      playButton.innerHTML =
        '<img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/play--v1.png" alt="play--v1" />';
    }
  }

  function rewind() {
    video.currentTime += -10;
  }
  function forward() {
    video.currentTime += 10;
  }

  function changeDuration() {
    video[this.name] = this.value;
  }

  function udapteTime() {
    let convertDuration = (video.currentTime / video.duration) * 100 + "%";
    progressBarFilled.style.width = convertDuration;
  }

  function setDuration(event) {
    if (progressBar.offsetWidth !== 0) {
      const duration =
        (event.offsetX / progressBar.offsetWidth) * video.duration;
      video.currentTime = duration;
    }
  }

  video.addEventListener("timeupdate", udapteTime);
  video.addEventListener("click", play);
  playButton.addEventListener("click", play);
  playButton.addEventListener("play", updateButton);
  playButton.addEventListener("paused", updateButton);
  playBack.addEventListener("click", rewind);
  fastForward.addEventListener("click", forward);
  ranges.forEach((range) =>
    range.addEventListener("mousemove", changeDuration)
  );

  progressBar.addEventListener("click", setDuration);
  progressBar.addEventListener("mousedown", () => {
    mousemove = true;
  });

  progressBar.addEventListener("mousemove", (event) => {
    if (mousemove) {
      setDuration(event);
    }
  });

  progressBar.addEventListener("mouseup", () => {
    mousemove = false;
  });
});
