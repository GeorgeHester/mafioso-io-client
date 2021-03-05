/*
    Module import(s)
*/
import * as pageHandler from './page-handler';

const howToPlayPageBackButton = document.getElementById('page-how-to-play-back-button');

howToPlayPageBackButton.addEventListener('click', () => {

    pageHandler.displayPageHome();
});