/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as uuidValidator from './uuid-validator';
import * as cookieHandler from './cookie-handler';
import * as pixelScaleHandler from './pixel-scale-handler';

//import * as messageDrawer from './message-drawer';
//import * as webSocketHandler from './web-socket-handler';

let gameIdElement = document.getElementById('game-id');
let gameIdFromElement = gameIdElement.innerHTML.trim();

pixelScaleHandler.setPixelValue(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    pixelScaleHandler.setPixelValue(window.innerWidth, window.innerHeight);
});

cookieHandler.parseCurrentCookies();

if (uuidValidator.validateUuid(gameIdFromElement)) {

    pageHandler.displayPageJoinGame();

    data.player.gameId = gameIdFromElement;

    let copyGameIdElement = document.getElementById("button-copy-input");
    copyGameIdElement.value = `${window.location.host}/${gameIdFromElement}`;
} else {

    pageHandler.displayPageHome();
    //pageHandler.displayPageGame();

    //while (!data.webSocket.isOpen) { };

    //messageDrawer.drawFullScreenMessage('Test Test Test Test Test Test Test Test Test Test Test Test Test', 'default', false, 3000);
    //pageHandler.displayPageHowToPlay();
    //pageHandler.displayPageCreateGame();
};

/*
function debugGame() {
    if (data.webSocket.isOpen && data.player.clientSecret) {
        data.player.clientName = 'George';
        webSocketHandler.updateClientName();
        webSocketHandler.createGame();
    } else {
        setTimeout(debugGame, 100);
    };
};*/