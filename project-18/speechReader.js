document.addEventListener("DOMContentLoaded", () => {
  const message = new SpeechSynthesisUtterance();
  let voices = [];
  const selection = document.querySelector(`[name="voice"]`);
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const options = document.querySelectorAll(
    `[type="range"], [name="textarea"]`
  );

  function speak() {
    voices = speechSynthesis.getVoices();
    console.log(voices);
    selection.innerHTML = "";
    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = voice.name;
      selection.appendChild(option);
    });
  }

  function setVoice() {
    message.voice = voices.find((voice) => voice.name === this.value);
    reset();
  }

  function reset() {
    speechSynthesis.cancel();
    message.text = document.querySelector('[name="textarea"]').value;
    speechSynthesis.speak(message);
  }

  function setOption() {
    message[this.name] = this.value;
    reset();
  }

  startBtn.addEventListener("click", () => {
    message.voice = voices[selection.selectedIndex];
    message.text = document.querySelector('[name="textarea"]').value;
    speechSynthesis.speak(message);
  });
  stopBtn.addEventListener("click", () => speechSynthesis.cancel());

  speechSynthesis.addEventListener("voiceschanged", speak);
  selection.addEventListener("change", setVoice);

  options.forEach((option) => option.addEventListener("change", setOption));

  console.log(message);
});
