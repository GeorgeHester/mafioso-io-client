/*
    Module import(s)
*/
import * as data from './data';

const cardBackground = document.getElementsByClassName('card-background');

for (let i = 0; i < cardBackground.length; i++) 
{
    cardBackground[i].innerHTML = data.cardBackgroundInnerHtml;
};