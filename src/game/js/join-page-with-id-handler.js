/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as webSocketHandler from './web-socket-handler';
import * as pixelBackgroundDrawer from './pixel-background-drawer';
import * as uuidValidator from './uuid-validator';

/*
    Get the components from the DOM
*/
const joinWithIdPageButton = document.getElementById('page-join-game-with-id-button');
const joinWithIdPageIdInput = document.getElementById('page-join-game-with-id-id-input');
const joinWithIdPageNameInput = document.getElementById('page-join-game-with-id-name-input');
const joinWithIdPageBackButton = document.getElementById('page-join-game-with-id-back-button');

joinWithIdPageButton.addEventListener('click', () => {

    if (!data.webSocket.isOpen) { return };

    if (joinWithIdPageNameInput.value != '' && uuidValidator.validateUuid(joinWithIdPageIdInput.value.trim()) ) {

        data.player.gameId = joinWithIdPageIdInput.value.trim();
        data.player.clientName = joinWithIdPageNameInput.value.trim();
        pageHandler.displayPageGame();

        webSocketHandler.updateClientName();
        webSocketHandler.joinGame();
    };
});

joinWithIdPageBackButton.addEventListener('click', () => {

    pageHandler.displayPageHome();
});

joinWithIdPageNameInput.addEventListener('keyup', () => {

    let background = document.getElementById('pixel-background-canvas-page-join-game-with-id-name-input');

    if (joinWithIdPageNameInput.value.length > 8) {
        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteWarning', background);
    } else {
        pixelBackgroundDrawer.updatePixelBackground('button', 'whiteFocus', background);
    };
});