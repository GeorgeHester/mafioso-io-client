/*
    Module import(s)
*/
import * as data from './data';
import * as messageDrawer from './message-drawer';
import * as webSocketHandler from './web-socket-handler';

const buttonStartGame = document.getElementById('button-start-game');
const buttonConfirm = document.getElementById('button-confirm');

buttonConfirm.addEventListener('click', () => {

    if (data.player.currentSelection == null) {

        messageDrawer.drawErrorMessage('There is no player selected.', false);
        return;
    };

    switch (data.currentGame.status) {
        case 'inGameDayTime':

            webSocketHandler.sendConfirmKillPlayer();
            break;
        case "inGameNightTime":

            switch (data.player.personType) {
                case "personMafia":

                    webSocketHandler.sendMafiaConfirmTargetPlayer();
                    break;
                case "personDetective":

                    webSocketHandler.sendDetectiveConfirmRevealPlayer();
                    break;
                case "personDoctor":

                    webSocketHandler.sendDoctorConfirmImmunisePlayer();
                    break;
            };
            break;
    };
});

buttonStartGame.addEventListener('click', () => {

    webSocketHandler.startGame();
});

function hideAllButton() {

    buttonStartGame.style.display = 'none';
    buttonConfirm.style.display = 'none';
};

function displayStartButton() {

    hideAllButton();
    buttonStartGame.style.display = 'block';
};

function hideStartButton() {

    buttonStartGame.style.display = 'none';
};

function displayConfirmButton() {

    hideAllButton();
    buttonConfirm.style.display = 'block';
};

function hideConfirmButton() {

    buttonConfirm.style.display = 'none';
};

/*
    Module export(s)
*/
export {
    displayStartButton,
    displayConfirmButton,
    hideStartButton,
    hideConfirmButton
};