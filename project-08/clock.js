document.addEventListener('DOMContentLoaded', () => {
    

const secondHand = document.getElementById('second-hand')
const hourHand = document.getElementById('hour-hand')
const minuteHand = document.getElementById('minute-hand')

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const handdegree = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${handdegree}deg)`;
    console.log(seconds);

    const hours = now.getHours();
    const hourdegree = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourdegree}deg)`;


    console.log(hours);

    const mins = now.getMinutes();
    const mindegree = ((mins / 60) * 360) + 90;
    const offset = (Math.random() - 0.5) * 4;
    minuteHand.style.transform = `rotate(${(mindegree)}deg)`;

}
setInterval(setDate, 1000);


function setTime() {
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours % 12 == 0) {
        hours = 12
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    document.getElementById("digital-clock").innerHTML = hours + ":" + minute + ":" + second + " " + ampm;
}

setInterval(setTime, 1000);




})