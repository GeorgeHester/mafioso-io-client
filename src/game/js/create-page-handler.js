/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as webSocketHandler from './web-socket-handler';
import * as pixelBackgroundDrawer from './pixel-background-drawer';

const createPageButton = document.getElementById('page-create-game-button');
const createPageInput = document.getElementById('page-create-game-input');
const createPageBackButton = document.getElementById('page-create-game-back-button');

createPageButton.addEventListener('click', () => {

    if (!data.webSocket.isOpen) { return };

    if (createPageInput.value != '') {

        data.player.clientName = createPageInput.value.trim();
        pageHandler.displayPageGame();

        webSocketHandler.updateClientName();
        webSocketHandler.createGame();
    };
});

createPageBackButton.addEventListener('click', () => {

    pageHandler.displayPageHome();
});

createPageInput.addEventListener('keyup', () => {

    let background = document.getElementById('pixel-background-canvas-page-create-game-input');

    if (createPageInput.value.length > 8) {
        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteWarning', background);
    } else {
        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteFocus', background);
    };
});