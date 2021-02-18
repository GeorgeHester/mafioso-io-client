/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as webSocketHandler from './web-socket-handler';

const createPageButton = document.getElementById('page-create-game-button');
const createPageInput = document.getElementById('page-create-game-input');
const createPageBackButton = document.getElementById('page-create-game-back-button');

createPageButton.addEventListener('click', () => {

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