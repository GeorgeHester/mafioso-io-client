/*
    Module import(s)
*/
import * as pageHandler from './page-handler';

const mainPageCreateGameButton = document.getElementById('page-main-create-game-button');
const mainPageJoinGameButton = document.getElementById('page-main-join-game-button');

mainPageCreateGameButton.addEventListener('click', () => {

    pageHandler.displayPageCreateGame();
});

mainPageJoinGameButton.addEventListener('click', () => {

    pageHandler.displayPageJoinGame();
});