/*
    Module import(s)
*/
import * as data from './data';
import * as renderQueueHandler from './render-queue-handler';

/*
    Updates the countdown object and sets up the timer
*/
function updateCountdown(countdownTime, countdownMessage) {

    // Get the info element and display the message
    let countdownInfoElement = document.getElementById('game-countdown-info');
    countdownInfoElement.innerHTML = countdownMessage;

    // Set the countdown length
    data.gameCountdown.time = countdownTime;

    // Clear and setup the timer
    clearInterval(data.gameCountdown.timer);
    data.gameCountdown.timer = setInterval(countdown, 1000);

    // Call the function once
    //countdown();
};

function countdown() {

    // Get the current style and clock element
    let oldStyle = data.renderQueue['game-countdown-clock'].style;
    let countdownClockElement = document.getElementById('game-countdown-clock');

    // Check if the countdown needs new styles
    if (data.gameCountdown.time == 0) {

        // Set style and reset data 
        data.renderQueue['game-countdown-clock'].style = 'whiteHover';

        // Check if style changed 
        if (oldStyle != data.renderQueue['game-countdown-clock'].style) {
            renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);
        };

        // Reset text elements
        let countdownMessageElement = document.getElementById('game-countdown-info');
        countdownMessageElement.innerHTML = ``;
        countdownClockElement.innerHTML = ``;

        // Reset timer
        clearInterval(data.gameCountdown.timer);
        return;

    } else if (data.gameCountdown.time <= 5000) {

        // Set style
        data.renderQueue['game-countdown-clock'].style = 'red';

        // Change style back in 500 milliseconds
        setTimeout(() => {
            data.renderQueue['game-countdown-clock'].style = 'whiteHover';
            renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);
        }, 500);
    } else {

        // Set style
        data.renderQueue['game-countdown-clock'].style = 'whiteHover';
    };

    // Update time and countdown element
    data.gameCountdown.time -= 1000;
    countdownClockElement.innerHTML = `${data.gameCountdown.time / 1000}`;

    // Check if style changed 
    if (oldStyle != data.renderQueue['game-countdown-clock'].style) {
        renderQueueHandler.renderRenderQueue(window.innerWidth, window.innerHeight);
    };
};

/*
    Module export(s)
*/
export {
    updateCountdown,
    countdown
};