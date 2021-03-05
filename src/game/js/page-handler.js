/*
    Module import(s)
*/
import * as data from './data';
import * as renderQueueHandler from './render-queue-handler';

var pageGame = document.getElementById('page-game');
var pageHome = document.getElementById('page-home');
var pageJoinGame = document.getElementById('page-join-game');
var pageJoinGameWithId = document.getElementById('page-join-game-with-id');
var pageCreateGame = document.getElementById('page-create-game');
var pageHowToPlay = document.getElementById('page-how-to-play');

function hideAll() {

    pageGame.style.display = 'none';
    pageHome.style.display = 'none';
    pageJoinGame.style.display = 'none';
    pageCreateGame.style.display = 'none';
    pageJoinGameWithId.style.display = 'none';
    pageHowToPlay.style.display = 'none';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = '';
};

function displayPageHome() {

    hideAll();
    pageHome.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-home';

    renderQueueHandler.pageUpdated();
};

function displayPageGame() {

    hideAll();
    pageGame.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-game';

    renderQueueHandler.pageUpdated();
};

function displayPageJoinGame() {

    hideAll();
    pageJoinGame.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-join-game';

    renderQueueHandler.pageUpdated();
};

function displayPageJoinGameWithId() {

    hideAll();
    pageJoinGameWithId.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-join-game-with-id';

    renderQueueHandler.pageUpdated();
};

function displayPageHowToPlay() {

    hideAll();
    pageHowToPlay.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-how-to-play';

    renderQueueHandler.pageUpdated();
};

function displayPageCreateGame() {

    hideAll();
    pageCreateGame.style.display = 'block';

    data.pageHandler.previousPage.id = data.pageHandler.currentPage.id;
    data.pageHandler.currentPage.id = 'page-create-game';

    renderQueueHandler.pageUpdated();
};

/*
    Module export(s)
*/
export {
    pageHome,
    pageCreateGame,
    pageJoinGame,
    pageGame,
    hideAll,
    displayPageHome,
    displayPageCreateGame,
    displayPageJoinGame,
    displayPageGame,
    displayPageHowToPlay,
    displayPageJoinGameWithId
};