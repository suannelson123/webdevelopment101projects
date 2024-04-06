document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const h1Text = hero.querySelector("h1");
  const shadowrRange = 500;
  console.log(hero);
  console.log(h1Text.textContent);

  function moveShadow(e) {
    e.preventDefault();
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;
    let offsetX = e.offsetX;
    let offsetY = e.offsetY;

    if (this !== e.target) {
      offsetX = offsetX + e.target.offsetLeft;
      offsetY = offsetY + e.target.offsetTop;
    }

    const shadowX = Math.round(
      (offsetX / width) * shadowrRange - shadowrRange / 2
    );
    const shadowY = Math.round(
      (offsetY / height) * shadowrRange - shadowrRange / 2
    );

    h1Text.style.textShadow = `${shadowX}px ${shadowY}px 0px rgba(0, 0, 0, 0.5),
      ${shadowX * -1}px ${shadowY}px 0px rgba(0,255,0,0.7),
      ${shadowX * -1}px ${shadowY}px 0px rgba(0,0,255,0.7),
      ${shadowY}px ${shadowX * -1}px 0px rgba(0,255,0,0.7),
      ${shadowY * -1}px ${shadowX}px 0px rgba(0,0,255,0.7)
    `;
  }

  hero.addEventListener("mousemove", moveShadow);
});
