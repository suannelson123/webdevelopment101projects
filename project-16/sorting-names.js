document.addEventListener("DOMContentLoaded", () => {
  const bands = [
    "The Plot in You",
    "The Devil Wears Prada",
    "Pierce the Veil",
    "Norma Jean",
    "The Bled",
    "Say Anything",
    "The Midway State",
    "We Came as Romans",
    "Counterparts",
    "Oh, Sleeper",
    "A Skylit Drive",
    "Anywhere But Here",
    "An Old Dog",
  ];

  function getNames() {
    const sortNames = bands.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    const bandsContainer = document.getElementById("bands");
    bandsContainer.innerHTML = "";
    sortNames.forEach((band) => {
      const bandElement = document.createElement("div");
      bandElement.className = "band-card";
      bandElement.innerHTML = `<li>${band}</li>`;
      bandsContainer.appendChild(bandElement);
    });
  }
  getNames();
});
