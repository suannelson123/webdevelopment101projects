document.addEventListener("DOMContentLoaded", () => {
    const holes = document.querySelectorAll(".hole");
    const scoreBoard = document.querySelector(".score");
    const moles = document.querySelectorAll(".mole");
    const btn = document.getElementById("startBtn");
    let score = 0;
    let timeUp = true;
    let lastHole;

    function startGame() {
         score = 0;
        scoreBoard.textContent = 0;
        timeUp = false;
        popUp();
        setTimeout(() => (timeUp = true), 5000);
    }

    function randomTime(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log("aray wrong hole");
            return randomHole(holes);
        }

        lastHole = hole;
        return hole;
    }

    function popUp() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add("up");
        setTimeout(() => {
            hole.classList.remove("up");
            if (!timeUp) {
                popUp();
            }
        }, time);
    }

    function bonk(e) {
        this.classList.remove("up");
        score++;
        scoreBoard.textContent = score;
        if (!e.isTrusted) return;
    }

    popUp();
    randomHole(holes);
    btn.addEventListener("click", startGame);
    moles.forEach((mole) => mole.addEventListener("click", bonk));
});
