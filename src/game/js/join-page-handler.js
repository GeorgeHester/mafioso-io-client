/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as webSocketHandler from './web-socket-handler';
import * as pixelBackgroundDrawer from './pixel-background-drawer';

/*
    Get the components from the DOM
*/
const joinPageButton = document.getElementById('page-join-game-button');
const joinPageInput = document.getElementById('page-join-game-input');

joinPageButton.addEventListener('click', () => {

    if (!data.webSocket.isOpen) { return };

    if (joinPageInput.value != '') {

        data.player.clientName = joinPageInput.value.trim();
        pageHandler.displayPageGame();

        webSocketHandler.updateClientName();
        webSocketHandler.joinGame();
    };
});

joinPageInput.addEventListener('keyup', () => {

    let background = document.getElementById('pixel-background-canvas-page-join-game-input');

    if (joinPageInput.value.length >= 10) {

        joinPageInput.value = joinPageInput.value.substring(0, 10);
        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteWarning', background);
    } else if (joinPageInput.value.length > 8) {

        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteWarning', background);
    } else {

        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteFocus', background);
    };
});