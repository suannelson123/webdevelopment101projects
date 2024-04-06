document.addEventListener("DOMContentLoaded", () => {
    const displayTimeLeft = document.querySelector(".display__time-left");
    const endTime = document.querySelector(".display__end-time");
    const buttons = document.querySelectorAll("[data-time]");
    const form = document.customForm;

    let countdown;
    let seconds = 60;
    let futureTime;

    function timer(seconds) {
        const startTime = Date.now();
        futureTime = startTime + seconds * 1000;
        display(seconds);
        displayEndtime(futureTime);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((futureTime - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                display(0);
                console.log("Timer expired!");
            } else {
                display(secondsLeft);
            }
        }, 1000);
    }

    function display(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${String(remainderSeconds).padStart(2, "0")}`;
        displayTimeLeft.textContent = display;
        document.title = display;
    }

    function displayEndtime(timeStamp) {
        const date = new Date(timeStamp);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const period = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour > 12 ? hour - 12 : hour;
        endTime.textContent = `Be back at ${adjustedHour}:${String(
            minutes
        ).padStart(2, "0")} ${period}`;
    }

    function startTimer(seconds) {
        clearInterval(countdown);
        timer(seconds);
    }

    function handleButtonClick() {
        const seconds = parseInt(this.dataset.time);
        console.log(seconds);
        startTimer(seconds);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const minutes = parseInt(form.minutes.value);
        if (!isNaN(minutes) && minutes > 0) {
            timer(minutes * 60);
            form.reset();
        } else {
            alert("Please enter a valid positive number of minutes.");
        }
    }

    buttons.forEach((button) =>
        button.addEventListener("click", handleButtonClick)
    );
    form.addEventListener("submit", handleFormSubmit);

    displayEndtime(Date.now());
    timer(seconds);
});
