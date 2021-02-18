/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as webSocketHandler from './web-socket-handler';

const joinPageButton = document.getElementById('page-join-game-button');
const joinPageInput = document.getElementById('page-join-game-input');
const joinPageBackButton = document.getElementById('page-join-game-back-button');

joinPageButton.addEventListener('click', () => {

    if (joinPageInput.value != '') {

        data.player.clientName = joinPageInput.value.trim();
        pageHandler.displayPageGame();

        webSocketHandler.updateClientName();
        webSocketHandler.joinGame();
    };
});

joinPageBackButton.addEventListener('click', () => {

    pageHandler.displayPageHome();
});