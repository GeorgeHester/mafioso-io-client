/*
    Module import(s)
*/
import * as pageHandler from './page-handler';

/*
    Get the components from the DOM
*/
const mainPageCreateGameButton = document.getElementById('page-main-create-game-button');
const mainPageJoinGameButton = document.getElementById('page-main-join-game-button');
const mainPageHowToPlayButton = document.getElementById('page-main-how-to-play-button');

// Handle click event to the main page button
mainPageCreateGameButton.addEventListener('click', () => {

    pageHandler.displayPageCreateGame();
});

// Handle click event to the main page button
mainPageJoinGameButton.addEventListener('click', () => {

    pageHandler.displayPageJoinGameWithId();
});

// Handle click event to the main page button
mainPageHowToPlayButton.addEventListener('click', () => {

    pageHandler.displayPageHowToPlay();
});