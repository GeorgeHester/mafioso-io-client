/*
    Module import(s)
*/
import * as data from './data';
import * as pageHandler from './page-handler';
import * as uuidValidator from './uuid-validator';
import * as cookieHandler from './cookie-handler';

let gameIdElement = document.getElementById('game-id');
let gameIdFromElement = gameIdElement.innerHTML.trim();

cookieHandler.parseCurrentCookies();

if (uuidValidator.validateUuid(gameIdFromElement)) {
    
    pageHandler.displayPageJoinGame();

    data.player.gameId = gameIdFromElement;

    let copyGameIdElement = document.getElementById("button-copy-input");
    copyGameIdElement.value = `${window.location.host}/${gameIdFromElement}`;
} else {

    pageHandler.displayPageHome();
    //pageHandler.displayPageGame();
};