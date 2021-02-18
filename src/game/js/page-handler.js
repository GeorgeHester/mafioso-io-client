/*
    Module import(s)
*/
import * as data from './data';
import * as pagePixelBackgroundDrawer from './page-pixel-background-drawer';

var pageGame = document.getElementById('page-game');
var pageHome = document.getElementById('page-home');
var pageJoinGame = document.getElementById('page-join-game');
var pageCreateGame = document.getElementById('page-create-game');

function hideAll() {

    pageGame.style.display = 'none';
    pageHome.style.display = 'none';
    pageJoinGame.style.display = 'none';
    pageCreateGame.style.display = 'none';

    data.currentPage.id = null;
};

function displayPageHome() {

    hideAll();
    pageHome.style.display = 'block';
    data.currentPage.id = 'page-home';
    pagePixelBackgroundDrawer.drawPagePixelBackground('page-home');
};

function displayPageGame() {

    hideAll();
    pageGame.style.display = 'block';
    data.currentPage.id = 'page-game';
    pagePixelBackgroundDrawer.drawPagePixelBackground('page-game');
};

function displayPageJoinGame() {

    hideAll();
    pageJoinGame.style.display = 'block';
    data.currentPage.id = 'page-join-game';
    pagePixelBackgroundDrawer.drawPagePixelBackground('page-join-game');
};

function displayPageCreateGame() {

    hideAll();
    pageCreateGame.style.display = 'block';
    data.currentPage.id = 'page-create-game';
    pagePixelBackgroundDrawer.drawPagePixelBackground('page-create-game');
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
    displayPageGame
};