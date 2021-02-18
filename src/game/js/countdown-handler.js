/*
    Module import(s)
*/
import * as data from './data';

function updateCountdown(countdownTime, countdownMessage) {

    let countdownMessageElement = document.getElementById('countdown-info');
    countdownMessageElement.innerHTML = countdownMessage;

    data.gameCountdown.time = countdownTime;
};

function countdown() {

    if (data.gameCountdown.time == 0) {return};
    data.gameCountdown.time -= 1000;

    let countdownClockElement = document.getElementById('countdown-clock');
    countdownClockElement.innerHTML = `${data.gameCountdown.time / 1000}:00`;
};

setInterval(countdown, 1000);

/*
    Module export(s)
*/
export{
    updateCountdown,
    countdown
};